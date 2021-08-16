import React from 'react'
import GoogleLogin from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux'
import {
    selectSignedIn,
    setSignedIn,
    setUserData
} from '../features/userSlice'

import '../styling/home.css'


const Homepage = () => {

    const dispatch = useDispatch()
    const login = (response) => {
        console.log(response)
        dispatch(setSignedIn(true))
        dispatch(setUserData(response.profileObj))
    }

    const isSignedIn = useSelector(selectSignedIn)

    return (
        <div className="home__page" style={{ display: isSignedIn ? 'none' : '' }}>
            {!isSignedIn && (<div className="login__message">
                <h2>📚</h2>
                <h1>A readers favourite place!</h1>
                <p>We provide high quality online resources for reading blogs. Just sign up and start reading some quality blogs.</p>
                <GoogleLogin
                    clientId='525184137590-cu8qn1qhk2hkit9q823btlj1p64m8ckb.apps.googleusercontent.com'
                    render={(renderProps) => (
                        <button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            className='login__button'>
                            Login with Google
                        </button>
                    )}
                    onSuccess={login}
                    onFailure={login}
                    onSignedIn={true}
                    cookiePolicy={'single_host_origin'}
                />
            </div>)

            }
        </div>
    )
}

export default Homepage
