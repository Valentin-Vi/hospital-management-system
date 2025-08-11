import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { type User, type DefaultUser } from '../models/User';
import AuthService from '../services/AuthServices';

export type AuthContext = {
    user: User | DefaultUser;
    isLoading: true | false;
    setUser: ({ email, name, lastname, type }: User) => void,
    setIsLoading: (state: true | false) => void
};

export type Props = {
    children?: ReactNode
};

const defaultUser: DefaultUser = {
    email: null,
    name: null,
    lastname: null,
    type: 'VISITOR'
};

const AuthContext = createContext<AuthContext>({} as AuthContext);

export function AuthProvider({ children }: Props) {

    const service = new AuthService();

    const [user, setUser] = useState<User | DefaultUser>(defaultUser);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        service.refresh()
            .then((user: User | null) => {
                user ? setUser(user) : null;
            })
            .catch(error => {
                console.error("Error refreshing auth:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoading, setUser, setIsLoading }}>
            { children }
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('\"useAuth\" hook must be used within an \"AuthProvider\" component.');
    };
    return context;
};
