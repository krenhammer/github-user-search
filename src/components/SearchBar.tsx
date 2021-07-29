import React from "react";
import { FaSearch, FaList, FaGithub} from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { useSnapshot } from "valtio";

import store from "../state";

export const SearchBar: React.FC = () => {

    const snap = useSnapshot(store);
    
    return (
        <div className="flex md:flex-row flex-col space-x-6 m-5">
            <a className="text-gray-400" href="https://github.com" target="_blank"><FaGithub size="40"/></a>
                <div className="flex flex-row space-x-6" >
                    <div className="relative text-gray-600 ">
                        <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 
                                rounded-lg text-xs md:text-sm focus:outline-none focus:border-black focus:ring-black"
                            type="search" name="search" placeholder="User Search ..." onChange={(e) => {store.userFilter = e.target.value; console.log('Search Value',e.target.value)}} value={snap.userFilter} />
                        <span className="absolute right-0 top-0 mt-3 mr-3">
                            <FaSearch />
                        </span>
                    </div>
                    <button className="h-10 rounded-xl border-2 border-gray-300 px-3 " 
                    onClick={() => store.showUsersGrid = !snap.showUsersGrid}>
                        {snap.showUsersGrid ? <FaList /> : <BsFillGrid3X3GapFill />}
                    </button>
                </div>
            </div>
    );
}
