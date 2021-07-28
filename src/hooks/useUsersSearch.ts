import { useQuery } from 'react-query'
import moment from 'moment';
import { useEffect } from 'react';
import { useAPIClient, useInitAPIClient } from '../store/apiClientStore';
import { Endpoints, OctokitResponse } from '@octokit/types';

// import type Unpacked from '../utils/unpackType';

export type Users = Endpoints["GET /search/users"]["response"]["data"];

export type UsersResponse = OctokitResponse<Users>;

export const useUsersSearch = (filter: string) => {
    useInitAPIClient();

    const client = useAPIClient();
    
    const queriedData = useQuery<Users, string>(['users', filter], async () => {
        const users = (await client?.search.users({
            q: filter
        }))?.data as Users;

        return users;
    }, {
        cacheTime: moment.duration({'days' : 2}).asMilliseconds(),
        staleTime: moment.duration({'minutes' : 45}).asMilliseconds(),
    });

    return queriedData;
}