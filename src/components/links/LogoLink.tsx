import Link from "next/link";
import React from "react";

const LogoLink = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">DS</span>
      </div>
      <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        DevShowcase
      </span>
    </Link>
  );
};

export default LogoLink;
