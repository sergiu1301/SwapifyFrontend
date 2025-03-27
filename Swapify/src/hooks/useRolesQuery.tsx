import { useQuery } from "react-query";

const fetchRoles = async (token: string, apiUrl: string) => {
    const response = await fetch(`${apiUrl}/api/v1/admin/roles`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch roles");
    }
    return await response.json();
};

const useRolesQuery = ({ enabled }: { enabled: boolean }) => {
    const token = localStorage.getItem("jwtToken") || "";
    const apiUrl = import.meta.env.VITE_API_URL;

    return useQuery(["roles"], () => fetchRoles(token, apiUrl), {
        enabled: enabled && !!token,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};

export default useRolesQuery;
