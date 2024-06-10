import { create } from 'zustand';

interface Transaction {
  transactionId: number;
  amount: number;
  transactionType: string;
  createdAt: string;
  balance: number;
  userId: number;
}
interface UserPointStore {
  point: number;
  transactions: Transaction[];
  updatePoint: (transaction: Transaction) => void;
}
export const userPointStore = create<UserPointStore>(set => ({
  point: 0,
  transactions: [],
  updatePoint: transaction =>
    set(state => ({
      point: transaction.balance,
      transactions: [...state.transactions, transaction],
    })),
}));
