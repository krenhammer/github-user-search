import React from "react";

import { proxy } from 'valtio';
import { devtools } from 'valtio/utils'
import { PaginatedUsers, Users } from "../hooks/useUsersSearch";
import { userResponse } from "./userResponse"
import { UserQueryResult } from '../hooks/useUser'

export type UserSearchStore = {
    userFilter: string,
    showUsersGrid: boolean
    users?: Users,
    pageCount: number,
    // resultsPerPage: number
    page: number,
    username?: string,
    userData?: Partial<UserQueryResult>
};

export const store = proxy<UserSearchStore>({
    userFilter: '',
    page: 1,
    showUsersGrid: true,
    users: userResponse.items,
    pageCount: 0,
    // resultsPerPage: 50
});

const unsub = devtools(store, 'Github User Search')

export default store;
