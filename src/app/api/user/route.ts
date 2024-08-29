import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();
    const user = await prisma.user.create({
      data: { name, email },
    });
    return NextResponse.json({ message: "成功", user }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "失敗", err }, { status: 500 });
  }
}
