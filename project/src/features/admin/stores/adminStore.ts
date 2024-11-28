import { create } from 'zustand';
import { User, Professional } from '../../../types';

interface AdminStore {
  users: User[];
  professionals: Professional[];
  pendingApprovals: Professional[];
  stats: {
    totalUsers: number;
    activeBookings: number;
    revenue: number;
    averageRating: number;
  };
  fetchUsers: () => Promise<void>;
  fetchProfessionals: () => Promise<void>;
  fetchStats: () => Promise<void>;
  approveProvider: (id: string) => Promise<void>;
  rejectProvider: (id: string) => Promise<void>;
}

export const useAdminStore = create<AdminStore>((set) => ({
  users: [],
  professionals: [],
  pendingApprovals: [],
  stats: {
    totalUsers: 0,
    activeBookings: 0,
    revenue: 0,
    averageRating: 0,
  },
  fetchUsers: async () => {
    // Implementation will be added when backend is ready
  },
  fetchProfessionals: async () => {
    // Implementation will be added when backend is ready
  },
  fetchStats: async () => {
    // Implementation will be added when backend is ready
  },
  approveProvider: async (id) => {
    // Implementation will be added when backend is ready
  },
  rejectProvider: async (id) => {
    // Implementation will be added when backend is ready
  },
}));