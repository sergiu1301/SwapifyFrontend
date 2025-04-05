export interface UpdateUserRequest {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    userName?: string;
}

export const updateUser = async (data: UpdateUserRequest) => {
    const token = localStorage.getItem("jwtToken");

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to update user");
    }
};
