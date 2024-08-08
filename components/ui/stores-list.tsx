"use client";

import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Store } from "@prisma/client";
import { Button } from "./button";
import { Trash } from "lucide-react";
import useStoreModal from "@/hooks/use-store-modal";

const StoresList = ({ stores }: { stores: Store[] | undefined }) => {
  const { onOpen } = useStoreModal();

  return (
    <div className="grid grid-cols-2 gap-8 col-span-2">
      {stores?.map((store) => (
        <Card
          key={store.id}
          className="cursor-pointer hover:bg-slate-100 transition hover:scale-105"
        >
          <div className="flex items-end justify-between">
            <Link href={`/${store?.id}`}>
              <div>
                <CardHeader>
                  <CardTitle>{store.name}</CardTitle>
                  <CardDescription>{store.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <p>{new Date(store.createdAt).toLocaleDateString()}</p>
                </CardFooter>
              </div>
            </Link>
            <div>
              <Button
                variant="destructive"
                className="mr-4 mb-2"
                onClick={onOpen}
              >
                <Trash />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StoresList;
