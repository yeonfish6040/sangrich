import Header from "@/components/Header";
import Advertise from "@/components/Advertise";
import Wrapper from "@/components/Wrapper";
import KakaoScript from "@/components/KakaoScript";

export default function MainLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <KakaoScript />
      <Header />
      <Advertise />
      <Wrapper>
        {children}
      </Wrapper>
    </>
  );
}