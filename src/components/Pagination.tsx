import React, { useState } from "react";
import { FaCaretLeft, FaCaretRight} from "react-icons/fa";
import tw from "tailwind-styled-components"
import { useSnapshot } from "valtio";
import * as _ from "lodash"

import store from "../state";

interface PageLinkProps {
    $isSelected: boolean
}

const PageLink = tw.div<PageLinkProps>`
    ${(p) => (p.$isSelected ? "border-black" : "border-transparent")}
    w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  border-t-2  
`

export const Pagination: React.FC = () => {

    const snap = useSnapshot(store);
    let pageCount = snap.pageCount;
    const caretSize = 25;

    const pageBack = () => {
        store.page = store.page - 1 > 0 ? store.page - 1 : 1;
        console.log("Page Back", store.page);
    }

    const pageForward = () => {
        store.page = store.page + 1 <= store.pageCount ? store.page + 1 : store.pageCount;
        console.log("Page Forward", store.page);
    }

    
    return (
        <div className="flex flex-col items-center mb-10">
            <div className="flex text-gray-700">
                <FaCaretLeft size={caretSize} onClick={() => pageBack()}/>
                {/* <div className="flex h-8 font-medium ">
                    {_.times(snap.pageCount, (count) => (
                       <PageLink $isSelected={snap.page == count }>{count}</PageLink>
                    ))} 
                </div> */}
                <p>{store.page} / {store.pageCount}</p>
                <FaCaretRight size={caretSize} onClick={() => pageForward()}/>

            </div>
        </div>
    );
}

