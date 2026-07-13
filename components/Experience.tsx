import React from "react";

interface ExperienceItem {
  id: string;
  title: string;
  company?: string;
  period: string;
  description?: string | null;
}

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  major?: string | null;
  timeStart: number;
  timeEnd?: number | null;
  description?: string | null;
}

interface ExperienceProps {
  educations: EducationItem[];
  experiences: ExperienceItem[];
}

export default function Experience({ educations, experiences }: ExperienceProps) {
  return (
    <section className="py-[120px] px-8 md:px-[64px] max-w-7xl mx-auto" id="services">
      <div className="flex flex-col md:flex-row gap-24">
        {/* Education Section */}
        <div className="w-full md:w-1/2 flex flex-col gap-8">
          <div className="border-b border-[#1A2A4F] pb-4">
            <h3 className="font-label-caps text-[12px] font-semibold uppercase text-[#1A2A4F] tracking-[0.1em]">Education</h3>
          </div>
          
          {educations.map((item) => {
            const currentYear = new Date().getFullYear();
            const isFutureOrCurrent = !item.timeEnd || item.timeEnd >= currentYear;
            const periodStr = `${item.timeStart} - ${isFutureOrCurrent ? 'NOW' : item.timeEnd}`;

            return (
              <div key={item.id} className="border-b border-[#1A2A4F]/15 py-8 flex flex-col gap-3 group hover:bg-[#FFDBB6]/30 transition-colors duration-300">
                <div className="flex justify-between items-baseline gap-4">
                  <h4 className="font-display text-[22px] font-semibold text-[#1A2A4F] group-hover:text-[#F7A5A5] transition-colors leading-tight">
                    {item.institution}
                  </h4>
                  <span className="font-label-caps text-[12px] font-semibold text-[#1A2A4F]/60 whitespace-nowrap">
                    {periodStr}
                  </span>
                </div>
                <p className="font-body-md text-[16px] text-[#1A2A4F] font-medium">
                  {item.degree} {item.major && <span className="font-normal text-[#1A2A4F]/80">| {item.major}</span>}
                </p>
                {item.description && (
                  <p className="font-body-md text-[16px] text-[#1A2A4F]/70">{item.description}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Experience Section */}
        <div className="w-full md:w-1/2 flex flex-col gap-8">
          <div className="border-b border-[#1A2A4F] pb-4">
            <h3 className="font-label-caps text-[12px] font-semibold uppercase text-[#1A2A4F] tracking-[0.1em]">Experience</h3>
          </div>
          
          {experiences.map((item) => (
            <div key={item.id} className="border-b border-[#1A2A4F]/15 py-8 flex flex-col gap-3 group hover:bg-[#FFDBB6]/30 transition-colors duration-300">
              <div className="flex justify-between items-baseline gap-4">
                <h4 className="font-display text-[22px] font-semibold text-[#1A2A4F] group-hover:text-[#F7A5A5] transition-colors leading-tight">
                  {item.title}
                </h4>
                <span className="font-label-caps text-[12px] font-semibold text-[#1A2A4F]/60 whitespace-nowrap">
                  {item.period}
                </span>
              </div>
              <p className="font-body-md text-[16px] text-[#1A2A4F] font-medium">{item.company}</p>
              {item.description && (
                <p className="font-body-md text-[16px] text-[#1A2A4F]/70">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
