import React, { useRef } from "react";
import tw from "tailwind-styled-components";
import { RepoStats } from ".";
import { Repos } from "../hooks/useUser";

import AccessibleAnchor from './accessibility/AccessibleAnchor';


const Container = tw.div`flex flex-col items-center justify-center mt-10 px-5`
const RepoName = tw.span`text-gray-600 group-hover:text-black md:text-xl text-lg`
const RepoDescription = tw.span`text-gray-400 group-hover:text-gray-500  grayscale group-hover:grayscale-0"`

interface RepoListingProps {
    repos: Repos
}

export const RepoListing: React.FC<RepoListingProps> = ({repos}) => {

    return (
        <Container data-tut="tour-repos" aria-label="Github Repositories">
            <div className="flex flex-col flex-none mx-[10px] px-[10px] space-y-3">
                {repos && repos.map((repo, index) => (
                    <div key={index} className="group">
                        <div className="flex flex-row px-5">
                            <AccessibleAnchor aria-label="Open Repository in New Tab" href={repo?.html_url as string} target="_blank" className="cursor-pointer" key={index} >
                                <RepoName aria-label="Repository Name">{repo.name}</RepoName>
                            </AccessibleAnchor>
                            <RepoStats repo={repo}/>
                        </div>
                        <div className="flex flex-row px-5">
                            <RepoDescription aria-label="Repository Description">{repo.description}</RepoDescription>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
}
