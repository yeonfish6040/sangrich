"use client"

import Header from "@/components/Header";
// import Menu from "@/components/SideMenu";
import Advertise from "@/components/Advertise";
import Wrapper from "@/components/Wrapper";

export default function MainLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Advertise />
      <Wrapper>
        {children}
      </Wrapper>
    </>
  );
}