import { useQuery, useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { ADD_CHAR } from "../../util/mutation";
import keyIndex from "../../util/KeyIndex";
import { QUERY_ME, QUERY_SINGLE_PROFILE} from "../../util/queries";
import Auth from "../../util/auth";

const Profile = () => {
    const { profileId } = useParams()
    const [user, setUser] = useState()
    const [ addCharacterData ] = useMutation(ADD_CHAR)

    //keyIndex.forEach((key) => console.log(key))
    
        // const [createdata, {data, loading, error}] = useMutation(ADD_CHAR, {
        //     variables: {
        //         profileId: "62e255371dce35547678dd08",
        //         keyIndex
        //     }
        // })
    

    useEffect(() =>{
        // createdata()
        // console.log(data)
    }, [])
    
    try{
       //const data = useQuery(QUERY_SINGLE_PROFILE, { variables: { profileId: Auth.getProfile().data._id}})
        return (
            <div className="profile-outer-container">
                <div className="profile-dashboard-container">
                    <div className="profile-card">
                        <div className="profile-icon">

                        </div>
                        <h2>jamesbester</h2>
                        <p>jamesthomasbester@gmail.com</p>
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