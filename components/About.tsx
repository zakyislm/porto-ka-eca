import React from "react";

interface AboutProps {
  title?: string;
  text: string;
}

export default function About({ title, text }: AboutProps) {
  return (
    <section 
      className="py-[120px] bg-white border-y border-[#1A2A4F]/10 w-full" 
      id="about"
      style={{
        backgroundImage: 'radial-gradient(rgba(26, 42, 79, 0.2) 1.5px, transparent 1.5px)',
        backgroundSize: '20px 20px'
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-start px-8 md:px-[64px] w-full">
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="border-l-4 border-[#F7A5A5] pl-6">
            <h2 className="font-display text-[48px] font-medium text-[#1A2A4F] uppercase tracking-tight leading-[1.2]">
              {title || "ABOUT ME"}
            </h2>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <div className="font-body-md text-[20px] font-medium text-[#1A2A4F]/80 leading-[1.8] space-y-4 whitespace-pre-wrap">
            {text || "As an aspiring Communication professional, I bridge the gap between creative storytelling and strategic marketing."}
          </div>
        </div>
      </div>
    </section>
  );
}
