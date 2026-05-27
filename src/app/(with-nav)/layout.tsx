import MainLayout from "@/layout/main";
import { PropsWithChildren } from "react";

export default function WithNavLayout({ children }: PropsWithChildren) {
  return <MainLayout>{children}</MainLayout>;
}
