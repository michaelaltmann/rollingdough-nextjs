import { PlaceCategory, PrismaClient } from "@prisma/client";
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
        id: "laude_bread",
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
        id: "lyndale_park_rose_garden",
        name: "Lyndale Park Rose Garden",
        address: "4124 Roseway Rd, Minneapolis, MN 55409",
        lat: 44.927341526203236,
        lon: -93.29591834402862,
        category: "ART",
        description: "Rose garden, CHerry Blossoms, and Japanese Rock Garden",
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
