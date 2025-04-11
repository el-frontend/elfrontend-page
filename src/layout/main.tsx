import { PropsWithChildren } from "react";
import Navbar from "./navbar";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-svw flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)] bg-background overflow-x-hidden">
      <Navbar />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start container mx-auto px-4 sm:px-0 py-8">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
