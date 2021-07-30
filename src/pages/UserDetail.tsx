import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FaArrowLeft,FaGithub, FaUserFriends } from "react-icons/fa";
import { GiFootsteps } from "react-icons/gi";
import { useSnapshot } from "valtio";
import ReactTooltip from 'react-tooltip';

import { Avatar, Content } from ".";
import { UserDetailParams, useUserDetailURLState } from "../hooks/useURLState";
import { Followers, Following, Repos, User } from "../hooks/useUser";
import store from "../state";
import { useState } from "react";


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
        history.goBack();
    }

    const toggleFollowers = () => {
        setShowFollowers(!showFollowers)
    }

    useEffect(() => {
        ReactTooltip.rebuild();
    });

    return (
        <Content>
            <ReactTooltip />
            <FaArrowLeft size="30" onClick={() => goBack()} className="cursor-pointer text-gray-500 hover:text-black absolute top-[5px] left-[15px]"/>
            {/* {!user && 'Loading ...'} */}
            {!user && <span className="text-gray-500 animate-spin"><FaGithub size="60" /></span>}
            {user &&
                <div className="m-5 w-2/3">
                    <a href={user?.html_url as string} target="_blank" className="flex flex-col items-center justify-center">
                        <Avatar  $size="lg" alt={user?.name as string} src={user?.avatar_url as string} />
                        <p className="text-5xl mb-5 text-gray-500 group-hover:text-black tracking-tighter font-black">{user?.login as string}</p>
                    </a>
                    <div className="flex flex-row space-x-5 items-center justify-center">
                        <button onClick={() => toggleFollowers()} 
                            data-tip={!showFollowers ? 'Show Followers' : 'Show Following'} 
                                className="rounded-xl border-gray-400 hover:border-black hover:text-black text-gray-500 p-2 border-2">
                                    {showFollowers ? <GiFootsteps size="30"  />:<FaUserFriends size="30" />}
                        </button>
                        <div className="overflow-x-auto flex flex-row space-x-2 items-center justify-center">
                            {showFollowers && followers && followers.map((follower, index) => (
                                <a href={follower?.html_url as string} data-tip={follower?.name as string} target="_blank" className="cursor-pointer flex-none" key={index} >
                                    <Avatar  $size="sm" alt={follower?.name as string} src={follower?.avatar_url as string} />
                                </a>
                            ))}
                            {!showFollowers &&following && following.map((follow, index) => (
                                <a href={follow?.html_url as string} data-tip={follow?.name as string} target="_blank" className="cursor-pointer flex-none" key={index} >
                                    <Avatar  $size="sm" alt={follow?.name as string} src={follow?.avatar_url as string} />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-10">
                        <div className="flex flex-col space-y-3">
                            {repos && repos.map((repo, index) => (
                                <div className="group">
                                    <div>
                                        <a href={repo?.html_url as string} target="_blank" className="cursor-pointer" key={index} >
                                            <span className="text-gray-600 group-hover:text-black md:text-xl text-lg">{repo.name}</span>
                                        </a>
                                    </div>
                                    <span className="text-gray-400 group-hover:text-gray-500  grayscale group-hover:grayscale-0">{repo.description}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>}

        </Content>
    );
}
