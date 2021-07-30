import React, { ChangeEvent } from "react";
import { FaSearch, FaGithub} from "react-icons/fa";
import { useSnapshot } from "valtio";

import store from "../state";

export const SearchBar: React.FC = () => {

    const snap = useSnapshot(store);

    const onSearchChange = (e:ChangeEvent<HTMLInputElement>) => {
        store.userFilter = e.target.value; 
        store.page = 1;
        console.log('Search Value', e.target.value)
    }
    
    return (
        <div className="flex flex-row space-x-6 m-5">
            <a className="text-gray-400" href="https://github.com" target="_blank"><FaGithub size="40"/></a>
                <div className="flex flex-row space-x-6" >
                    <div className="relative text-gray-600 ">
                        <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16
                                rounded-lg text-xs md:text-sm focus:outline-none focus:border-black focus:ring-black"
                            type="search" name="search" placeholder="User Search ..." onChange={onSearchChange} value={snap.userFilter} />
                        <span className="absolute right-0 top-0 mt-3 mr-3">
                            <FaSearch />
                        </span>
                    </div>
                </div>
            </div>
    );
}
