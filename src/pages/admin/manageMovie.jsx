import React from 'react'
import {Table, TableBody, TableCell, TableHead, Paper, Container, TableRow} from '@material-ui/core'
import {DeleteForeverRounded, EditRounded, EditAttributesRounded, AddAlertRounded} from '@material-ui/icons'
import {Modal, ModalBody, ModalHeader, ModalFooter , Input, FormGroup, Label} from 'reactstrap'
import Axios from 'axios';


// Matrial UI Google

class ManageMovie extends React.Component {
    //state
    state = {
        data : [], 
        modalOpen : false,
        selectEdit : 0
    }

    //lifecycle
    componentDidMount(){
        Axios.get('http://localhost:2000/movies')
        .then((ress) => {
            this.setState ({data : ress.data})
        })
        .catch((err) => {
            console.log (err)
        })
    }

    //Function
    RenderSynopsis = (text) => {
        var arr = text.split(' ')
        var newArr = []
        for (var i = 0 ; i < 3 ; i++){
            newArr.push(arr[i])
        }

        return newArr.join(' ')
    }

    onBtnDeleteClick = (id, index) => {
        var confirm = window.confirm('Are you sure want to Dalete this data ?')
        if (confirm === true){
            Axios.delete('http://localhost:2000/movies/' + id)
            .then ((res) => {
                alert('Delete Success')
                var data = this.state.data
                data.splice(index , 1)
                this.setState ({data : data})
            })
            .catch((err) => {

            })
        }
    }

    onBtnEditClick = (id) => {
        this.setState({selectedEdit : id})
    }

