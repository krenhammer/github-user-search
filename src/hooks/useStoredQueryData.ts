import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';

import store from '../state';
import { useUser } from './useUser';
import { PaginatedUsers, Users, useUsersSearch } from './useUsersSearch';

export const useStoredQueryData = () => {
    const snap = useSnapshot(store);

    const user = useUser(snap.username),
         users = useUsersSearch(snap.userFilter, snap.page);
    
    useEffect(() => {
        store.userData = user.data;
    }, [user])

    useEffect(() => {
        const data = (users.data as PaginatedUsers)

        if (!data) {
            return;
        }

        store.pageCount = data?.pageCount || 0;
        store.users = data?.users || null;
    }, [users])
}

export const QueryProvider: React.FC = () => {
    useStoredQueryData();

    return null;
} 