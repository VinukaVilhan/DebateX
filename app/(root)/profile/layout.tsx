import React, { ReactNode } from "react";
import NavbarDashboard from "@/components/NavbarDashboard";

const ProfileLayout = ({children}: {children:ReactNode}) =>  {
  return (
    <>
      
      <main className="m-auto">
      <NavbarDashboard />
        <section className='w-full'>
            {children}
        </section>
      </main>
    </>
  );
};

export default ProfileLayout;
