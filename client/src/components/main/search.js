import React, {useEffect, useState} from "react"
import { useQuery } from "@apollo/client";
import { QUERY_PROFILES} from "../../util/queries";

const Search = () => {
    const [search, setSearch] = useState()
    const [returnedUsers, setReturnedUsers] = useState([])
    const [finished, setFinished] = useState(false)
    const {data} = useQuery(QUERY_PROFILES)

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

    const handleFriend = () => {

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
                                    <a onclick={handleFriend}  class="btn btn-primary">Add Friend</a>
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