import React, { Component } from 'react';
import PropTypes from 'prop-types';
//Panel to submit and hold chat messages

import ReactMapGL, {Popup} from 'react-map-gl';
import {NavigationControl} from 'react-map-gl';

class MapPanel extends Component {
  constructor(props) {
		super(props);
    this.state = {
      latitude:43.6421,
      longitude:-79.3871,
       viewport: {
          latitude: 43.6521,
          longitude: -79.3971,
          zoom: 14,
          pitch: 60,
          bearing: 132.8,
        }
    }
    this.onViewportChange = this.onViewportChange.bind(this);
	}
  
  onViewportChange(viewport){
    this.setState({viewport})
    this.props.setLatLong(viewport.latitude,viewport.longitude)
  };
  
  getMapWidth(){
    return window.innerWidth-this.props.minusWidth;
  }
  
  getMapHeight(){
    return window.innerHeight;
  }
  
  getLeftOffset(){
    return this.props.minusWidth+'px'
  }
  
  render(){
    const token = 'pk.eyJ1IjoibWdlcnJhcmQiLCJhIjoiY2ltZjY4NHB6MDE4aHR6a2tycTFpNTduNSJ9.iuw30HDiRvHZG5O6i8xr6Q'
    const mapStyle = 'mapbox://styles/mapbox/navigation-preview-day-v2'
    const {viewport} = this.state;
    
    return(
      <div style={{position:'fixed',top:'0px',bottom:'0px',right:'0px',left:this.getLeftOffset()}}>
      {this.getMapWidth()>200?<ReactMapGL
          {...viewport}
          mapStyle={mapStyle}
          mapboxApiAccessToken={token}
          width={this.getMapWidth()}
          height={this.getMapHeight()}
          onViewportChange={this.onViewportChange}
        >
            <div style={{position: 'absolute', right:20, top:20}}>
              <NavigationControl onViewportChange={this.onViewportChange} />
            </div>
            <Popup latitude={this.props.latitude} longitude={this.props.longitude} closeButton={false}>
              <div style={{paddingTop:'5px'}}>{this.props.comment}</div>
            </Popup>
            
            {this.props.comments.map((comment,index)=>{
              return(
                <Popup key={index} latitude={comment.latitude} longitude={comment.longitude} closeButton={false}>
                  <div style={{paddingTop:'5px'}}>{comment.comment}</div>
                </Popup>
              )
            })}
        </ReactMapGL>:null}
      </div>
    )
  }
}


MapPanel.proptypes = {
  
}

MapPanel.defaultProps = {
  
}

export default MapPanel