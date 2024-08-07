import prismadb from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id) {
      return NextResponse.json(
        { message: "you are Unauthorized." },
        { status: 403 }
      );
    }

    const { name, description } = await req.json();

    if (!name) {
      return NextResponse.json(
        { message: "Name is required to create stores" },
        { status: 400 }
      );
    }

    const store = await prismadb.store.create({
      data: {
        name,
        description,
        userId: user.id,
      },
    });

    return NextResponse.json(store, { status: 201 });
  } catch (error) {
    console.log("[STORES_POST]", error);
    return NextResponse.json({ message: "Error Occured" }, { status: 500 });
  }
}
