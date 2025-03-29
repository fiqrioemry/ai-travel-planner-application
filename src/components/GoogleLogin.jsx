import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const GoogleLogin = ({ login }) => {
  const [open, setOpen] = useState(false);

  const handleLogin = async () => {
    await login();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="px-6">Ayo mulai</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px] text-center py-10 px-6">
        <DialogHeader className="space-y-4">
          <div className="text-center">
            <Logo />
          </div>
          <DialogDescription className="text-muted-foreground text-base text-justify">
            Gabung dengan Travelo dan mulai rencanakan perjalanan impianmu dalam
            hitungan detik — cerdas, simpel, dan aman.
          </DialogDescription>

          <Button onClick={handleLogin}>
            <FcGoogle className="h-6 w-6" />
            Sign In With Google
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GoogleLogin;
