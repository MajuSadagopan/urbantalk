import React, {Component} from 'react';
import { render } from 'react-dom';

import ChatPanel  from './ChatPanel';
import MapPanel from './MapPanel';


class App extends Component {
  constructor(props) {
		super(props);
    this.state = {
      comments:[],
      user:'Me',
      latitude:43.6421,
      longitude:-79.3871,
      comment:''
    }
    
    this.setLatLong = this.setLatLong.bind(this)
    this.setComment = this.setComment.bind(this)
    this.submitComment = this.submitComment.bind(this)
    this.setUser = this.setUser.bind(this)
  }
  
  componentWillMount(){
    var that = this;
    
    fetch('/comments',{
      method:'GET'
    }).then(function(response){
        if(response.status>400){
          console.log('ERROR')
        }else{
          response.json().then((json)=>{
            console.log(json)
            that.setState({comments:json})
          })
        }
    })
  }
  
  setLatLong(latitude,longitude){
    this.setState({latitude})
    this.setState({longitude})
  }
  
  setComment(comment){
    this.setState({comment})
  }
  
  submitComment(){
    let newComment = {
      name:this.state.user,
      comment:this.state.comment,
      latitude:this.state.latitude,
      longitude:this.state.longitude
    }
    //COPY OF ARRAY TO NEW ARRAY
    let newComments = this.state.comments.slice(0)
    newComments.push(newComment)
    
    this.setState({comments:newComments})
    this.setState({comment:''})
  }
  
  setUser(name){
    this.setState({name})
  }
  
  render() {
    const panelSize = 500
    
    return (
      <div style={{position:'fixed',top:'0px',bottom:'0px',right:'0px',left:'0px'}}>
              <ChatPanel 
                  comments={this.state.comments} 
                  comment={this.state.comment}
                  submitComment={this.submitComment} 
                  setComment={this.setComment} 
                  user={this.state.user} 
                  width={panelSize} 
              />
              <MapPanel 
                  longitude={this.state.longitude} 
                  latitude={this.state.latitude}
                  comments={this.state.comments}
                  comment={this.state.comment} 
                  setLatLong={this.setLatLong} 
                  minusWidth={panelSize} 
              />
      </div>
    );
  }
}


render(<App />, document.getElementById('application'));