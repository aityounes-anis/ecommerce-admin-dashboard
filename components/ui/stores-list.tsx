import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Store } from "@prisma/client";

const StoresList = ({ stores }: { stores: Store[] | undefined }) => {
  return (
    <div className="grid grid-cols-2 gap-8 col-span-2">
      {stores?.map((store) => (
        <Link key={store.id} href={`/${store?.id}`}>
          <Card className="cursor-pointer hover:bg-slate-100 transition hover:scale-105">
            <CardHeader>
              <CardTitle>{store.name}</CardTitle>
              <CardDescription>{store.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <p>{new Date(store.createdAt).toLocaleDateString()}</p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default StoresList;
