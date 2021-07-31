import { useQuery } from 'react-query'
import moment from 'moment';
import { useEffect } from 'react';
import { useAPIClient, useInitAPIClient } from '../state/apiClientStore';
import { Endpoints, OctokitResponse } from '@octokit/types';
import { useDebouncedValue } from '../utils/useDebouncedValue';

// import type Unpacked from '../utils/unpackType';

export type Users = Endpoints["GET /search/users"]["response"]["data"]["items"];

export type PaginatedUsers = {
    users: Users,
    pageCount: number,
    resultsPerPage: number,
    totalCount: number
};

export type UsersResponse = OctokitResponse<Users>;

export const RESULTS_PER_PAGE = 20;

export const useUsersSearch = (filter: string, page = 1, resultsPerPage = RESULTS_PER_PAGE) => {
    useInitAPIClient();

    const client = useAPIClient();

    const [debouncedFilter] = useDebouncedValue(filter, 500);

    // Debounce page to work around https://github.com/tannerlinsley/react-query/issues/2187
    // Also see https://github.com/tannerlinsley/react-query/issues/2434
    const [debouncedPage] = useDebouncedValue(page, 500);
    
    const queriedData = useQuery<PaginatedUsers, string>(['users', debouncedFilter, debouncedPage], async () => {
        if(!filter) {
            return {
                users: [],
                pageCount: 0,
                resultsPerPage,
                totalCount: 0
            };
        }

        const usersResponse = (await client?.search.users({
            q: filter || ' ',
            per_page: resultsPerPage,
            page
        }));

        const pageCount = Math.ceil(usersResponse ? (usersResponse.data.total_count > 1000 ? 1000 : usersResponse.data.total_count) / RESULTS_PER_PAGE : 1);

        const users = usersResponse?.data.items as Users;

        console.log("Users", users)

        return {
            users,
            totalCount: usersResponse?.data.total_count || 0,
            pageCount,
            resultsPerPage
        };
    }, {
        // keepPreviousData: true,
        retry: false,
        cacheTime: moment.duration({'minutes' : 60}).asMilliseconds(),
        staleTime: moment.duration({'minutes' : 30}).asMilliseconds(),
    });

    return queriedData;
}