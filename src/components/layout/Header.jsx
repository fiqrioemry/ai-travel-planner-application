/* eslint-disable react/prop-types */
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Logo from "@/components/Logo";
import { useTheme } from "@/hooks/useTheme";
import DarkModeToggle from "../DarkModeToggle";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import GoogleLogin from "@/components/GoogleLogin";
import { useAuthStore } from "@/store/useAuthStore";
import { LogOut, Moon, PlusCircle, Sun } from "lucide-react";

function Header() {
  const { isDark, toggleDark } = useTheme();
  const { user, login, logout } = useAuthStore();

  return (
    <nav className="border-b py-6 px-6 md:px-0">
      <div className="container mx-auto flex items-center justify-between ">
        <a href="/">
          <Logo />
        </a>
        <div>
          {user ? (
            <UserMenu
              user={user}
              logout={logout}
              isDark={isDark}
              toggleDark={toggleDark}
            />
          ) : (
            <div className="flex gap-2">
              <div className="flex items-center justify-between px-2 gap-2">
                <DarkModeToggle isDark={isDark} toggleDark={toggleDark} />
              </div>
              <GoogleLogin login={login} />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;

const UserMenu = ({ user, logout, isDark, toggleDark }) => {
  return (
    <div className="flex items-center gap-3">
      <a href="/create-trip">
        <Button className="rounded-full px-4">
          <PlusCircle /> <span className="hidden md:block">Trip baru</span>
        </Button>
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
