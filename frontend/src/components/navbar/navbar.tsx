import { ShinyButton } from "@/components/ui/shiny-button";
import { ThemeSwitcher } from "../theme-switcher";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowDown } from "lucide-react";

const NavBar = () => {
  return (
    <nav className="group relative flex justify-between items-center p-4 shadow-sm rounded-b-4xl">
      <Button
        className="absolute left-[50%] translate-x-[-50%] top-[75%] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto"
        variant="outline"
        size="icon"
      >
        <ArrowDown className="h-4 w-4" />
      </Button>
      <div className="flex items-center gap-2">
        <Link href="/" className="border-3 border-slate-500 rounded-full p-2">
          <Image src="/ze-logo.png" alt="Logo" width={24} height={24} />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <ShinyButton>Sign in</ShinyButton>
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default NavBar;
