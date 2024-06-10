import { create } from 'zustand';
//포인트
interface Transaction {
  transactionId: string;
  amount: string;
  transactionType: string;
  createdAt: string;
  balance: string;
  userId: string;
}
interface UserPointStore {
  point: string;
  transactions: Transaction[];
  setPoint: (point: string) => void;
  updatePoint: (transaction: Transaction) => void;
}
export const userPointStore = create<UserPointStore>(set => ({
  point: '0',
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
  productId: string;
  productName: string;
  price: string;
  description: string;
  stock: string;
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
