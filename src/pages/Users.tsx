import React from "react";
import { FaSearch, FaList, FaGithub } from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import tw from "tailwind-styled-components"
import { useSnapshot } from "valtio";
import userSearchStore from "../store";


interface GridListProps {
    $showGrid: boolean
}

const GridList = tw.div<GridListProps>`
    ${(p) => (p.$showGrid ? "md:grid-cols-3" : "md:grid-cols-1")}
    gap-9 w-full
`

const GridListButton = tw.div<GridListProps>`
    ${(p) => (p.$showGrid ? "md:grid-cols-3" : "md:grid-cols-1")}
    gap-9 w-full
`

export const Users: React.FC = () => {

    const snap = useSnapshot(userSearchStore);

    return (
        <div className="flex flex-col items-center justify-center w-full space-y-5">
            <h1 className="text-3xl text-gray-400 font-black m-5"><FaGithub /> User Search</h1>
            <div className="flex md:flex-row flex-col space-x-6">


                <div className="flex flex-row space-x-6" >
                    <div className="relative text-gray-600 ">
                        <input x-model="filter"
                            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-xs md:text-sm focus:outline-none focus:border-black focus:ring-black"
                            type="search" name="search" placeholder="Search" />
                        <button type="submit" className="absolute right-0 top-0 mt-3 mr-3">
                            <FaSearch />
                        </button>
                    </div>
                    <button className="h-10 rounded-xl border-2 border-gray-300 px-3 w-24 " x-on:click="showGrid = !showGrid">
                        {snap.showUsersGrid ? <FaList /> : <BsFillGrid3X3GapFill />}
                    </button>
                </div>
            </div>
            <section className="gallery" >
                <GridList $showGrid={snap.showUsersGrid}>
                    { }
                    <a className="cursor-pointer">
                        <img className="grayscale text-black hover:grayscale-0 hover:contrast:200"
                            alt="listing.name" />
                    </a>
                </GridList>
            </section>
        </div>
    );
}
