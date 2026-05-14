import { cn } from "@/lib/utils";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import React from "react";
import logoImage from "@/images/logo/logo.png";

interface Props {
  className?: string;
  logoClassName?: string;
  logoUrl?: string | StaticImageData;
}

const Logo = ({ className, logoClassName, logoUrl }: Props) => {
  return (
    <Link 
      href="/" 
      className={cn("flex items-center hover:opacity-80 transition-opacity", className)}
    >
      <div
        className={cn(
          "relative w-[180px] h-[60px] md:w-[240px] md:h-[80px]",
          logoClassName
        )}
      >
        <Image
          src={logoUrl || logoImage}
          alt="ShopCart Logo"
          fill
          priority
          sizes="(max-width: 768px) 180px, 240px"
          className="object-contain"
        />
      </div>
    </Link>
  );
};

export default Logo;