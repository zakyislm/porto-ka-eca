"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditorPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "Resha Eka Aulia",
    heroTitle: "Hi, I'm Resha Eka Aulia.",
    greetings: "Hi, I'm Resha Eka Aulia.",
    heroSubtitle: "",
    heroDesc: "",
    heroImage: "",
    cvFileUrl: "",
    floatingTags: ["", "", ""],
    instagramUrl: "",
    linkedinUrl: "",
    whatsappUrl: "",
    emailUrl: "",
    aboutTitle: "ABOUT ME",
    aboutText: "",
    educations: [{ institution: "", degree: "", major: "", timeStart: "", timeEnd: "", description: "" }],
    experiences: [{ title: "", company: "", period: "", description: "" }]
  });
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin");
    } else if (status === "authenticated") {
      fetch("/api/content")
        .then((res) => res.json())
        .then((data) => {
          if (data.portfolio) {
            setFormData(prev => ({
              ...prev,
              ...data.portfolio,
              floatingTags: data.portfolio.floatingTags?.length ? data.portfolio.floatingTags : ["", "", ""],
              educations: data.portfolio.educations?.length ? data.portfolio.educations : prev.educations,
              experiences: data.portfolio.experiences?.length ? data.portfolio.experiences : prev.experiences,
            }));
          }
        })
        .finally(() => setFetching(false));
    }
  }, [status, router]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagChange = (index: number, value: string) => {
    const updatedTags = [...formData.floatingTags];
    updatedTags[index] = value;
    setFormData({ ...formData, floatingTags: updatedTags });
  };

  const handleEducationChange = (index: number, e: any) => {
    const updated = [...formData.educations];
    updated[index] = { ...updated[index], [e.target.name]: e.target.value };
    setFormData({ ...formData, educations: updated });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      educations: [...formData.educations, { institution: "", degree: "", major: "", timeStart: "", timeEnd: "", description: "" }]
    });
  };

  const removeEducation = (index: number) => {
    const updated = formData.educations.filter((_, i) => i !== index);
    setFormData({ ...formData, educations: updated });
  };

  const handleExperienceChange = (index: number, e: any) => {
    const updated = [...formData.experiences];
    updated[index] = { ...updated[index], [e.target.name]: e.target.value };
    setFormData({ ...formData, experiences: updated });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [...formData.experiences, { title: "", company: "", period: "", description: "" }]
    });
  };

  const removeExperience = (index: number) => {
    const updated = formData.experiences.filter((_, i) => i !== index);
    setFormData({ ...formData, experiences: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile && !formData.heroImage) {
      alert("Please provide a Hero Image (upload a file or paste a URL).");
      return;
    }

    setLoading(true);

    let imageUrl = formData.heroImage;
    let cvUrl = formData.cvFileUrl;

    const uploadFile = async (file: File) => {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      if (res.ok) {
        const { url } = await res.json();
        return url;
      }
      return null;
    };

    if (imageFile) {
      const url = await uploadFile(imageFile);
      if (url) imageUrl = url;
      else {
        alert("Error uploading image");
        setLoading(false);
        return;
      }
    }

    if (cvFile) {
      const url = await uploadFile(cvFile);
      if (url) cvUrl = url;
      else {
        alert("Error uploading CV");
        setLoading(false);
        return;
      }
    }

    // Update konten
    const payload = {
      ...formData,
      heroImage: imageUrl,
      cvFileUrl: cvUrl,
      educations: formData.educations.map((ed) => ({
        ...ed,
        timeStart: parseInt(ed.timeStart as string) || 0,
        timeEnd: ed.timeEnd ? parseInt(ed.timeEnd as string) : null,
      }))
    };

    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert("Content saved successfully!");
    } else {
      alert("Error saving content.");
    }
    setLoading(false);
  };

  if (status === "loading" || fetching) {
    return (
      <div className="max-w-3xl flex flex-col gap-8 pb-24 animate-pulse">
        <div className="h-10 w-64 bg-[#1A2A4F]/10 rounded-sm"></div>
        
        {/* Home Info Skeleton */}
        <div className="bg-white p-6 rounded-sm shadow-[4px_4px_0px_0px_rgba(26,42,79,0.05)] border border-[#1A2A4F]/10 flex flex-col gap-6">
          <div className="h-6 w-32 bg-[#1A2A4F]/10 mb-2"></div>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex flex-col gap-2">
              <div className="h-4 w-24 bg-[#1A2A4F]/10"></div>
              <div className="h-10 w-full bg-[#1A2A4F]/5 rounded-sm border border-[#1A2A4F]/10"></div>
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 bg-[#1A2A4F]/10"></div>
            <div className="h-24 w-full bg-[#1A2A4F]/5 rounded-sm border border-[#1A2A4F]/10"></div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 bg-[#1A2A4F]/10"></div>
            <div className="h-32 w-32 bg-[#1A2A4F]/5 rounded-sm border border-[#1A2A4F]/10"></div>
          </div>
        </div>

        {/* About Section Skeleton */}
        <div className="bg-white p-6 rounded-sm shadow-[4px_4px_0px_0px_rgba(26,42,79,0.05)] border border-[#1A2A4F]/10 flex flex-col gap-6">
          <div className="h-6 w-40 bg-[#1A2A4F]/10 mb-2"></div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-24 bg-[#1A2A4F]/10"></div>
            <div className="h-10 w-full bg-[#1A2A4F]/5 rounded-sm border border-[#1A2A4F]/10"></div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-24 bg-[#1A2A4F]/10"></div>
            <div className="h-48 w-full bg-[#1A2A4F]/5 rounded-sm border border-[#1A2A4F]/10"></div>
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="max-w-3xl flex flex-col gap-8 pb-24">
      <h1 className="font-display text-3xl font-bold text-[#1A2A4F]">Content Editor</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* Basic Info */}
        <div className="bg-white p-6 rounded-sm shadow-[4px_4px_0px_0px_rgba(26,42,79,1)] border border-[#1A2A4F] flex flex-col gap-4">
          <h2 className="font-display text-xl font-semibold border-b border-[#1A2A4F]/10 pb-2 text-[#1A2A4F]">Home Info</h2>
          <div>
            <label className="block text-sm font-medium mb-1 text-[#1A2A4F]/80">Name</label>
            <input name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-[#1A2A4F] bg-transparent rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F7A5A5]" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-[#1A2A4F]/80">Greetings</label>
            <input name="greetings" value={formData.greetings} onChange={handleChange} className="w-full p-2 border border-[#1A2A4F] bg-transparent rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F7A5A5]" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-[#1A2A4F]/80">Hero Title (Legacy)</label>
            <input name="heroTitle" value={formData.heroTitle} onChange={handleChange} className="w-full p-2 border border-[#1A2A4F] bg-transparent rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F7A5A5]" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-[#1A2A4F]/80">Hero Description</label>
            <textarea name="heroDesc" value={formData.heroDesc} onChange={handleChange} className="w-full p-2 border border-[#1A2A4F] bg-transparent rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F7A5A5] h-24" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-[#1A2A4F]/80">Hero Subtitle (Legacy)</label>
            <textarea name="heroSubtitle" value={formData.heroSubtitle} onChange={handleChange} className="w-full p-2 border border-[#1A2A4F] bg-transparent rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F7A5A5] h-24" />
          </div>
          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <label className="block text-sm font-medium text-[#1A2A4F]/80">Hero Image</label>
              <span className="text-xs text-[#1A2A4F]/50">(Optimal scale: 3:4 Portrait or 1:1 Square)</span>
            </div>
            <div className="flex flex-col gap-2">
              <input name="heroImage" value={formData.heroImage || ""} onChange={handleChange} placeholder="Paste image URL here..." className="w-full p-2 border border-[#1A2A4F] bg-transparent rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F7A5A5]" />
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase text-[#1A2A4F]/60">Or Upload (Max 5MB):</span>
                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full p-1 text-sm border border-[#1A2A4F]/20 rounded-sm" />
              </div>
            </div>
            
            {(imageFile || formData.heroImage) && (
              <div className="mt-3 relative w-32 h-32 rounded-sm overflow-hidden border border-[#1A2A4F]/20 bg-gray-100 flex items-center justify-center">
                <img 
                  src={imageFile ? URL.createObjectURL(imageFile) : formData.heroImage} 
                  alt="Hero Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-xs text-gray-500 p-2 text-center">Image broken/not found</span>'; }}
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-[#1A2A4F]/80">CV PDF File</label>
            <div className="flex flex-col gap-2">
              <input name="cvFileUrl" value={formData.cvFileUrl || ""} onChange={handleChange} placeholder="Paste PDF URL here..." className="w-full p-2 border border-[#1A2A4F] bg-transparent rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F7A5A5]" />
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase text-[#1A2A4F]/60">Or Upload:</span>
                <input type="file" accept="application/pdf" onChange={(e) => setCvFile(e.target.files?.[0] || null)} className="w-full p-1 text-sm border border-[#1A2A4F]/20 rounded-sm" />
              </div>
            </div>
            {formData.cvFileUrl && !cvFile && <p className="text-xs text-[#1A2A4F]/50 mt-2">Current CV: <a href={formData.cvFileUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#F7A5A5]">View CV</a></p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-[#1A2A4F]/80">Floating Tags (Max 3)</label>
            <div className="flex flex-col gap-2">
              {[0, 1, 2].map((i) => (
                <input 
                  key={i}
                  value={formData.floatingTags?.[i] || ""} 
                  onChange={(e) => handleTagChange(i, e.target.value)} 
                  placeholder={`Tag ${i + 1}`}
                  className="w-full p-2 border border-[#1A2A4F] bg-transparent rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F7A5A5]" 
                />
              ))}
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-white p-6 rounded-sm shadow-[4px_4px_0px_0px_rgba(26,42,79,1)] border border-[#1A2A4F] flex flex-col gap-4">
          <h2 className="font-display text-xl font-semibold border-b border-[#1A2A4F]/10 pb-2 text-[#1A2A4F]">About Section</h2>
          <div>
            <label className="block text-sm font-medium mb-1 text-[#1A2A4F]/80">About Title</label>
            <input name="aboutTitle" value={formData.aboutTitle} onChange={handleChange} className="w-full p-2 border border-[#1A2A4F] bg-transparent rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F7A5A5]" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-[#1A2A4F]/80">About Text</label>
            <textarea name="aboutText" value={formData.aboutText} onChange={handleChange} className="w-full p-2 border border-[#1A2A4F] bg-transparent rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F7A5A5] h-48" />
          </div>
        </div>

        {/* Education */}
        <div className="bg-white p-6 rounded-sm shadow-[4px_4px_0px_0px_rgba(26,42,79,1)] border border-[#1A2A4F] flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-[#1A2A4F]/10 pb-2">
            <h2 className="font-display text-xl font-semibold text-[#1A2A4F]">Education Section</h2>
            <button type="button" onClick={addEducation} className="text-sm font-label-caps uppercase bg-[#F7A5A5] text-[#1A2A4F] px-4 py-1.5 rounded-sm hover:opacity-90">Add</button>
          </div>
          {formData.educations.map((ed, i) => (
            <div key={i} className="flex flex-col gap-3 p-4 border border-[#1A2A4F]/20 rounded-sm bg-[#FFF2EF]/50 relative">
              {formData.educations.length > 1 && (
                <button type="button" onClick={() => removeEducation(i)} className="absolute top-4 right-4 text-xs font-label-caps uppercase text-red-500 hover:text-red-700">Remove</button>
              )}
              <div>
                <label className="block text-sm font-medium mb-1 text-[#1A2A4F]/80">Institution</label>
                <input name="institution" value={ed.institution} onChange={(e) => handleEducationChange(i, e)} className="w-full p-2 border border-[#1A2A4F] bg-white rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F7A5A5]" required />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 text-[#1A2A4F]/80">Degree</label>
                  <input name="degree" value={ed.degree} onChange={(e) => handleEducationChange(i, e)} className="w-full p-2 border border-[#1A2A4F] bg-white rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F7A5A5]" required />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 text-[#1A2A4F]/80">Major</label>
                  <input name="major" value={ed.major} onChange={(e) => handleEducationChange(i, e)} className="w-full p-2 border border-[#1A2A4F] bg-white rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F7A5A5]" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 text-[#1A2A4F]/80">Start Year</label>
                  <input type="number" name="timeStart" value={ed.timeStart} onChange={(e) => handleEducationChange(i, e)} placeholder="2020" className="w-full p-2 border border-[#1A2A4F] bg-white rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F7A5A5]" required />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 text-[#1A2A4F]/80">End Year (Leave blank for NOW)</label>
                  <input type="number" name="timeEnd" value={ed.timeEnd || ""} onChange={(e) => handleEducationChange(i, e)} placeholder="2024" className="w-full p-2 border border-[#1A2A4F] bg-white rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F7A5A5]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#1A2A4F]/80">Description</label>
                <textarea name="description" value={ed.description} onChange={(e) => handleEducationChange(i, e)} className="w-full p-2 border border-[#1A2A4F] bg-white rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F7A5A5] h-20" />
              </div>
            </div>
          ))}
        </div>

        {/* Experience */}
        <div className="bg-white p-6 rounded-sm shadow-[4px_4px_0px_0px_rgba(26,42,79,1)] border border-[#1A2A4F] flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-[#1A2A4F]/10 pb-2">
            <h2 className="font-display text-xl font-semibold text-[#1A2A4F]">Experience Section</h2>
            <button type="button" onClick={addExperience} className="text-sm font-label-caps uppercase bg-[#F7A5A5] text-[#1A2A4F] px-4 py-1.5 rounded-sm hover:opacity-90">Add</button>
          </div>
          {formData.experiences.map((ex, i) => (
            <div key={i} className="flex flex-col gap-3 p-4 border border-[#1A2A4F]/20 rounded-sm bg-[#FFF2EF]/50 relative">
              {formData.experiences.length > 1 && (
                <button type="button" onClick={() => removeExperience(i)} className="absolute top-4 right-4 text-xs font-label-caps uppercase text-red-500 hover:text-red-700">Remove</button>
              )}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 text-[#1A2A4F]/80">Role / Title</label>
                  <input name="title" value={ex.title} onChange={(e) => handleExperienceChange(i, e)} className="w-full p-2 border border-[#1A2A4F] bg-white rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F7A5A5]" required />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 text-[#1A2A4F]/80">Company</label>
                  <input name="company" value={ex.company} onChange={(e) => handleExperienceChange(i, e)} className="w-full p-2 border border-[#1A2A4F] bg-white rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F7A5A5]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#1A2A4F]/80">Period</label>
                <input name="period" value={ex.period} onChange={(e) => handleExperienceChange(i, e)} placeholder="2020 - 2023" className="w-full p-2 border border-[#1A2A4F] bg-white rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F7A5A5]" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#1A2A4F]/80">Description</label>
                <textarea name="description" value={ex.description} onChange={(e) => handleExperienceChange(i, e)} className="w-full p-2 border border-[#1A2A4F] bg-white rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F7A5A5] h-20" />
              </div>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="bg-white p-6 rounded-sm shadow-[4px_4px_0px_0px_rgba(26,42,79,1)] border border-[#1A2A4F] flex flex-col gap-4">
          <div className="border-b border-[#1A2A4F]/10 pb-2">
            <h2 className="font-display text-xl font-semibold text-[#1A2A4F]">Social Links</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-[#1A2A4F]/80">LinkedIn Username</label>
              <input name="linkedinUrl" value={formData.linkedinUrl || ""} onChange={handleChange} placeholder="username" className="w-full p-2 border border-[#1A2A4F] bg-transparent rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F7A5A5]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#1A2A4F]/80">Instagram Username</label>
              <input name="instagramUrl" value={formData.instagramUrl || ""} onChange={handleChange} placeholder="username" className="w-full p-2 border border-[#1A2A4F] bg-transparent rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F7A5A5]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#1A2A4F]/80">WhatsApp Number</label>
              <input name="whatsappUrl" value={formData.whatsappUrl || ""} onChange={handleChange} placeholder="6281234567890" className="w-full p-2 border border-[#1A2A4F] bg-transparent rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F7A5A5]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#1A2A4F]/80">Email Address</label>
              <input name="emailUrl" value={formData.emailUrl || ""} onChange={handleChange} placeholder="you@example.com" className="w-full p-2 border border-[#1A2A4F] bg-transparent rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F7A5A5]" />
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-[#1A2A4F] text-white font-label-caps uppercase font-bold py-4 rounded-sm hover:bg-[#1A2A4F]/90 transition-colors disabled:opacity-50">
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
