import {Redirect} from 'react-router-dom'
import React, {Component} from 'react';

// TIPS:
// 403 means unauthorized
// 401 means session expired
// 200 means OK
export const ValidateSession = (props) => {
    if(!window.lastLogin) {
        return <Redirect to='/403'/>;
    }
    const currentDate = (new Date()).getTime();
    const howManyMilisecondsInAnHour = 1000 * 60 * 60; 
    if((currentDate - window.lastLogin) > howManyMilisecondsInAnHour) {
        alert("Session expired! Please login again.");
        return <Redirect to='/login'/>;
    }
    return <span>{''}</span>;
}