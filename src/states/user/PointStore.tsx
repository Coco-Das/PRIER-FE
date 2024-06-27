import { create } from 'zustand';
//포인트
interface Transaction {
  amount: number;
  balance: number;
  createdAt: string;
  transactionId: number;
  transactionType: string;
  userId: number;
  tid: string | null;
}
interface UserPointStore {
  point: number;
  transactions: Transaction[];
  setPoint: (point: number) => void;
  updatePoint: (transaction: Transaction) => void;
}
export const userPointStore = create<UserPointStore>(set => ({
  point: 0,
  transactions: [],
  setPoint: point => set({ point }),
  updatePoint: transaction =>
    set(state => ({
      point: transaction.balance,
      transactions: [...state.transactions, transaction],
    })),
}));

//기프티콘
interface Gifticon {
  productId: number;
  productName: string;
  price: number;
  description: string;
  stock: number;
  imageUrl: string;
}

interface GifticonStore {
  gifticons: Gifticon[];
  setGifticons: (gifticons: Gifticon[]) => void;
}

export const useGifticonStore = create<GifticonStore>(set => ({
  gifticons: [],
  setGifticons: gifticons => set({ gifticons }),
}));
