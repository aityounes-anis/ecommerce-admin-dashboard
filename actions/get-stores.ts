import prismadb from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getAllStores = async () => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const stores = await prismadb?.store?.findMany({
      where: {
        userId: user?.id,
      },
    });

    return stores;
  } catch (error) {
    console.log("[GET_ALL_STORES]", error);
  }
};
