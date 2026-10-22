import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

// false pendant le rendu serveur et l'hydratation, true ensuite.
// Remplace le motif useState + useEffect(() => setMounted(true)).
export function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
