import NavBar2 from "@/components/NavBar2";

export default function OtherPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="w-full fixed top-0 max-w-[640px] z-50">
        <NavBar2 />
      </header>
      <main className="flex flex-col w-full max-w-[640px] grow pt-[55px]">
        {children}
      </main>
    </>
  );
}
