import { Navigate, Outlet, useLocation } from 'react-router'
import useAuth from './AuthProvider'
import Loading from '../pages/LoadingPage/LoadingPage';
import type { UserType } from '../models/User';

export type Props = {
    authorizedRoles: UserType[],
};

export default function ProtectedRoute({ authorizedRoles }: Props) {
    const { user, isLoading } = useAuth();
    const loc = useLocation();

    if (isLoading) {
        return <Loading />
    };
    
    const pathname = loc.pathname;
    
    if(user.type === 'VISITOR' && (pathname !== '/signup' && pathname !== '/login')) {
        return <Navigate to='/login' />;
    }
    
    if (!authorizedRoles.includes(user.type)) {
        return <Navigate to='/error/unauthorized' replace />
    };
    
    return <Outlet />
};
