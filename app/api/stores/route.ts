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

    if (!description) {
      return NextResponse.json({
        message: "Description is required to create stores",
      });
    }

    const existingStore = await prismadb.store.findFirst({
      where: {
        name: name,
        userId: user.id,
      },
    });

    if (existingStore) {
      return NextResponse.json(
        {
          message: `There is already a store with that Name (${name})`,
        },
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

export async function DELETE(req: Request) {
  try {
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();

    if (!isUserAuthenticated) {
      return NextResponse.json({ message: "UnAuthorized" }, { status: 403 });
    }

    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    const store = await prismadb.store.findFirst({
      where: {
        name,
      },
    });

    if (!store) {
      return NextResponse.json(
        { message: "This Store Does not Exist" },
        { status: 404 }
      );
    }

    await prismadb.store.deleteMany({
      where: {
        name,
      },
    });

    return NextResponse.json({ message: "Deleted" }, { status: 201 });
  } catch (error) {
    console.log("[DELETE_STORE]", error);
    return NextResponse.json(
      { message: "Internal Error Occured." },
      { status: 500 }
    );
  }
}
