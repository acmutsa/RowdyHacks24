"use client";
import * as React from "react";
import QRCode from "react-qr-code";
import { Button } from "@/components/shadcn/ui/button";
import { X } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/shadcn/ui/drawer";

export default function UserQRCode({QRstring}:{QRstring:string}){
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="h-[50%] w-full bg-transparent hover:bg-transparent">
          <div className="w-full flex items-center justify-center border-dashed border-muted">
            <div className="h-[50%] w-[50%] aspect-square overflow-x-hidden flex items-center justify-center border-dashed border-muted border-2 p-2 rounded-xl">
              <QRCode
                className="h-full w-full"
                bgColor="hsl(var(--background))"
                fgColor="hsl(var(--primary))"
                value={QRstring}
              />
            </div>
          </div>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex items-center justify-center w-full h-[90%] ">
        <QRCode
          className="h-full"
          bgColor="hsl(var(--background))"
          fgColor="hsl(var(--primary))"
          value={QRstring}
        />
        <DrawerFooter>
          <DrawerClose>
            <Button><X className="w-8 h-8 bg-transparent"/></Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
