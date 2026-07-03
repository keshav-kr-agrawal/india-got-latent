"use client";

import { useState } from "react";
import { Upload, CheckCircle, Clock, Star, XCircle, FileVideo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MotionSection } from "@/components/motion";
import { SectionHeader } from "@/components/shared/section-header";
import { talentCategories } from "@/lib/data";
import { useAuditionStore, type AuditionSubmission } from "@/lib/stores";
import { toast } from "sonner";

const statusConfig = {
  under_review: { label: "Under Review", icon: Clock, color: "text-gold border-gold/30 bg-gold/10" },
  shortlisted: { label: "Shortlisted", icon: Star, color: "text-gold border-gold/30 bg-gold/10" },
  selected: { label: "Selected", icon: CheckCircle, color: "text-green-400 border-green-400/30 bg-green-400/10" },
  rejected: { label: "Rejected", icon: XCircle, color: "text-crimson border-crimson/30 bg-crimson/10" },
};

function StatusTracker({ submissions }: { submissions: AuditionSubmission[] }) {
  if (submissions.length === 0) return null;

  return (
    <div className="mt-16">
      <h3 className="font-heading text-2xl font-bold mb-6">Your Submissions</h3>
      <div className="space-y-4">
        {submissions.map((sub) => {
          const config = statusConfig[sub.status];
          const Icon = config.icon;
          return (
            <div key={sub.id} className="border border-border bg-card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">{sub.fullName}</p>
                  <p className="text-sm text-text-secondary">
                    {sub.category} · {sub.city} · Submitted{" "}
                    {new Date(sub.submittedAt).toLocaleDateString("en-IN")}
                  </p>
                  <p className="text-xs text-text-secondary mt-1 font-mono">{sub.id}</p>
                </div>
                <Badge className={`${config.color} border text-xs tracking-wider uppercase w-fit`}>
                  <Icon className="h-3 w-3 mr-1" />
                  {config.label}
                </Badge>
              </div>
              <div className="mt-4 flex gap-2">
                {(["under_review", "shortlisted", "selected", "rejected"] as const).map((status, i) => {
                  const statuses = ["under_review", "shortlisted", "selected"];
                  const currentIdx = statuses.indexOf(sub.status === "rejected" ? "under_review" : sub.status);
                  const isActive = sub.status === "rejected" ? i === 0 : i <= currentIdx;
                  const isRejected = sub.status === "rejected" && i > 0;
                  return (
                    <div key={status} className="flex-1">
                      <div
                        className={`h-1 ${
                          isRejected
                            ? "bg-crimson/30"
                            : isActive
                            ? "bg-gold"
                            : "bg-border"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AuditionsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    email: "",
    phone: "",
    city: "",
    category: "",
    instagram: "",
    bio: "",
  });
  const { submissions, addSubmission } = useAuditionStore();

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `AUD-${Date.now().toString(36).toUpperCase()}`;
    addSubmission({
      id,
      fullName: form.fullName,
      age: parseInt(form.age),
      city: form.city,
      category: form.category,
      instagram: form.instagram,
      bio: form.bio,
      status: "under_review",
      submittedAt: new Date().toISOString(),
    });
    setSubmitted(true);
    toast.success("Audition submitted successfully!");
    setForm({ fullName: "", age: "", email: "", phone: "", city: "", category: "", instagram: "", bio: "" });
    setFileName("");
  };

  return (
    <div className="py-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <MotionSection>
          <SectionHeader
            label="Auditions"
            title="Submit Your Talent"
            description="We're looking for India's most unhinged, original, and unforgettable performers. This is a serious production intake — treat it like one."
          />
        </MotionSection>

        {submitted && (
          <MotionSection>
            <div className="border border-gold/30 bg-gold/5 p-6 mb-8 flex items-start gap-4">
              <CheckCircle className="h-5 w-5 text-gold shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Submission Received</p>
                <p className="text-sm text-text-secondary">
                  Our production team will review your submission within 14 business days.
                  Track your status below.
                </p>
              </div>
            </div>
          </MotionSection>
        )}

        <MotionSection delay={0.1}>
          <form onSubmit={handleSubmit} className="border border-border bg-card p-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className="mt-1 bg-surface border-border"
                  required
                />
              </div>
              <div>
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  min="16"
                  max="60"
                  value={form.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                  className="mt-1 bg-surface border-border"
                  required
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={form.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="mt-1 bg-surface border-border"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Talent Category *</Label>
                <Select value={form.category} onValueChange={(v) => v && handleChange("category", v)}>
                  <SelectTrigger className="mt-1 bg-surface border-border">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {talentCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="mt-1 bg-surface border-border"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="mt-1 bg-surface border-border"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="instagram">Instagram Handle *</Label>
              <Input
                id="instagram"
                placeholder="@yourhandle"
                value={form.instagram}
                onChange={(e) => handleChange("instagram", e.target.value)}
                className="mt-1 bg-surface border-border"
                required
              />
            </div>

            <div>
              <Label htmlFor="bio">Short Bio *</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself and your performance style (max 300 words)"
                value={form.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                className="mt-1 bg-surface border-border min-h-[120px]"
                maxLength={1500}
                required
              />
            </div>

            <div>
              <Label>Performance Video *</Label>
              <div className="mt-1 border-2 border-dashed border-border bg-surface p-8 text-center relative">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  required={!fileName}
                />
                {fileName ? (
                  <div className="flex items-center justify-center gap-2">
                    <FileVideo className="h-5 w-5 text-gold" />
                    <span className="text-sm">{fileName}</span>
                  </div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-text-secondary mx-auto mb-3" />
                    <p className="text-sm text-text-secondary">
                      Upload your performance video (MP4, max 500MB)
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      2-5 minute performance clip recommended
                    </p>
                  </>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-crimson hover:bg-crimson/90 h-12 font-semibold text-base"
            >
              Submit Audition
            </Button>
          </form>
        </MotionSection>

        <StatusTracker submissions={submissions} />
      </div>
    </div>
  );
}
