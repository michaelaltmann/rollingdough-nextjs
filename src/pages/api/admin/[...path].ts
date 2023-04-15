import { requestHandler } from "@zenstackhq/next";
import { defaultHandler } from "ra-data-simple-prisma";
import { withPresets } from "@zenstackhq/runtime";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/auth";
import { prisma } from "../../../server/db";
async function handleRequest(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  // create a wrapper of Prisma client that enforces access policy,
  // data validation, and @password, @omit behaviors
  const enhancedClient = withPresets(prisma, { user: session?.user });
  return defaultHandler(req, res, enhancedClient);
}
export default handleRequest;
