import React from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components"
import { useSnapshot } from "valtio";
import { useUserSearchURLState } from '../hooks/useURLState';

import store from "../state";
import {SearchBar, Pagination} from "../components";



export const Content = tw.div`flex flex-col items-center justify-center w-full space-y-5`
const Title = tw.h1`text-3xl text-gray-400 font-black m-5`

interface GridListProps {
    $showGrid: boolean
}

const GridList = tw.div<GridListProps>`
    ${(p) => (p.$showGrid ? "md:grid-cols-5" : "md:grid-cols-1")}
    grid gap-9 w-full mb-5
`

interface AvatarProps {
    $size?: 'sm'|'md'|'lg'
}
export const Avatar = tw.img<AvatarProps>`
    ${(p) => {
        switch(p.$size) {
        case 'sm':
            return 'w-[50px]'
          break;
        case 'md':
            return 'w-[100px]'
          break;
        default:
          return 'w-[200px]'
      }}
    }
    grayscale text-black hover:grayscale-0 hover:contrast:200 rounded-xl mx-auto
`

export const Users: React.FC = () => {

    const snap = useSnapshot(store);

    useUserSearchURLState();

    return (
        <Content>
            {/* <Title><FaGithub /> User Search</Title> */}
            <SearchBar />
            <section>
                {snap.pageCount > 1 ? <Pagination /> : null}
                <GridList $showGrid={snap.showUsersGrid}>
                    {snap.users?.map((user, index) => (
                        <Link to={`/user/${user.login}`} className="group cursor-pointer" key={index} >
                            <Avatar $size="md" alt="listing.name" src={user.avatar_url} />
                            <p className="group-hover:text-black text-gray-500 text-sm">{user.login}</p>
                        
                        </Link>
                    ))}
                </GridList>
                {snap.pageCount > 1 ? <Pagination /> : null}
            </section>
        </Content>
    );
}
