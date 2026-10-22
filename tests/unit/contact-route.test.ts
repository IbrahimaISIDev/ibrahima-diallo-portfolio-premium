import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Résultat renvoyé par le faux client Resend, modifiable test par test
const send = vi.fn();
vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

const LONG_AGO = Date.now() - 60_000;
let ipCounter = 0;

// Chaque test utilise une IP différente : la limitation de débit est en mémoire
function request(body: unknown, ip = `10.0.0.${++ipCounter}`) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const validBody = {
  name: "Awa Ndiaye",
  email: "awa@example.com",
  subject: "Projet web",
  message: "Bonjour, j'ai un projet.",
  website: "",
  startedAt: LONG_AGO,
};

async function loadRoute(apiKey: string | undefined) {
  vi.resetModules();
  if (apiKey) vi.stubEnv("RESEND_API_KEY", apiKey);
  return import("@/app/api/contact/route");
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    send.mockReset();
    send.mockResolvedValue({ data: { id: "email_123" }, error: null });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("rejette un JSON invalide (400)", async () => {
    const { POST } = await loadRoute("re_test");
    const res = await POST(request("{oops"));
    expect(res.status).toBe(400);
  });

  it.each([
    ["champ manquant", { ...validBody, message: undefined }],
    ["email invalide", { ...validBody, email: "pas-un-email" }],
    ["mauvais type", { ...validBody, message: { texte: "objet" } }],
    ["message trop long", { ...validBody, message: "a".repeat(5001) }],
  ])("rejette une saisie invalide : %s (400)", async (_, body) => {
    const { POST } = await loadRoute("re_test");
    const res = await POST(request(body));
    expect(res.status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it("indique quels champs corriger, avec un message par champ", async () => {
    const { POST } = await loadRoute("re_test");
    const res = await POST(request({ ...validBody, email: "pas-un-email", subject: "" }));
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(Object.keys(json.fields).sort()).toEqual(["email", "subject"]);
    expect(json.fields.email).toMatch(/email valide/);
  });

  it("répond 500 si la clé Resend n'est pas configurée", async () => {
    const { POST } = await loadRoute(undefined);
    const res = await POST(request(validBody));
    expect(res.status).toBe(500);
  });

  it("envoie l'email et ne renvoie que son identifiant", async () => {
    const { POST } = await loadRoute("re_test");
    const res = await POST(request(validBody));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ id: "email_123" });
    expect(send).toHaveBeenCalledOnce();
    expect(send.mock.calls[0][0]).toMatchObject({
      replyTo: "awa@example.com",
      subject: "[Portfolio] Nouveau message de Awa Ndiaye: Projet web",
    });
  });

  it("retire les retours à la ligne du sujet de l'email", async () => {
    const { POST } = await loadRoute("re_test");
    await POST(request({ ...validBody, subject: "Projet\r\nBcc: spam@example.com" }));
    expect(send.mock.calls[0][0].subject).not.toMatch(/[\r\n]/);
  });

  it("répond 502 quand Resend renvoie une erreur (au lieu d'un faux succès)", async () => {
    send.mockResolvedValue({ data: null, error: { message: "API key is invalid" } });
    const { POST } = await loadRoute("re_test");
    const res = await POST(request(validBody));
    expect(res.status).toBe(502);
  });

  it("simule un succès sans envoyer si le champ piège est rempli", async () => {
    const { POST } = await loadRoute("re_test");
    const res = await POST(request({ ...validBody, website: "http://spam.example" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ id: null });
    expect(send).not.toHaveBeenCalled();
  });

  it("simule un succès sans envoyer si le formulaire est soumis en moins de 3 s", async () => {
    const { POST } = await loadRoute("re_test");
    const res = await POST(request({ ...validBody, startedAt: Date.now() }));
    expect(res.status).toBe(200);
    expect(send).not.toHaveBeenCalled();
  });

  it("limite à 5 envois par IP (429 au 6e)", async () => {
    const { POST } = await loadRoute("re_test");
    const statuses = [];
    for (let i = 0; i < 6; i++) {
      statuses.push((await POST(request(validBody, "192.168.1.1"))).status);
    }
    expect(statuses).toEqual([200, 200, 200, 200, 200, 429]);
    expect((await POST(request(validBody, "192.168.1.2"))).status).toBe(200);
  });
});
