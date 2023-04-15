import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../server/db";

/* 
GET : List
POST: Create
 */

export default async function (req: NextApiRequest, res: NextApiResponse) {
  /* eslint-disable */
  const { method } = req;
  switch (method) {
    case "GET":
      const range = JSON.parse(req.query.range as string) as number[];
      const skip = range[0] as number;
      const take = (range[1] as number) - skip;
      const items = await prisma.bakery.findMany({ skip, take });
      const count = await prisma.bakery.count({});
      res.status(200).setHeader("Content-Range", count).json(items);
      break;
    case "POST":
      const { name, address, description } = req.body;
      const createdItem = await prisma.bakery.create({
        data: {
          name: name as string,
          address: address as string,
          description: description as string,
        },
      });
      res.status(200).json(createdItem);
      break;
    default:
      res
        .status(405)
        .json({ message: `HTTP meth ${method as string} not implemented` });
  }
}
