import "./globals.css";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "makers, 메이커스",
  description:
    "우리는 가치있는 생산과 기분좋은 생활의 새로운 연결을 시작하려 합니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={openSans.className}>
      <body>{children}</body>
    </html>
  );
}
