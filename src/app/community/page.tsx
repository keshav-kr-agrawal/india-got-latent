"use client";

import { useState } from "react";
import { ArrowUp, MessageSquare, Lightbulb, Flame, Send, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MotionSection, MotionDiv } from "@/components/motion";
import { SectionHeader } from "@/components/shared/section-header";
import { communityPosts } from "@/lib/data";
import { toast } from "sonner";
import { SafeImage } from "@/components/ui/safe-image";

const typeIcons = {
  vote: Flame,
  challenge: Lightbulb,
  talent: MessageSquare,
  meme: MessageSquare,
};

const typeLabels = {
  vote: "Vote",
  challenge: "Challenge",
  talent: "Talent Idea",
  meme: "Meme",
};

const guestCandidates = [
  { name: "Anubhav Singh Bassi", role: "Storyteller & Comic", avatar: "/assets/team/candidate-1.jpg", desc: "Known for his relatability and anecdotal comedy." },
  { name: "Zakir Khan", role: "Sakht Launda", avatar: "/assets/team/candidate-2.jpg", desc: "The pioneer of emotional storytelling in Indian stand-up." },
  { name: "Abhishek Upmanyu", role: "observational expert", avatar: "/assets/team/candidate-3.jpg", desc: "Known for fast delivery and self-deprecating humor." },
  { name: "Munawar Faruqui", role: "Roast Specialist", avatar: "/assets/team/candidate-4.jpg", desc: "Roaster and winner of major reality competition formats." }
];

const mockMemes = [
  { id: "m1", title: "Judge reaction when the self-rating is 10/10", image: "/assets/gallery/meme-1.jpg", author: "Rahul_IGL", upvotes: 1840 },
  { id: "m2", title: "Comedians waiting for the candidate to finish their intro", image: "/assets/gallery/meme-2.jpg", author: "MemeLord22", upvotes: 2190 },
  { id: "m3", title: "The legal team listening to the first joke", image: "/assets/gallery/meme-3.jpg", author: "ChaosCurator", upvotes: 1420 }
];

