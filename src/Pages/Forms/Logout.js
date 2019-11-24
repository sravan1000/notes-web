import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';

export class Logout extends Component {
    render() {
        localStorage.removeItem("token");
        let token = localStorage.getItem("token");
        console.log("token is...",token);
        return (
            <div>
                {/* {this.clear} */}
                {token}
                <Redirect to="/" />
            </div>
        )
    }
}

export default Logout
