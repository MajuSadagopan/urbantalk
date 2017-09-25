import React, { Component } from 'react';
import PropTypes from 'prop-types';
//Panel to submit and hold chat messages


class ChatPanel extends Component {
  constructor(props) {
		super(props);
    this.state = {
      comment:''
    }
    
    this.getChatStyle = this.getChatStyle.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
	}
  
  getWidth(){
    return this.props.width+'px'
  }
  
  getChatWidth(){
    return (this.props.width-40)+'px'
  }
  
  getChatStyle(name){
    let color = this.props.user===name?'rgba(245,245,245,1)':'rgba(220,220,220,1)'
    let borderRadius = this.props.user===name?'15px 15px 0px 15px':'0px 15px 15px 15px'
    
    let style = {
      display:'inline-block',
      maxWidth:'180px',
      padding:'10px',
      margin:'5px',
      backgroundColor:color,
      borderRadius:borderRadius,
      fontSize:'0.8em'
    }
    return style
  }
  
  getTextAlign(name){
    let align = this.props.user===name?'right':'left'
    return align
  }
  
   handleChange(event) {
    this.setState({comment: event.target.value});
    this.props.setComment(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submitComment();
  }
  
  
  render(){
    return(
      <div style={{boxShadow:'0 0 5px grey',position:'fixed',zIndex:'500',backgroundColor:'white',top:'0px',bottom:'0px',left:'0px',width:this.getWidth()}}>
          <div style={{overflowY:'auto',padding:'20px',position:'absolute',top:'0px',right:'0px',left:'0px',bottom:'80px'}}>
            {this.props.comments.map((comment,index)=>{
               return(
                  <div key={index}>
                      <div style={{textAlign:this.getTextAlign(comment.name)}}>
                        <div style={this.getChatStyle(comment.name)}>
                          {comment.comment}
                          <br/>
                          <span style={{fontSize:'0.65em',fontStyle:'italic'}}>{comment.name}</span>
                        </div>
                      </div>
                    <br/>
                  </div>
               )
            })}
          </div>
          <div style={{position:'absolute',bottom:'0px',right:'0px',left:'0px',height:'100px',boxShadow:'0 0 5px grey'}}>
            <form onSubmit={this.handleSubmit} style={{fontFamily:'century gothic'}}>
              <input type="text" onChange={this.handleChange} value={this.props.comment} style={{fontFamily:'century gothic',width:this.getChatWidth(),height:'60px',border:'none',padding:'20px'}} /> 
            </form>
          </div>
      </div>
    )
  }
}


ChatPanel.proptypes = {
  
}

ChatPanel.defaultProps = {
  
}

export default ChatPanel