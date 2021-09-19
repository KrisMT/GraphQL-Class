import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const LOGIN_MUTATION = gql`
mutation loginMutation($email: String, $password: String) {
    login(email: $email, password: $password)
  }
`;

const login = () => {
    const [loginMutation, { data, loading, error }] = useMutation(LOGIN_MUTATION);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    if(loading) return <div>loading...</div>;
    if(error) return <div>`Error: {error.message}`</div>

    if(data) localStorage.setItem('token', data.login);

    return (
        <div>
            <div>Email: {email}</div>
            <div>Password: {password}</div>
            
            <input placeholder='Enter your email address'
                   onChange = {async (e) => {
                     e.preventDefault();                        
                     setEmail(e.target.value);
            }} />
            <input placeholder='Enter your password'
                   type="password"
                   onChange = {async (e) => {
                     e.preventDefault();                        
                     setPassword(e.target.value);
            }} />
            <button onClick = { async (e) => {
                e.preventDefault();
                loginMutation({ variables: { email: email, password: password}});
            }}>Login</button>
            <div>
                { data && <p>Your token is: {data.login}</p> }
            </div>
        </div>
    );
};

export default login;
