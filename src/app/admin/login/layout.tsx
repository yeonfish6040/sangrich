// 로그인 페이지는 인증 체크를 건너뜁니다
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
