import { redirect } from "next/navigation";
import { Container } from "@/components/container";
import NavBar from "@/components/navbar/navbar";
import { DotPattern } from "@/components/ui/dot-pattern";
import LandingPage from "./(main)/landing-page/page";

// You'll need to create this function to check auth
async function isAuthenticated() {
  // Check cookies, session, JWT, etc.
  // This depends on your auth solution (NextAuth, custom, etc.)
  // Example: const session = await getSession();
  // return !!session;
  return false; // placeholder
}

export default async function Home() {
  const authenticated = await isAuthenticated();

  if (authenticated) {
    // Redirect to protected dashboard/home
    redirect("/dashboard");
  }

  // Not authenticated - show landing page with layout
  return (
    <>
      <DotPattern />
      <NavBar />
      <Container>
        <LandingPage />
      </Container>
    </>
  );
}
