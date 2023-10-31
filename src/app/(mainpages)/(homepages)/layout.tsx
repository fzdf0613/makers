import HomeCategoryHeader from "@/components/home/HomeCategoryHeader";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HomeCategoryHeader />
      {children}
    </>
  );
}
