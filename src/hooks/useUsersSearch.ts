import { useQuery } from 'react-query'
import moment from 'moment';
import { useEffect } from 'react';
import { useAPIClient, useInitAPIClient } from '../state/apiClientStore';
import { Endpoints, OctokitResponse } from '@octokit/types';
import { useDebouncedValue } from '../utils/useDebouncedValue';

// import type Unpacked from '../utils/unpackType';

export type Users = Endpoints["GET /search/users"]["response"]["data"]["items"];

export type UsersResponse = OctokitResponse<Users>;

export const useUsersSearch = (filter: string) => {
    useInitAPIClient();

    const client = useAPIClient();

    const debouncedFilter = useDebouncedValue(filter, 500);
    
    const queriedData = useQuery<Users, string>(['users', debouncedFilter], async () => {
        const users = (await client?.search.users({
            q: filter
        }))?.data.items as Users;

        console.log("Users", users)

        return users;
    }, {
        cacheTime: moment.duration({'days' : 2}).asMilliseconds(),
        staleTime: moment.duration({'minutes' : 45}).asMilliseconds(),
    });

    return queriedData;
}