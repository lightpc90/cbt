import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/appContext/appState";
import ToasterContext from "@/appContext/toasterContext";
import { MdOutlinePhonelinkErase } from "react-icons/md";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CBT System",
  description: "Computer Based Test Software",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        {/* block access to smaller screen devices */}
        <div className="hidden lg:block">
          <AppProvider>
            <ToasterContext />
            {children}
          </AppProvider>
        </div>
        {/* What to show on smaller screens */}
        <div className="lg:hidden h-screen flex flex-col items-center justify-center p-2">
          <MdOutlinePhonelinkErase size={40} className="text-rose-800"/>
          <p className="text-2xl text-rose-800">No Access!</p>
          <p>
            Please use a device with bigger screen to access the software. For example, a laptop
          </p>
        </div>
      </body>
    </html>
  );
}
