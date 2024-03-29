import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.placeImage.deleteMany();
  await prisma.place.deleteMany();

  const places = [
    {
      id: "rustica",
      name: "Rustica",
      address: "3220 W Lake St",
      lat: 44.949411,
      lon: -93.3203,
      category: "BAKERY",
      grouping: "SOUTH",
      description: "Love the ginger scones",
      placeImage: {
        create: {
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/FNqhZsLFJ83jWCUR5a0MGg/o.jpg",
        },
      },
    },
    {
      id: "black_walnut",
      name: "Black Walnut",
      address: "3245 Hennepin Ave S",
      lat: 44.94497704738643,
      lon: -93.29794673789111,
      category: "BAKERY",
      grouping: "SOUTH",
      description: "TC's flakiest croissants",
      placeImage: {
        create: {
          url: "https://i0.wp.com/www.twincities.com/wp-content/uploads/2020/01/BlackWalnutBakery11072019Ngolemontart.jpg?fit=780%2C9999px&ssl=1",
        },
      },
    },
    {
      id: "patisserie46",
      name: "Patisserie 46",
      address: "4552 Grand Ave S",
      lat: 44.91976,
      lon: -93.284438,
      category: "BAKERY",
      grouping: "SOUTH",
      description: "Amazing pastry shop included",
      placeImage: {
        create: {
          url: "/images/bakery/patisserie46Grand.jpeg",
        },
      },
    },
    {
      id: "turtle_bread_lh",
      name: "Turtle Bead - Linden Hills",
      address: "3421 W 44th St",
      lat: 44.923264,
      lon: -93.323866,
      category: "BAKERY",
      grouping: "EXTRA",
      description: "Check out the cardamom bread",
      placeImage: {
        create: {
          url: "/images/bakeryTurtleBreadLH.jpeg",
        },
      },
    },
    {
      id: "great_harvest_lh",
      name: "Great Harvest - Linden Hills",
      address: "3421 W 44th St",
      lat: 44.924024,
      lon: -93.315201,
      category: "BAKERY",
      grouping: "EXTRA",
      description: "Franchise, but good",
      placeImage: {
        create: {
          url: "/images/bakery/GreatHarvestLH.jpeg",
        },
      },
    },
    {
      id: "bakers_wife",
      name: "Baker's Wife",
      address: "4200 28th Ave S",
      lat: 44.926748,
      lon: -93.232134,
      category: "BAKERY",
      grouping: "EXTRA",
      description: "Traditional",
      placeImage: {
        create: {
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/FNqhZsLFJ83jWCUR5a0MGg/o.jpg",
        },
      },
    },
    {
      id: "savory_bake_house",
      name: "Savory Bake House",
      address: "3008 36th Ave S",
      lat: 44.948108,
      lon: -93.220398,
      category: "BAKERY",
      grouping: "SOUTH",
      description: "Savory pies and turnovers",
      placeImage: {
        create: {
          url: "/images/bakery/SavoryBakeHouse.jpeg",
        },
      },
    },
    {
      id: "laune_bread",
      name: "Laune Bread",
      address: "3605 E Lake St",
      lat: 44.94837,
      lon: -93.220058,
      category: "BAKERY",
      grouping: "SOUTH",
      description: "European, with an emphasis on whole grains",
      placeImage: {
        create: {
          url: "/images/bakery/Laune.jpeg",
        },
      },
    },

    {
      id: "bryant_square_park",
      name: "Bryant Square Park",
      address: "3101 Bryant Ave S",
      lat: 44.946161988128104,
      lon: -93.29042751845597,
      category: "MURAL",
      grouping: "SOUTH",
      description: "Mirrored mosaic",
      placeImage: {
        create: {
          url: "https://www.minneapolisparks.org/wp-content/uploads/2018/11/Bryant-Square-Mosaic-Unveiling_2.jpg",
        },
      },
    },
    {
      id: "what_will_you_do",
      name: "What Will You Do?",
      address: "3101 Bryant Ave S",
      lat: 44.9556167,
      lon: -93.2772139,
      category: "MURAL",
      grouping: "SOUTH",
      description: "What will you do with your one wild and precious life?",
      placeImage: {
        create: {
          url: "/images/art/IMG_5339.jpeg",
        },
      },
    },
    {
      id: "lyndale_park_rose_garden",
      name: "Rose Garden",
      address: "4124 Roseway Rd",
      lat: 44.927341526203236,
      lon: -93.29591834402862,
      category: "ART",
      grouping: "SOUTH",
      description: "Rose garden, Cherry blossoms, and Japanese Rock Garden",
      placeImage: {
        create: {
          url: "/images/art/RoseGarden.jpeg",
        },
      },
    },
    {
      id: "turtle_bread_chicago",
      name: "Turtle Bread - Chicago Ave",
      address: "4762 Chicago Ave",
      lat: 44.91626633997229,
      lon: -93.26264025220873,
      category: "BAKERY",
      grouping: "SOUTH",
      description:
        "Large space to sit and enjoy baked goods, sandwiches and soups.",
      placeImage: {
        create: {
          url: "/images/bakery/TurtleBreadChicago.jpeg",
        },
      },
    },

    {
      id: "cafe_ceres",
      name: "Cafe Ceres",
      address: "3509 W 44th St",
      lat: 44.922892,
      lon: -93.324326,
      category: "BAKERY",
      grouping: "SOUTH",
      description: "Classics with a Mediterranean twist",
      placeImage: {
        create: {
          url: "/images/bakery/CafeCeres.jpeg",
        },
      },
    },
    {
      id: "atuva",
      name: "Atuva Bakery",
      address: "3509 W 44th St",
      lat: 44.934,
      lon: -93.232,
      category: "BAKERY",
      grouping: "SOUTH",
      description: "",
      placeImage: {
        create: {
          url: "/images/bakery/IMG_8209.jpeg",
        },
      },
    },

    {
      id: "IMG_4942",
      name: "VOTE: John Louis",
      address: "",
      description: "",
      category: "ART",
      grouping: "SOUTH",
      lat: 44.93940833333333,
      lon: -93.25260277777778,
      placeImage: {
        create: {
          url: "/images/art/IMG_4942.JPG",
        },
      },
    },
    {
      id: "IMG_5068",
      name: "IMG_5068",
      address: "End Gun Violence",
      description: "",
      category: "ART",
      grouping: "NORTH",
      lat: 44.99939722222222,
      lon: -93.29164166666666,
      placeImage: {
        create: {
          url: "/images/art/IMG_5068.JPG",
        },
      },
    },
    {
      id: "IMG_5073",
      name: "Love to All",
      address: "",
      description: "",
      category: "ART",
      grouping: "NORTH",
      lat: 44.958152777777784,
      lon: -93.27788611111112,
      placeImage: {
        create: {
          url: "/images/art/IMG_5073.JPG",
        },
      },
    },
    {
      id: "IMG_5074",
      name: "You Can't Separate Peace",
      address: "",
      description: "",
      category: "ART",
      grouping: "NORTH",
      lat: 44.95928611111111,
      lon: -93.27812222222222,
      placeImage: {
        create: {
          url: "/images/art/IMG_5074.JPG",
        },
      },
    },
    {
      id: "IMG_5075",
      name: "Robert's Shoes Black Daze",
      address: "",
      description: "",
      category: "ART",
      grouping: "SOUTH",
      lat: 44.948477777777775,
      lon: -93.26288611111111,
      placeImage: {
        create: {
          url: "/images/art/IMG_5075.JPG",
        },
      },
    },
    {
      id: "IMG_7997",
      name: "IMG_7997",
      address: "",
      description: "",
      category: "ART",
      grouping: "NORTH",
      lat: 44.999225,
      lon: -93.28678888888889,
      placeImage: {
        create: {
          url: "/images/art/IMG_7997 Medium.jpeg",
        },
      },
    },
    {
      id: "IMG_7998",
      name: "Royal Priesthood",
      address: "",
      description: "",
      category: "ART",
      grouping: "NORTH",
      lat: 44.999608333333335,
      lon: -93.28843611111111,
      placeImage: {
        create: {
          url: "/images/art/IMG_7998 Medium.jpeg",
        },
      },
    },
    {
      id: "IMG_7999",
      name: "IMG_7999",
      address: "",
      description: "",
      category: "ART",
      grouping: "NORTH",
      lat: 44.99914444444445,
      lon: -93.29210555555555,
      placeImage: {
        create: {
          url: "/images/art/IMG_7999 Medium.jpeg",
        },
      },
    },
    {
      id: "IMG_8001",
      name: "IMG_8001",
      address: "",
      description: "",
      category: "ART",
      grouping: "NORTH",
      lat: 44.9994,
      lon: -93.2944111111111,
      placeImage: {
        create: {
          url: "/images/art/IMG_8001 Medium.jpeg",
        },
      },
    },
    {
      id: "IMG_8007",
      name: "Art House",
      address: "",
      description: "",
      category: "ART",
      grouping: "SOUTH",
      lat: 44.93172777777777,
      lon: -93.2856361111111,
      placeImage: {
        create: {
          url: "/images/art/IMG_8007 Medium.jpeg",
        },
      },
    },
    {
      id: "IMG_8008",
      name: "Crossroads",
      address: "",
      description: "",
      category: "ART",
      grouping: "SOUTH",
      lat: 44.93430833333333,
      lon: -93.27884722222223,
      placeImage: {
        create: {
          url: "/images/art/IMG_8008 Medium.jpeg",
        },
      },
    },
    {
      id: "IMG_8010",
      name: "IMG_8010",
      address: "",
      description: "",
      category: "ART",
      grouping: "SOUTH",
      lat: 44.950383333333335,
      lon: -93.28337222222223,
      placeImage: {
        create: {
          url: "/images/art/IMG_8010 Medium.jpeg",
        },
      },
    },
    {
      id: "IMG_8012",
      name: "IMG_8012",
      address: "",
      description: "",
      category: "ART",
      grouping: "EXTRA",
      lat: 44.950050000000005,
      lon: -93.2863611111111,
      placeImage: {
        create: {
          url: "/images/art/IMG_8012 Medium.jpeg",
        },
      },
    },
    {
      id: "IMG_8014",
      name: "IMG_8014",
      address: "",
      description: "",
      category: "ART",
      grouping: "EXTRA",
      lat: 44.94990277777777,
      lon: -93.28610277777777,
      placeImage: {
        create: {
          url: "/images/art/IMG_8014 Medium.jpeg",
        },
      },
    },
    {
      id: "IMG_8017",
      name: "Space Dreams",
      address: "",
      description: "",
      category: "ART",
      grouping: "SOUTH",
      lat: 44.948588888888885,
      lon: -93.2861638888889,
      placeImage: {
        create: {
          url: "/images/art/IMG_8017 Medium.jpeg",
        },
      },
    },
    {
      id: "sunrise-cyclery",
      name: "Sunrise Cyclery",
      address: "",
      description:
        "Old site of Sunrise Cyclery, where Jamie McDonald had the best place for used bikes and parts.",
      category: "ART",
      grouping: "SOUTH",
      lat: 44.95092777777778,
      lon: -93.27931111111111,
      placeImage: {
        create: {
          url: "/images/art/sunrise-cyclery.JPG",
        },
      },
    },
  ];
  await Promise.all(
    places.map(async (data) => {
      // @ts-ignore
      return await prisma.place.create({ data: data });
    })
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
