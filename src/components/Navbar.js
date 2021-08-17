import { Avatar } from '@material-ui/core'
import React, { useState, useEffect, useRef } from 'react'
import { GoogleLogout } from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux'
import { selectSignedIn, selectUserData, setInput, setSignedIn, setUserData } from '../features/userSlice'

import '../styling/navbar.css'

const Navbar = () => {
    const [inputValue, setInputValue] = useState('tech')
    const isSignedIn = useSelector(selectSignedIn)
    const userData = useSelector(selectUserData)
    const inputRef = useRef()

    const dispatch = useDispatch()

    const logout = (response) => {
        dispatch(setSignedIn(false))
        dispatch(setUserData(null))
    }

    const handleClick = e => {
        e.preventDefault()
        dispatch(setInput(inputValue))
    }

    useEffect(() => {

        const timer = setTimeout(() => {
            if (isSignedIn && inputValue === inputRef.current.value) {
                dispatch(setInput(inputValue))
            }
        }, 1000)
        return () => {
            clearTimeout(timer)
        }
    }, [inputValue, inputRef, dispatch, isSignedIn])

    return (
        <div className='navbar'>
            <h1 className='navbar__header'>Blogmania 💬</h1>
            {isSignedIn && (<div className='blog__search'>
                <input className='search'
                    ref={inputRef}
                    placeholder='Search for a blog'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}

                />
                <button
                    className='submit'
                    onClick={handleClick}>
                    Search
                </button>
            </div>
            )}

            {isSignedIn ? (
                <div className='navbar__user__data'>
                    <Avatar className='user' src={userData?.imageUrl} alt={userData?.name}
                    />
                    <h1 className='signedIn'>{userData?.givenName}</h1>
                    <GoogleLogout
                        clientId='525184137590-cu8qn1qhk2hkit9q823btlj1p64m8ckb.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <button
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                className='logout__button'>
                                Logout 😟
                            </button>
                        )}
                        onLogoutSuccess={logout}
                    />
                </div>) : (<h1 className='notSignedIn'>User not available 😢</h1>)}
        </div>
    )
}

export default Navbar
