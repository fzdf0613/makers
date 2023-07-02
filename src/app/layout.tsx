// import NavBar from "@/components/NavBar";
// import "./globals.css";
// import { Open_Sans } from "next/font/google";
// import MenuBar from "@/components/MenuBar";
// import ScrollYContextProvider, {
//   useScrollYContext,
// } from "@/context/ScrollYContext";

// const openSans = Open_Sans({ subsets: ["latin"] });

// export const metadata = {
//   title: "makers, 메이커스",
//   description:
//     "우리는 가치있는 생산과 기분좋은 생활의 새로운 연결을 시작하려 합니다.",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="ko" className={openSans.className}>
//       <body className="w-full flex flex-col items-center overflow-auto realtive">
//         <ScrollYContextProvider>
//           <header className="w-full fixed top-0 max-w-[640px] z-50">
//             <NavBar />
//             <MenuBar />
//           </header>
//           <main className="w-full max-w-[640px] grow">{children}</main>
//         </ScrollYContextProvider>
//         <footer className="w-full max-w-[640px] bg-slate-400">footer</footer>
//       </body>
//     </html>
//   );
// }

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
      <body className="w-full flex flex-col items-center overflow-auto realtive">
        {children}
        <footer className="w-full max-w-[640px] bg-slate-400">footer</footer>
      </body>
    </html>
  );
}
