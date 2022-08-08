import React, {useEffect, useState} from "react"
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PROFILES} from "../../util/queries";
import { ADD_FRIEND } from "../../util/mutation";
import Auth from "../../util/auth";

const Search = () => {
    const [search, setSearch] = useState()
    const [returnedUsers, setReturnedUsers] = useState([])
    const [finished, setFinished] = useState(false)
    const {data} = useQuery(QUERY_PROFILES)
    const [addFriend] = useMutation(ADD_FRIEND)

    useEffect(() => {
        console.log(returnedUsers)
    }, [finished])

    const handleSubmit = async() => {
        setReturnedUsers([])
        const searchResults = await data;
        console.log(searchResults)
        searchResults.profiles.forEach(item => {
            console.log(search)
            if(item.name.toLowerCase().includes(search.toLowerCase())){
                setReturnedUsers(oldState => [...oldState, item])
            }})
            setFinished(true)
        }

    const handleFriend = async (name,email) => {
        console.log(email)
        await addFriend({ variables: {
            profileId: Auth.getProfile().data._id,
            FriendInput: {
                name: name,
                email: email
            }
        }})
    }
        

    return (
        <div className="search-container">
            <div className="inner-search-container">
                <input className="search" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => {if(e.key === "Enter"){handleSubmit()}}} placeholder="Search" />
                <div className="results-container">
                    {finished ? (returnedUsers.map(item => {
                        console.log(item)
                        return (
                            <div class="card w-100">
                                <div class="card-body">
                                    <h5 class="card-title">{item.name}</h5>
                                    <p class="card-text">{item.email}</p>
                                    <button onClick={() => handleFriend(item.name, item.email)}  class="btn btn-primary">Add Friend</button>
                                </div>
                            </div>
                            )}))
                            :
                            (
                                <div>
                                
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
        )
}

export default Search;