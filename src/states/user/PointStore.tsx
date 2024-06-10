import { create } from 'zustand';

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
