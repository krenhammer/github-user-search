import React from "react";
import tw from "tailwind-styled-components";
import { RepoStats } from ".";
import { Repos } from "../hooks/useUser";


const Container = tw.div`flex flex-col items-center justify-center mt-10`
const RepoName = tw.span`text-gray-600 group-hover:text-black md:text-xl text-lg`
const RepoDescription = tw.span`text-gray-400 group-hover:text-gray-500  grayscale group-hover:grayscale-0"`

interface RepoListingProps {
    repos: Repos
}

export const RepoListing: React.FC<RepoListingProps> = ({repos}) => {

    return (
        <Container data-tut="tour-repos">
            <div className="flex flex-col space-y-3">
                {repos && repos.map((repo, index) => (
                    <div key={index} className="group">
                        <div className="flex flex-row">
                            <a href={repo?.html_url as string} target="_blank" className="cursor-pointer" key={index} >
                                <RepoName>{repo.name}</RepoName>
                                
                            </a>
                            <RepoStats repo={repo}/>
                        </div>
                        <RepoDescription>{repo.description}</RepoDescription>
                    </div>
                ))}
            </div>
        </Container>
    );
}
