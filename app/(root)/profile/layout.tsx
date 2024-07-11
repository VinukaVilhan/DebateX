import React, { ReactNode } from "react";
import NavbarDashboard from "@/components/NavbarDashboard";

const ProfileLayout = ({children}: {children:ReactNode}) =>  {
  return (
    <>
      
      <main className="">
       <NavbarDashboard />
        <section className="pt-16">
            {children}
        </section>
      </main>
    </>
  );
};

export default ProfileLayout;
