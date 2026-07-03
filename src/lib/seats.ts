export type SeatSection = "vip" | "premium" | "regular";

export interface Seat {
  id: string;
  row: string;
  number: number;
  section: SeatSection;
  price: number;
  available: boolean;
}

const SECTION_PRICES: Record<SeatSection, number> = {
  vip: 4999,
  premium: 2499,
  regular: 999,
};

const SECTION_ROWS: Record<SeatSection, { rows: string[]; seatsPerRow: number }> = {
  vip: { rows: ["A", "B"], seatsPerRow: 8 },
  premium: { rows: ["C", "D", "E", "F"], seatsPerRow: 12 },
  regular: { rows: ["G", "H", "I", "J", "K", "L", "M", "N"], seatsPerRow: 16 },
};

const OCCUPIED_SEATS = new Set([
  "A-3", "A-5", "A-7", "B-2", "B-6", "B-8",
  "C-4", "C-8", "C-11", "D-1", "D-7", "D-12",
  "E-3", "E-9", "F-5", "F-10",
  "G-2", "G-7", "G-14", "H-5", "H-11", "I-3", "I-9", "J-6", "J-12",
  "K-1", "K-8", "L-4", "L-10", "M-6", "N-3", "N-9",
]);

export function generateSeatMap(eventPricing?: {
  vip: number;
  premium: number;
  regular: number;
}): Seat[] {
  const prices = eventPricing || SECTION_PRICES;
  const seats: Seat[] = [];

  for (const [section, config] of Object.entries(SECTION_ROWS) as [
    SeatSection,
    { rows: string[]; seatsPerRow: number }
  ][]) {
    for (const row of config.rows) {
      for (let num = 1; num <= config.seatsPerRow; num++) {
        const id = `${row}-${num}`;
        seats.push({
          id,
          row,
          number: num,
          section,
          price: prices[section],
          available: !OCCUPIED_SEATS.has(id),
        });
      }
    }
  }

  return seats;
}

export function getSectionLabel(section: SeatSection): string {
  const labels: Record<SeatSection, string> = {
    vip: "VIP",
    premium: "Premium",
    regular: "Regular",
  };
  return labels[section];
}

export function getSectionColor(section: SeatSection): string {
  const colors: Record<SeatSection, string> = {
    vip: "#C6A664",
    premium: "#A32020",
    regular: "#4A4A4A",
  };
  return colors[section];
}
