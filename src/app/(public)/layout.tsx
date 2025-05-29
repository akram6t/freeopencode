import React from "react";
import Link from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {/* Glowing background effect */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div
          className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/20 blur-[120px]"
          // style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute top-[40%] -right-[5%] w-[50%] h-[50%] rounded-full bg-primary/30 blur-[100px]"
          // style={{ animationDuration: "10s", animationDelay: "1s" }}
        ></div>
        <div
          className="absolute -bottom-[10%] left-[30%] w-[40%] h-[40%] rounded-full bg-primary/25 blur-[80px]"
          // style={{ animationDuration: "7s", animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Navigation */}
      <header className="w-full backdrop-blur-sm bg-background/70 border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex">
              <Link
                href="/"
                className="flex items-center font-bold text-xl tracking-tight"
              >
                <span className="text-primary mr-1">Free</span>
                <span>OpenCode</span>
              </Link>
            </div>
            <nav className="flex items-center space-x-8">
              <Link
                href="/projects"
                className="font-medium hover:text-primary transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/about"
                className="font-medium hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="font-medium hover:text-primary transition-colors"
              >
                Contact
              </Link>
              <div className="flex items-center pl-2 border-l border-border">
                <ThemeSwitch />
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-border backdrop-blur-sm bg-background/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="text-primary mr-1">Free</span>
                <span>OpenCode</span>
              </h3>
              <p className="text-muted-foreground">
                A collection of open-source projects for developers to learn,
                contribute, and build upon.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/projects"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Browse Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contribute"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    How to Contribute
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/freeopencode"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/freeopencode"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/freeopencode"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} FreeOpenCode. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
