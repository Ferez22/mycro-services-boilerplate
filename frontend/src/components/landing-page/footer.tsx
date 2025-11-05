import { CONFIG } from "@/config-global";

const Footer = () => {
  return (
    <footer className="pt-8 mt-12 bg-background border-t border-border">
      <p className="text-sm text-gray-500 text-center">
        &copy; {new Date().getFullYear()} {CONFIG.appName}. All rights reserved.
        <br />
        <a
          className="text-sm text-gray-500 text-center hover:underline hover:underline-offset-4"
          href="https://www.ferez.cloud"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to ferez.cloud →
        </a>
      </p>
      <p className="text-sm text-gray-500 text-center hover:underline hover:underline-offset-4">
        <a
          className="text-sm text-gray-500 text-center hover:underline hover:underline-offset-4"
          href="https://www.ferez.cloud"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to ferez.cloud →
        </a>
      </p>
    </footer>
  );
};

export default Footer;
