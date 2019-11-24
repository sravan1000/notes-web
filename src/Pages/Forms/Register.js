import React, { Component } from 'react'
import axios from 'axios';
import {Link} from "react-router-dom";
import constants from '../../constants';

export class Register extends Component {
    constructor(){
        super();
        this.state = {
            email : "",
            password: "",
            repassword: "",
        };
    }
    ChangeHandler = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (event) =>{
        if(this.state.email && this.state.password && (this.state.password === this.state.repassword) ){
            console.log("pass matched",this.state);
            var token = localStorage.getItem("token") ?  localStorage.getItem("token") : "";
            axios.post(constants.api_url+"/user",JSON.stringify({
                email:this.state.email,
                password: this.state.password
            }),{ headers: {"Authorization" : `Bearer ${token}`} }).then((response,err)=>{
                if(err){
                    console.log(err);
                }else{
                    alert("sucessfully registred");
                    console.log("sucessfully registred");
                }
            })
        }else{
            console.log("something is missing",this.state)
        }
    }
    render() {
        return (
            <div className = 'form-container'>
                <div className="container-title">Please Register</div>
                <div className = "form-element">
                    <div className = 'form-label'><label> Email id</label></div>
                    <div className = 'form-tag'>
                    <input type='text' name="email" placeholder="Please type email" value = {this.state.email} onChange={this.ChangeHandler}/> 
                    </div>
                </div>
                <div className = "form-element">
                    <div className = 'form-label'><label> Password </label></div>
                    <div className = 'form-tag'>
                    <input type='text' name="password" placeholder="Please type password" value = {this.state.password} onChange={this.ChangeHandler}/> 
                    </div>
                </div>
                <div className = "form-element">
                    <div className = 'form-label'><label> Retype Password </label></div>
                    <div className = 'form-tag'>
                    <input type='text' name="repassword" placeholder="Re enter password" value = {this.state.repassword} onChange={this.ChangeHandler}/> 
                    </div>
                </div>
                <div className = "form-element">
                    <button className="submit-btn" type="submit" onClick = {this.submitHandler}> Register</button>
                </div>
                <div className = "form-element">
                        <label> Already a user? Please login <Link to={ "/login"}>Here</Link></label> 
                </div>
            </div>
        )
    }
} 

export default Register
