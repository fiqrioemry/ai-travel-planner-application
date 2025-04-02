import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import React from "react";

interface GoogleLoginProps {
  login: () => Promise<void>;
}

const GoogleLogin: React.FC<GoogleLoginProps> = ({ login }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleLogin = async () => {
    await login();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full text-xs md:text-base px-4 md:px-6">
          Ayo mulai
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px] text-center py-10 px-6">
        <DialogHeader className="space-y-4">
          <div className="text-center">
            <Logo />
          </div>
          <DialogDescription className="text-muted-foreground text-base text-justify">
            Gabung dengan Travelo dan mulai rencanakan perjalanan impianmu
            dengan cerdas, simpel, dan aman.
          </DialogDescription>

          <Button onClick={handleLogin}>
            <FcGoogle className="h-6 w-6" />
            Masuk dengan Google
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GoogleLogin;
