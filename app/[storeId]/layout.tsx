import Navbar from "./_components/Navbar";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
      <div>{children}</div>
    </main>
  );
}
