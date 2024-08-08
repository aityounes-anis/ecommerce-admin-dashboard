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
import { Trash } from "lucide-react";
import { Button } from "./button";
import useDeleteModal from "@/hooks/use-delete-modal";

const StoresList = ({ stores }: { stores: Store[] | undefined }) => {
  const { onOpen } = useDeleteModal();

  return (
    <div className="grid grid-cols-2 gap-8 col-span-2">
      {stores?.map((store) => (
        <Card
          key={store.id}
          className="cursor-pointer hover:bg-slate-100 transition hover:scale-105"
        >
          <Link href={`/${store?.id}`}>
            <div className="flex items-end justify-between">
              <div>
                <CardHeader>
                  <CardTitle>{store.name}</CardTitle>
                  <CardDescription>{store.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <p>{new Date(store.createdAt).toLocaleDateString()}</p>
                </CardFooter>
              </div>
              <div></div>
            </div>
          </Link>
          <Button variant="destructive" onClick={onOpen}>
            <Trash />
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default StoresList;
