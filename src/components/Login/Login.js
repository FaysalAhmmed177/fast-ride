import React, { useContext, useState } from 'react';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'


if (firebase.apps.length === 0) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}



const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };


    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    })

    var googleProvider = new firebase.auth.GoogleAuthProvider();
    var fbProvider = new firebase.auth.FacebookAuthProvider();

    //googleSignIn start from here
    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, photoURL, email } = result.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                };
                setLoggedInUser(signedInUser);
                setUser(signedInUser);
                console.log(signedInUser);
                history.replace(from);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                console.log(errorCode, errorMessage, email);
            });
    }
    // googleSignIn end here

    //fb signIn starts from here
    const handleFbSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                var user = result.user;
                setLoggedInUser(user)
                history.replace(from);
                console.log(user);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                console.log(errorCode, errorMessage, email);
            });
    }
    //set new user name, email and password into state
    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);

        }

        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{2}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }

        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
            setLoggedInUser(newUserInfo);

        }
    }

    //createUserWithEmailAndPassword
    const handleSubmit = (e) => {
        debugger;
        console.log(user.email, user.password);
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                    setLoggedInUser(newUserInfo);
                    
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    console.log(error);
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    // Signed in
                    //var user = res.user;
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    setUser(newUserInfo);
                    console.log('sign in user info', res.user);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setLoggedInUser(newUserInfo);
                    setUser(newUserInfo);
                });
        }

        e.preventDefault();
    }
    //update user name
    const updateUserName = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
            photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function () {
            // Update successful.
            console.log('User name updated successfully');
        }).catch(function (error) {
            // An error happened.
            console.log(error);
        });
    }
    return (
        <div className="d-flex justify-content-center mt-3">
            <div className="login-form p-4">
                <h3 className="text-center mb-2">{newUser ? 'Create an account' : 'Login'}</h3>
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        {newUser && <input type="text" name="name" onBlur={handleBlur} className="form-control" placeholder="Enter your name" />}
                    </div>

                    <div className="form-group">
                        <input type="text" name="email" onBlur={handleBlur} className="form-control" placeholder="Enter your email" required />
                    </div>

                    <div className="form-group">
                        <input type="password" name="password" onBlur={handleBlur} className="form-control" placeholder="Enter your password" />
                    </div> <br />
                    <div className="form-group">
                        <input type="submit" className="form-control bg-success" value={newUser ? "Sign up" : "Login"} />
                    </div><br />
                    <p style={{ color: 'red' }}>{user.error}</p>
                    {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'logged in'} successfully</p>}
                    <hr />
                    <p className="text-center">{newUser ? "Already have an account?" : "Don't have an account?"} <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                        <label htmlFor="newUser">{newUser ? "Sign In" : "Sign up"}</label></p>

                    <p className="text-center">or</p>

                </form>
                <button className="btn btn-danger w-100 mb-1 rounded-pill" onClick={handleGoogleSignIn}><FontAwesomeIcon icon={faGoogle} />Continue with Google</button>
                <button className="btn btn-primary w-100 rounded-pill" onClick={handleFbSignIn}><FontAwesomeIcon icon={faFacebook} />Continue with Facebook</button>
                {/* form end here */}
            </div>
        </div>
    );
};

export default Login;