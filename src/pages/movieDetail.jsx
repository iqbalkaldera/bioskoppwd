import React from 'react'
import Axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'


    // dari movie list kirim id ke movie Details
    // di movie detail get movie berdasarkan id
    // dapat data, kemudian taruh di statement
    // state di render

class movieDetail extends React.Component{
    state = {data : null, login : null}
    componentDidMount (){
        var id = this.props.location.search.split('=')[1]
        Axios.get('http://localhost:2000/movies/' + id)
        .then((res) => {
            this.setState({data : res.data})
        })
        .catch((err) =>{
            console.log (err)
        })
    }

    onBuyticketClick = () => {
        if(this.props.user.id === 0){
            this.setState({login : false})
        }else{
            this.setState({login : true})
        }
    }

    render (){
        if(this.state.login === false ){
            return(
                <Redirect to='/login'/>
            )
        }
        if (this.state.login === true){
            return (
                <Redirect to={{pathname : './order-seat', state: this.state.data }} />
            )
        }
        if (this.state.data === null){
            return(<p> Loading ... </p>)
        }

        return (
            <div className = 'container mt-5 mb-5'>
                <div className = 'row'>
                    <div className = 'col-md-4'>
                        <img height = '430px' src = {this.state.data.image}/>  
                    </div>
                    <div className = 'col-md-8'>
                        <h1>{this.state.data.title}</h1>
                        <p>{this.state.data.genre}</p>
                        <h5>{this.state.data.sutradara}</h5>
                        <p>{this.state.data.duration}</p>
                        <p>{this.state.data.playingAt.join(',')}</p>
                        <p style = {{fontStyle: 'italic'}}>{this.state.data.synopsis}</p>
                        <input onClick={this.onBuyticketClick} type='button'  className='btn btn-success' value='Buy Ticket'/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        user : state.user
    }
}
    

export default connect (mapStateToProps) (movieDetail)