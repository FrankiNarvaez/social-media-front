'use client'

import { useContext, useState, ReactNode,  useLayoutEffect , FC } from "react"
import { createContext } from "react"
import Cookies from "js-cookie"
import Router from "next/navigation"
import { useRouter } from "next/navigation"
import { formatISO } from 'date-fns';

interface AuthContextProps {
    loginToken: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;

    logout: () => Promise<void>;
    darkMode: boolean | null;
    handleDarkMode : () => void|null;
    getCurrentUTCDate: () => string;

}

const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [ darkMode  , setdarkMode ] = useState(true);
    const [loginToken, setloginToken] = useState<any>("Hola");
    const router = useRouter()        
    const login = async (email: string, password: string  ) => {

        const data = {
            email: email,
            password: password
        }
        try {
            Cookies.set('token', JSON.stringify(data))
            router.push("/profile")
        }
        catch (err) {
            console.error(err)
        }
    }

    const register = async (email: string, password: string) => {
        try {
            console.log("hola")
        }
        catch (err) {
            console.error(err)
        }
    }
    const handleDarkMode = () =>{
        
        setdarkMode(!darkMode)
        window.localStorage.setItem("darkMode" , darkMode.toString() )
        console.log(darkMode)
    }
    
    useLayoutEffect(() => {
        const stringToBoolean = (str:string|null) :boolean => str === 'true';
        const state = window.localStorage.getItem("darkMode")

        if (state == "true") {
        document.documentElement.classList.add('dark');
        } else {
        document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const logout = async () => {
        Cookies.remove('token')
        router.push("/login")
        
    }
    const getCurrentUTCDate = () => {
        const now = new Date();
        return formatISO(now, { representation: 'complete' });
      };

    return (
        <AuthContext.Provider value={{ loginToken, login, register , darkMode , handleDarkMode, logout, getCurrentUTCDate }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Error")
    }
    return context;
}
