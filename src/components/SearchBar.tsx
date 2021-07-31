import React, { ChangeEvent, ChangeEventHandler, useEffect, useRef } from "react";
import { FaSearch, FaGithub, FaRoute } from "react-icons/fa";
import tw from "tailwind-styled-components";
import { useSnapshot } from "valtio";
import { useSearchField } from 'react-aria';
import { useSearchFieldState } from '@react-stately/searchfield';

import store from "../state";

const Container = tw.div`flex flex-row space-x-6 m-5 `
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

const AccessibleSearchInput: React.FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = (props: any) => {
    const searchRef = useRef<HTMLInputElement>(null);
    let state = useSearchFieldState(props);

    useEffect(() => {
        state.setValue(props.value);
    }, [props.value])

    const {inputProps} = useSearchField(props, state, searchRef)

    return (
        <SearchInput 
            {...inputProps}
            />
    )
}

export const SearchBar: React.FC = () => {

    const snap = useSnapshot(store);

    const onSearchChange = ((value: string) => {
        store.userFilter = value;
        store.page = 1;
        console.log('Search Value', value)
    }) as unknown as ChangeEventHandler<HTMLInputElement>;

    return (
        <Container>
            <GithubLogo aria-label="Link to GitHub" rel="noreferrer" data-tut="tour-repo" $isLoading={!(snap.users && snap.users.length) && !!snap.userFilter.length} 
                href="https://github.com" target="_blank"><FaGithub size="40" /></GithubLogo>
            <div className="flex flex-row space-x-6" >
                <div className="relative text-gray-600 ">
                    <AccessibleSearchInput 
                        aria-label="User Search Filter"
                        aria-required="true"
                        data-tut="tour-user-search"
                        
                        type="search" 
                        name="search" 
                        placeholder="Search for username ..." 
                        onChange={onSearchChange} 
                        value={snap.userFilter} />
                    <span className="absolute right-0 top-0 mt-3 mr-3">
                        <FaSearch />
                    </span>
                </div>
            </div>
           <Button aria-label="Show React Tour" $isPulsing={!snap.userFilter} onClick={() => { store.isTouring = !store.isTouring }} data-tip="Start Feature Tour"><FaRoute size="20"/></Button>
        </Container>
    );
}
