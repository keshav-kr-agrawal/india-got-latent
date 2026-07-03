"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Ticket,
  Users,
  Mic2,
  Crown,
  DollarSign,
  Handshake,
  ArrowLeft,
  TrendingUp,
  Eye,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useBookingStore, useAuditionStore } from "@/lib/stores";
import { liveEvents, sponsors } from "@/lib/data";

const sidebarLinks = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "tickets", label: "Ticket Sales", icon: Ticket },
  { id: "auditions", label: "Audition Queue", icon: Mic2 },
  { id: "membership", label: "Membership", icon: Crown },
  { id: "revenue", label: "Revenue", icon: DollarSign },
  { id: "sponsors", label: "Sponsors", icon: Handshake },
  { id: "users", label: "Users", icon: Users },
];

const mockRevenue = {
  total: 2847500,
  tickets: 1920000,
  merch: 487500,
  membership: 440000,
};

const mockMembership = {
  insider: 3240,
  backstage: 890,
  churn: 4.2,
};

const mockUsers = [
  { id: "U001", name: "Arjun Mehta", email: "arjun@email.com", tier: "Backstage Club", joined: "Jan 2026" },
  { id: "U002", name: "Priya Sharma", email: "priya@email.com", tier: "Latent Insider", joined: "Feb 2026" },
  { id: "U003", name: "Rahul Kapoor", email: "rahul@email.com", tier: "Backstage Club", joined: "Mar 2026" },
  { id: "U004", name: "Ananya Das", email: "ananya@email.com", tier: "Latent Insider", joined: "Mar 2026" },
  { id: "U005", name: "Vikram Singh", email: "vikram@email.com", tier: "Free", joined: "Apr 2026" },
];

const ticketAnalytics = liveEvents.map((e) => ({
  event: e.title,
  sold: e.totalSeats - e.limitedSeats,
  total: e.totalSeats,
  revenue: (e.totalSeats - e.limitedSeats) * e.pricing.regular * 0.4 +
    (e.totalSeats - e.limitedSeats) * e.pricing.premium * 0.35 +
    (e.totalSeats - e.limitedSeats) * e.pricing.vip * 0.25,
}));

