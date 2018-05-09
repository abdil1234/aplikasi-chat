import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadMessages } from '../../../../store/chat/actions'
import { getChatItems } from '../../../../store/chat/selectors'

import MessageListComponent from './Component'
import io from 'socket.io-client';
import feathers from '@feathersjs/client';
import socketio from '@feathersjs/socketio-client';

const socket = io('http://192.168.43.70:3000',{
  transports: ['websocket'],
  forceNew: true
});
const app = feathers().configure(feathers.socketio(socket));


const messages = app.service("message");





class MessagesListContainer extends Component {

  componentDidMount() {
    this.props.loadMessages();
    messages.on('created',(message)=>this.props.loadMessages());
  }
  
  render() {
    const data = getChatItems(this.props.messages.data).reverse();
 


    return (
      <MessageListComponent
        data={data} />
    )
  }
}

const mapStateToProps = state => ({
  messages: state.chat.messages,
  error: state.chat.loadMessagesError
})

const mapDispatchToProps = {
  loadMessages
}

MessagesListContainer.propTypes = {
  messages: PropTypes.object,
  error: PropTypes.string,
  loadMessages: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesListContainer)
