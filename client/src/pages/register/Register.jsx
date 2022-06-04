import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordConfirm = useRef();
    const history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordConfirm.current.value !== password.current.value) {
            passwordConfirm.current.setCustomValidity("Passwords don't match!");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                await axios.post("/auth/register", user);
                history.push("/login")
            } catch (error) {
                console.log(error);
            }
        }
    };


    return (
        <div className="login" >
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">ParadiseSocial</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on ParadiseSocial.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input
                            placeholder="Username"
                            required
                            ref={username}
                            className="loginInput"
                        />
                        <input
                            placeholder="Email"
                            required
                            ref={email}
                            className="loginInput"
                        />
                        <input
                            placeholder="Password"
                            required
                            ref={password}
                            className="loginInput"
                            type="password"
                            minLength="6"
                        />
                        <input
                            placeholder="Confirm password"
                            required
                            ref={passwordConfirm}
                            className="loginInput"
                            type="password"
                        />
                        <button className="loginButton" type="submit" >Sign up</button>
                        <button className="loginRegisterButton">Log into Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
