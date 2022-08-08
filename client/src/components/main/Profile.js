import { useQuery, useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { QUERY_DATA, QUERY_SINGLE_PROFILE } from "../../util/queries";
import Auth from "../../util/auth";
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { PolarArea } from 'react-chartjs-2';

  
const Profile = () => {
    if (!Auth.loggedIn()){
        window.location.href = "/login"
    }
    const { profileId } = useParams()
    const [user, setUser] = useState()
    const [finished, setFinished] = useState(false)
    const [dataOverview, setDataOverview] = useState([])
    const [labels, setLabels] = useState([])
    const [latency, setLatency] = useState([])
    const [datapoints, setDatapoints] = useState({
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
            ],
            borderWidth: 1,
          },
        ],
      })
    const { loading, error, data } = useQuery(QUERY_SINGLE_PROFILE, {
        variables: { profileId: Auth.getProfile().data._id },
      });
    ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

    useEffect(() =>{
        if(!loading){
            userData()
            onLoad()
        }else{
            console.log(loading)
        }
    }, [loading])

    useEffect(() => {
        setDatapoints({
            labels: labels,
            datasets: [
              {
                label: '# of Votes',
                data: latency,
                borderWidth: 1,
              },
            ],
          })
          
    }, [finished])

    const onLoad = async () => {    
        data.profile.data.forEach(async (item) => {
            await setDataOverview(oldState => [...oldState, item])
            await setLabels(oldState => [...oldState, item.character])
            await setLatency(oldState => [...oldState, (item.fields.latency / item.fields.count)])
        })
        document.getElementById("profile").value = 
        setFinished(true)
    }

    const userData = async () => {
        if(Auth.loggedIn())
        {
            setUser(data);
        }else{
            window.location.href = "/login"
        }
    }
    try{
        return (
            <div className="profile-outer-container">
                <div className="profile-dashboard-container">
                    <div className="profile-card">
                        <div id="profile" className="profile-icon">
                        </div>
                        <div>
                            <h2>{Auth.getProfile().data.name}</h2>
                            <p>{Auth.getProfile().data.email}</p>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <Link to="/profile">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/friends">Friends</Link>
                        </li>
                        <li>
                            <Link to="/analytics">Analytics</Link>
                        </li>
                        <li>
                            <Link to="">placeholder</Link>
                        </li>
                    </ul>
                    <div className="profile-dashboard-end">
                        <button onClick={(e) => Auth.logout()} className="logout-button">Logout</button>
                    </div>
                </div>
                <div className="profile-body-container">
                    <div className="profile-left">
                        <h1 className="chart title">Latency</h1>
                        <p>average latency in milliseconds</p>
                        <div className="chart-container">
                            <PolarArea data={datapoints} />
                        </div>
                    </div>
                    <div className="profile-right">
                        <h1>Data overview</h1>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">character</th>
                            <th scope="col">Count</th>
                            <th scope="col">Latency</th>
                            <th scope="col">Correct</th>
                            <th scope="col">incorrect</th>
                            </tr>
                        </thead>
                        <tbody>
                            {finished ? (dataOverview.map((item, index) => {
                                return (
                               <tr>
                                <th scope="row">{index}</th>
                                <td>{item.character}</td>
                                <td>{item.fields.count}</td>
                                <td>{item.fields.latency}</td>
                                <td>{item.fields.correct}</td>
                                <td>{item.fields.incorrect}</td>
                               </tr> )
                                
                            })) 
                            : 
                            (
                            <tr>
                                <td>loading...</td>
                            </tr> )
                            }
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
            )
    }catch{
        return <Navigate to="/login" />
    }
}

export default Profile;