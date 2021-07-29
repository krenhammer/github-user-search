import React from "react";
import { useParams } from "react-router-dom";
import { UserDetailParams } from "../hooks/useURLState";

export const UserDetail: React.FC = () => {

    const params = useParams<UserDetailParams>();

    return (
        <>{params.username}</>
    );
}
