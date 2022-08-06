import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'

import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../../util/mutation';

import Auth from '../../util/auth';

const Signup = () => {
    const [signUpData, setSignupData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [addProfile, { error, data}] = useMutation(ADD_PROFILE)
    useEffect(() =>{
        const createUser = async() => {
            const { data } = await addProfile({
                variables: {...signUpData}
            })

            Auth.login(data.addProfile.token)
        }
        createUser()
        console.log(data)
    }, [signUpData])

    const handleSubmit = (e) => {
        e.preventDefault();
        setSignupData({
            name: e.target[1].value,
            email: e.target[0].value,
            password: e.target[2].value
        })
    }

    return (
        <div className="fill">
            <div className="modal modal-signin position-static d-block py-5" tabindex="-1" role="dialog" id="modalSignin">
                <div className="modal-dialog" role="document">
                    <div className="modal-content rounded-3 shadow">
                        <div className="modal-header p-5 pb-4 border-bottom-0">
                            <h2 className="fw-bold mb-0">Sign up</h2>
                            <button type="button" className="btn-close" onClick={() => {window.location = "/home"}} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-5 pt-0">
                            <form className="" onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control rounded-2" id="floatingInput" placeholder="name@example.com" autoComplete="off"  />
                                <label for="floatingInput" name="email">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control rounded-2" id="floatingInput" placeholder="username" autoComplete="off"  />
                                <label for="floatingInput" name="name" >Username</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control rounded-2" id="floatingPassword" placeholder="Password" autoComplete="off" />
                                <label for="floatingPassword">Password</label>
                            </div>
                            <button className="w-100 mb-2 btn btn-lg rounded-2 btn-primary" type="submit">Sign up</button>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default Signup;