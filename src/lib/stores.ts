import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

export interface Booking {
  id: string;
  eventId: string;
  eventTitle: string;
  venue: string;
  date: string;
  time: string;
  seats: { section: string; seatId: string; price: number }[];
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  bookedAt: string;
}

export interface AuditionSubmission {
  id: string;
  fullName: string;
  age: number;
  city: string;
  category: string;
  instagram: string;
  bio: string;
  status: "under_review" | "shortlisted" | "selected" | "rejected";
  submittedAt: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

interface BookingStore {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
}

interface AuditionStore {
  submissions: AuditionSubmission[];
  addSubmission: (submission: AuditionSubmission) => void;
  updateStatus: (id: string, status: AuditionSubmission["status"]) => void;
}

interface NotificationStore {
  email: string;
  pushEnabled: boolean;
  setEmail: (email: string) => void;
  setPushEnabled: (enabled: boolean) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && i.size === item.size
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId && i.size === item.size
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (productId, size) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.size === size)
          ),
        })),
      updateQuantity: (productId, size, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.size === size
              ? { ...i, quantity: Math.max(1, quantity) }
              : i
          ),
        })),
      clearCart: () => set({ items: [] }),
      total: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: "igl-cart" }
  )
);

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      bookings: [],
      addBooking: (booking) =>
        set((state) => ({ bookings: [...state.bookings, booking] })),
    }),
    { name: "igl-bookings" }
  )
);

export const useAuditionStore = create<AuditionStore>()(
  persist(
    (set) => ({
      submissions: [],
      addSubmission: (submission) =>
        set((state) => ({
          submissions: [...state.submissions, submission],
        })),
      updateStatus: (id, status) =>
        set((state) => ({
          submissions: state.submissions.map((s) =>
            s.id === id ? { ...s, status } : s
          ),
        })),
    }),
    { name: "igl-auditions" }
  )
);

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set) => ({
      email: "",
      pushEnabled: false,
      setEmail: (email) => set({ email }),
      setPushEnabled: (pushEnabled) => set({ pushEnabled }),
    }),
    { name: "igl-notifications" }
  )
);
