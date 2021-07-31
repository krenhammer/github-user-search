import React, { ChangeEvent } from "react";
import { FaSearch, FaGithub, FaRoute } from "react-icons/fa";
import tw from "tailwind-styled-components";
import { useSnapshot } from "valtio";

import store from "../state";

const Container = tw.div`flex flex-row space-x-6 m-5`
const SearchInput = tw.input`border-2 border-gray-300 bg-white h-10 px-5 pr-16
    rounded-lg text-xs md:text-sm focus:outline-none focus:border-black focus:ring-black h-10`

interface GithubLogoProps {
    $isLoading: boolean
}

const GithubLogo = tw.a<GithubLogoProps>`
    ${(p) => (p.$isLoading ? "animate-spin" : "")}
    text-gray-400
`
interface ButtonProps {
    $isPulsing?: boolean
}

export const ICON_SIZE = 30;

export const Button = tw.button<ButtonProps>`
    ${(p) => (p.$isPulsing ? "animate-pulse" : "")}
    rounded-xl border-gray-400 hover:border-black hover:text-black text-gray-500 p-2 border-2`

export const SearchBar: React.FC = () => {

    const snap = useSnapshot(store);

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        store.userFilter = e.target.value;
        store.page = 1;
        console.log('Search Value', e.target.value)
    }

    return (
        <Container>
            <GithubLogo data-tut="tour-repo" $isLoading={!(snap.users && snap.users.length) && !!snap.userFilter.length} 
                href="https://github.com" target="_blank"><FaGithub size="40" /></GithubLogo>
            <div className="flex flex-row space-x-6" >
                <div className="relative text-gray-600 ">
                    <SearchInput 
                        data-tut="tour-user-search"
                        type="search" 
                        name="search" 
                        placeholder="User Search ..." 
                        onChange={onSearchChange} 
                        value={snap.userFilter} />
                    <span className="absolute right-0 top-0 mt-3 mr-3">
                        <FaSearch />
                    </span>
                </div>
            </div>
           <Button $isPulsing={!snap.userFilter} onClick={() => { store.isTouring = !store.isTouring }} data-tip="Start Feature Tour"><FaRoute size="20"/></Button>
        </Container>
    );
}
