import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { QUERY_ME, QUERY_SINGLE_PROFILE } from "../../util/queries";
import Auth from "../../util/auth";

const Profile = () => {
    const { profileId } = useParams()
    const [user, setUser] = useState()
    
    try{
       const data = useQuery(QUERY_SINGLE_PROFILE, { variables: { profileId: Auth.getProfile().data._id}})
       console.log(data.data.profile.name)
        return (
            <div className="profile-outer-container">
                <div className="profile-dashboard-container">
                    <div className="profile-card">
                        <h2>{data.data.profile.name}</h2>
                    </div>
                    <ul>
                        <li>
                            <a>Friends</a>
                        </li>
                        <li>
                            <a>Analytics</a>
                        </li>
                        <li>
                            <a>placeholder</a>
                        </li>
                    </ul>
                    <div className="profile-dashboard-end">
                        <button>Logout</button>
                    </div>
                </div>
                <div className="profile-body-container">

                </div>
            </div>
            )
    }catch{
        return <Navigate to="/login" />
    }
}

export default Profile;