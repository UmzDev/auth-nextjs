"use client";
import {SessionProvider} from "next-auth/react"
import UserButtonClientSide from "@/components/UserButtonClientSide";
// import UserButtonServerSide from "@/components/UserButtonServerSide";

const Home = () => {
  return (
    <div>
      <SessionProvider>
        <UserButtonClientSide />
        {/* <UserButtonServerSide /> */}
      </SessionProvider>
    </div>
  );
};

export default Home;
