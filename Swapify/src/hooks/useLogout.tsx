import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const logout = () => {
        localStorage.removeItem("jwtToken");
        queryClient.removeQueries({ queryKey: ["userProfile"] });
        navigate("/");
    };

    return logout;
};
