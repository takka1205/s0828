import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GETメソッドのハンドラー
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ users });
  } catch (err) {
    return NextResponse.json(
      { message: "Error fetching users", err },
      { status: 500 }
    );
  }
}

// POSTメソッドのハンドラー
export async function POST(request: Request) {
  const { name, email } = await request.json();
  try {
    const user = await prisma.user.create({ data: { name, email } });
    return NextResponse.json({ message: "User created successfully", user });
  } catch (err) {
    return NextResponse.json(
      { message: "Error creating user", err },
      { status: 500 }
    );
  }
}
