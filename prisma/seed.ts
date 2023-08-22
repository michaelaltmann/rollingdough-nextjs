import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.place.deleteMany();

  await prisma.place.createMany({
    data: [
      {
        id: "rustica",
        name: "Rustica",
        address: "3220 W Lake St",
        lat: 44.949411,
        lon: -93.3203,
        category: "BAKERY",
        description: "Love the ginger scones",
      },
      {
        id: "black_walnut",
        name: "Black Walnut",
        address: "3245 Hennepin Ave S",
        lat: 44.94497704738643,
        lon: -93.29794673789111,
        category: "BAKERY",
        description: "Wide range of baked goods",
      },
      {
        id: "patisserie46",
        name: "Patisserie 46",
        address: "4552 Grand Ave S, Minneapolis, MN 55419",
        lat: 44.91976,
        lon: -93.284438,
        category: "BAKERY",
        description: "Wide range of baked goods",
      },
      {
        id: "turtle_bread_lh",
        name: "Turtle Bead - Linden Hills",
        address: "3421 W 44th St, Minneapolis, MN 55410",
        lat: 44.923264,
        lon: -93.323866,
        category: "BAKERY",
        description: "Wide range of baked goods",
      },
      {
        id: "great_harvest_lh",
        name: "Great Harvest - Linden Hills",
        address: "3421 W 44th St, Minneapolis, MN 55410",
        lat: 44.924024,
        lon: -93.315201,
        category: "BAKERY",
        description: "Franchise, but good",
      },
      {
        id: "bakers_wife",
        name: "Baker's Wife",
        address: "4200 28th Ave S, Minneapolis, MN 55406",
        lat: 44.926748,
        lon: -93.232134,
        category: "BAKERY",
        description: "Traditional",
      },
      {
        id: "savory_bake_house",
        name: "Savory Bake House",
        address: "3008 36th Ave S, Minneapolis, MN 55406",
        lat: 44.948108,
        lon: -93.220398,
        category: "BAKERY",
        description: "Savory pies and turnovers",
      },
      {
        id: "laune_bread",
        name: "Laune Bread",
        address: "3605 E Lake St, Minneapolis, MN 55406",
        lat: 44.94837,
        lon: -93.220058,
        category: "BAKERY",
        description: "European, with an emphasis on whole grains",
      },

      {
        id: "bryant_square_park",
        name: "Bryant Square Park",
        address: "3101 Bryant Ave S, Minneapolis, MN 55408",
        lat: 44.946161988128104,
        lon: -93.29042751845597,
        category: "MURAL",
        description: "Mirrored mosaic",
      },

      {
        id: "john_lewis",
        name: "VOTE - John Lewis",
        address: "3101 Bryant Ave S, Minneapolis, MN 55408",
        lat: 44.939408,
        lon: -93.252603,
        category: "MURAL",
        description: "VOTE",
      },
      {
        id: "what_will_you_do",
        name: "What Will You Do",
        address: "3101 Bryant Ave S, Minneapolis, MN 55408",
        lat: 44.9556167,
        lon: -93.2772139,
        category: "MURAL",
        description: "What will you do with your one wild and precious life?",
      },
      {
        id: "lyndale_park_rose_garden",
        name: "Lyndale Park Rose Garden",
        address: "4124 Roseway Rd, Minneapolis, MN 55409",
        lat: 44.927341526203236,
        lon: -93.29591834402862,
        category: "ART",
        description: "Rose garden, Cherry blossoms, and Japanese Rock Garden",
      },
      {
        id: "turtle_bread_chicago",
        name: "Turtle Bread - Chicago Ave",
        address: "4762 Chicago Ave, Minneapolis, Minnesota 55407",
        lat: 44.91626633997229,
        lon: -93.26264025220873,
        category: "BAKERY",
        description:
          "Large space to sit and enjoy baked goods, sandwiches and soups.",
      },

      {
        id: "turtle_bread_44",
        name: "Turtle Bread - 44th St",
        address: "3421 W 44th St, Minneapolis, Minnesota 55410",
        lat: 44.923125,
        lon: -93.323821,
        category: "BAKERY",
        description:
          "Large space to sit and enjoy baked goods, sandwiches and soups.",
      },

      {
        id: "cafe_ceres",
        name: "Cafe Ceres",
        address: "3509 W 44th St, Minneapolis, Minnesota 55406",
        lat: 44.922892,
        lon: -93.324326,
        category: "BAKERY",
        description: "",
      },
      {
        id: "IMG_2465",
        name: "IMG_2465",
        address: "",
        description: "",
        category: "ART",
        lat: 44.946124999999995,
        lon: -93.29050555555555,
      },
      {
        id: "IMG_4942",
        name: "IMG_4942",
        address: "",
        description: "",
        category: "ART",
        lat: 44.93940833333333,
        lon: -93.25260277777778,
      },
      {
        id: "IMG_5068",
        name: "IMG_5068",
        address: "",
        description: "",
        category: "ART",
        lat: 44.99939722222222,
        lon: -93.29164166666666,
      },
      {
        id: "IMG_5073",
        name: "IMG_5073",
        address: "",
        description: "",
        category: "ART",
        lat: 44.958152777777784,
        lon: -93.27788611111112,
      },
      {
        id: "IMG_5074",
        name: "IMG_5074",
        address: "",
        description: "",
        category: "ART",
        lat: 44.95928611111111,
        lon: -93.27812222222222,
      },
      {
        id: "IMG_5075",
        name: "IMG_5075",
        address: "",
        description: "",
        category: "ART",
        lat: 44.948477777777775,
        lon: -93.26288611111111,
      },
      {
        id: "IMG_5339",
        name: "IMG_5339",
        address: "",
        description: "",
        category: "ART",
        lat: 44.95561666666667,
        lon: -93.2772138888889,
      },
      {
        id: "IMG_7997",
        name: "IMG_7997",
        address: "",
        description: "",
        category: "ART",
        lat: 44.999225,
        lon: -93.28678888888889,
      },
      {
        id: "IMG_7998",
        name: "IMG_7998",
        address: "",
        description: "",
        category: "ART",
        lat: 44.999608333333335,
        lon: -93.28843611111111,
      },
      {
        id: "IMG_7999",
        name: "IMG_7999",
        address: "",
        description: "",
        category: "ART",
        lat: 44.99914444444445,
        lon: -93.29210555555555,
      },
      {
        id: "IMG_8001",
        name: "IMG_8001",
        address: "",
        description: "",
        category: "ART",
        lat: 44.9994,
        lon: -93.2944111111111,
      },
      {
        id: "IMG_8007",
        name: "IMG_8007",
        address: "",
        description: "",
        category: "ART",
        lat: 44.93172777777777,
        lon: -93.2856361111111,
      },
      {
        id: "IMG_8008",
        name: "IMG_8008",
        address: "",
        description: "",
        category: "ART",
        lat: 44.93430833333333,
        lon: -93.27884722222223,
      },
      {
        id: "IMG_8010",
        name: "IMG_8010",
        address: "",
        description: "",
        category: "ART",
        lat: 44.950383333333335,
        lon: -93.28337222222223,
      },
      {
        id: "IMG_8012",
        name: "IMG_8012",
        address: "",
        description: "",
        category: "ART",
        lat: 44.950050000000005,
        lon: -93.2863611111111,
      },
      {
        id: "IMG_8014",
        name: "IMG_8014",
        address: "",
        description: "",
        category: "ART",
        lat: 44.94990277777777,
        lon: -93.28610277777777,
      },
      {
        id: "IMG_8017",
        name: "IMG_8017",
        address: "",
        description: "",
        category: "ART",
        lat: 44.948588888888885,
        lon: -93.2861638888889,
      },
      {
        id: "sunrise-cyclery",
        name: "Sunrise Cyclery",
        address: "",
        description:
          "Old site of Sunrise Cyclery, where Jamie McDonald had the best place for used bikes and parts.",
        category: "ART",
        lat: 44.95092777777778,
        lon: -93.27931111111111,
      },
    ],
  });
  await prisma.placeImage.createMany({
    data: [
      {
        placeId: "rustica",
        url: "https://s3-media0.fl.yelpcdn.com/bphoto/FNqhZsLFJ83jWCUR5a0MGg/o.jpg",
      },
      {
        placeId: "black_walnut",
        url: "https://i0.wp.com/www.twincities.com/wp-content/uploads/2020/01/BlackWalnutBakery11072019Ngolemontart.jpg?fit=780%2C9999px&ssl=1",
      },
      {
        placeId: "bryant_square_park",
        url: "https://www.minneapolisparks.org/wp-content/uploads/2018/11/Bryant-Square-Mosaic-Unveiling_2.jpg",
      },
      {
        placeId: "john_lewis",
        url: "https://flic.kr/p/2oSGiQR",
      },
      {
        placeId: "what_will_you_do",
        url: "https://flic.kr/p/2oSJRbV",
      },
      {
        placeId: "IMG_2465",
        url: "/images/art/IMG_2465.JPG",
      },
      {
        placeId: "IMG_4942",
        url: "/images/art/IMG_4942.JPG",
      },
      {
        placeId: "IMG_5068",
        url: "/images/art/IMG_5068.JPG",
      },
      {
        placeId: "IMG_5073",
        url: "/images/art/IMG_5073.JPG",
      },
      {
        placeId: "IMG_5074",
        url: "/images/art/IMG_5074.JPG",
      },
      {
        placeId: "IMG_5075",
        url: "/images/art/IMG_5075.JPG",
      },
      {
        placeId: "IMG_5339",
        url: "/images/art/IMG_5339.HEIC",
      },
      {
        placeId: "IMG_7997",
        url: "/images/art/IMG_7997.HEIC",
      },
      {
        placeId: "IMG_7998",
        url: "/images/art/IMG_7998.HEIC",
      },
      {
        placeId: "IMG_7999",
        url: "/images/art/IMG_7999.HEIC",
      },
      {
        placeId: "IMG_8001",
        url: "/images/art/IMG_8001.HEIC",
      },
      {
        placeId: "IMG_8007",
        url: "/images/art/IMG_8007.HEIC",
      },
      {
        placeId: "IMG_8008",
        url: "/images/art/IMG_8008.HEIC",
      },
      {
        placeId: "IMG_8010",
        url: "/images/art/IMG_8010.HEIC",
      },
      {
        placeId: "IMG_8012",
        url: "/images/art/IMG_8012.HEIC",
      },
      {
        placeId: "IMG_8014",
        url: "/images/art/IMG_8014.HEIC",
      },
      {
        placeId: "IMG_8017",
        url: "/images/art/IMG_8017.HEIC",
      },
      {
        placeId: "sunrise-cyclery",
        url: "/images/art/sunrise-cyclery.JPG",
      },
    ],
  });
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
