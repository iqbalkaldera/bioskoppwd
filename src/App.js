import React from 'react'
import Header from './commponent/header'
import MovieList from './pages/movieList'
import Bebas from './pages/admin/manageMovie'
import MovieDetail from './pages/movieDetail'
import Register from './pages/register'
import SeatRes from './pages/seatRerservation'
import PageNoteFound from './pages/pageNotFound'
import { Route,Switch } from 'react-router-dom'
import './App.css';
import Login from './pages/login'
import Axios from 'axios'
import { ApiUrl } from './supports/ApiURI'
import {OnRegisterSuccess} from './redux/actions'
import {connect} from 'react-redux'
import checkOut from './pages/checkOut'
import Cart from './pages/cart'



class App extends React.Component {
  componentDidMount(){
    var username = localStorage.getItem('terserah')
    if(username !== null){
      Axios.get(ApiUrl + '/users?username=' + username)
      .then((res) => {
        console.log(res.data)
        this.props.OnRegisterSuccess(res.data[0])
      })
    }
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={MovieList}/>
          <Route path='/manage' component = {Bebas} />
          <Route path='/movie-detail' component = {MovieDetail} />
          <Route path='/register' component = {Register} />
          <Route path='/login' component = {Login} />
          <Route path='/order-seat' component={SeatRes} />
          <Route path='/checkout' component={checkOut}/>
          <Route path='/cart' component={Cart}/>
          <Route path='*' component = {PageNoteFound} />
        </Switch>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return{
    user : state.user.username
  }
}

export default connect(mapStateToProps ,{OnRegisterSuccess} )(App);
