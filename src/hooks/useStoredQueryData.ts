import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';

import store from '../state';
import { useUser } from './useUser';
import { Users, useUsersSearch } from './useUsersSearch';

export const useStoredQueryData = () => {
    const snap = useSnapshot(store);

    const user = useUser(snap.username),
         users = useUsersSearch(snap.userFilter);
    
    useEffect(() => {
        store.userData = user.data;
    }, [user])

    useEffect(() => {
        store.users = (users.data as Users) || null;
    }, [users])
}

export const QueryProvider: React.FC = () => {
    useStoredQueryData();

    return null;
} 