import { useQuery } from 'react-query'
import moment from 'moment';
import { useAPIClient, useInitAPIClient } from '../state/apiClientStore';
import { Endpoints, OctokitResponse } from '@octokit/types';
import { useDebouncedValue } from '../utils/useDebouncedValue';

export type User = Endpoints["GET /users/{username}"]["response"]["data"];
export type Repos = Endpoints["GET /users/{username}/repos"]["response"]["data"];
export type Followers = Endpoints["GET /users/{username}/followers"]["response"]["data"];

export type UserQueryResult = {
    user: User,
    repos: Repos,
    followers: Followers
} | null;

export type UserResponse = OctokitResponse<User>;

export const useUser = (username?: string) => {
    useInitAPIClient();

    const client = useAPIClient();

    const debouncedUsername = useDebouncedValue(username, 500);
    
    const queriedData = useQuery<Partial<UserQueryResult>, string>(['user', debouncedUsername], async () => {
        if(!username) {
            return null;
        }

        const user = (await client?.users.getByUsername({
            username
        }))?.data;

        const repos = (await client?.repos.listForUser({
            username
        }))?.data;

        const followers = (await client?.users.listFollowersForUser({
            username
        }))?.data;
 
        const result = {
            user,
            repos,
            followers
        };

        console.log("User", result);

        return result;
    }, {
        
        cacheTime: moment.duration({'days' : 2}).asMilliseconds(),
        staleTime: moment.duration({'minutes' : 45}).asMilliseconds(),
    });

    return queriedData;
}