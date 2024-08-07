import { getStore } from "@/actions/get-store";

export default async function StorePage({
  params,
}: {
  params: { storeId: string };
}) {
  const store = await getStore(params.storeId);

  return (
    <main>
      <p>ID: {store?.id}</p>
      <p>NAME: {store?.name}</p>
      <p>DESCRIPTION: {store?.description}</p>
      <p>CreatedAt: {store?.createdAt.toString()}</p>
      <p>updatedAt: {store?.updatedAt.toString()}</p>
    </main>
  );
}
