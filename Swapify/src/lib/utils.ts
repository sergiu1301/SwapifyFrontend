interface ValidateEmailProps {
    email: string;
    setEmailError: (error: string) => void;
}

interface ValidatePasswordProps {
    password: string;
    setPasswordError: (error: string) => void;
}

interface ValidateConfirmPasswordProps {
    password: string;
    confirmPassword: string;
    setConfirmPasswordError: (error: string) => void;
}

export const validateEmail = ({email, setEmailError} : ValidateEmailProps): boolean => {
    const re =
        /^(?!.{255})(?![^@]{65})((([^<>()\[\]\\.,;:\s@""]+(\.[^<>()\[\]\\.,;:\s@""]+)*)|("".+"")))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email))) {
        setEmailError("Invalid email format");
        return false;
    }
    setEmailError("");
    return true;
};

export const validatePassword = ({password, setPasswordError} : ValidatePasswordProps): boolean => {
    const re =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$%^&£*\-_+=[\]{}|\\:',?\/`~""()<>;!]{10,32}$/;

    if (!re.test(String(password))) {
        setPasswordError(
            "The password must contain uppercase, lowercase letters, special characters and numbers",
        );
        return false;
    }

    if (password.length < 8) {
        setPasswordError("Password must be at least 10 characters long");
        return false;
    }
    setPasswordError("");
    return true;
};

export const validateConfirmPassword = (
    {password, confirmPassword, setConfirmPasswordError} : ValidateConfirmPasswordProps
): boolean => {
    if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match");
        return false;
    }
    setConfirmPasswordError("");
    return true;
};