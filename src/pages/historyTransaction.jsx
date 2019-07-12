import React from 'react'
import {Collapse, Button, CardBody, Card, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {Paper, Table, TableBody,TableHead, TableCell, TableRow} from '@material-ui/core'
import { connect} from 'react-redux'
import { ApiUrl} from './../supports/ApiURI'
import Axios from 'axios';


class History extends React.Component{
    state={
        dataTransaksi:null,
        modal: false,
        index:null,
        collapse: false
    }

    componentDidMount=()=>{
        console.log(this.props.userData)
        console.log(this.props.location.state)
        Axios.get(ApiUrl+'/user/'+this.props.location.state)
        .then((res)=>{
            console.log(res.data.transaction.items)
            this.setState({dataTransaksi: res.data.transaction})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    toggle=(index)=> {
        // var collapse = !this.state.collapse
        if(this.state.collapse === false){
            this.setState({ collapse: true, index: index });
        }else{
            this.setState({ collapse: false, index: 0 });
        }
      }

    renderData=()=>{
        var data = this.state.dataTransaksi
        var qty=0
        var harga=0
        // console.log(data)
        // console.log(qty + ' - '+harga)
        var test=''
        var jsx = data.reverse().map((val,i)=>{
            var qty=0
            var total=0
            val.items.map((val1,i)=>{
                qty+= val1.qty
                total+=val1.total
            })
            return(
                <TableRow>
                    <TableCell>{i+1}</TableCell>
                    <TableCell>{val.tgl}</TableCell>
                    <TableCell>{qty}</TableCell>
                    <TableCell>{total}</TableCell>
                    <TableCell><Button color='primary' onClick={()=>this.toggle(i)}>Detail</Button></TableCell>
                    <Collapse isOpen={this.state.collapse && this.state.index=== i}>
                        <Card>
                            <CardBody>
                        
                            Anim pariatur cliche reprehenderit,
                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                            nesciunt sapiente ea proident.
                            </CardBody>
                        </Card>
                    </Collapse>
                </TableRow>
            )
        })
        return jsx
    }

    renderDetail=(index)=>{
        this.setState({ index:index})
        this.setState({modal:true})
        // var data = this.state.dataTransaksi[index].items
        // var jsx = data.map((val,i)=>{
        //     return(
        //             <TableRow>
        //                 <TableCell>{i+1}</TableCell>
        //                 <TableCell>{val.title}</TableCell>
        //                 <TableCell>{val.qty}</TableCell>
        //                 <TableCell>{val.total}</TableCell>
        //             </TableRow>
        //     )
        // })
        
        // return jsx
    }

    closeModal=()=>{
        this.setState({modal: false})
    }

    modalDetail=(index)=>{
        this.setState({modal:true})
        // this.setState({modal:true})
        var index = this.state.index
        var data = this.state.dataTransaksi[index].items
        return(
        <Modal isOpen={this.state.modal} toggle={this.closeModal}>
          <ModalHeader toggle={this.toggle}>Detail Transaction</ModalHeader>
          <ModalBody>
            <Table>
                <TableHead>
                    <TableCell> No </TableCell>
                    <TableCell> Title </TableCell>
                    <TableCell> Qty Seat </TableCell>
                    <TableCell> Harga</TableCell>
                </TableHead>
                <TableBody>
                   {
                    //    ()=>{
                        data.map((val,i)=>{
                            return(
                                    <TableRow>
                                        <TableCell>{i+1}</TableCell>
                                        <TableCell>{val.title}</TableCell>
                                        <TableCell>{val.qty}</TableCell>
                                        <TableCell>{val.total}</TableCell>
                                    </TableRow>
                            )
                        })
                        
                        // return jsx
                    // }
                   }
                </TableBody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.closeModal}>Close</Button>
           
          </ModalFooter>
        </Modal>

        )
    }
    render(){
        if(this.state.dataTransaksi===null){
            return<p>loading...</p>
        }
       
        return(
            <div className='container mt-4 justify-content-center'>
            {/* {this.modalDetail()} */}
                <Paper className='p-3'>
                    <Table>
                        <TableHead>
                            <TableCell>No</TableCell>
                            <TableCell>Tanggal</TableCell>
                            <TableCell>Qty</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Detail</TableCell>
                        </TableHead>
                        <TableBody>
                            {this.renderData()}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
    
    
    )
}
}

const mapStateToProps = (state)=>{
    return{
        userData : state.user
    }
}

export default connect (mapStateToProps) (History);