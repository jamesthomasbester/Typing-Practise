import { useQuery, useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { QUERY_DATA, QUERY_SINGLE_PROFILE } from "../../util/queries";
import keyIndex from "../../util/KeyIndex";
import Auth from "../../util/auth";
const Profile = () => {
    const { profileId } = useParams()
    const [user, setUser] = useState()
    const { loading, error, data } = useQuery(QUERY_SINGLE_PROFILE, {
        variables: { profileId: Auth.getProfile().data._id },
      });
    // const { data, loading } = useQuery(QUERY_DATA, {variables: { profileId: "62e255371dce35547678dd08"}})
    useEffect(() =>{
        userData()

    }, [])

    const userData = async () => {
        if(Auth.loggedIn())
        {
            setUser(data);
            console.log(Auth.getProfile().data._id)
        }else{
            window.location.href = "/login"
        }
    }
    
    
    
    try{
        return (
            <div className="profile-outer-container">
                <div className="profile-dashboard-container">
                    <div className="profile-card">
                        <div className="profile-icon">

                        </div>
                        <h2>{Auth.getProfile().data.name}</h2>
                        <p>{Auth.getProfile().data.email}</p>
                    </div>
                    <ul>
                        <li>
                            <Link to="">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="">Friends</Link>
                        </li>
                        <li>
                            <Link to="">Analytics</Link>
                        </li>
                        <li>
                            <Link to="">placeholder</Link>
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