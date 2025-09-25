import { Navigate, Outlet } from 'react-router'
import useAuth from './AuthProvider'
import type { TUserTypeEnumSchema } from '@models/schemas';
import { LoadingPage } from '@pages';

export type Props = {
    authorizedRoles: TUserTypeEnumSchema[],
};

export default function ProtectedRoute({ authorizedRoles }: Props) {
    const { user } = useAuth();

    console.log(user?.type, authorizedRoles)

    if(!user) {
        return <LoadingPage />
    }

    if (!authorizedRoles.includes(user.type)) {
        return <Navigate to='/error/unauthorized' replace />
    };
    
    return <Outlet />
};
