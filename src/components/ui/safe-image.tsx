"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { Mic2 } from "lucide-react";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackText?: string;
  fallbackHeight?: string;
}

export function SafeImage({
  src,
  alt,
  fallbackText = "Official Media Loading",
  fallbackHeight = "100%",
  className = "",
  width,
  height,
  fill,
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    return (
      <div
        className={`bg-[#1F1F1F] border border-[#2C2C2C] flex flex-col items-center justify-center text-center p-6 ${className}`}
        style={{
          width: fill ? "100%" : (width ? (typeof width === "number" ? `${width}px` : width) : "100%"),
          height: fill ? "100%" : (height ? (typeof height === "number" ? `${height}px` : height) : fallbackHeight),
          minHeight: fill ? "100%" : "180px",
          position: fill ? "absolute" : undefined,
          inset: fill ? 0 : undefined,
        }}
      >
        <div className="h-12 w-12 rounded-full bg-crimson/10 border border-crimson/20 flex items-center justify-center mb-3">
          <Mic2 className="h-5 w-5 text-gold animate-pulse" />
        </div>
        <p className="text-xs text-white font-heading font-semibold tracking-[0.2em] uppercase px-4">
          {fallbackText}
        </p>
        <p className="text-[9px] text-[#9E9E9E] mt-1 tracking-wider uppercase font-sans">
          India's Got Latent
        </p>
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: fill ? "100%" : (width ? (typeof width === "number" ? `${width}px` : width) : "100%"),
        height: fill ? "100%" : (height ? (typeof height === "number" ? `${height}px` : height) : fallbackHeight),
        position: fill ? "absolute" : "relative",
        inset: fill ? 0 : undefined,
      }}
    >
      {/* Shimmer skeleton screen */}
      {isLoading && (
        <div className="absolute inset-0 bg-[#181818] border border-[#2C2C2C] flex flex-col items-center justify-center z-20 overflow-hidden">
          <div className="shimmer-animation" />
          <Mic2 className="h-6 w-6 text-[#2C2C2C] animate-pulse" />
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
}
