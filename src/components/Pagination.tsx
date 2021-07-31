import React, { useEffect, useRef, useState } from "react";
import { FaCaretLeft, FaCaretRight} from "react-icons/fa";
import tw from "tailwind-styled-components"
import { useSnapshot } from "valtio";
import * as _ from "lodash"

import store from "../state";
import { RESULTS_PER_PAGE } from "../hooks/useUsersSearch";
import ReactTooltip from "react-tooltip";
import { useButton } from "react-aria";

const Container = tw.div`flex flex-col items-center mb-2`

const CARET_SIZE = 50;

interface PageLinkProps {
    $isSelected: boolean
}

const PageLink = tw.div<PageLinkProps>`
    ${(p) => (p.$isSelected ? "border-black" : "border-transparent")}
    w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  border-t-2  
`

const AccessibleCaret: React.FC<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>> = (props: any) => {
    let ref = useRef<HTMLAnchorElement>(null);
    let {buttonProps} = useButton(props, ref);

    return (
        <a {...{ref}} {...buttonProps}>
            {props.children}
        </a>
    )
}   

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
                <AccessibleCaret data-tut="tour-page-back" onClick={() => pageBack()}>
                    <FaCaretLeft className="cursor-pointer" size={CARET_SIZE} />
                </AccessibleCaret>
                <p className="text-xl leading-[2.3em]" data-tut="tour-pagination">
                    <span aria-label="Page Number">{store.page}</span> / <span aria-label="Total Page Count">{store.pageCount}</span>
                </p>
                <AccessibleCaret data-tut="tour-page-forward" onClick={() => pageForward()}>
                    <FaCaretRight className="cursor-pointer" size={CARET_SIZE} />
                </AccessibleCaret>
            </div>
            {/* <span aria-label="Number of Users" data-tip="Number of Users" data-tut="tour-total-users" className="text-gray-400 hover:text-gray-500">{currentCount} / {snap.totalUsersCount as number}</span> */}
        </Container>
    );
}

