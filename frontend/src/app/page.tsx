import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Home() {
  return (
    <div className="min-h-screen gap-16 sm:p-2">
      <div className="flex items-center justify-end p-4">
        <ThemeSwitcher />
      </div>
      <div className="p-4">hey</div>
    </div>
  );
}
