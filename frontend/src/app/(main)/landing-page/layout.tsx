import { Container } from "@/components/container";

export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
}
