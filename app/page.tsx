import { getAllStores } from "@/actions/get-stores";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";

export default async function HomePage() {
  const stores = await getAllStores();

  return (
    <main className="px-20 mx-auto">
      <h1 className="font-bold text-2xl my-4 mt-8">Stores</h1>
      <div className="grid grid-cols-2 gap-8 col-span-2">
        {stores?.map((store) => (
          <Link key={store.id} href={`/${store?.id}`}>
            <Card className="cursor-pointer hover:bg-slate-100 transition hover:scale-105">
              <CardHeader>
                <CardTitle>{store.name}</CardTitle>
                <CardDescription>{store.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <p>{store.createdAt.toString()}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
