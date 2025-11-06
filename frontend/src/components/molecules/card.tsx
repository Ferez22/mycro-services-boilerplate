"use client";

import { useTheme } from "@/components/context/theme-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MagicCard } from "../ui/magic-card";
import { Button } from "../ui/button";
import { ShinyButton } from "../ui/shiny-button";

interface ZeCardProps {
  title: string;
  description: string;
  content: React.ReactNode;
  buttonText: string;
}

export function ZeCard({
  title,
  description,
  content,
  buttonText,
}: ZeCardProps) {
  const { theme } = useTheme();
  return (
    <Card className="w-full max-w-sm border-none p-0 shadow-none">
      <MagicCard
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        className="p-0"
      >
        <CardHeader className="border-border border-b p-4 [.border-b]:pb-4">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="p-4">{content}</CardContent>
        <CardFooter className="border-border border-t p-4 [.border-t]:pt-4">
          <ShinyButton
            className="w-full hover:cursor-pointer"
            onClick={() => {
              alert("Submit");
            }}
          >
            {buttonText || "Submit"}
          </ShinyButton>
        </CardFooter>
      </MagicCard>
    </Card>
  );
}
