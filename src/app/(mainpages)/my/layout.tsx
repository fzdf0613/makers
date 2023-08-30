import MyTab from "@/components/my/MyTab";

export default function MyPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MyTab />
      {children}
    </>
  );
}
