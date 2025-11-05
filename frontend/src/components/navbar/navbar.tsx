"use client";

import { useState } from "react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { ThemeSwitcher } from "../theme-switcher";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowDown } from "lucide-react";

const NavBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  return (
    <nav
      className={`group relative flex flex-col shadow-sm ${
        isExpanded ? "" : "rounded-b-4xl"
      }`}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`flex justify-between items-center p-4 relative z-10 bg-background ${
          isExpanded ? "" : "rounded-b-4xl"
        }`}
      >
        <div className="flex items-center gap-2">
          <Link href="/" className="border-3 border-slate-500 rounded-full p-2">
            <Image src="/ze-logo.png" alt="Logo" width={24} height={24} />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ShinyButton>Sign in</ShinyButton>
          <ThemeSwitcher />
        </div>
      </div>

      <Button
        onClick={toggleExpanded}
        className="absolute left-[50%] translate-x-[-50%] top-[75%] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-50"
        variant="outline"
        size="icon"
      >
        <ArrowDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </Button>

      {/* Expandable content - absolutely positioned to overlay */}
      <div
        className={`absolute top-full left-0 right-0 transition-all duration-300 ease-in-out z-40 ${
          isExpanded
            ? "max-h-96 opacity-100 pb-2"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
        style={{ pointerEvents: isExpanded ? "auto" : "none" }}
      >
        <div className="p-4 border-t border-border bg-background shadow-lg rounded-b-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Add your expandable content here */}
            <div className="p-4 rounded-lg bg-muted/50">
              <h3 className="font-semibold mb-2">Item 1</h3>
              <p className="text-sm text-muted-foreground">
                Description or content
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <h3 className="font-semibold mb-2">Item 2</h3>
              <p className="text-sm text-muted-foreground">
                Description or content
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <h3 className="font-semibold mb-2">Item 3</h3>
              <p className="text-sm text-muted-foreground">
                Description or content
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <h3 className="font-semibold mb-2">Item 4</h3>
              <p className="text-sm text-muted-foreground">
                Description or content
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
