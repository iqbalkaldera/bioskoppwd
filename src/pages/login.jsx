import React from 'react'
import {Paper} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Axios from 'axios'
import {OnRegisterSuccess} from './../redux/actions'
import {Redirect} from 'react-router-dom'
import { ApiUrl } from '../supports/ApiURI'

class Login extends React.Component {
    onBtnLoginClick = () => {
        var name = this.refs.username.value
        var pass = this.refs.password.value
        if(name === '' || pass ===''){
            alert('Semua Form Harus Terisi')
        }else{
            Axios.get(ApiUrl + '/users?username=' + name + '&password=' + pass)
            .then((res) => {
                if(res.data.length === 0){
                    alert('Password or Username Invalid')
                }else{
                    this.props.OnRegisterSuccess(res.data[0])
                    localStorage.setItem('terserah' , name)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    render () {
        if(this.props.username !== ""){
            return(
                <Redirect to='/' />
            )
        }

        return (
            <div className='container'>
                <div className='row justify-content-center mt-5'>
                    <div className = 'col-md-6'>
                        <Paper className = 'p-5'>
                            <h1> LOGIN </h1>
                            <input ref='username' className='form-control mt-3' type='text' placeholder='username' />
                            <input ref='password' className='form-control mt-3' type='#' placeholder='password' />
                            <input onClick={this.onBtnLoginClick} type='button' className='btn btn-primary mt-5' value='Login' />
                        </Paper>
                        <p className='mt-3' style= {{fontStyle : 'italic'}}>
                            Belum punya akun ?  
                            <Link to='/register'>
                            <span style= {{color : 'blue', fontWeight : 'bolder', textDecoration : 'underline', cursor : 'pointer'}}>
                                Register Now
                            </span> 
                            </Link> 
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        username : state.user.username
    }
}

export default connect(mapStateToProps , {OnRegisterSuccess})(Login)
