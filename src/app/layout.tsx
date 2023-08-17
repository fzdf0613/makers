import AuthWrapper from "@/components/AuthWrapper";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import SWRContext from "@/context/SWRContext";
import Footer from "@/components/Footer";

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
      <body className="w-full flex flex-col items-center overflow-auto realtive">
        <AuthWrapper>
          <SWRContext>
            {children}
            <footer className="w-full max-w-[640px] bg-slate-400">
              <Footer />
            </footer>
            <div id="portal" />
          </SWRContext>
        </AuthWrapper>
      </body>
    </html>
  );
}
