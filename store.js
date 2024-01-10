// store.js
import { create } from "zustand";

const useStore = create((set) => ({
  preis: 0,
  extras: [],
  menge: 1,
  setPreis: (neuerPreis) => set({ preis: neuerPreis }),
  setExtras: (neueExtras) => set({ extras: neueExtras }),
  setMenge: (neueMenge) => set({ menge: neueMenge }),
  setInitialProduktState: (initialState) =>
    set({
      preis: initialState.preis,
      extras: initialState.extras,
      menge: initialState.menge,
    }),
}));

export default useStore;
