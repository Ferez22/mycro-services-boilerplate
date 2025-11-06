import Image from "next/image";
import Link from "next/link";

const SignInSignUp = () => {
  return (
    <div className="flex h-dvh items-start justify-center bg-background pt-12 md:items-center md:pt-0">
      <Link href="/">
        <Image src="/ze-logo.png" alt="Logo" width={100} height={100} />
      </Link>
      <div className="flex w-full max-w-md flex-col gap-12 overflow-hidden rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="font-semibold text-xl dark:text-zinc-50">Sign In</h3>
          <p className="text-gray-500 text-sm dark:text-zinc-400">
            Use your email and password to sign in
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;
