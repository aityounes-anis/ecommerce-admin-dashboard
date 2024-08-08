import { getAllStores } from "@/actions/get-stores";
import OpenStoreModal from "@/components/ui/open-store-modal";
import StoresList from "@/components/ui/stores-list";
import { Plus } from "lucide-react";

export const revalidate = 0;

const HomePage = async () => {
  const stores = await getAllStores();

  return (
    <main className="px-20 mx-auto">
      <h1 className="font-bold text-2xl my-4 mt-8">Stores</h1>
      <StoresList stores={stores} />
      <div>
        <OpenStoreModal
          btnLabel="Create new Store"
          logo={<Plus />}
          btnVariant="default"
        />
      </div>
    </main>
  );
};

export default HomePage;
