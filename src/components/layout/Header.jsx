/* eslint-disable react/prop-types */
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import Logo from "../Logo";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import GoogleLogin from "@/components/GoogleLogin";
import { useAuthStore } from "@/store/useAuthStore";
import { LogOut, Moon, Sun } from "lucide-react";

function Header() {
  const { user, login, logout } = useAuthStore();

  return (
    <nav className="container mx-auto p-3 shadow-sm flex justify-between items-center">
      <a href="/">
        <Logo />
      </a>
      <div>
        {user ? (
          <UserMenu user={user} logout={logout} />
        ) : (
          <GoogleLogin login={login} />
        )}
      </div>
    </nav>
  );
}

export default Header;

const UserMenu = ({ user, logout }) => {
  const { isDark, toggleDark } = useTheme();
  return (
    <div className="flex items-center gap-3">
      <a href="/create-trip">
        <Button className="rounded-full px-4">+ Atur liburan</Button>
      </a>
      <a href="/my-trips">
        <Button variant="outline" className="rounded-full px-4">
          Perjalanku
        </Button>
      </a>
      <Popover>
        <PopoverTrigger>
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            className="h-9 w-9 rounded-full"
          />
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2 space-y-4">
          <div className="font-semibold text-sm px-2">
            Halo, {user.displayName}
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              {isDark ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
              <span className="text-sm">
                {isDark ? "Dark Mode" : "Light Mode"}
              </span>
            </div>
            <Switch checked={isDark} onCheckedChange={toggleDark} />
          </div>

          <Button onClick={logout} className="w-full flex justify-start gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};
