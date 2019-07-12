import React from 'react'
import {Paper} from '@material-ui/core'

class CheckOut extends React.Component{
    render(){
        return(
            <div className='container justify-content-center mt-3'>
                <Paper className='p-5 center'>
                    <p>Order anda telah dibuat, mohon untuk segera melakukan pembayaran</p>
                </Paper>
            </div>
        )
    }
}

export default CheckOut;