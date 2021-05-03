import React, { Component } from 'react'
import axios from 'axios'
import Table from './Table.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './success.css'
import  { Redirect } from 'react-router-dom'
class Success extends Component {

    constructor(){
        super()
        this.state ={
           'newDroplets' : [],
           'notLoggedIn': 0
        }
    }
    componentDidMount(){
        const API_URL = 'http://localhost:5000/'
        const transactionUrl = `${API_URL}transaction/getTransactions`;
        axios.post(transactionUrl, {"token":localStorage.usertoken,"userId":localStorage.userId})
                .then(res => {
                    if (res.status === 200) {
                        console.log()
                        this.setState({'newDroplets': res.data.tran})
                        }
                }).catch(err =>{
                    this.setState({ 'notLoggedIn': 1 });
                })
            
    }
    render() {
      

        return (
            <div className="container">
                
               <h1 className="text-center"> Transactions </h1>
               {/* <Table droplets={ this.state.newDroplets } /> */}
               
            </div>
            
        )
    }
}

export default Success
