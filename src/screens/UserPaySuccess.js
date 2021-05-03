import React, { Component } from 'react'
import axios from 'axios'

//import 'bootstrap/dist/css/bootstrap.min.css';
    //import './success.css'
import { Redirect } from 'react-router-dom'

import {  useSelector } from 'react-redux';
import Table from './Table';
class UserPaySuccess extends Component {
  
    

    constructor() {
        super()
        this.state = {
            'newDroplets': [],
            'notLoggedIn': 0
        }
    }
    
   
    componentDidMount() {
       
        const API_URL = 'http://localhost:5000/api/'
        const transactionUrl = `${API_URL}transaction/currentTransactions`;
        //"token": localStorage.usertoken
        axios.post(transactionUrl, { "order_id":localStorage.oid, "userId": localStorage.userid })
            .then(res => {
                if (res.status === 200) {
                    this.setState({ 'newDroplets': res.data.tran })

                    console.log(this.state.newDroplets)

                }
            }).catch(err => {
                this.setState({ 'notLoggedIn': 1 });
            })

    }
    render() {
        const mystyle = {
            padding: '5%'
        }
        console.log(this.state.notLoggedIn)

        // if (this.state.notLoggedIn === 1) {
        //     // redirect to home if signed up
        //     return <Redirect to={{ pathname: "/login" }} />;
        // }
        // if (typeof localStorage.usertoken == 'undefined') {
        //     return <Redirect to={{ pathname: "/login" }} />;
        // }

       
            return (
                <div style={mystyle}>

                    <h1 > Transactions </h1>

                    <Table droplets={this.state.newDroplets} />

                </div>

            )
       
       




    }
}

export default UserPaySuccess
