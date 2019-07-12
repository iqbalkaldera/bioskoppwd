import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { ListSubheader, List, ListItem, ListItemIcon, ListItemText, Collapse} from '@material-ui/core';
import { ExpandMore, Theaters, EventSeatOutlined, ExpandLess, AccessTime, ArrowRight} from '@material-ui/icons'
import {ApiUrl} from './../support/urlApi'
import Axios from 'axios';
// const useStyles = makeStyles(thems => ({
//     nested:{
//         paddingLeft: thems.spacing(4),
//         genre:[],
//         sutradara:[],
//         playing:[]
//     }
// }))



class Filter extends React.Component{
    state={
        listOpen : false,
        listId: 0,
        genreFilm:[]
    }
    componentDidMount=()=>{
        var genre = []
        Axios.get(ApiUrl+'/movies')
        .then((res)=>{
            // console.log('from filter')
            res.data.map((val)=>{
                return genre.push(val.genre)
            })
            var unique =[ ...new Set(genre)]
            this.setState({genreFilm: unique})
            // console.log(genre)
            // console.log(unique)
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    renderData=()=>{
        

        var jsx = this.state.genreFilm.map((val)=>{
            // console.log(val) 
            return(
                <ListItem button style={{paddingLeft:'30px'}}>
                <ListItemIcon>
                    <ArrowRight/>
                </ListItemIcon>
                <ListItemText primary={val}/>
                </ListItem>  
            )
        })
        return jsx
    }

    
    onListClick=(id)=>{
        if(this.state.listOpen===false){
            this.setState({listOpen: true, listId:id})
        }else{
            this.setState({listOpen: false, listId:0})
        }
        // console.log(this.state.listOpen)
        
    }
    render(){
        // {this.renderData()}
        return(
            // <div className='row'>
                <div className='mt-3'>
                    {/* <input type='button' onClick={this.onListClick} value='test'/> */}
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                            Filter by: 
                            </ListSubheader>
                        }
                       
                        ></List>

                    <List>
                        <ListItem button onClick={()=>this.onListClick(1)}>
                            <ListItemIcon>
                                <Theaters/>
                            </ListItemIcon>
                            <ListItemText primary='Genre'/>
                            {this.state.listOpen === true && this.state.listId===1? <ExpandLess/> : <ExpandMore/>}
                        </ListItem>
                        <Collapse in={this.state.listOpen && this.state.listId===1} timeout='auto' unmountOnExit>
                            <List >
                                {this.renderData()}
                            </List>
                        </Collapse>

                        {/* SUtradara */}
                        <ListItem button onClick={()=>this.onListClick(2)}>
                            <ListItemIcon>
                                <EventSeatOutlined/>
                            </ListItemIcon>
                            <ListItemText primary='Sutradara'/>
                            {this.state.listOpen === true && this.state.listId===2 ? <ExpandLess/> : <ExpandMore/>}
                        </ListItem>
                        <Collapse in={this.state.listOpen && this.state.listId===2} timeout='auto' unmountOnExit>
                            <List >
                                <ListItem button style={{paddingLeft:'30px'}}>
                                    <ListItemIcon>
                                        <ArrowRight/>
                                    </ListItemIcon>
                                    <ListItemText primary='Riri Riza'/>
                                </ListItem>
                                <ListItem button style={{paddingLeft:'30px'}}>
                                    <ListItemIcon>
                                        <ArrowRight/>
                                    </ListItemIcon>
                                    <ListItemText primary='apa saja lah'/>
                                </ListItem>
                            </List>
                        </Collapse>

                        {/* Playing At */}
                        <ListItem button onClick={()=>this.onListClick(3)}>
                            <ListItemIcon>
                                <AccessTime/>
                            </ListItemIcon>
                            <ListItemText primary='Show Time'/>
                            {this.state.listOpen === true && this.state.listId===3? <ExpandLess/> : <ExpandMore/>}
                        </ListItem>
                        <Collapse in={this.state.listOpen && this.state.listId===3} timeout='auto' unmountOnExit>
                            <List >
                                <ListItem button style={{paddingLeft:'30px'}}>
                                    <ListItemIcon>
                                        <ArrowRight/>
                                    </ListItemIcon>
                                    <ListItemText primary='09.00'/>
                                </ListItem>
                                <ListItem button style={{paddingLeft:'30px'}}>
                                    <ListItemIcon>
                                        <ArrowRight/>
                                    </ListItemIcon>
                                    <ListItemText primary='14.00'/>
                                </ListItem>
                                <ListItem button style={{paddingLeft:'30px'}}>
                                    <ListItemIcon>
                                        <ArrowRight/>
                                    </ListItemIcon>
                                    <ListItemText primary='16.00'/>
                                </ListItem>
                                <ListItem button style={{paddingLeft:'30px'}}>
                                    <ListItemIcon>
                                        <ArrowRight/>
                                    </ListItemIcon>
                                    <ListItemText primary='20.00'/>
                                </ListItem>
                                <ListItem button style={{paddingLeft:'30px'}}>
                                    <ListItemIcon>
                                        <ArrowRight/>
                                    </ListItemIcon>
                                    <ListItemText primary='22.00'/>
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                </div>
            // </div>
        )
    }
}

export default connect (Filter);