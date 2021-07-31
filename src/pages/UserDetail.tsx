import * as _ from 'lodash';
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FaArrowLeft,FaGithub } from "react-icons/fa";
import { useSnapshot } from "valtio";
import ReactTooltip from 'react-tooltip';
import tw from "tailwind-styled-components";


import { Avatar, Content } from ".";
import { Follow, RepoListing } from "../components"
import { UserDetailParams, useUserDetailURLState } from "../hooks/useURLState";
import { Followers, Following, Repos, User } from "../hooks/useUser";
import store from "../state";
import AccessibleAnchor from '../components/accessibility/AccessibleAnchor';

const UserSection = tw.div`m-5 lg:w-2/3 max-w-full`

export const UserDetail: React.FC = () => {

    const params = useParams<UserDetailParams>();
    const history = useHistory()
    const [showFollowers, setShowFollowers] = useState(true);

    useUserDetailURLState();

    const snap = useSnapshot(store);
    const user = snap.userData?.user as User;
    const followers = snap.userData?.followers as Followers;
    const following = snap.userData?.following as Following;
    const repos = snap.userData?.repos as Repos;

    console.log("followers", followers)

    const goBack = () => {
        store.userData = null;
        if(store.userFilter) {
            history.push(`/search/${store.userFilter}`)
        } else {
            history.push(`/${store.userFilter}`)
        }
    }

    // Ensure react-tooltip rebinds on render
    // https://github.com/wwayne/react-tooltip#3-tooltip-not-binding-to-dynamic-content
    useEffect(() => {
        ReactTooltip.rebuild();
    });

    return (
        <Content>
            <AccessibleAnchor aria-label="Go Back to Search Page" onClick={() => goBack()}>
                <FaArrowLeft data-tut="tour-back" size="30"  className="cursor-pointer text-gray-500 hover:text-black absolute top-[5px] left-[15px]"/>
            </AccessibleAnchor>
            {/* {!user && 'Loading ...'} */}
            {!user && <span aria-hidden className="text-gray-500 animate-spin"><FaGithub size="60" /></span>}
            {user &&
                <UserSection>
                    <header>
                        <a rel="noreferrer" href={user?.html_url as string} target="_blank" className="flex flex-col items-center justify-center">
                            <Avatar aria-label="Avatar" aria-roledescription={`${user?.login || "User"}'s Avatar.`} data-tut="tour-user-avatar" $size="lg" alt={`${user?.login || "User"}'s Avatar.`} src={user?.avatar_url as string} />
                            <p aria-label="Username" className="text-5xl mb-5 text-gray-500 group-hover:text-black tracking-tighter font-black">{user?.login as string}</p>
                        </a>
                    </header>
                    <main className="flex flex-col max-w-full">
                        <Follow />
                        <RepoListing repos={repos} />
                    </main>
                </UserSection>}

        </Content>
    );
}
