import { PropsWithChildren } from "react";
import Navbar from "./navbar";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-screen flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)] bg-background">
      <Navbar />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
