export interface Pet {
  name: string;
  baseValue: number; // Base value in PHP
  demand: 'Amazing' | 'High' | 'Decent';
  image?: string;
  mutations: {
    nopot: number;  // No potion
    fr: number;     // Fly + Ride
    nfr: number;    // Neon Fly Ride
    mfr: number;    // Mega Fly Ride
  };
}

export const pets: Pet[] = [
  // Amazing Demand Pets
  {
    name: "Bat Dragon",
    baseValue: 6300,
    demand: "Amazing",
    mutations: {
      nopot: 6300,
      fr: 6300,
      nfr: 25200,
      mfr: 100800,
    }
  },
  {
    name: "Shadow Dragon",
    baseValue: 4330,
    demand: "Amazing",
    mutations: {
      nopot: 4330,
      fr: 4330,
      nfr: 17320,
      mfr: 69280,
    }
  },
  {
    name: "Giraffe",
    baseValue: 2920,
    demand: "Amazing",
    mutations: {
      nopot: 2920,
      fr: 2920,
      nfr: 11680,
      mfr: 46720,
    }
  },
  {
    name: "Frost Dragon",
    baseValue: 2230,
    demand: "Amazing",
    mutations: {
      nopot: 2230,
      fr: 2230,
      nfr: 4550,
      mfr: 18200,
    }
  },
  {
    name: "Owl",
    baseValue: 1900,
    demand: "Amazing",
    mutations: {
      nopot: 1900,
      fr: 1900,
      nfr: 7600,
      mfr: 30400,
    }
  },
  {
    name: "Parrot",
    baseValue: 1500,
    demand: "Amazing",
    mutations: {
      nopot: 1500,
      fr: 1500,
      nfr: 3120,
      mfr: 12480,
    }
  },
  {
    name: "Crow",
    baseValue: 1320,
    demand: "Amazing",
    mutations: {
      nopot: 1320,
      fr: 1320,
      nfr: 2920,
      mfr: 11680,
    }
  },
  {
    name: "Balloon Unicorn",
    baseValue: 1320,
    demand: "Amazing",
    mutations: {
      nopot: 1320,
      fr: 1320,
      nfr: 3850,
      mfr: 15400,
    }
  },
  {
    name: "Evil Unicorn",
    baseValue: 1110,
    demand: "Amazing",
    mutations: {
      nopot: 1110,
      fr: 1110,
      nfr: 2320,
      mfr: 9280,
    }
  },
  {
    name: "Hedgehog",
    baseValue: 620,
    demand: "Amazing",
    mutations: {
      nopot: 620,
      fr: 620,
      nfr: 2480,
      mfr: 9920,
    }
  },
  {
    name: "Dalmatian",
    baseValue: 530,
    demand: "Amazing",
    mutations: {
      nopot: 530,
      fr: 530,
      nfr: 1800,
      mfr: 7200,
    }
  },
  {
    name: "Arctic Reindeer",
    baseValue: 520,
    demand: "Amazing",
    mutations: {
      nopot: 520,
      fr: 520,
      nfr: 2080,
      mfr: 8320,
    }
  },
  {
    name: "Cow",
    baseValue: 355,
    demand: "Amazing",
    mutations: {
      nopot: 355,
      fr: 355,
      nfr: 830,
      mfr: 2900,
    }
  },
  {
    name: "Turtle",
    baseValue: 345,
    demand: "Amazing",
    mutations: {
      nopot: 345,
      fr: 345,
      nfr: 720,
      mfr: 1600,
    }
  },
  {
    name: "Strawberry Shortcake Bat Dragon",
    baseValue: 285,
    demand: "Amazing",
    mutations: {
      nopot: 285,
      fr: 285,
      nfr: 830,
      mfr: 2900,
    }
  },
  {
    name: "Chocolate Chip Bat Dragon",
    baseValue: 235,
    demand: "Amazing",
    mutations: {
      nopot: 235,
      fr: 235,
      nfr: 760,
      mfr: 2900,
    }
  },
  {
    name: "Kangaroo",
    baseValue: 235,
    demand: "Amazing",
    mutations: {
      nopot: 235,
      fr: 235,
      nfr: 530,
      mfr: 1330,
    }
  },
  {
    name: "Elephant",
    baseValue: 215,
    demand: "Amazing",
    mutations: {
      nopot: 215,
      fr: 215,
      nfr: 620,
      mfr: 2350,
    }
  },
  {
    name: "Fairy Bat Dragon",
    baseValue: 135,
    demand: "Amazing",
    mutations: {
      nopot: 135,
      fr: 135,
      nfr: 450,
      mfr: 1430,
    }
  },

  // High Demand Pets
  {
    name: "Giant Panda",
    baseValue: 1200,
    demand: "High",
    mutations: {
      nopot: 1200,
      fr: 1200,
      nfr: 4800,
      mfr: 19200,
    }
  },
  {
    name: "African Wild Dog",
    baseValue: 860,
    demand: "High",
    mutations: {
      nopot: 860,
      fr: 860,
      nfr: 2900,
      mfr: 11600,
    }
  },
  {
    name: "Orchid Butterfly",
    baseValue: 0,
    demand: "High",
    mutations: {
      nopot: 0,
      fr: 0,
      nfr: 0,
      mfr: 0,
    }
  },
  {
    name: "Peppermint Penguin",
    baseValue: 305,
    demand: "High",
    mutations: {
      nopot: 305,
      fr: 305,
      nfr: 1100,
      mfr: 3600,
    }
  },
  {
    name: "Albino Monkey",
    baseValue: 235,
    demand: "High",
    mutations: {
      nopot: 235,
      fr: 235,
      nfr: 720,
      mfr: 2880,
    }
  },
  {
    name: "Crocodile",
    baseValue: 0,
    demand: "High",
    mutations: {
      nopot: 0,
      fr: 132,
      nfr: 530,
      mfr: 2120,
    }
  },
  {
    name: "Goose",
    baseValue: 185,
    demand: "High",
    mutations: {
      nopot: 185,
      fr: 185,
      nfr: 740,
      mfr: 2960,
    }
  },

  // Decent Demand Pets
  {
    name: "Blazing Lion",
    baseValue: 580,
    demand: "Decent",
    mutations: {
      nopot: 580,
      fr: 580,
      nfr: 2320,
      mfr: 9280,
    }
  },
  {
    name: "Hot Doggo",
    baseValue: 250,
    demand: "Decent",
    mutations: {
      nopot: 250,
      fr: 250,
      nfr: 1050,
      mfr: 4200,
    }
  },
  {
    name: "Monkey King",
    baseValue: 245,
    demand: "Decent",
    mutations: {
      nopot: 245,
      fr: 245,
      nfr: 980,
      mfr: 3920,
    }
  },
  {
    name: "Flamingo",
    baseValue: 285,
    demand: "Decent",
    mutations: {
      nopot: 285,
      fr: 285,
      nfr: 980,
      mfr: 3920,
    }
  },
  {
    name: "Mini Pig",
    baseValue: 200,
    demand: "Decent",
    mutations: {
      nopot: 200,
      fr: 200,
      nfr: 720,
      mfr: 3050,
    }
  },
  {
    name: "Undead Jousting Horse",
    baseValue: 150,
    demand: "Decent",
    mutations: {
      nopot: 150,
      fr: 150,
      nfr: 720,
      mfr: 2880,
    }
  },
  {
    name: "Candyfloss Chick",
    baseValue: 165,
    demand: "Decent",
    mutations: {
      nopot: 165,
      fr: 165,
      nfr: 690,
      mfr: 2760,
    }
  },
  {
    name: "Lion",
    baseValue: 175,
    demand: "Decent",
    mutations: {
      nopot: 175,
      fr: 175,
      nfr: 700,
      mfr: 2800, // Added value since it was missing
    }
  },
  {
    name: "Blue Dog",
    baseValue: 175,
    demand: "Decent",
    mutations: {
      nopot: 175,
      fr: 175,
      nfr: 620,
      mfr: 2800,
    }
  },
  {
    name: "Sugar Glider",
    baseValue: 105,
    demand: "Decent",
    mutations: {
      nopot: 105,
      fr: 105,
      nfr: 460,
      mfr: 1840,
    }
  }
];

export const getPetByName = (name: string): Pet | undefined => {
  return pets.find(pet => pet.name.toLowerCase() === name.toLowerCase());
};

export const getAllPetNames = (): string[] => {
  return pets.map(pet => pet.name).sort();
};
