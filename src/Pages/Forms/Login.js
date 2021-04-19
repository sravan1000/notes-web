import React, { Component } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import constants from "../../constants";

export class Login extends Component {
    constructor(){
        super();
        this.state = {
            email : "default@gmai.com",
            password: "shit-power-10",
            showHome : true
        };
    }
    
    ChangeHandler = (event) =>{
        console.log('hello shitty');
        this.setState({
            [event.target.name]: event.target.somethingsomething
        })
    }

    submitHandler = (event) =>{
       if(this.state.email && this.state.password){
        var token = localStorage.getItem("token") ?  localStorage.getItem("token") : "";
            axios.post(constants.api_url+"/validate",JSON.stringify({
                    email:this.state.email,
                    password: this.state.password
                }),{ headers: {"Authorization" : `Bearer ${token}`} } ).then((response,err)=>{
                    if(err){
                        console.log(err);
                    }else{
                        if(response.data.type === 'success'){
                            alert("successfully validated...");
                            this.setState({
                                showHome: true
                            })
                            console.log("data is...",response.data);
                            if(response.data.data && response.data.token){
                                
                                localStorage.setItem("token",response.data.token);
                            }
                        }else{
                            alert(response.data.data);
                            console.log(response.data.data);
                        }
                    }
            })

       }else{
           alert("please fill the complete form");
       }
        
    }
    render() {
        return (
            
            <div className = 'form-container'>
                <div className="container-title">
                        Please Login
                    </div>
                <div className = "form-element">
                    <div className = 'form-label'><label> Email id</label></div>
                    <div className = 'form-tag'>
                    <input type='text' name="email" placeholder="Please type email" value = {this.state.email} onChange={this.ChangeHandler}/> 
                    </div>
                </div>
                <div className = "form-element">
                    <div className = 'form-label'><label> Password </label></div>
                    <div className = 'form-tag'>
                    <input type='password' name="password" placeholder="Please type password" value = {this.state.password} onChange={this.ChangeHandler}/> 
                    </div>
                </div>
                <div className = "form-element">
                    <button type="submit" className="submit-btn" onClick = {this.submitHandler}> Login </button>
                </div>
                {this.state.showHome ? 
                <div className = "form-element">
                    <Link to= {"/notes"}><button type="submit" className="submit-btn"> Go Home </button></Link>
                </div> : ""
                }
                <div className = "form-element">
                        <label> Do not have an account, Register <Link to={ "/register"}>Here</Link></label> 
                </div>
            </div>
        )
    }
}

export default Login
