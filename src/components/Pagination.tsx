import React, { useEffect, useState } from "react";
import { FaCaretLeft, FaCaretRight} from "react-icons/fa";
import tw from "tailwind-styled-components"
import { useSnapshot } from "valtio";
import * as _ from "lodash"

import store from "../state";
import { RESULTS_PER_PAGE } from "../hooks/useUsersSearch";
import ReactTooltip from "react-tooltip";

const Container = tw.div`flex flex-col items-center mb-2`

const CARET_SIZE = 25;

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
    let currentCount = RESULTS_PER_PAGE * snap.page;

    // Ensure react-tooltip rebinds on render
    // https://github.com/wwayne/react-tooltip#3-tooltip-not-binding-to-dynamic-content
    useEffect(() => {
        ReactTooltip.rebuild();
    });

    const pageBack = () => {
        store.page = store.page - 1 > 0 ? store.page - 1 : 1;
        console.log("Page Back", store.page);
    }

    const pageForward = () => {
        store.page = store.page + 1 <= store.pageCount ? store.page + 1 : store.pageCount;
        console.log("Page Forward", store.page);
    }

    
    return (
        <Container>
            <div className="flex text-gray-700">
                <FaCaretLeft data-tut="tour-page-back" size={CARET_SIZE} onClick={() => pageBack()}/>
                <p data-tut="tour-pagination">{store.page} / {store.pageCount}</p>
                <FaCaretRight data-tut="tour-page-forward" size={CARET_SIZE} onClick={() => pageForward()}/>
            </div>
            <span data-tip="user count" data-tut="tour-total-users" className="text-gray-300 hover:text-gray-400">{currentCount} / {snap.totalUsersCount as number}</span>
        </Container>
    );
}

