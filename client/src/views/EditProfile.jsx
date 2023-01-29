/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react'
import ValidatedUsers from './ValidatedUsers';

export default ({changeToFalse}) => {

    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[username, setNewUsername] = useState("");
    const[password, setNewPassword] = useState("");
    const[phoneNumber, setPhoneNumber] = useState("");

    const onSubmit = () => {
        const uid = this.getValidatedUsers();
        const data = {
            uid,
            firstName,
            lastName,
            username,
            password,
            phoneNumber
        }

        const result = ValidatedUsers(data);
        if(result === true){
            console.log("User Info Edited");
        }
        if(result === false){
            console.log("ERROR");
        }
    };

  return (
    <div>
        <div onClick={() => changeToFalse()}>Go Back</div>
        <input value={firstName} onChange={event=>setFirstName(event.target.value)}/>
        <input value={lastName} onChange={event=>setLastName(event.target.value)}/>
        <input value={username} onChange={event=>setNewUsername(event.target.value)}/>
        <input value={password} onChange={event=>setNewPassword(event.target.value)}/>
        <input value={phoneNumber} onChange={event=>setPhoneNumber(event.target.value)}/>
        <button onClick={onSubmit}>Save</button>

    </div>
  );
};
