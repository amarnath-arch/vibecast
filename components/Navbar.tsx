"use client";

import { Button } from "@/components/ui/button";
import { Music2, Menu } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();

  const loggedIn = session?.data?.user;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-6xl mx-auto">
        <div className="glass-card rounded-2xl px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Music2 className="w-5 h-5 text-background" />
            </div>
            <span className="font-display font-bold text-xl">VibeCast</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How it Works
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => (loggedIn ? signOut() : signIn())}
              className="cursor-pointer hover:scale-105 transition-all duration-100"
            >
              {loggedIn ? "Log Out" : "Sign In"}
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden glass-card rounded-2xl mt-2 p-4 space-y-4">
            <a
              href="#"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Features
            </a>
            <a
              href="#"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              How it Works
            </a>
            <a
              href="#"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Pricing
            </a>
            <div className="pt-4 border-t border-border space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-center"
              >
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
