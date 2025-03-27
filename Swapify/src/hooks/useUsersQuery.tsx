import { useQuery } from "react-query";

const fetchUsers = async (page: number, rowsPerPage: number, searchQuery: string, token: string, apiUrl: string) => {
    const response = await fetch(
        `${apiUrl}/api/v1/admin/users?pageNumber=${page + 1}&pageSize=${rowsPerPage}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(searchQuery),
        }
    );
    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }
    return await response.json();
};

const useUsersQuery = ({ page, rowsPerPage, searchQuery, enabled }: {
    page: number;
    rowsPerPage: number;
    searchQuery: string;
    enabled: boolean;
}) => {
    const token = localStorage.getItem("jwtToken") || "";
    const apiUrl = import.meta.env.VITE_API_URL;

    return useQuery(["users", page, rowsPerPage, searchQuery], () =>
        fetchUsers(page, rowsPerPage, searchQuery, token, apiUrl), {
        enabled: enabled && !!token,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};

export default useUsersQuery;