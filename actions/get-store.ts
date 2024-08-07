import prismadb from "@/lib/prisma";

export const getStore = async (id: string) => {
  const store = await prismadb.store?.findFirst({
    where: {
      id: id,
    },
  });

  return store;
};
