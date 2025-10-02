"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-md w-full mx-4 text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-slate-300 dark:text-slate-700 mb-4">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It
            might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoBack}
            className="w-full bg-slate-800 hover:bg-slate-700 dark:bg-slate-200 dark:hover:bg-slate-300 text-white dark:text-slate-800 font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
          >
            ← Go Back
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full bg-transparent border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
          >
            Go Home
          </button>
        </div>

        <div className="mt-12 text-sm text-slate-500 dark:text-slate-500">
          <p>Need help? Contact our support team.</p>
        </div>
      </div>
    </div>
  );
}
