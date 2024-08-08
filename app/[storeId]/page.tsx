import { getStore } from "@/actions/get-store";

export default async function StorePage({
  params,
}: {
  params: { storeId: string };
}) {
  const store = await getStore(params.storeId);

  return <main>Dashboard</main>;
}
