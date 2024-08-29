import { SignUp } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

import React from "react";

const SignUpPage = () => {
  return (
    <>
      <Navbar />
      <main
        className="flex h-screen w-full items-center justify-center"
        style={{
          backgroundColor: "#9496D9",
          paddingTop: "10rem",
          paddingBottom: "10rem", // Adjust this value as needed
        }}
      >
        <div className="py-10">
          <SignUp
            appearance={{
              variables: {
                colorBackground: "white",
                colorText: "black",
              },
              elements: {
                card: "bg-white",
                headerTitle: "text-black",
                formFieldInput: "bg-field-1 bg-opacity-30",
                formFieldLabel: "text-black",
                dividerText: "text-black",
                headerSubtitle: "text-black",
                footerAction: "bg-white",
                internal: "bg-white",
                footerActionText: "text-black",
              },
            }}
          />
        </div>
      </main>
    </>
  );
};

export default SignUpPage;
