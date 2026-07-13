import React from "react";
import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  cvFileUrl?: string;
  floatingTags?: string[];
}

export default function Hero({ title, subtitle, imageUrl, cvFileUrl, floatingTags }: HeroProps) {
  return (
    <section className="pt-[120px] pb-[120px] px-8 md:px-[64px] max-w-7xl mx-auto" id="home">
      <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
        {/* Left Content */}
        <div className="w-full md:w-5/12 flex flex-col items-start gap-8 z-10">
          <div className="inline-flex items-center gap-2 border border-[#1A2A4F] px-4 py-2 rounded-full bg-white">
            <span className="text-[10px]">🟢</span>
            <span className="font-label-caps text-[12px] font-semibold text-[#1A2A4F]">Available for Work</span>
          </div>
          <h1 className="font-display text-[48px] md:text-[64px] font-semibold leading-[1.1] text-[#1A2A4F] max-w-xl tracking-tight">
            {title || "Hi, I'm Resha Eka Aulia."}
          </h1>
          <p className="font-body-md text-[16px] md:text-[20px] leading-[1.6] text-[#1A2A4F]/80 max-w-md">
            {subtitle || "Aspiring Communication professional bridging the gap between creative storytelling and strategic marketing."}
          </p>
          <div className="flex flex-wrap items-center gap-6 mt-4">
            {cvFileUrl ? (
              <a
                href={cvFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#F7A5A5] text-[#1A2A4F] font-body-md font-semibold rounded-sm border border-[#1A2A4F] hover:-translate-y-1 transition-transform duration-300 ease-out shadow-[4px_4px_0px_0px_rgba(26,42,79,1)] hover:shadow-[6px_6px_0px_0px_rgba(26,42,79,1)]"
              >
                Download CV
              </a>
            ) : (
              <button
                disabled
                className="px-8 py-4 bg-[#F7A5A5] text-[#1A2A4F] font-body-md font-semibold rounded-sm border border-[#1A2A4F] opacity-50 cursor-not-allowed shadow-[4px_4px_0px_0px_rgba(26,42,79,1)]"
              >
                Download CV
              </button>
            )}
            <Link
              href="#contact"
              className="font-label-caps text-[12px] font-semibold uppercase text-[#1A2A4F] border-b border-[#1A2A4F] pb-1 hover:opacity-70 transition-all duration-300"
            >
              Let's Connect
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-7/12 flex justify-center items-center relative">
          <div className="relative w-full max-w-[480px]">
            {/* Background shape */}
            <div className="absolute inset-0 rounded-t-full rounded-b-sm border border-[#1A2A4F] bg-[#FFDBB6] translate-x-4 translate-y-4"></div>
            
            {/* Image container */}
            <div className="relative rounded-t-full rounded-b-sm border border-[#1A2A4F] overflow-hidden bg-white z-10 aspect-[3/4]">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt="Portrait"
                  src={imageUrl}
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>

            {/* Floating Tags */}
            {floatingTags && floatingTags.length > 0 && (
              <div className="absolute top-12 -left-8 md:-left-16 z-20 bg-[#FFDBB6] border border-[#1A2A4F] px-4 py-2 rounded-sm shadow-[2px_2px_0px_0px_rgba(26,42,79,1)] transform -rotate-3">
                <span className="font-label-caps text-[12px] font-semibold text-[#1A2A4F]">{floatingTags[0]}</span>
              </div>
            )}
            {floatingTags && floatingTags.length > 1 && (
              <div className="absolute bottom-32 -right-6 md:-right-12 z-20 bg-[#FFDBB6] border border-[#1A2A4F] px-4 py-2 rounded-sm shadow-[2px_2px_0px_0px_rgba(26,42,79,1)] transform rotate-2">
                <span className="font-label-caps text-[12px] font-semibold text-[#1A2A4F]">{floatingTags[1]}</span>
              </div>
            )}
            {floatingTags && floatingTags.length > 2 && (
              <div className="absolute -bottom-4 left-1/4 z-20 bg-[#FFDBB6] border border-[#1A2A4F] px-4 py-2 rounded-sm shadow-[2px_2px_0px_0px_rgba(26,42,79,1)] transform -rotate-1">
                <span className="font-label-caps text-[12px] font-semibold text-[#1A2A4F]">{floatingTags[2]}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
