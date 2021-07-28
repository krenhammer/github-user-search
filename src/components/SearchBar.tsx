import React from "react";
import { FaSearch, FaList} from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { useSnapshot } from "valtio";

import store from "../state";

export const SearchBar: React.FC = () => {

    const snap = useSnapshot(store);
    
    return (
        <div className="flex md:flex-row flex-col space-x-6">
                <div className="flex flex-row space-x-6" >
                    <div className="relative text-gray-600 ">
                        <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 
                                rounded-lg text-xs md:text-sm focus:outline-none focus:border-black focus:ring-black"
                            type="search" name="search" placeholder="Search" onChange={(e) => {store.userFilter = e.target.value;}} value={snap.userFilter} />
                        <span className="absolute right-0 top-0 mt-3 mr-3">
                            <FaSearch />
                        </span>
                    </div>
                    <button className="h-10 rounded-xl border-2 border-gray-300 px-3 w-24 " 
                    onClick={() => store.showUsersGrid = !snap.showUsersGrid}>
                        {snap.showUsersGrid ? <FaList /> : <BsFillGrid3X3GapFill />}
                    </button>
                </div>
            </div>
    );
}
