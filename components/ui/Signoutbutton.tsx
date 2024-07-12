import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
export default function SignOutButtonRithara() {
  return (
    <div>
      <SignOutButton>
        {/* <button>Sign out</button> */}
        <Image
              src="/icons/logout.png"
              height={30}
              width={30}
              alt="logout icon"
            />
      </SignOutButton>
    </div>
  );
}