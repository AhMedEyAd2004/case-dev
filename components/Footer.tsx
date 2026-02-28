import React from "react";
import MaxContainerWrap from "./max-container";

export default function Footer() {
  return (
    <footer className="h-20">
      <MaxContainerWrap className="flex flex-col items-center justify-between gap-y-2 border-t px-2.5 py-4 text-center text-sm text-gray-500 md:flex-row md:px-20 xl:px-30">
        <p>&copy; 2026 All rights reserved</p>
        <ul className="flex max-w-sm justify-between gap-4 md:gap-8">
          <li className="hover:text-gray-600">Terms</li>
          <li className="hover:text-gray-600">Privacy Policy</li>
          <li className="hover:text-gray-600">Cookie Policy</li>
        </ul>
      </MaxContainerWrap>
    </footer>
  );
}
