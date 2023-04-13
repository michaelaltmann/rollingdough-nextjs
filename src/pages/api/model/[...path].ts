import { requestHandler } from "@zenstackhq/next";
import { withPresets } from "@zenstackhq/runtime";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/auth";
import { prisma } from "../../../server/db";
async function getPrisma(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  // create a wrapper of Prisma client that enforces access policy,
  // data validation, and @password, @omit behaviors
  return withPresets(prisma, { user: session?.user });
}
export default requestHandler({ getPrisma });
