import * as _ from 'lodash';
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FaArrowLeft,FaGithub, FaUserFriends, FaEllipsisH } from "react-icons/fa";
import { useSnapshot } from "valtio";
import ReactTooltip from 'react-tooltip';
import tw from "tailwind-styled-components";


import { Avatar, Content } from ".";
import { Follow, RepoListing } from "../components"
import { UserDetailParams, useUserDetailURLState } from "../hooks/useURLState";
import { Followers, Following, Repos, User } from "../hooks/useUser";
import store from "../state";


const FOLLOWERS_NUM = 10;

const UserSection = tw.div`m-5 w-2/3`

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
        // history.goBack();
    }


    return (
        <Content>
            <ReactTooltip />
            <FaArrowLeft size="30" onClick={() => goBack()} className="cursor-pointer text-gray-500 hover:text-black absolute top-[5px] left-[15px]"/>
            {/* {!user && 'Loading ...'} */}
            {!user && <span className="text-gray-500 animate-spin"><FaGithub size="60" /></span>}
            {user &&
                <UserSection>
                    <a href={user?.html_url as string} target="_blank" className="flex flex-col items-center justify-center">
                        <Avatar  $size="lg" alt={user?.name as string} src={user?.avatar_url as string} />
                        <p className="text-5xl mb-5 text-gray-500 group-hover:text-black tracking-tighter font-black">{user?.login as string}</p>
                    </a>
                    <Follow />
                    <RepoListing repos={repos} />
                </UserSection>}

        </Content>
    );
}
