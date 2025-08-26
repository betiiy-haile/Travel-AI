import React from "react";

const Footer = () => {
  return (
    <footer className="text-white">
      <div className="w-[80%] mx-auto flex flex-col md:flex-row items-center justify-between py-10 border-t border-white/10">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-white/80">
            &copy; {new Date().getFullYear()} Travel AI. All rights reserved.
          </p>
        </div>
        <div className="text-center md:text-right text-white/80">
          <a href="/privacy-policy" className="hover:text-white mx-2">
            Privacy Policy
          </a>
          <span className="mx-1">•</span>
          <a href="/terms-of-service" className="hover:text-white mx-2">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
