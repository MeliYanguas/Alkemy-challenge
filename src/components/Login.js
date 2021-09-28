/* eslint-disable */
import React, { useState } from 'react';

const Login = () => {

    const [isLogged, setIsLogged] = useState(false)

    const adminUser = {
        email: "challenge@alkemy.org",
        password: "react"
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    

    const logout = () => {
        console.log('logout');
        setIsLogged(false)
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log({"email":email,"password":password})

        if(email == adminUser.email && password == adminUser.password){
            console.log('LOGEEADISIMO')
            setEmail(email)
            setPassword(password)
            setIsLogged(true)
            
        } else{
            console.log('details do not match');
            setError('details do not match')
        }    
    };

    return (
        <div style={{ width: '500px' }} className="route">
            {(isLogged) ? (
            <div className="menu">
                Welcome to the menu
                <button onClick={logout}>Logout</button>
            </div>
            ) : (
                <div>
                    <form onSubmit={handleLogin}>
                    <h2>Login</h2>

                

                    <label htmlFor="email">Email</label>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    name="email"
                    id="email"
                    placeholder="EMAIL"
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    type="passwor"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    name="password"
                    id="password"
                    placeholder="PASSWORD"
                   
                />
                <br />
                <input
                    type="submit"
                    value="Enviar"
                />
            </form> 
            {/* DISPLAY ERROR */}

            {(error != "") ? (<div className="error">
            {error}
            </div>) : ""}
                </div>

            )}
             
        </div>
    );
};
export default Login;