export default function CommunityPage() {
  const [votes, setVotes] = useState<Record<string, number>>(
    Object.fromEntries(communityPosts.map((p) => [p.id, p.votes]))
  );
  const [votedPosts, setVotedPosts] = useState<Set<string>>(new Set());
  const [newPost, setNewPost] = useState({ title: "", content: "", type: "talent" });

  const handleVote = (id: string) => {
    if (votedPosts.has(id)) return;
    setVotes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setVotedPosts((prev) => new Set([...prev, id]));
    toast.success("Upvoted successfully!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Idea submitted to community queue!");
    setNewPost({ title: "", content: "", type: "talent" });
  };

  return (
    <div className="py-16 bg-[#0E0E0E]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <MotionSection>
          <SectionHeader
            label="Community Feed"
            title="The Chaos Collective"
            description="Upvote trending concepts, vote for the next celebrity guest, suggest roasts, and interact with the ecosystem."
          />
        </MotionSection>

        {/* Layout Grid: Feed + Side columns */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mt-12">
          
          {/* Main Feed Column */}
          <div className="lg:col-span-8">
            <Tabs defaultValue="feed" className="w-full">
              <TabsList className="bg-[#181818] border border-[#2C2C2C] w-full justify-start mb-8 p-1">
                <TabsTrigger value="feed" className="data-[state=active]:bg-[#1F1F1F] data-[state=active]:text-white text-[#9E9E9E] cursor-pointer">Community Feed</TabsTrigger>
                <TabsTrigger value="vote" className="data-[state=active]:bg-[#1F1F1F] data-[state=active]:text-white text-[#9E9E9E] cursor-pointer">Vote for Guest</TabsTrigger>
                <TabsTrigger value="submit" className="data-[state=active]:bg-[#1F1F1F] data-[state=active]:text-white text-[#9E9E9E] cursor-pointer">Submit Concept</TabsTrigger>
                <TabsTrigger value="memes" className="data-[state=active]:bg-[#1F1F1F] data-[state=active]:text-white text-[#9E9E9E] cursor-pointer">Meme Wall</TabsTrigger>
              </TabsList>

              {/* Feed Tab */}
              <TabsContent value="feed" className="space-y-4 focus-visible:outline-none">
                {communityPosts.map((post, i) => {
                  const Icon = typeIcons[post.type as keyof typeof typeIcons];
                  return (
                    <MotionSection key={post.id} delay={i * 0.06}>
                      <div className="border border-[#2C2C2C] bg-[#1F1F1F] p-6 hover:border-gold/30 transition-all duration-300">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full overflow-hidden border border-[#2C2C2C] relative">
                              <SafeImage
                                src={post.avatar}
                                alt={post.author}
                                fill
                                className="object-cover"
                                fallbackText={post.author.charAt(0)}
                              />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white leading-none">{post.author}</p>
                              <p className="text-[10px] text-[#9E9E9E] mt-1">Contributor</p>
                            </div>
                            <Badge variant="outline" className="text-[9px] tracking-wider uppercase border-[#2C2C2C] text-gold py-0.5 ml-2">
                              <Icon className="h-2.5 w-2.5 mr-1" />
                              {typeLabels[post.type as keyof typeof typeLabels]}
                            </Badge>
                          </div>

                          <button
                            onClick={() => handleVote(post.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 border border-[#2C2C2C] bg-[#181818] text-xs font-semibold hover:border-gold/40 transition-all cursor-pointer ${
                              votedPosts.has(post.id) ? "text-gold border-gold/30 bg-gold/5" : "text-[#9E9E9E]"
                            }`}
                          >
                            <ArrowUp className="h-3.5 w-3.5" />
                            {votes[post.id]}
                          </button>
                        </div>

                        <h3 className="font-heading text-lg font-bold text-white mb-2">{post.title}</h3>
                        <p className="text-sm text-[#9E9E9E] leading-relaxed mb-4">{post.content}</p>

                        {post.type === "vote" && "options" in post && (
                          <div className="mt-4 grid grid-cols-2 gap-2">
                            {(post as { options: string[] }).options.map((opt) => (
                              <button
                                key={opt}
                                onClick={() => toast.success(`Registered vote for ${opt}`)}
                                className="border border-[#2C2C2C] bg-[#181818] px-4 py-2.5 text-xs text-left text-white hover:border-gold/30 hover:bg-[#1F1F1F] transition-colors cursor-pointer"
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </MotionSection>
                  );
                })}
              </TabsContent>

              {/* Vote for Guest Tab */}
              <TabsContent value="vote" className="space-y-4 focus-visible:outline-none">
                <MotionSection>
                  <div className="border border-[#2C2C2C] bg-[#1F1F1F] p-8">
                    <h3 className="font-heading text-xl font-bold text-white mb-2">Vote for Next Guest</h3>
                    <p className="text-xs text-[#9E9E9E] mb-8 font-sans">
                      Select which cultural icon or standup expert should roast the next set of performers. Updated weekly.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {guestCandidates.map((g) => (
                        <div
                          key={g.name}
                          onClick={() => toast.success(`Voted for ${g.name}`)}
                          className="border border-[#2C2C2C] bg-[#181818] p-4 flex gap-4 hover:border-gold/40 transition-colors cursor-pointer group"
                        >
                          <div className="h-16 w-16 rounded-full overflow-hidden border border-[#2C2C2C] shrink-0 relative">
                            <SafeImage
                              src={g.avatar}
                              alt={g.name}
                              fill
                              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                              fallbackText={g.name.charAt(0)}
                            />
                          </div>
                          <div>
                            <h5 className="font-heading text-sm font-bold text-white group-hover:text-gold transition-colors">{g.name}</h5>
                            <p className="text-[10px] uppercase tracking-wider text-gold mt-0.5">{g.role}</p>
                            <p className="text-[10px] text-[#9E9E9E] leading-normal mt-1.5">{g.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </MotionSection>
              </TabsContent>

              {/* Submit Idea Tab */}
              <TabsContent value="submit" className="focus-visible:outline-none">
                <MotionSection>
                  <form onSubmit={handleSubmit} className="border border-[#2C2C2C] bg-[#1F1F1F] p-8 space-y-6">
                    <div>
                      <h3 className="font-heading text-xl font-bold text-white mb-2">Submit Your Idea</h3>
                      <p className="text-xs text-[#9E9E9E] font-sans">
                        Pitch a roast challenge, highlight video concept, or general performance idea to the team.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-semibold text-white mb-1.5 block">Concept Title</label>
                        <Input
                          placeholder="e.g. Blindfolded Stand-up Challenge"
                          value={newPost.title}
                          onChange={(e) => setNewPost((p) => ({ ...p, title: e.target.value }))}
                          className="bg-[#181818] border-[#2C2C2C] text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-white mb-1.5 block">Description</label>
                        <Textarea
                          placeholder="Describe the challenge or idea in detail..."
                          value={newPost.content}
                          onChange={(e) => setNewPost((p) => ({ ...p, content: e.target.value }))}
                          className="bg-[#181818] border-[#2C2C2C] text-white min-h-[120px]"
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="bg-crimson hover:bg-crimson/90 font-semibold text-xs tracking-wider uppercase cursor-pointer">
                      Post to Queue
                    </Button>
                  </form>
                </MotionSection>
              </TabsContent>

              {/* Meme Wall Tab */}
              <TabsContent value="memes" className="focus-visible:outline-none">
                <div className="grid sm:grid-cols-2 gap-6">
                  {mockMemes.map((meme, i) => (
                    <MotionSection key={meme.id} delay={i * 0.08}>
                      <div className="border border-[#2C2C2C] bg-[#1F1F1F] overflow-hidden group">
                        <div className="aspect-[4/3] relative bg-[#181818] border-b border-[#2C2C2C] overflow-hidden">
                          <SafeImage
                            src={meme.image}
                            alt={meme.title}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                            fallbackText="Meme Content"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                          <div className="absolute bottom-3 left-3 right-3">
                            <p className="text-xs font-bold text-white leading-snug">{meme.title}</p>
                          </div>
                        </div>
                        <div className="p-4 flex items-center justify-between">
                          <span className="text-[10px] text-[#9E9E9E]">by {meme.author}</span>
                          <button
                            onClick={() => toast.success("Upvoted meme")}
                            className="inline-flex items-center gap-1 text-xs text-gold hover:text-white font-semibold cursor-pointer"
                          >
                            <ArrowUp className="h-3 w-3" />
                            {meme.upvotes}
                          </button>
                        </div>
                      </div>
                    </MotionSection>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            <MotionDiv delay={0.12} className="border border-[#2C2C2C] bg-[#1F1F1F] p-6">
              <h4 className="font-heading text-base font-bold text-white mb-4 font-heading">Guidelines</h4>
              <ul className="space-y-3 text-xs text-[#9E9E9E] leading-relaxed font-sans">
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">·</span>
                  <span>Treat all ideas with respect. Friendly roast culture is encouraged.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">·</span>
                  <span>Do not post copyrighted media, clips, or official spoilers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">·</span>
                  <span>Ideas reaching 2,000+ upvotes are compiled for creator feedback.</span>
                </li>
              </ul>
            </MotionDiv>

            <MotionDiv delay={0.18} className="border border-[#2C2C2C] bg-[#1F1F1F] p-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-4 w-4 text-gold fill-gold" />
                <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider font-heading">Top Contributors</h4>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Rohit Kumar", posts: 42, avatar: "/assets/team/avatar-1.jpg" },
                  { name: "Priya Sharma", posts: 38, avatar: "/assets/team/avatar-2.jpg" },
                  { name: "Arjun Mehta", posts: 31, avatar: "/assets/team/avatar-3.jpg" }
                ].map((user) => (
                  <div key={user.name} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full overflow-hidden border border-[#2C2C2C] shrink-0 relative">
                      <SafeImage src={user.avatar} alt={user.name} fill className="object-cover" fallbackText={user.name.charAt(0)} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white leading-none">{user.name}</p>
                      <p className="text-[10px] text-[#9E9E9E] mt-1">{user.posts} submissions</p>
                    </div>
                  </div>
                ))}
              </div>
            </MotionDiv>
          </div>

        </div>
      </div>
    </div>
  );
}
