import { useQuery } from 'react-query'
import moment from 'moment';
import { useEffect } from 'react';
import { useAPIClient, useInitAPIClient } from '../store/apiClientStore';
import store from '../store/store'
import { Endpoints, OctokitResponse } from '@octokit/types';

export type UsersResponse = OctokitResponse<Endpoints["GET /search/users"]["response"]["data"]>;

export const useApi = () => {
    useInitAPIClient();

    const client = useAPIClient();
    
    const queriedData = useQuery<UsersResponse, string>('PLCalcData', async () => {
        const users = await client?.search.users({
            q: store.userFilter
        }) as UsersResponse;

        return users;
    }, {
        cacheTime: moment.duration({'days' : 2}).asMilliseconds(),
        staleTime: moment.duration({'minutes' : 45}).asMilliseconds(),
    });

    return queriedData;
}