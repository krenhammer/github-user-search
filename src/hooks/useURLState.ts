import { useEffect } from 'react';
import { subscribeKey } from 'valtio/utils';
import store from '../state';
import { useHistory, useParams } from 'react-router-dom'
import { useDebouncedValue } from '../utils/useDebouncedValue';

export const useURLState = () => {
    useUserDetailURLState();
    useUserSearchURLState();    
}

export type UserDetailParams = {
    username: string
}

export const useUserDetailURLState = () => {
    const params = useParams<Partial<UserDetailParams>>();

    const [debouncedUsername] = useDebouncedValue(params.username, 200);

    useEffect(() => {
        // console.log("Set Store Username", debouncedUsername)
        store.username = debouncedUsername;
    }, [debouncedUsername]);
}

export type UserSearchParams = {
    query: string,
    page: string
}

export const useUserSearchURLState = () => {
    const history = useHistory();

    const params = useParams<Partial<UserSearchParams>>();

    const [debouncedFilter] = useDebouncedValue(params.query, 200);
    const [debouncedPage] = useDebouncedValue(params.page, 200);

    useEffect(() => {
        store.page = parseInt(debouncedPage || '1');
    }, [debouncedPage]);

    useEffect(() => {
        store.userFilter = debouncedFilter || '';
    }, [debouncedFilter]);

    const refreshURL = () => {

        if(store.userFilter.length < 1) {
            history.push(`/`);
            return;
        }

        history.push(`/search/${store.userFilter}/${store.page}`);
    };

    useEffect(() => subscribeKey(store, 'userFilter', () => {
        refreshURL();
    }), []);

    useEffect(() => subscribeKey(store, 'page', () => {
        refreshURL();
    }), []);
}
