import { create } from "zustand";

interface OnlineUsersStore {
    onlineUserIds: Set<string>;
    setUserOnline: (userId: string) => void;
    setUserOffline: (userId: string) => void;
    isUserOnline: (userId: string) => boolean;
    setBulkOnlineUsers: (ids: string[]) => void;
}

export const useOnlineUsersStore = create<OnlineUsersStore>((set, get) => ({
    onlineUserIds: new Set(),

    setUserOnline: (userId: string) =>
        set((state) => {
            const updated = new Set(state.onlineUserIds);
            updated.add(userId);
            return { onlineUserIds: updated };
        }),

    setUserOffline: (userId: string) =>
        set((state) => {
            const updated = new Set(state.onlineUserIds);
            updated.delete(userId);
            return { onlineUserIds: updated };
        }),

    isUserOnline: (userId: string) => get().onlineUserIds.has(userId),

    setBulkOnlineUsers: (ids: string[]) =>
        set(() => ({
            onlineUserIds: new Set(ids),
        })),
}));
