import TodoList from "@/components/todolist";
import Zero from "@/components/zero";
import { CONFIG } from "@/config-global";
import Image from "next/image";

export default function TodoListPage() {
  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto min-h-[calc(100vh-200px)]">
        {/* Left side - Welcome content */}
        <div className="flex flex-col justify-center items-center lg:items-start">
          <div className="w-full max-w-md">
            <ol className="font-mono list-inside list-decimal text-sm/6 text-center lg:text-left mb-8">
              <li className="mb-2 tracking-[-.01em]">
                Welcome to the{" "}
                <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded text-sm">
                  micro-services
                </code>{" "}
                boilerplate
              </li>
              <li className="tracking-[-.01em] mb-2">
                Built with{" "}
                <code className="bg-blue-100 dark:bg-blue-900/30 font-mono px-1 py-0.5 rounded text-xs">
                  Next.js
                </code>{" "}
                +{" "}
                <code className="bg-green-100 dark:bg-green-900/30 font-mono px-1 py-0.5 rounded text-xs">
                  FastAPI
                </code>
              </li>
              <li className="tracking-[-.01em]">
                Read the docs to get started.
              </li>
            </ol>

            <div className="flex gap-4 items-center flex-col sm:flex-row">
              <Zero />
              <a
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
                href={CONFIG.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Docs
              </a>
            </div>
          </div>
        </div>

        {/* Right side - TodoList */}
        <div className="flex flex-col justify-center items-center lg:items-start">
          <div className="w-full max-w-md">
            <TodoList />
          </div>
        </div>
      </div>

      {/* Footer - centered at bottom */}
      <footer className="flex gap-[24px] flex-wrap items-center justify-center mt-16">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.ferez.cloud"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to ferez.cloud →
        </a>
      </footer>
    </div>
  );
}
