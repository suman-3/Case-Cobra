import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ReactNode } from "react";
import Steps from "./_components/Steps";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <MaxWidthWrapper className="flex flex-col flex-1">
      <Steps/>
      {children}
    </MaxWidthWrapper>
  );
};
export default Layout;
