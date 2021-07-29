import { useEffect } from 'react';
import { subscribeKey } from 'valtio/utils';
import store from '../state';
import { useHistory, useParams } from 'react-router-dom'
import { useDebouncedValue } from '../utils/useDebouncedValue';

export const useURLState = () => {
    
}

type UserDetailParams = {
    username: string
}

export const useUserDetailURLState = () => {
    const params = useParams<Partial<UserDetailParams>>();

    const [debouncedUsername] = useDebouncedValue(params.username, 200);

    useEffect(() => {
        store.username = debouncedUsername;
    }, [debouncedUsername]);

    // const refreshURL = () => {
    //     history.push(`/user/${store.username}`);
    // };

    // useEffect(() => subscribeKey(store, 'username', () => {
    //     refreshURL();
    // }), []);
}

export type UserSearchParams = {
    userFilter: string,
    page: string
}

export const useUserSearchURLState = () => {
    const history = useHistory();

    const params = useParams<Partial<UserSearchParams>>();

    const [debouncedFilter] = useDebouncedValue(params.userFilter, 200);
    const [debouncedPage] = useDebouncedValue(params.page, 200);

    useEffect(() => {
        store.page = parseInt(debouncedPage);
    }, [debouncedPage]);

    useEffect(() => {
        store.userFilter = debouncedFilter;
    }, [debouncedFilter]);

    const refreshURL = () => {
        history.push(`/search/${store.userFilter}/${store.page}`);
    };

    useEffect(() => subscribeKey(store, 'userFilter', () => {
        refreshURL();
    }), []);

    useEffect(() => subscribeKey(store, 'page', () => {
        refreshURL();
    }), []);
}
