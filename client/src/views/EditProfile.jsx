import React from 'react'
import { useInsertionEffect } from 'react';

export default ({changeToFalse}) => {

    useEffect(() => {
        constEditProfile
    },[])

  return (
    <div>
        <div onClick={() => changeToFalse()}>Go Back</div>
        <input value="First Name"/>
        <input value="Last Name"/>
        <input value="Username"/>
        <input value="Phone Number"/>
        <button>Save</button>

    </div>
  );
};
