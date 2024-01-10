import { create } from "zustand";

const warenkorbStore = create((set) => ({
  warenkorb: [],
  gesamtbetrag: 0,

  addToCart: (produkt) =>
    set((state) => ({
      warenkorb: [...state.warenkorb, { ...produkt, isActive: true }],
    })),

  removeFromCard: () =>
    set((state) => ({
      warenkorb: state.warenkorb.filter((artikel) => artikel.isActive),
    })),

  berechneGesamtbetrag: () =>
    set((state) => {
      const gesamtbetrag = state.warenkorb.reduce((summe, artikel) => {
        return summe + artikel.preis * artikel.menge;
      }, 0);
      return { gesamtbetrag };
    }),
}));

export default warenkorbStore;
