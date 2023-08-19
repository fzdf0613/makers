"use client";
import NavBar from "@/components/NavBar";
import MenuBar from "@/components/MenuBar";
import useScrollYHandler from "@/hooks/scrollYHandler";
import HomeCategoryBar from "@/components/home/HomeCategoryBar";

export default function MainPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isScrolled: isScrollDown } = useScrollYHandler();
  return (
    <>
      <header className="w-full fixed top-0 max-w-[640px] z-50">
        <NavBar />
        <MenuBar />
      </header>
      <main className="w-full max-w-[640px] grow">
        <section className="relative pt-[153px] w-full">
          <div
            className={`fixed z-30 ${
              isScrollDown ? "top-[55px]" : "top-[95px]"
            } w-full max-w-[640px] z-10 bg-white ease-in duration-100`}
          >
            <HomeCategoryBar />
          </div>
        </section>
        {children}
      </main>
    </>
  );
}
