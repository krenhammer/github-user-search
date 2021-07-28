import React from "react";
import { useParams } from "react-router-dom";

type UserDetailParams = {
    username: string
}

export const UserDetail: React.FC = () => {

    const params = useParams<UserDetailParams>();

    return (
        <>{params.username}</>
    );
}