function StatCard({
  label,
  value,
  change,
  icon: Icon,
}: {
  label: string;
  value: string;
  change?: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs tracking-wider uppercase text-text-secondary">{label}</span>
        <Icon className="h-4 w-4 text-gold" />
      </div>
      <p className="font-heading text-2xl font-bold mb-1">{value}</p>
      {change && (
        <p className="text-xs text-green-400 flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />
          {change}
        </p>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const bookings = useBookingStore((s) => s.bookings);
  const { submissions, updateStatus } = useAuditionStore();

  const formatCurrency = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 border-r border-border bg-surface hidden lg:flex flex-col shrink-0">
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2 text-text-secondary hover:text-foreground text-sm mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Site
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 border border-gold/40 flex items-center justify-center">
              <span className="text-xs font-bold text-gold">IGL</span>
            </div>
            <div>
              <p className="text-sm font-semibold">Creator Dashboard</p>
              <p className="text-[10px] text-text-secondary">Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-text-secondary hover:text-foreground hover:bg-card transition-colors"
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </a>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="border-b border-border bg-surface px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-xl font-bold">Dashboard Overview</h1>
            <p className="text-xs text-text-secondary">Last updated: {new Date().toLocaleString("en-IN")}</p>
          </div>
          <Badge className="bg-gold/10 text-gold border border-gold/30 text-[10px] tracking-wider uppercase">
            Live
          </Badge>
        </header>

        <div className="p-6 space-y-8">
          <section id="overview">
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard label="Total Revenue" value={formatCurrency(mockRevenue.total)} change="+18.4% this month" icon={DollarSign} />
              <StatCard label="Tickets Sold" value="4,218" change="+12.1% this week" icon={Ticket} />
              <StatCard label="Active Members" value="4,130" change="+8.7% this month" icon={Crown} />
              <StatCard label="Audition Queue" value={String(submissions.length || 47)} icon={Mic2} />
            </div>
          </section>

          <section id="tickets">
            <h2 className="font-heading text-lg font-bold mb-4">Ticket Sales Analytics</h2>
            <div className="border border-border bg-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead>Event</TableHead>
                    <TableHead>Sold</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Fill Rate</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ticketAnalytics.map((row) => {
                    const fillRate = Math.round((row.sold / row.total) * 100);
                    return (
                      <TableRow key={row.event} className="border-border">
                        <TableCell className="font-medium">{row.event}</TableCell>
                        <TableCell>{row.sold.toLocaleString()}</TableCell>
                        <TableCell>{row.total.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={fillRate} className="h-1.5 w-20" />
                            <span className="text-xs text-text-secondary">{fillRate}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-gold font-semibold">
                          {formatCurrency(Math.round(row.revenue))}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {bookings.map((b) => (
                    <TableRow key={b.id} className="border-border bg-gold/5">
                      <TableCell className="font-medium text-gold">{b.eventTitle} (Live)</TableCell>
                      <TableCell>{b.seats.length}</TableCell>
                      <TableCell>—</TableCell>
                      <TableCell>
                        <Badge className="bg-green-400/10 text-green-400 border-green-400/30 text-[10px]">New</Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">{formatCurrency(b.totalAmount)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          <section id="auditions">
            <h2 className="font-heading text-lg font-bold mb-4">Audition Review Queue</h2>
            <div className="border border-border bg-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.length > 0 ? (
                    submissions.map((sub) => (
                      <TableRow key={sub.id} className="border-border">
                        <TableCell className="font-medium">{sub.fullName}</TableCell>
                        <TableCell>{sub.category}</TableCell>
                        <TableCell>{sub.city}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[10px] tracking-wider uppercase">
                            {sub.status.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs border-border"
                            onClick={() => updateStatus(sub.id, "shortlisted")}
                          >
                            Shortlist
                          </Button>
                          <Button
                            size="sm"
                            className="h-7 text-xs bg-crimson hover:bg-crimson/90"
                            onClick={() => updateStatus(sub.id, "selected")}
                          >
                            Select
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    [
                      { name: "Aditya Verma", category: "Stand-up Comedy", city: "Mumbai", status: "under_review" },
                      { name: "Sneha Reddy", category: "Roast Battle", city: "Hyderabad", status: "shortlisted" },
                      { name: "Karan Malhotra", category: "Musical Performance", city: "Delhi", status: "under_review" },
                      { name: "Divya Nair", category: "Spoken Word", city: "Bangalore", status: "under_review" },
                    ].map((sub, i) => (
                      <TableRow key={i} className="border-border">
                        <TableCell className="font-medium">{sub.name}</TableCell>
                        <TableCell>{sub.category}</TableCell>
                        <TableCell>{sub.city}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[10px] tracking-wider uppercase">
                            {sub.status.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline" className="h-7 text-xs border-border">
                            <Eye className="h-3 w-3 mr-1" /> Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </section>

          <div className="grid lg:grid-cols-2 gap-8">
            <section id="membership">
              <h2 className="font-heading text-lg font-bold mb-4">Membership Analytics</h2>
              <div className="border border-border bg-card p-6 space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Latent Insider</span>
                    <span className="font-semibold">{mockMembership.insider.toLocaleString()}</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Backstage Club</span>
                    <span className="font-semibold text-gold">{mockMembership.backstage.toLocaleString()}</span>
                  </div>
                  <Progress value={22} className="h-2" />
                </div>
                <div className="flex justify-between border-t border-border pt-4 text-sm">
                  <span className="text-text-secondary">Monthly Churn Rate</span>
                  <span>{mockMembership.churn}%</span>
                </div>
              </div>
            </section>

            <section id="revenue">
              <h2 className="font-heading text-lg font-bold mb-4">Revenue Breakdown</h2>
              <div className="border border-border bg-card p-6 space-y-4">
                {[
                  { label: "Ticket Sales", amount: mockRevenue.tickets, pct: 67 },
                  { label: "Merchandise", amount: mockRevenue.merch, pct: 17 },
                  { label: "Membership", amount: mockRevenue.membership, pct: 16 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{item.label}</span>
                      <span className="font-semibold">{formatCurrency(item.amount)}</span>
                    </div>
                    <Progress value={item.pct} className="h-1.5" />
                  </div>
                ))}
                <div className="border-t border-border pt-4 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-heading text-xl font-bold text-gold">
                    {formatCurrency(mockRevenue.total)}
                  </span>
                </div>
              </div>
            </section>
          </div>

          <section id="sponsors">
            <h2 className="font-heading text-lg font-bold mb-4">Sponsor Management</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {sponsors.map((s) => (
                <div key={s.id} className="border border-border bg-card p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{s.name}</p>
                    <p className="text-xs text-text-secondary capitalize">{s.tier}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">Active</Badge>
                </div>
              ))}
            </div>
          </section>

          <section id="users">
            <h2 className="font-heading text-lg font-bold mb-4">User Management</h2>
            <div className="border border-border bg-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id} className="border-border">
                      <TableCell className="font-mono text-xs text-text-secondary">{user.id}</TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell className="text-text-secondary">{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`text-[10px] ${
                            user.tier === "Backstage Club" ? "border-gold/30 text-gold" : ""
                          }`}
                        >
                          {user.tier}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-text-secondary">{user.joined}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
