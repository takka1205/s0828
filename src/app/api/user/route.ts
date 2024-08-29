import { NextRequest, NextResponse } from "next/server";
import Cors from "cors";
import { PrismaClient } from "@prisma/client";
// Initialize CORS
const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  origin: "https://s0828.vercel.app", // ここで許可するオリジンを指定
});

// Helper function to run middleware
function runMiddleware(req: NextRequest, res: NextResponse, fn: Function) {
  return new Promise<void>((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  // Run CORS middleware
  await runMiddleware(req, NextResponse.next(), cors);

  const { name, email } = await req.json();
  try {
    const users = await prisma.user.create({ data: { name, email } });
    return NextResponse.json({ message: "成功", users }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "失敗", err }, { status: 500 });
  }
};
