import React, { createContext, useContext } from "react";
import { useQuery, UseQueryResult } from "react-query";

interface UserProfile {
  userId: string;
  roleName: string;
  userName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  emailConfirmed: boolean;
  roleDescription: string;
}

interface UserProfileContextType {
  userProfile: UserProfile | null;
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<UseQueryResult<UserProfile>>;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchUserProfile = async (): Promise<UserProfile> => {
    const token = localStorage.getItem("jwtToken");
    const response = await fetch(`${apiUrl}/api/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    return await response.json();
  };

  const {
    data: userProfile,
    isLoading,
    isError,
    refetch,
  } = useQuery<UserProfile>({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    enabled: !!localStorage.getItem("jwtToken"),
    staleTime: 1000 * 60 * 5,
  });

  return (
      <UserProfileContext.Provider value={{ userProfile: userProfile ?? null, isLoading, isError, refetch }}>
        {children}
      </UserProfileContext.Provider>
  );
};

export const useUserProfile = (): UserProfileContextType => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
};
