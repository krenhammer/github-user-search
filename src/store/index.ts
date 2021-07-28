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

export const userSearchStore = proxy<UserSearchStore>({
    userFilter: '',
    showUsersGrid:true,
    users: userResponse,
});

const unsub = devtools(userSearchStore, 'Github User Search')

export default userSearchStore;
