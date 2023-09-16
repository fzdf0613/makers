import NavBar from "@/components/NavBar";
import MenuBar from "@/components/MenuBar";

export default function MainPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="w-full fixed top-0 max-w-[640px] z-50">
        <NavBar />
        <MenuBar />
      </header>
      <main className="w-full max-w-[640px] grow">{children}</main>
    </>
  );
}
