import React, { useEffect } from "react";
import { FaRegStar } from "react-icons/fa";
import { VscRepoForked } from "react-icons/vsc";
import { MdUpdate } from "react-icons/md";
import tw from "tailwind-styled-components";
import ReactTooltip from "react-tooltip";
import moment from "moment";
import { Repo } from "../hooks/useUser";

const Container = tw.div`ml-5 flex flex-row space-x-6 group-hover:visible invisible`
const Stat = tw.span`flex flex-row gap-1 text-gray-500 hover:text-black space-x-2 my-auto`
const Language = tw.span`rounded-xl bg-gray-500 text-white text-sm p-1 px-2 hover:bg-black`

interface RepoStatsProps {
    repo: Repo
}

const ICON_SIZE = 18;

export const RepoStats: React.FC<RepoStatsProps> = ({repo}) => {

    const lastUpdated = moment(repo.updated_at).format("M.D.YYYY");

    useEffect(() => {
        ReactTooltip.rebuild();
    });

    return (
        <Container>
            {repo.language && <Stat><Language>{repo.language}</Language></Stat> }
            <Stat data-tip="Stars"><FaRegStar size={ICON_SIZE}/>{repo.stargazers_count}</Stat>
            <Stat data-tip="Forks"><VscRepoForked size={ICON_SIZE} />{repo.forks_count}</Stat>
            <Stat data-tip="Last Commit"><MdUpdate size={ICON_SIZE} />{lastUpdated}</Stat>
        </Container> 
    );
}
