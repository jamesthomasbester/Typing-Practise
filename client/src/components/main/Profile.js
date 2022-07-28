import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { QUERY_ME, QUERY_SINGLE_PROFILE } from "../../util/queries";
import Auth from "../../util/auth";

const Profile = () => {
    const { profileId } = useParams()
    const [user, setUser] = useState()
    const { data, error} = useQuery(QUERY_SINGLE_PROFILE, { variables: { profileId: Auth.getProfile().data._id}})

    const profile = data?.me || data?.profile || {}

    console.log(profile)
    console.log(Auth.loggedIn());
    console.log(Auth.getProfile().data._id);

    if(Auth.loggedIn() && Auth.getProfile().data._id) { return <div>{profile.name}</div> }
    else{
        return <Navigate to="/login" />
    }
}

export default Profile;