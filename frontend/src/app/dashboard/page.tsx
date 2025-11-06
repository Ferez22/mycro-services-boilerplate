import { redirect } from "next/navigation";

async function isAuthenticated() {
  // Check auth
  return false;
}

export default async function Dashboard() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/signin-signup");
  }

  return <div>Protected Dashboard Content</div>;
}
