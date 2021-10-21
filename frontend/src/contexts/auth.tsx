import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
    id: string;
    name: string;
    login: string;
    avatar_url: string;
};

type AuthContextData = {
    user: User | null;
    signInUrl: string;
    signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextData);

type AuthProvider = {
    children: ReactNode;
};

type AuthResponse = {
    token: string;
    user: {
        id: string;
        avatar_url: string;
        name: string;
        login: string;
    }
};

export const AuthProvider = (props: AuthProvider) => {
    const [user, setUser] = useState<User | null>(null);
    
    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=1e601fcc746dd1039bcf`;

    const signIn = async (githubCode: string) => {
        const response = await api.post<AuthResponse>("/authenticate", {
            code: githubCode
        });

        const { token, user } = response.data;

        localStorage.setItem("@dowhile:token", token);

        api.defaults.headers.common.authorization = `Bearer ${token}`;

        setUser(user);
    };

    const signOut = () => {
        setUser(null);
        localStorage.removeItem("@dowhile:token");
    };

    useEffect(() => {
        const token = localStorage.getItem("@dowhile:token");

        if (token) {
            api.defaults.headers.common.authorization = `Bearer ${token}`;

            api.get<User>("profile").then(response => {
                setUser(response.data);
            });
        };
    });

    useEffect(() => {
        const url = window.location.href;
        const hasGithubCode = url.includes("?code=");

        if (hasGithubCode) {
            const [urlWithoutCode, githubCode] = url.split("?code=");

            window.history.pushState({}, "", urlWithoutCode);

            signIn(githubCode);
        };
    }, []);
    
    return (
        <AuthContext.Provider value={{ signInUrl, user, signOut }}>
            {props.children}
        </AuthContext.Provider>
    );
};