    onBtnSaveEditClick = () => {
        var title = this.refs.input1.value
        var sutradara = this.refs.input2.value
        var image = this.refs.input3.value
        var genre = this.refs.input4.value
        var playingAt = this.refs.input5.value.split(',')
        var duration = this.refs.input6.value
        var sinopsis = this.refs.input7.value

        if(title === '' || 
           sutradara === '' || 
           image === '' || 
           genre === '' || 
           playingAt.length <= 0 ||
           duration <= 0 ||
           sinopsis ==='')
           {
               alert('Isi Form Dengan Benar')
           }
        else{
            var data = {
                title, sutradara,image,genre,playingAt,duration,sinopsis
            }
            Axios.put('http://localhost:2000/movies/' +this.state.selectedEdit ,data )
            .then((res)=>{
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        } 
        
        
        // Get Semua Data Dari Input
        // Kirim Ke JSON

    }

    renderDataToJsx = () => {
        var jsx = this.state.data.map ((val, index) => {
            if (val.id === this.state.selectEdit)
            return (
                <TableRow>
                    <TableCell>{val.id}</TableCell>
                    <TableCell><input ref='input1' className='form-control' type='text' defaultValue={val.title}/></TableCell>
                    <TableCell><input ref='input2' className='form-control' type='text' defaultValue={val.sutradara}/></TableCell>
                    <TableCell><input ref='input3' className='form-control' type='text' defaultValue={val.image}/></TableCell>
                    <TableCell><input ref='input4' className='form-control' type='text' defaultValue={val.genre}/></TableCell>
                    <TableCell><input ref='input5' className='form-control' type='text' defaultValue={val.playingAt}/></TableCell>
                    <TableCell><input ref='input6' className='form-control' type='text' defaultValue={val.duration}/></TableCell>
                    <TableCell><textarea ref='input7' className='form-control' type='text' defaultValue={val.synopsis}/></TableCell>
                    <TableCell><input type = 'button' className = 'btn btn-danger' value='cancel' onClick={() => this.state({selectEdit : 0})}/> </TableCell>
                    <TableCell><input type = 'button' className = 'btn btn-danger' value='save' onClick={this.onBtnSaveEditClick}/> </TableCell>
                </TableRow>
            )
            return (
                <TableRow>
                    <TableCell>{val.id}</TableCell>
                    <TableCell>{val.title}</TableCell>
                    <TableCell>{val.sutradara}</TableCell>
                    <TableCell><img src = {val.image} height = '70px' alt='movie'/></TableCell>
                    <TableCell>{val.genre}</TableCell>
                    <TableCell>{val.playingAt.join(',')}</TableCell>
                    <TableCell>{val.duration}</TableCell>
                    <TableCell>{this.RenderSynopsis(val.synopsis) + '...'}</TableCell>
                    <TableCell><EditAttributesRounded onClick = {() => this.onBtnEditClick(val.id)}/> </TableCell>
                    <TableCell><DeleteForeverRounded onClick = {() => this.onBtnDeleteClick(val.id , index)}/> </TableCell>
                </TableRow>
            )
        })
        return jsx
    }

    closeModal = () => {
        this.setState({modalOpen : false})
    }

    openModal = () => {
        this.setState({modalOpen : true})
    }

    // state
    // lifecyle
    // function
    // render

    onBtnSaveClick = () => {
        // var playingAt = []

        // if(this.refs.radio1.refs.radio1inner.checked === true){
        //     playingAt.push(9)
        // }        
        // if(this.refs.radio2.refs.radio2inner.checked === true){
        //     playingAt.push(10)
        // }
        // if(this.refs.radio3.refs.radio3inner.checked === true){
        //     playingAt.push(14)
        // }
        // if(this.refs.radio4.refs.radio4inner.checked === true){
        //     playingAt.push(20)
        // }
        // if(this.refs.radio5.refs.radio5inner.checked === true){
        //     playingAt.push(22)

        var jam = [9,14,16,20,22]
        var playingAt = []
        for(var i = 1 ; i <= 5 ; i++){
            if(this.refs['radio' + i].refs['radio' + i + 'Inner'].checked === true){
                playingAt.push(jam[i-1])
            }
        }
        console.log(playingAt)
  
        var title = this.refs.title.value
        var sutradara = this.refs.sutradara.value
        var imageLink = this.refs.imageLink.value
        var genre = this.refs.genre.value
        var duration = this.refs.duration.value
        var synopsis =this.refs.synopsis.value

        var data = {
            title : title,
            genre : genre,
            synopsis : synopsis,
            sutradara : sutradara,
            image : imageLink,
            duration : duration,
            playingAt : playingAt
        }
        if (title !== '' && 
            sutradara !== '' && 
            genre !== '' && 
            synopsis !== '' && 
            imageLink !== '' && 
            playingAt !== ''  )
            {
                Axios.post('http://localhost:2000/movies', data)
                .then((res) => {
                    alert('Add Data Success')
                    var movieData = this.state.data
                    movieData.push(res.data)
                    this.setState ({data : movieData, modalOpen : false})
                })
                .catch((err) => {
                    console.log (err)
                })
            }else{
                alert('Semua Form Harus di Isi !!!')
            }
    }

    //render
    render (){
        return(
            <Container fixed>
                <h1>Manage Movie Page</h1>
                <input type ='button' className = 'btn btn-success mb-3' value = 'Add Data' onClick = {() => this.setState({modalOpen : true})}/>
            {/* Modal Start */}

                <Modal isOpen={this.state.modalOpen} toggle={this.closeModal}>
                    <ModalHeader>
                        Add Movie
                    </ModalHeader>
                    <ModalBody>
                        <input ref='title' type='text' className = 'form-control mt-2' placeholder = 'Title'/>
                        <input ref='sutradara' type='text' className = 'form-control mt-2' placeholder = 'Sutradara'/>
                        <input ref='genre' type='text' className = 'form-control mt-2' placeholder = 'Genre'/>
                        <input ref='imageLink' type='text' className = 'form-control mt-2' placeholder = 'Image'/>
                        <div className = 'mt-3' >
                        <FormGroup check inline>
                                <Label>
                                    Playing At : 
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label>
                                    <Input ref='radio1' innerRef='radio1inner' type = 'radio' /> 09.00
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label>
                                    <Input ref='radio2' innerRef='radio2inner' type = 'radio' /> 10.00
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input ref='radio3' innerRef='radio3inner' type = 'radio' /> 14.00
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input ref='radio4' innerRef='radio4inner' type = 'radio' /> 20.00
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input ref='radio5' innerRef='radio5inner' type = 'radio' /> 22.00
                                </Label>
                            </FormGroup>
                        </div>                       
                        <input ref='duration' type='text' className = 'form-control mt-2' placeholder = 'Duration'/>
                        <input ref='synopsis' type='text' className = 'form-control mt-2' placeholder = 'Synopsis'/>
                    </ModalBody>
                    <ModalFooter>
                        <input type='button' onClick={this.closeModal} value='cancel' className='btn btn-danger' />
                        <input type='button' value='Save' onClick={this.onBtnSaveClick} className='btn btn-success' />
                    </ModalFooter>
                </Modal>
            {/* Modal End */}
                <Paper>
                    <Table>
                        <TableHead>
                            <TableCell>No</TableCell>
                            <TableCell>Titel</TableCell>
                            <TableCell>Sutradara</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Genre</TableCell>
                            <TableCell>Play At</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Synopsis</TableCell>
                            <TableCell>Action</TableCell>
                        </TableHead>
                        <TableBody>
                            {/* <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>One Piece</TableCell>
                            <TableCell>Echiro Oda</TableCell>
                            <TableCell><img src = 'https://img1.ak.crunchyroll.com/i/spire4/49d055f0d9b5b191e2dd44a34f890bfb1555368600_full.jpg' width = '50px' />'</TableCell>
                            <TableCell>Anime</TableCell>
                            <TableCell>{[09, 14, 12].join.apply(',')}</TableCell>
                            <TableCell>120</TableCell>
                            <TableCell>Synopsis</TableCell>
                            <TableCell>Action</TableCell>
                            </TableRow> */}
                            {this.renderDataToJsx()}
                        </TableBody>
                    </Table>
                </Paper>
            </Container>
        )
    }
}


export default ManageMovie