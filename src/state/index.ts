
import { proxy } from 'valtio';
import { devtools } from 'valtio/utils'
import { Users } from "../hooks/useUsersSearch";
import { UserQueryResult } from '../hooks/useUser'

export type UserSearchStore = {
    userFilter: string,
    showUsersGrid: boolean
    users?: Users,
    pageCount: number,
    totalUsersCount: number,
    page: number,
    username?: string,
    userData?: Partial<UserQueryResult>,
    isTouring: boolean
};

export const store = proxy<UserSearchStore>({
    userFilter: '',
    totalUsersCount: 0,
    page: 1,
    showUsersGrid: true,
    users: [],
    pageCount: 0,
    isTouring: false,
});

const unsub = devtools(store, 'Github User Search')

export default store;
