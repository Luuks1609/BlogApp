import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserData } from '../features/userSlice'

const Profile = () => {

    const userData = useSelector(selectUserData)

    return (
        <div>
            <h1>Welkom {userData?.username}</h1>
        </div>
    )
}

export default Profile
