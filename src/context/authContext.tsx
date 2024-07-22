'use client'

import { useContext, useState, ReactNode, useLayoutEffect, FC } from "react"
import { createContext } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { formatISO } from 'date-fns';

interface AuthContextProps {
    loginToken: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    darkMode: boolean;
    handleDarkMode: () => void;
    getCurrentUTCDate: () => string;
    setDarkMode: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [loginToken, setLoginToken] = useState<string | null>(null);
    const router = useRouter();

    useLayoutEffect(() => {
        const savedDarkMode = localStorage.getItem("darkMode");
        if (savedDarkMode !== null) {
            setDarkMode(savedDarkMode === 'true');
        }
    }, []);

    useLayoutEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const handleDarkMode = () => {
        setDarkMode(prevDarkMode => {
            const newDarkMode = !prevDarkMode;
            localStorage.setItem("darkMode", newDarkMode.toString());
            return newDarkMode;
        });
    };

    const login = async (email: string, password: string) => {
        const data = { email, password };
        try {
            Cookies.set('token', JSON.stringify(data));
            router.push("/profile");
        } catch (err) {
            console.error(err);
        }
    };

    const register = async (email: string, password: string) => {
        try {
            console.log("hola");
        } catch (err) {
            console.error(err);
        }
    };

    const logout = async () => {
        Cookies.remove('token');
        router.push("/login");
    };

    const getCurrentUTCDate = () => {
        const now = new Date();
        return formatISO(now, { representation: 'complete' });
    };

    return (
        <AuthContext.Provider value={{ loginToken, login, register, darkMode, handleDarkMode, logout, getCurrentUTCDate , setDarkMode }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}