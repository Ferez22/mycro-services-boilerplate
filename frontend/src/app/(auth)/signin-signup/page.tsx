import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { ZeCard } from "@/components/molecules/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignInSignUp = () => {
  return (
    <div className="flex flex-col gap-24 h-dvh items-start justify-center bg-background pt-12 md:items-center md:pt-0">
      <Link href="/" className="absolute top-4 left-4">
        <ArrowLeftCircle className="h-16 w-16" />
      </Link>
      <div className="flex w-full max-w-md flex-col items-center justify-center gap-12 overflow-hidden rounded-2xl">
        <ZeCard
          title="Login"
          description="Use your email and password to sign in"
          content={
            <form>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
              </div>
            </form>
          }
        />
      </div>
    </div>
  );
};

export default SignInSignUp;
