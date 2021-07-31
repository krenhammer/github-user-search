import * as  _ from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components"
import { useSnapshot } from "valtio";

import { useUserSearchURLState } from '../hooks/useURLState';
import store from "../state";
import { SearchBar, Pagination } from "../components";


export const Content = tw.div`flex flex-col items-center justify-center w-full space-y-5`
const Title = tw.h1`text-3xl text-gray-400 font-black m-5`

interface GridListProps {
    $showGrid: boolean
}

const GridList = tw.div<GridListProps>`
    ${(p) => (p.$showGrid ? "md:grid-cols-5" : "md:grid-cols-1")}
    grid gap-9 w-full mb-5
`

export interface AvatarProps {
    $size?: 'sm' | 'md' | 'lg'
}
export const Avatar = tw.img<AvatarProps>`
    ${(p) => {
        switch (p.$size) {
            case 'sm':
                return 'w-[50px]'
                break;
            case 'md':
                return 'w-[100px]'
                break;
            default:
                return 'w-[150px]'
        }
    }
    }
    grayscale text-black hover:grayscale-0 hover:contrast:200 rounded-xl mx-auto
`

export const Users: React.FC = () => {

    const snap = useSnapshot(store);

    useUserSearchURLState();

    return (
        <Content>
            <nav>
                <SearchBar />
            </nav>
            <main>
                {snap.pageCount > 1 ? <Pagination /> : null}
                <GridList aria-label="Github Users" data-tut="tour-users" $showGrid={snap.showUsersGrid}>
                    {snap.users?.map((user, index) => (
                        <Link to={`/user/${user.login}`} className="group cursor-pointer" key={index} >
                            <Avatar data-tip={user.login} $size="md" alt={`${user?.login || "User"}'s Avatar.`} src={user.avatar_url} />
                            <p className="group-hover:text-black text-gray-500 text-xs">{_.truncate(user.login, { length: 15 })}</p>
                        </Link>
                    ))}
                </GridList>
                {snap.pageCount > 1 ? <Pagination /> : null}
            </main>
        </Content>
    );
}
