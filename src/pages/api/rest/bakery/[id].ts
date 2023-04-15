import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../server/db";

/* 
GET : get one
DELETE : delete
PUT: update
 */
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const id = query.id as string | undefined;

  switch (method) {
    case "GET":
      const item = await prisma.bakery.findUnique({ where: { id: id } });
      res.status(200).json(item);
      break;
    case "DELETE":
      await prisma.bakery.delete({ where: { id: id } });
      res.status(200).json({});
      break;
    case "PATCH":
      const item2 = await prisma.bakery.update({ where: { id: id }, data: {} });
      res.status(200).json(item2);
      break;
    case "PUT":
      const item3 = await prisma.bakery.update({ where: { id: id }, data: {} });
      res.status(200).json(item3);
      break;
    default:
      res.status(405).json({ message: `HTTP meth ${method} not implemented` });
  }
}
