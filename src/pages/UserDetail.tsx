import React from "react";
import { useParams } from "react-router-dom";

export const UserDetail: React.FC = () => {

    // const params = useParams<UserDetailParams>();

    return (
        <>{params.username}</>
    );
}
