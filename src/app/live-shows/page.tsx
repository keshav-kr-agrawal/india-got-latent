"use client";

import { useState, useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";
import { MapPin, Calendar, Clock, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MotionSection } from "@/components/motion";
import { SectionHeader } from "@/components/shared/section-header";
import { liveEvents, type LiveEvent } from "@/lib/data";
import { generateSeatMap, getSectionLabel, getSectionColor, type Seat, type SeatSection } from "@/lib/seats";
import { useBookingStore } from "@/lib/stores";
import { toast } from "sonner";

function formatPrice(price: number) {
  return `₹${price.toLocaleString("en-IN")}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function EventCard({ event, onBook }: { event: LiveEvent; onBook: (e: LiveEvent) => void }) {
  return (
    <div className="border border-border bg-card card-hover overflow-hidden">
      <div className="aspect-[16/7] bg-gradient-to-br from-[#2a2a2a] via-[#1c1c1c] to-crimson/10 relative">
        {event.featured && (
          <Badge className="absolute top-4 left-4 bg-crimson text-white border-0 text-[10px] tracking-wider uppercase">
            Featured
          </Badge>
        )}
        {event.limitedSeats < 100 && (
          <Badge className="absolute top-4 right-4 bg-gold/20 text-gold border border-gold/30 text-[10px] tracking-wider uppercase">
            {event.limitedSeats} seats left
          </Badge>
        )}
        <div className="absolute bottom-4 left-4">
          <p className="font-heading text-2xl font-bold">{event.city}</p>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold mb-4">{event.title}</h3>
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <MapPin className="h-4 w-4 shrink-0" />
            {event.venue}, {event.city}
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Calendar className="h-4 w-4 shrink-0" />
            {formatDate(event.date)}
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Clock className="h-4 w-4 shrink-0" />
            {event.time}
          </div>
        </div>
        <div className="flex items-center gap-4 mb-6 text-sm">
          <div>
            <span className="text-text-secondary">VIP </span>
            <span className="font-semibold text-gold">{formatPrice(event.pricing.vip)}</span>
          </div>
          <div>
            <span className="text-text-secondary">Premium </span>
            <span className="font-semibold">{formatPrice(event.pricing.premium)}</span>
          </div>
          <div>
            <span className="text-text-secondary">Regular </span>
            <span className="font-semibold">{formatPrice(event.pricing.regular)}</span>
          </div>
        </div>
        <Button
          onClick={() => onBook(event)}
          className="w-full bg-crimson hover:bg-crimson/90 font-semibold"
        >
          Reserve Seat
        </Button>
      </div>
    </div>
  );
}

function SeatButton({
  seat,
  selected,
  onToggle,
}: {
  seat: Seat;
  selected: boolean;
  onToggle: (seat: Seat) => void;
}) {
  if (!seat.available) {
    return (
      <div className="h-7 w-7 md:h-8 md:w-8 bg-[#1a1a1a] border border-border/50 opacity-30 cursor-not-allowed" />
    );
  }

  return (
    <button
      onClick={() => onToggle(seat)}
      className={`h-7 w-7 md:h-8 md:w-8 border text-[9px] font-medium transition-all ${
        selected
          ? "bg-gold text-black border-gold"
          : "border-border hover:border-gold/50"
      }`}
      style={!selected ? { backgroundColor: getSectionColor(seat.section) + "33" } : undefined}
      title={`${seat.row}${seat.number} - ${getSectionLabel(seat.section)}`}
    >
      {seat.number}
    </button>
  );
}

function BookingDialog({
  event,
  open,
  onClose,
}: {
  event: LiveEvent | null;
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"seats" | "details" | "confirm">("seats");
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bookingId, setBookingId] = useState("");
  const addBooking = useBookingStore((s) => s.addBooking);

  const seats = useMemo(
    () => (event ? generateSeatMap(event.pricing) : []),
    [event]
  );

  const sections: SeatSection[] = ["vip", "premium", "regular"];

  const total = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  const toggleSeat = (seat: Seat) => {
    setSelectedSeats((prev) => {
      const exists = prev.find((s) => s.id === seat.id);
      if (exists) return prev.filter((s) => s.id !== seat.id);
      if (prev.length >= 6) {
        toast.error("Maximum 6 seats per booking");
        return prev;
      }
      return [...prev, seat];
    });
  };

  const handleConfirm = () => {
    if (!event || !name || !email) return;
    const id = `IGL-${Date.now().toString(36).toUpperCase()}`;
    setBookingId(id);
    addBooking({
      id,
      eventId: event.id,
      eventTitle: event.title,
      venue: event.venue,
      date: event.date,
      time: event.time,
      seats: selectedSeats.map((s) => ({
        section: getSectionLabel(s.section),
        seatId: s.id,
        price: s.price,
      })),
      totalAmount: total,
      customerName: name,
      customerEmail: email,
      bookedAt: new Date().toISOString(),
    });
    setStep("confirm");
    toast.success("Booking confirmed!");
  };

  const handleClose = () => {
    setStep("seats");
    setSelectedSeats([]);
    setName("");
    setEmail("");
    setBookingId("");
    onClose();
  };

  const handleDownload = () => {
    if (!event) return;
    const ticketDetails = `
========================================
       INDIA'S GOT LATENT TICKET
========================================
Booking ID: ${bookingId}
Event: ${event.title}
Venue: ${event.venue}, ${event.city}
Date: ${event.date}
Time: ${event.time}
Seats: ${selectedSeats.map(s => `${getSectionLabel(s.section)} Row ${s.row}-${s.number}`).join(", ")}
Total Paid: ₹${total.toLocaleString("en-IN")}
Attendee: ${name} (${email})
----------------------------------------
Please present the QR code at the door.
========================================
`;
    const element = document.createElement("a");
    const file = new Blob([ticketDetails], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `IGL-Ticket-${bookingId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Ticket downloaded successfully!");
  };

  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            {step === "confirm" ? "Booking Confirmed" : event.title}
          </DialogTitle>
        </DialogHeader>

        {step === "seats" && (
          <div>
            <div className="flex flex-wrap gap-4 mb-6 text-sm">
              {sections.map((section) => (
                <div key={section} className="flex items-center gap-2">
                  <div
                    className="h-4 w-4 border border-border"
                    style={{ backgroundColor: getSectionColor(section) + "55" }}
                  />
                  <span>{getSectionLabel(section)} — {formatPrice(event.pricing[section])}</span>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-[#1a1a1a] border border-border opacity-30" />
                <span className="text-text-secondary">Sold</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gold border border-gold" />
                <span className="text-text-secondary">Selected</span>
              </div>
            </div>

            <div className="mb-4 text-center">
              <div className="inline-block px-16 py-2 bg-crimson/20 border border-crimson/30 text-xs tracking-[0.3em] uppercase text-crimson mb-6">
                Stage
              </div>
            </div>

            <div className="space-y-3 overflow-x-auto pb-4">
              {sections.map((section) => {
                const sectionSeats = seats.filter((s) => s.section === section);
                const rows = [...new Set(sectionSeats.map((s) => s.row))];
                return (
                  <div key={section} className="mb-4">
                    <p className="text-[10px] tracking-wider uppercase text-text-secondary mb-2">
                      {getSectionLabel(section)}
                    </p>
                    {rows.map((row) => (
                      <div key={row} className="flex items-center gap-2 mb-1">
                        <span className="w-4 text-[10px] text-text-secondary">{row}</span>
                        <div className="flex gap-1">
                          {sectionSeats
                            .filter((s) => s.row === row)
                            .map((seat) => (
                              <SeatButton
                                key={seat.id}
                                seat={seat}
                                selected={selectedSeats.some((s) => s.id === seat.id)}
                                onToggle={toggleSeat}
                              />
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4 mt-4">
              <div>
                <p className="text-sm text-text-secondary">
                  {selectedSeats.length} seat{selectedSeats.length !== 1 ? "s" : ""} selected
                </p>
                <p className="font-heading text-xl font-bold">
                  {total > 0 ? formatPrice(total) : "—"}
                </p>
              </div>
              <Button
                onClick={() => setStep("details")}
                disabled={selectedSeats.length === 0}
                className="bg-crimson hover:bg-crimson/90 font-semibold"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === "details" && (
          <div className="space-y-6">
            <div className="border border-border bg-surface p-4">
              <p className="text-sm font-semibold mb-2">{event.title}</p>
              <p className="text-xs text-text-secondary">
                {formatDate(event.date)} · {event.time} · {event.venue}
              </p>
              <div className="mt-3 space-y-1">
                {selectedSeats.map((s) => (
                  <p key={s.id} className="text-xs">
                    {getSectionLabel(s.section)} — Row {s.row}, Seat {s.number} — {formatPrice(s.price)}
                  </p>
                ))}
              </div>
              <p className="mt-3 font-semibold">Total: {formatPrice(total)}</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 bg-surface border-border"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 bg-surface border-border"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("seats")} className="border-border">
                Back
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={!name || !email}
                className="flex-1 bg-crimson hover:bg-crimson/90 font-semibold"
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        )}

        {step === "confirm" && (
          <div className="text-center py-4">
            <div className="flex h-16 w-16 items-center justify-center bg-gold/10 border border-gold/30 mx-auto mb-6">
              <Check className="h-8 w-8 text-gold" />
            </div>
            <p className="font-heading text-2xl font-bold mb-2">You&apos;re In</p>
            <p className="text-sm text-text-secondary mb-6">
              Booking ID: <span className="text-gold font-mono">{bookingId}</span>
            </p>
            <div className="inline-block border border-border bg-white p-4 mb-6">
              <QRCodeSVG
                value={JSON.stringify({
                  id: bookingId,
                  event: event.title,
                  seats: selectedSeats.map((s) => s.id),
                  total,
                })}
                size={160}
                level="H"
              />
            </div>
            <p className="text-xs text-text-secondary mb-6">
              Show this QR code at the venue entrance. A confirmation has been sent to {email}.
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={handleDownload} variant="outline" className="border-border hover:bg-surface font-semibold">
                Download Ticket
              </Button>
              <Button onClick={handleClose} className="bg-crimson hover:bg-crimson/90 font-semibold">
                Done
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function LiveShowsPage() {
  const [selectedEvent, setSelectedEvent] = useState<LiveEvent | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleBook = (event: LiveEvent) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <MotionSection>
          <SectionHeader
            label="Live Events"
            title="Upcoming Shows"
            description="Experience the chaos live. Select your city, pick your seat, and join the audience."
          />
        </MotionSection>

        <div className="grid md:grid-cols-2 gap-8">
          {liveEvents.map((event, i) => (
            <MotionSection key={event.id} delay={i * 0.1}>
              <EventCard event={event} onBook={handleBook} />
            </MotionSection>
          ))}
        </div>
      </div>

      <BookingDialog
        event={selectedEvent}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
}
