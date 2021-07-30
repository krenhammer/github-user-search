import React from "react";
import tw from "tailwind-styled-components";
import { Repos, User } from "../hooks/useUser";
import { Avatar } from "../pages/Users";

const Container = tw.div`flex flex-col items-center justify-center mt-10`
const Stat = tw.a`text-gray-400 hover:text-black space-x-3`

interface UserInfoProps {
    user: User,
    repos:Repos
}

export const UserInfo: React.FC<UserInfoProps> = ({user, repos}) => {

    return (
        <a href={user?.html_url as string} target="_blank" className="flex flex-col items-center justify-center">
            <Avatar  $size="lg" alt={user?.name as string} src={user?.avatar_url as string} />
            <p className="text-5xl mb-5 text-gray-500 group-hover:text-black tracking-tighter font-black">{user?.login as string}</p>
        </a>
    );
}