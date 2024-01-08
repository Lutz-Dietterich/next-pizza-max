const jsondb = {
  produkte: [
    {
      name: "Crispy Burger",
      description: "amirican style burger",
      category: "Hauptgericht",
      price: 6.99,
      url: "burger",
      picture: "/img/products/burger.jpg",
      extras: [
        {
          text: "doppelt",
          price: 4,
        },
        {
          text: "extra scharf",
          price: 0.5,
        },
      ],
    },
    {
      name: "Cola",
      description: "Original Coke",
      category: "Getränke",
      price: 1.99,
      url: "cola",
      picture: "/img/products/cola.jpg",
      extras: [
        {
          text: "gekühlt",
          price: 0,
        },
      ],
    },
    {
      name: "Eis",
      description: "Leckeres vanille Eis",
      category: "Nachspeise",
      price: 3.99,
      url: "eis",
      picture: "/img/products/eis.jpg",
      extras: [
        {
          text: "extra Sahne",
          price: 1,
        },
      ],
    },
    {
      name: "Falaffel",
      description: "Veggie finger Food",
      category: "Snack",
      price: 16.99,
      url: "falaffel",
      picture: "/img/products/falaffel.jpg",
      extras: [
        {
          text: "Sesam Sauce",
          price: 1,
        },
        {
          text: "Cocktail Sauce",
          price: 1,
        },
      ],
    },
    {
      name: "Lahmacun",
      description: "Türkische Pizza",
      category: "Hauptgericht",
      price: 8.99,
      url: "lahmacun",
      picture: "/img/products/lahmacun.jpg",
      extras: [
        {
          text: "doppelt Fleisch",
          price: 7,
        },
        {
          text: "extra scharf",
          price: 0.5,
        },
      ],
    },
    {
      name: "Pizza",
      description: "Runde Italienische Pizza",
      category: "Hauptgericht",
      price: 62.99,
      url: "pizza",
      picture: "/img/products/pizza.jpg",
      extras: [
        {
          text: "doppelt",
          price: 4,
        },
        {
          text: "extra Käse",
          price: 2,
        },
      ],
    },
    {
      name: "Lasagne",
      description: "Italienischer Flachnudel Auflauf",
      category: "Hauptgericht",
      price: 6.99,
      url: "lasagne",
      picture: "/img/products/lasagne.jpg",
      extras: [
        {
          text: "doppelt",
          price: 5,
        },
        {
          text: "extra Käse",
          price: 2,
        },
      ],
    },
    {
      name: "Muffin",
      description: "amirican style CupCake",
      category: "Nachspeise",
      price: 6.99,
      url: "muffin",
      picture: "/img/products/muffin.jpg",
    },
    {
      name: "Pommes",
      description: "Streifen von Äpfel aus der Erde",
      category: "Snacks",
      price: 9.99,
      url: "pommes",
      picture: "/img/products/pommes.jpg",
      extras: [
        {
          text: "majo",
          price: 1,
        },
        {
          text: "ketchup",
          price: 1,
        },
      ],
    },
  ],
};

export default jsondb;
