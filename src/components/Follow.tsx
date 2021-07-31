import * as  _ from "lodash";
import React, { useEffect, useState } from "react";
import { FaEllipsisH, FaUserFriends } from "react-icons/fa";
import { RiUserHeartFill } from "react-icons/ri";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import { useSnapshot } from "valtio";
import AccessibleRouterLink from './accessibility/AccessibleRouterLink';

import { Followers, Following, User } from "../hooks/useUser";
import store from "../state";
import { Avatar } from "../pages/Users";



import { Button, ICON_SIZE } from "./SearchBar";

const FOLLOWERS_NUM = 10;

const Container = tw.div`flex flex-row space-x-6`
const Stat = tw.a`text-gray-400 hover:text-black space-x-3`
const ButtonLink = tw.a`rounded-xl border-gray-400 hover:border-black hover:text-black text-gray-500 p-2 border-2 `



type AvatarLinkProps = {
    user: Partial<User> | null
}

const AvatarLink: React.FC<AvatarLinkProps> = ({ user }) => {
   
    return (
        <AccessibleRouterLink 
            to={`/user/${user?.login}`}
            data-tip={user?.login as string} 
            // target="_blank" 
            className="cursor-pointer flex-none">
            <Avatar $size="sm" alt={`${user?.login || "User"}'s Avatar`} src={user?.avatar_url as string} />
        </AccessibleRouterLink>
    );
}

export const Follow: React.FC = () => {

    const snap = useSnapshot(store);

    const user = snap.userData?.user as User;
    const [showFollowers, setShowFollowers] = useState(true);
    const followers = snap.userData?.followers as Followers;
    const following = snap.userData?.following as Following;

    const toggleFollowers = () => {
        setShowFollowers(!showFollowers)
    }

    // Ensure react-tooltip rebinds on render
    // https://github.com/wwayne/react-tooltip#3-tooltip-not-binding-to-dynamic-content
    useEffect(() => {
        ReactTooltip.rebuild();
    });

    return (
        <div className="overflow-x-auto flex flex-row space-x-2 items-center justify-center">
            <Button data-tut="tour-follow-toggle" onClick={() => toggleFollowers()}
                data-tip={!showFollowers ? 'Show Followers' : 'Show Following'}>
                {showFollowers ? <RiUserHeartFill size="30" /> : <FaUserFriends size={ICON_SIZE} />}
            </Button>
            <span data-tut="tour-follow" className="flex flex-row space-x-2">
                {showFollowers && followers && _.take(followers, FOLLOWERS_NUM).map((follower, index) => (
                    <AvatarLink key={follower?.login} user={follower} />
                ))}
                {!showFollowers && following && _.take(following, FOLLOWERS_NUM).map((follow, index) => (
                    <AvatarLink key={follow?.login} user={follow} />
                ))}
            </span>
            <ButtonLink data-tut="tour-all-followers" href={`https://github.com/${user?.login}?tab=${showFollowers ? 'followers' : 'following'}`}
                target="_blank"
                data-tip={!showFollowers ? 'Show ALL Following' : 'Show ALL Followers'}
                >
                <FaEllipsisH size={ICON_SIZE}></FaEllipsisH>
            </ButtonLink>
        </div>
    );
}