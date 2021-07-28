
import { proxy } from 'valtio';

export type UserSearchStore = {
    userFilter: string
};

export const userSearchStore = proxy<UserSearchStore>({
    userFilter: ''
});

export default userSearchStore;
