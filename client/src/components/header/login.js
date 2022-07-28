import React, {useState, useEffect} from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../util/mutation";
import Auth from "../../util/auth";

const Login = () => {
    const [loginData, setLoginData] = useState({ email: '',password: ''})
    const [login, {error, data }] = useMutation(LOGIN_USER);
    console.log(localStorage.getItem('id_token'))

    useEffect(() => {
        const loginUser = async () =>{
            const { data } = await login({
                variables: {...loginData}
            })
            Auth.login(data.login.token)
            console.log(data.login.token)
        }
        loginUser()
    },[loginData])

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoginData({
            email: e.target[0].value,
            password: e.target[1].value
        })
    }
    
    return (
        <div className="modal modal-signin position-static d-block bg-secondary py-5" tabindex="-1" role="dialog" id="modalSignin">
            <div className="modal-dialog" role="document">
                <div className="modal-content rounded-4 shadow">
                    <div className="modal-header p-5 pb-4 border-bottom-0">
                        {data ? <h1>login</h1> : <h1>not login</h1>}
                        <h2 className="fw-bold mb-0">Login</h2>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body p-5 pt-0">
                        <form className="" onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control rounded-3" id="floatingInput" placeholder="name@example.com" autoComplete="off"  />
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control rounded-3" id="floatingPassword" placeholder="Password" autoComplete="off" />
                            <label for="floatingPassword">Password</label>
                        </div>
                        <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default Login;