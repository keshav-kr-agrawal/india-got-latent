export interface LiveEvent {
  id: string;
  title: string;
  venue: string;
  city: string;
  date: string;
  time: string;
  limitedSeats: number;
  totalSeats: number;
  pricing: { vip: number; premium: number; regular: number };
  image: string;
  featured?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  limited?: boolean;
  sizes?: string[];
}

export interface Episode {
  id: string;
  title: string;
  guest: string;
  thumbnail: string;
  duration: string;
  views: string;
  date: string;
  embeddable?: boolean;
}

export interface Guest {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Sponsor {
  id: string;
  name: string;
  tier: "title" | "presenting" | "associate" | "partner";
  logo: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
}

export const NEXT_EVENT_DATE = new Date("2026-07-18T19:00:00+05:30");

export const liveEvents: LiveEvent[] = [
  {
    id: "mumbai-001",
    title: "Chaos Night — Mumbai Edition",
    venue: "NSCI Dome",
    city: "Mumbai",
    date: "2026-07-18",
    time: "7:00 PM",
    limitedSeats: 47,
    totalSeats: 2500,
    pricing: { vip: 4999, premium: 2499, regular: 999 },
    image: "/assets/gallery/event-1.jpg",
    featured: true,
  },
  {
    id: "delhi-002",
    title: "Underground Roast — Delhi",
    venue: "Indira Gandhi Arena",
    city: "Delhi",
    date: "2026-08-02",
    time: "6:30 PM",
    limitedSeats: 120,
    totalSeats: 3000,
    pricing: { vip: 4499, premium: 1999, regular: 799 },
    image: "/assets/gallery/event-2.jpg",
  },
  {
    id: "bangalore-003",
    title: "Tech Roast Special",
    venue: "Palace Grounds",
    city: "Bangalore",
    date: "2026-08-15",
    time: "7:30 PM",
    limitedSeats: 85,
    totalSeats: 2000,
    pricing: { vip: 3999, premium: 1799, regular: 699 },
    image: "/assets/gallery/event-3.jpg",
  },
  {
    id: "hyderabad-004",
    title: "Biryani & Banter Live",
    venue: "Gachibowli Stadium",
    city: "Hyderabad",
    date: "2026-09-01",
    time: "7:00 PM",
    limitedSeats: 200,
    totalSeats: 1800,
    pricing: { vip: 3499, premium: 1499, regular: 599 },
    image: "/assets/gallery/event-4.jpg",
  },
];

export const products: Product[] = [
  {
    id: "hoodie-black",
    name: "Chaos Oversized Hoodie",
    category: "Apparel",
    price: 2499,
    image: "/assets/gallery/merch-1.jpg",
    description: "Premium heavyweight cotton oversized hoodie with embroidered IGL logo. Limited drop.",
    limited: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "cap-signature",
    name: "Latent Signature Cap",
    category: "Accessories",
    price: 899,
    image: "/assets/gallery/merch-2.jpg",
    description: "Structured 6-panel cap with gold embroidered logo. One size fits all.",
    sizes: ["One Size"],
  },
  {
    id: "poster-limited",
    name: "Season 1 Limited Poster",
    category: "Collectibles",
    price: 599,
    image: "/assets/gallery/merch-3.jpg",
    description: "A2 archival print, numbered edition of 500. Signed by the creators.",
    limited: true,
  },
  {
    id: "tee-underground",
    name: "Underground Culture Tee",
    category: "Apparel",
    price: 1299,
    image: "/assets/gallery/merch-4.jpg",
    description: "Premium combed cotton tee with screen-printed artwork from Season 1.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "bundle-vip",
    name: "VIP Fan Bundle",
    category: "Bundles",
    price: 4999,
    image: "/assets/gallery/merch-5.jpg",
    description: "Hoodie + Cap + Poster + Exclusive pin. Save ₹900.",
    limited: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "mug-stage",
    name: "Backstage Mug",
    category: "Accessories",
    price: 699,
    image: "/assets/gallery/merch-6.jpg",
    description: "Ceramic mug with heat-reactive design. Microwave safe.",
    sizes: ["One Size"],
  },
];

export const episodes: Episode[] = [
  { id: "c35fpGWqXnk", title: "INDIA’S GOT LATENT S2 EP2 ft. Harsh Limbachiya, Kiku Sharda, Chandan Prabhakar", guest: "Harsh & Kiku", thumbnail: "/assets/latent/episode-s2-ep2.jpg", duration: "1h 45m", views: "12M+", date: "Jun 28, 2026", embeddable: true },
  { id: "eHTXQW58WhA", title: "INDIA’S GOT LATENT S2 EP1 ft. Alia Bhatt, Sharvari, Ashish Solanki", guest: "Alia & Sharvari", thumbnail: "/assets/latent/episode-s2-ep1.jpg", duration: "1h 58m", views: "55M+", date: "Jun 20, 2026", embeddable: true },
  { id: "5Y1LC7IoWxs", title: "FIRST EVER PERFORMANCE OF INDIA'S GOT LATENT", guest: "Show Opener", thumbnail: "/assets/latent/episode-opener.jpg", duration: "8m 15s", views: "4.8M", date: "Jul 10, 2024", embeddable: true },
  { id: "KhOy1YO1dRc", title: "INDIA'S GOT LATENT | Episode Roast Highlights ft. Ashish, Ranveer, Apoorva", guest: "Ashish & Ranveer", thumbnail: "/assets/latent/clip-comedy.jpg", duration: "12m 45s", views: "9.5M+", date: "Dec 5, 2024", embeddable: true },
  { id: "3RjeyQzrrvQ", title: "EPIC FLUTE & BEATBOX FUSION INDIAS GOT LATENT | PRANAV SUBRAMANIAN & ADVAIYA", guest: "Pranav & Advaiya", thumbnail: "/assets/latent/clip-beatbox.jpg", duration: "6m 12s", views: "2.1M", date: "Jul 15, 2024", embeddable: true }
];

export const featuredGuests: Guest[] = [
  { id: "g1", name: "Samay Raina", role: "Host & Creator", image: "/assets/founders/samay-raina-main.jpg", bio: "Chess streamer turned chaos architect." },
  { id: "g2", name: "Tanmay Bhat", role: "Executive Producer", image: "/assets/team/tanmay.jpg", bio: "Comedy veteran and internet culture pioneer." },
  { id: "g3", name: "Kunal Kamra", role: "Special Guest", image: "/assets/team/kunal.jpg", bio: "Stand-up comedian and political satirist." },
  { id: "g4", name: "Rohan Joshi", role: "Roast Master", image: "/assets/team/rohan.jpg", bio: "AIB co-founder and sharp-witted commentator." },
];

export const sponsors: Sponsor[] = [
  { id: "s1", name: "Spotify", tier: "title", logo: "Spotify" },
  { id: "s2", name: "Swiggy", tier: "presenting", logo: "Swiggy" },
  { id: "s3", name: "CRED", tier: "presenting", logo: "CRED" },
  { id: "s4", name: "BoAt", tier: "associate", logo: "BoAt" },
  { id: "s5", name: "Dream11", tier: "associate", logo: "Dream11" },
  { id: "s6", name: "Zomato", tier: "partner", logo: "Zomato" },
  { id: "s7", name: "PhonePe", tier: "partner", logo: "PhonePe" },
  { id: "s8", name: "Myntra", tier: "partner", logo: "Myntra" },
];

export const testimonials: Testimonial[] = [
  { id: "t1", name: "Arjun Mehta", location: "Mumbai", quote: "I've been to IPL finals and comedy shows across India. Nothing comes close to the energy of IGL live. It's controlled chaos at its finest.", rating: 5 },
  { id: "t2", name: "Priya Sharma", location: "Delhi", quote: "The audition process was surprisingly professional. Felt like applying to a real production house, not some random internet thing.", rating: 5 },
  { id: "t3", name: "Rahul K.", location: "Bangalore", quote: "Backstage Club membership is worth every rupee. Early ticket access alone saved me from scalpers.", rating: 5 },
  { id: "t4", name: "Ananya D.", location: "Hyderabad", quote: "The merch quality is insane. The hoodie feels like something you'd buy from a luxury streetwear brand.", rating: 4 },
];

export const faqs = [
  { q: "What is India's Got Latent?", a: "India's Got Latent is a premium live entertainment platform combining stand-up comedy, talent discovery, creator participation, and unfiltered audience engagement. Think of it as the official digital home for India's most chaotic talent stage." },
  { q: "How do I book tickets?", a: "Navigate to Live Shows, select your city and event, choose your seat tier (VIP, Premium, or Regular), and complete the booking. You'll receive a QR ticket instantly." },
  { q: "How does the audition process work?", a: "Submit your performance video through our Auditions portal. Our production team reviews every submission. Track your status in real-time — from Under Review to Shortlisted, Selected, or feedback on next steps." },
  { q: "What's included in membership?", a: "Latent Insider (₹299/mo) gives early ticket access and community voting. Backstage Club (₹799/mo) adds private episodes, creator meetups, and exclusive content." },
  { q: "Are the live shows family-friendly?", a: "IGL shows are rated 16+. Content includes adult humour, strong language, and unfiltered commentary. Viewer discretion is advised." },
  { q: "Can I get a refund on tickets?", a: "Tickets are refundable up to 7 days before the event. Within 7 days, transfers to another person are allowed via your account dashboard." },
];

export const communityPosts = [
  { id: "c1", type: "vote", title: "Vote: Next Guest", author: "IGL Team", avatar: "/assets/team/avatar-1.jpg", votes: 1247, content: "Who should roast the startup ecosystem next?", options: ["Anubhav Singh Bassi", "Zakir Khan", "Abhishek Upmanyu", "Munawar Faruqui"] },
  { id: "c2", type: "challenge", title: "Suggest a Challenge", author: "Priya Sharma", avatar: "/assets/team/avatar-2.jpg", votes: 892, content: "Blindfolded stand-up — comedian performs without seeing the audience reactions." },
  { id: "c3", type: "talent", title: "Wild Talent Idea", author: "Rohit Kumar", avatar: "/assets/team/avatar-3.jpg", votes: 634, content: "Rap battle between two CEOs — live on stage with a ₹10L charity bet." },
  { id: "c4", type: "meme", title: "Meme of the Week", author: "Arjun Mehta", avatar: "/assets/team/avatar-4.jpg", votes: 2103, content: "That moment when the judge said 'this is not a comedy show, this is a therapy session'" },
];

export const talentCategories = [
  "Stand-up Comedy",
  "Roast Battle",
  "Musical Performance",
  "Magic & Illusion",
  "Dance",
  "Spoken Word",
  "Improv",
  "Ventriloquism",
  "Other",
];

export const membershipTiers = [
  {
    id: "insider",
    name: "Latent Insider",
    price: 299,
    period: "month",
    features: [
      "Early access to ticket sales (48hr head start)",
      "Community voting on guests & challenges",
      "Exclusive Discord channel access",
      "Monthly newsletter with behind-the-scenes",
      "10% merch discount",
    ],
    highlighted: false,
  },
  {
    id: "backstage",
    name: "Backstage Club",
    price: 799,
    period: "month",
    features: [
      "Everything in Latent Insider",
      "Private unaired episode access",
      "Monthly virtual meet with creators",
      "Priority audition review",
      "VIP waitlist for all live shows",
      "Exclusive Backstage Club merch drops",
      "Name in episode credits",
    ],
    highlighted: true,
  },
];
