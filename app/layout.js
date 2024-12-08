import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "League of Legends: The Ultimate Guide",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="ml-64 flex-1 p-4 mt-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
