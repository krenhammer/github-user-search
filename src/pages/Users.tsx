import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import tw from "tailwind-styled-components"
import { useSnapshot } from "valtio";

import store from "../state";
import {SearchBar, Pagination} from "../components";



const Content = tw.div`flex flex-col items-center justify-center w-full space-y-5`
const Title = tw.h1`text-3xl text-gray-400 font-black m-5`

interface GridListProps {
    $showGrid: boolean
}

const GridList = tw.div<GridListProps>`
    ${(p) => (p.$showGrid ? "md:grid-cols-3" : "md:grid-cols-1")}
    grid gap-9 w-full
`
const Avatar = tw.img`
    w-[200px] grayscale text-black hover:grayscale-0 hover:contrast:200 rounded-xl mx-auto
`

export const Users: React.FC = () => {

    const snap = useSnapshot(store);

    return (
        <Content>
            <Title><FaGithub /> User Search</Title>
            <SearchBar />
            <section>
                {snap.pageCount > 1 ? <Pagination /> : null}
                <GridList $showGrid={snap.showUsersGrid}>
                    {snap.users?.map((user, index) => (
                        <Link to={`/user/${user.login}`} className="cursor-pointer" key={index} >
                            <Avatar alt="listing.name" src={user.avatar_url} />
                            <p>{user.login}</p>
                        
                        </Link>
                    ))}
                </GridList>
                {snap.pageCount > 1 ? <Pagination /> : null}
            </section>
        </Content>
    );
}
