import React, { Component } from 'react';

class AdminArea extends Component {
  componentWillMount(){
    if(!localStorage.getItem('JWTToken')){
      this.props.history.push('/admin/login');
    }
  }

  render() {
    return (
        <div>
          Area
        </div>
    );
  }
}

export default AdminArea;
