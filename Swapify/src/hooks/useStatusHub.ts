import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect } from "react";
import { useOnlineUsersStore } from "../store/OnlineUsersStore";
import { useUserProfile } from "../UserProfileProvider";

const useStatusHub = () => {
    const { userProfile, isLoading } = useUserProfile();
    const setUserOnline = useOnlineUsersStore((s) => s.setUserOnline);
    const setUserOffline = useOnlineUsersStore((s) => s.setUserOffline);
    const setAllOnlineUsers = useOnlineUsersStore((s) => s.setBulkOnlineUsers);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (!token || !userProfile || isLoading) return;

        const connection = new HubConnectionBuilder()
            .withUrl(`${import.meta.env.VITE_API_URL}/hub/status?access_token=${token}`)
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(() => {
                console.log("✅ Connected to StatusHub");
            });

        connection.on("UserStatusChanged", (userId: string, isOnline: boolean) => {
            if (isOnline) {
                setUserOnline(userId);
            } else {
                setUserOffline(userId);
            }
        });

        connection.on("OnlineUsers", (onlineUsers: string[]) => {
            setAllOnlineUsers(onlineUsers); // adaugi toți userii într-un Zustand store
        });

        return () => {
            connection.stop().then(() => {
                console.log("👋 Disconnected from StatusHub gracefully.");
            });
        };
    }, [userProfile, isLoading, setUserOnline, setUserOffline]);
};

export default useStatusHub;
