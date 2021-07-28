import React from "react";

import { proxy } from 'valtio';
import { devtools } from 'valtio/utils'
import { Users } from "../hooks/useUsersSearch";
import { userResponse } from "./userResponse"
import { UserQueryResult } from '../hooks/useUser'

export type UserSearchStore = {
    userFilter: string,
    showUsersGrid: boolean
    users?: Users,
    username?: string,
    userData?: Partial<UserQueryResult>
};

export const store = proxy<UserSearchStore>({
    userFilter: '',
    showUsersGrid: true,
    users: userResponse.items,
});

const unsub = devtools(store, 'Github User Search')

export default store;
