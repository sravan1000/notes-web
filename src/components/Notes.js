import React, { Component } from 'react'
import '../App.css';
import axios from 'axios';
import constants from '../constants';
import ReactModal from 'react-modal';
import {Link} from "react-router-dom";

var token = localStorage.getItem("token") ?  localStorage.getItem("token") : "";

export class Notes extends Component {
    constructor(){
        super();
        this.state = {
            mode: "View",
            showModalCreate: false,
            title : "",
            content: "",
            notesArr: [],
            offset: 0,
            showMoreOption: true,

        };
    }
    componentDidMount(){
// {params:{id: value}}
        axios.get(constants.api_url+"/notes",{ params: {"offset": this.state.offset},headers: {"Authorization" : `Bearer ${token}`} }).then((response,err)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log(response);
                        if(response.data.type === 'success'){
                            console.log("successfully fetched data...");
                            if(response.data.type === "success"){
                                this.setState({
                                    notesArr:response.data.data,
                                    offset: this.state.offset + response.data.data.length,
                                    showMoreOption: (response.data.data.length < 10) ? false: true
                                })
                                console.log("after updating offset...",this.state);
                            }
                        }else{
                            alert(response.data.data);
                            console.log(response.data.data);
                        }
                    }
        })
    }
    ChangeHandler = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleCloseModal = (event) =>{
        this.setState({
            showModalCreate:false,
            mode: "View",
        })
    }
    createNotesHandler = () =>{

        let title = this.state.title;
        let content = this.state.content;
        if(!title){
            alert("Please give title");
        }
        if(!content){
            alert("Please give content");
        }
        if(title && content){
            axios.post(constants.api_url+"/notes",JSON.stringify({
                    title,
                    content
                }),{ headers: {"Authorization" : `Bearer ${token}`} }).then((response,err)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log(response);
                        if(response.data.type === 'success'){
                            alert("successfully notes created...");
                            console.log("successfully notes created...");
                            this.setState({
                                showModalCreate: false
                            })
                            window.location.reload();
                        }else{
                            alert(response.data.data);
                            console.log(response.data.data);
                        }
                    }
            })
        }
        
    };

    addModalHandler = () =>{
        this.setState({
            showModalCreate: true,
            mode: "Add",
            title: "",
            content: ""
        })
    };

    loadMoreHandler = () =>{
        axios.get(constants.api_url+"/notes",{ params: {"offset": this.state.offset},headers: {"Authorization" : `Bearer ${token}`,} }).then((response,err)=>{
            if(err){
                console.log(err);
            }else{
                console.log(response);
                if(response.data.type === 'success'){
                    console.log("successfully fetched data...");
                    if(response.data.type === "success"){
                        this.setState({
                            notesArr:this.state.notesArr.concat(response.data.data),
                            offset: this.state.offset + response.data.data.length,
                            showMoreOption : (response.data.data.length < 10) ? false: true
                        })
                        console.log("after updating offset...",this.state);
                    }
                }else{
                    alert(response.data.data);
                    console.log(response.data.data);
                }
            }
        })
    }

    notesClickHandler(value,thisValue,mode){

        if(["View","Edit"].includes(mode)){

            console.log("entered into ajax call..");

            axios.get(constants.api_url+'/notes',{ params:{id: value},headers: {"Authorization" : `Bearer ${token}`} }).then((response,err) => {
                    if(err){
                        console.log(err);
                    }else{
                        if(response.data.type === 'success'){
                            console.log("successfully fetched data...of id",value);
                            console.log(response);
                            if(response.data.type === "success"){
                                let res = response.data.data[0];
                                if(mode === "View"){

                                    thisValue.setState({
                                        content: res.content,
                                        title: res.title,
                                        showModalCreate: true,
                                        mode: "View"
                                    })

                                }else{
                                    thisValue.setState({
                                        content: res.content,
                                        title: res.title,
                                        showModalCreate: true,
                                        mode: "Edit"
                                    })

                                }
                                
                            }
                        }else{
                            alert(response.data.data);
                            console.log(response.data.data);
                        }
                    }
            })

        }else if(mode === "Delete"){

            console.log("entered into delete...");
            axios.post(constants.api_url+"/deletenotes",JSON.stringify({
                    id:value,
                }), { headers: {"Authorization" : `Bearer ${token}`} }).then((response,err)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log(response);
                        if(response.data.type === 'success'){
                            alert("successfully notes deleted...");
                            thisValue.setState({
                                showModalCreate: false,
                                mode: "View"
                            })
                            window.location.reload();
                        }
                    }
            })
        }else{
            console.log("Not entered into ajax call..");
            console.log("mode is " , mode);
        }
    }
    render() {
        let data = this.state.notesArr;
        let dataHtml = data.map(eachData =>
            <div className="Notes-box" key={eachData._id} value={eachData._id} onClick={this.notesClickHandler.bind(null,eachData._id,this,this.state.mode)}>
               <div className="Notes-title">
                   {(eachData.title.length > 15 ) ? eachData.title.substring(1,15) + '...' : eachData.title}
               </div>
               <div className="Notes-disc">
                    {(eachData.title.length > 30 ) ? eachData.content.substring(1,30) + '...' : eachData.content}
               </div>               
            </div>
        )
        let btns = ["View","Edit","Delete"];
        let buttonsHtml = btns.map((eachbtn)=> 
                <button value={eachbtn} key={eachbtn} name="mode" onClick={this.ChangeHandler} className={(this.state.mode===eachbtn) ? "container-but-cont-selected" : "container-but-cont"}>
                    {eachbtn}
                </button>
        )
        return (
            <div>
                <div className="Notes-container">
                    <div className="container-title">
                        <div className="container-title-title">
                            Notes Application (In {this.state.mode} mode)
                        </div>
                        <div className ="container-but">
                            <Link to={"/logout"}><button  className= "container-but-cont">
                                Log out
                            </button></Link>

                            {buttonsHtml}
                            <button  className= "container-but-cont" onClick={this.addModalHandler}>
                                Add
                            </button>
                        </div>
                    </div>
                {dataHtml}

                    {(this.state.showMoreOption) ?
                            <div className="Notes-box">
                            <div className="Notes-title-more">
                                <button className="modal-but-cont" onClick={this.loadMoreHandler}> More.. </button>
                            </div>
                            </div> : ""
                
                    }
                        
                   
                </div>

                <ReactModal
                    isOpen={this.state.showModalCreate}
                    contentLabel="Modal #1 Global Style Override Example"
                    onRequestClose={this.handleCloseModal}
                >
                    <div className="modal-container">
                        <div className="modal-title">
                            {this.state.mode} Notes
                            <div className="modal-close">
                                <button className="modal-but-cont-close" onClick={this.handleCloseModal}> X </button> 
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="modal-notes-title">
                                <input className="modal-text-input" name="title" placeholder="Type title here..." type="text" value={this.state.title} onChange={this.ChangeHandler} />
                            </div>
                            <div className="modal-notes-body">
                                <textarea className="modal-text-area-input" name="content" placeholder="This is demo body" value={this.state.content} onChange={this.ChangeHandler}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="submit-button">
                                {["View","Delete"].includes(this.state.mode) ?  console.log(this.state.mode) : 
                                <button className="modal-but-cont" onClick={this.createNotesHandler}> Save </button>
                                }
                            </div>
                        </div>
                    </div>
                </ReactModal>
                
            </div>
        )
    }
}

export default Notes
