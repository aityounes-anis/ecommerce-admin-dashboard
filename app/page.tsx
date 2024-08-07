"use client";

import StoreModal from "@/components/modals/store-modal";
import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

export default function Home() {
  return (
    <main>
      <p className="text-3xl p-4 font-bold cursor-pointer text-center my-12">
        DASHBOARD PAGE
      </p>
      <div className="flex items-center justify-around">
        <Button>
          <LogoutLink>Logout</LogoutLink>
        </Button>
      </div>
    </main>
  );
}
