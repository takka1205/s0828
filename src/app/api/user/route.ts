import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Initialize CORS
const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  origin: "https://s0828-h8ncp6313-takka1205s-projects.vercel.app", // 許可するオリジンを指定
  credentials: true,
});

// Helper function to run middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise<void>((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run CORS middleware
  await runMiddleware(req, res, cors);

  if (req.method === "POST") {
    const { name, email } = req.body;
    try {
      const users = await prisma.user.create({ data: { name, email } });
      return res.status(200).json({ message: "成功", users });
    } catch (err) {
      return res.status(500).json({ message: "失敗", err });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
