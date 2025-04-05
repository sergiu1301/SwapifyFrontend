import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("jwtToken");
        queryClient.removeQueries({ queryKey: ["userProfile"] });
        navigate("/login");
    };

    return logout;
};
