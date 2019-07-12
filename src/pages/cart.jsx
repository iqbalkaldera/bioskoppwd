import React from 'react'
// import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import { faCartPlus} from '@fortawesome/free-solid-svg-icons'
import {Button} from 'reactstrap'
import {Paper, Table, TableBody,TableHead, TableCell, TableRow, TableFooter} from '@material-ui/core'
import { connect } from 'react-redux'
import Axios from 'axios';
import {ApiUrl} from './../supports/ApiURI'
import { Redirect } from 'react-router-dom'

class CartPage extends React.Component{
    state={
        totalBayar:0,
        data:null,
        checkout: false
    }

    componentDidMount=()=>{
        this.renderData()
        
        if(this.props.location.state === undefined){
            var getId=this.props.userData
        }else{
            var getId=this.props.location.state
        }
        Axios.get(ApiUrl + '/user?id=' +getId) 
        .then((res)=>{
            console.log(res.data)
            this.setState({data:res.data})
            console.log(this.state.data)
            
            var totalHarga=0
            var cart = res.data
            cart[0].cart.map((val)=>{
                totalHarga+=val.total
            })
            this.setState({totalBayar: totalHarga})

        })
        .catch((err)=>{
            console.log(err)
        })
        

    }

    renderData=()=>{
        
    }

    onBtnCheckoutClick=()=>{
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        Axios.get(ApiUrl + '/user?id=' + this.props.userData.id) 
        .then((res)=>{
            
            
            this.setState({userData: res.data})
           
            var cart = res.data[0].cart
            console.log(res.data[0].cart)
            var obj=[{
                "tgl": dateTime,
                "items": cart
            }]
            var trans = [...res.data[0].transaction, ...obj]
            Axios.patch(ApiUrl + '/user/' + this.props.userData.id, {transaction : trans, cart : []})
            .then((res)=>{
                console.log(res.data)
                this.setState({checkout:true})
            })
            .catch((err)=>{
                console.log(err)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
      
    }

    printData=()=>{
 
        var value = this.props.userData.cart
        var total = 0
        var jsx = value.map((val, i) =>{
            total+=val.total
            return(
                <TableRow>
                    <TableCell>{i+1}</TableCell>
                    <TableCell>{val.title}</TableCell>
                    <TableCell>{val.qty}</TableCell>
                    <TableCell>{val.total}</TableCell>
                </TableRow>
                )
        })
    
        return jsx
    }

    showData=()=>{
        if(this.state.data.length === 0){
            var data = this.props.userData
        }else{
            var data = this.state.data
        }
            var jsx = data[0].cart.map((val,i)=>{
                return(
                    <TableRow>
                        <TableCell>{i+1}</TableCell>
                        <TableCell>{val.title}</TableCell>
                        <TableCell>{val.qty}</TableCell>
                        <TableCell>{val.total}</TableCell>
                    </TableRow>
                )
            })
            
        
        return jsx
    }

    render(){
        if(this.state.data === null){
            return (
                <center className='mt-5'> 
                    <div> Loading Process... </div>
                </center>
            )
        }

        if(this.state.checkout === true){
            return <Redirect to='/checkout'/>
        }

        return(
            <div className='container justify-content-center mt-5'>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableCell> No </TableCell>
                            <TableCell> Title </TableCell>
                            <TableCell> Qty Seat </TableCell>
                            <TableCell> Harga</TableCell>
                        </TableHead>
                        <TableBody>
                            {this.printData()}
                        </TableBody>
                        <TableFooter>
                            <TableCell colSpan='3' align='right'>Total</TableCell>
                            <TableCell>Rp. {this.state.totalBayar}</TableCell>
                        </TableFooter>
                    </Table>
                </Paper>
                <Button onClick={this.onBtnCheckoutClick} color='primary' className='mt-4 '>Check Out</Button>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        userData : state.user
    }
}

export default connect(mapStateToProps) (CartPage);