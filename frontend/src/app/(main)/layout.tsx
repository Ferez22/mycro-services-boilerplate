import { Container } from "@/components/container";
import NavBar from "@/components/navbar/navbar";
import { DotPattern } from "@/components/ui/dot-pattern";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DotPattern />
      <NavBar />
      <Container>{children}</Container>
    </>
  );
}

