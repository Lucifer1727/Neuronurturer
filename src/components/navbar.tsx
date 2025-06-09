"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

function Navbar() {
  // const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "About Me", href: "https://3-d-portfolio-chi-seven.vercel.app/" },
    { name: "Skills We Develop", href: "/skills" },
    { name: "Who We Help", href: "/helps" },
    { name: "Clinical Advice", href: "/advice" },
    { name: "Login", href: "/login", isButton: true },
  ];

  const handleMouseLeave = () => {
    setCursorPos((prev) => ({ ...prev, opacity: 0 }));
  };

  type NavLink = {
    name: string;
    href: string;
    isButton?: boolean;
  };

  const NavTab: React.FC<{ link: NavLink }> = ({ link }) => {
    const ref = useRef<HTMLLIElement>(null);

    return (
      <li
        ref={ref}
        onMouseEnter={() => {
          // Skip animation for buttons (e.g. Login)
          if (link.isButton) return;
          if (!ref?.current) return;
          const { width } = ref.current.getBoundingClientRect();
          setCursorPos({
            left: ref.current.offsetLeft,
            width,
            opacity: 1,
          });
        }}
        className="relative z-10 cursor-pointer px-3 py-1 text-xl"
      >
        {link.isButton ? (
          <Link
            href={link.href}
            className={buttonVariants({ variant: "outline" })}
          >
            {link.name}
          </Link>
        ) : (
          <a href={link.href} className="hover:text-white">
            {link.name}
          </a>
        )}
      </li>
    );
  };

  const renderDesktopNav = () => (
    <>
      {console.log("Rendering desktop navigation")}
      <div className="hidden lg:block relative">
        <ul
          onMouseLeave={handleMouseLeave}
          className="relative flex space-x-4 items-center"
        >
          {navLinks.map((link, index) => (
            <NavTab key={index} link={link} />
          ))}
          <motion.li
            animate={cursorPos}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute z-0 h-10 bg-black rounded-md top-1/2 -translate-y-1/2"
          />
        </ul>
      </div>
    </>
  );

  const renderMobileNav = () => (
    <>
      {console.log("Rendering mobile navigation")}
      <div className="lg:hidden px-2 pt-2 pb-3 space-y-1">
        {navLinks.map((link, index) =>
          link.isButton ? (
            <Link
              key={index}
              href={link.href}
              className={buttonVariants({ variant: "outline" })}
              // onClick={() => router.push("/login")}
            >
              {link.name}
            </Link>
          ) : (
            <a
              key={index}
              href={link.href}
              className="block text-white hover:text-white hover:bg-gray-200 px-3 py-2 rounded-md"
            >
              {link.name}
            </a>
          )
        )}
      </div>
    </>
  );

  return (
    <>
      <nav className="shadow-md bg-amber-300 mt-2 rounded-lg overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="font-bold text-4xl">Neuronurturer</h1>
            </div>
            {renderDesktopNav()}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="text-white hover:text-white focus:outline-none focus:text-white"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isOpen && renderMobileNav()}
      </nav>
    </>
  );
}

export default Navbar;
