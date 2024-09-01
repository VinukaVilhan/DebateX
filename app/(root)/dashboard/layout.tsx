import NavbarDashboard from "@/components/NavbarDashboard";
import React, { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <NavbarDashboard />

      <div className="flex bg-black width">
        <section className="flex min-h-screen flex-1 flex-col px-9 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="w-full ">{children}</div>
        </section>
      </div>
    </main>
    // removed bg values of 9,11
  );
};

export default HomeLayout;
