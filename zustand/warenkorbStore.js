import { create } from "zustand";

const warenkorbStore = create((set) => ({
  warenkorb: [],
  addToCart: (produkt) =>
    set((state) => ({ warenkorb: [...state.warenkorb, produkt] })),
}));

export default warenkorbStore;
