import * as  _ from "lodash";
import React, { useEffect, useState } from "react";
import { FaEllipsisH, FaUserFriends } from "react-icons/fa";
import tw from "tailwind-styled-components";
import { useSnapshot } from "valtio";

import { Followers, Following, User } from "../hooks/useUser";
import store from "../state";
import { Avatar } from "../pages/Users";
import { GiFootsteps } from "react-icons/gi";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";

const FOLLOWERS_NUM = 10;

const Container = tw.div`flex flex-row space-x-6`
const Stat = tw.a`text-gray-400 hover:text-black space-x-3`

type AvatarLinkProps = {
    user: Partial<User> | null
}

const AvatarLink: React.FC<AvatarLinkProps> = ({ user }) => {
    // return (
    //     <a 
    //         href={user?.html_url as string} 
    //         data-tip={user?.login as string} 
    //         target="_blank" 
    //         className="cursor-pointer flex-none">
    //         <Avatar $size="sm" alt={user?.name as string} src={user?.avatar_url as string} />
    //     </a>
    // );

    return (
        <Link 
            to={`/user/${user?.login}`}
            data-tip={user?.login as string} 
            // target="_blank" 
            className="cursor-pointer flex-none">
            <Avatar $size="sm" alt={user?.name as string} src={user?.avatar_url as string} />
        </Link>
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

    useEffect(() => {
        ReactTooltip.rebuild();
    });


    return (
        <div className="overflow-x-auto flex flex-row space-x-2 items-center justify-center">
            <button onClick={() => toggleFollowers()}
                data-tip={!showFollowers ? 'Show Followers' : 'Show Following'}
                className="rounded-xl border-gray-400 hover:border-black hover:text-black text-gray-500 p-2 border-2">
                {showFollowers ? <GiFootsteps size="30" /> : <FaUserFriends size="30" />}
            </button>
            {showFollowers && followers && _.take(followers, FOLLOWERS_NUM).map((follower, index) => (
                // <a href={follower?.html_url as string} data-tip={follower?.login as string} target="_blank" className="cursor-pointer flex-none" key={index} >
                //     <Avatar $size="sm" alt={follower?.name as string} src={follower?.avatar_url as string} />
                // </a>
                <AvatarLink key={follower?.login} user={follower} />
            ))}
            {!showFollowers && following && _.take(following, FOLLOWERS_NUM).map((follow, index) => (
                // <a href={follow?.html_url as string} data-tip={follow?.login as string} target="_blank" className="cursor-pointer flex-none" key={index} >
                //     <Avatar $size="sm" alt={follow?.name as string} src={follow?.avatar_url as string} />
                // </a>
                <AvatarLink key={follower?.login} user={follow} />
            ))}
            <a href={`https://github.com/${user?.login}?tab=${showFollowers ? 'followers' : 'following'}`}
                target="_blank"
                data-tip={!showFollowers ? 'Show ALL Following' : 'Show ALL Followers'}
                className="rounded-xl border-gray-400 hover:border-black hover:text-black text-gray-500 p-2 border-2 ">
                <FaEllipsisH size={30}></FaEllipsisH>
            </a>
        </div>
    );
}