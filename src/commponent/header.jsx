import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import {connect} from 'react-redux'
import {onLogout} from './../redux/actions'
import { Link } from 'react-router-dom'

class Example extends React.Component {
  state = {
      isOpen : false
  }
  
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  onBtnLogoutClick = () => {
    this.props.onLogout()
    localStorage.removeItem('terserah')
  }
  render() {
    return (
      <div>
        <Navbar color="dark" light expand="md">
           <Link to='/'> <NavbarBrand style={{fontSize : '25px', color: 'white'}}>Bioskop PWD</NavbarBrand> </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to = '/manage'> <NavLink style={{fontSize : '20px', color: 'white'}}> Manage </NavLink></Link>
              </NavItem>
              <NavItem>
              <Link to='/register'> <NavLink style={{fontSize : '20px', color: 'white'}}>Register</NavLink></Link>
              </NavItem>
              
              {
              this.props.name !== ""
              ?
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret style={{color:'white', fontSize:'20px'}}>
                  {this.props.name}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    History
                  </DropdownItem>
                  <DropdownItem>
                    Cart
                  </DropdownItem>
                  <DropdownItem divider />
                    <Link to='/'>
                    <DropdownItem onClick={this.onBtnLogoutClick}>
                      Logout
                    </DropdownItem>
                    </Link>
                </DropdownMenu>
              </UncontrolledDropdown>
              :
              null
            }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name : state.user.username
  }
}

export default connect(mapStateToProps , {onLogout})(Example)