import * as types from './actionTypes'
import firebaseService from '../../services/firebase'
import {session} from '../session/reducer'
import axios from 'axios'
import API_URL from '../../services/api'



export const sendMessage = message => {
  return (dispatch,getState) => {
    dispatch(chatMessageLoading())
    axios.post(`${API_URL}/message`, {
      user_id: getState().session.user,
      message: message
    })
    .then(function (response) {
      dispatch(chatMessageSuccess())
      loadMessages();
    })
    .catch(function (error) {
     
      dispatch(chatMessageError(error));
    });
    

    
  }
}

export const updateMessage = text => {
  return (dispatch) => {
    // alert(text);
    dispatch(chatUpdateMessage(text))
  }
}

export const loadMessages = () => {
  return (dispatch) => {
    axios.get(`${API_URL}/message`)
    .then(function (response) {
      dispatch(loadMessagesSuccess(response.data))
    })
    .catch(function (error) {
      
      dispatch(loadMessagesError(error));
    });
    // FIREBASE_REF_MESSAGES.limitToLast(FIREBASE_REF_MESSAGES_LIMIT).on('value', (snapshot) => {
    //   dispatch(loadMessagesSuccess(snapshot.val()))
    // }, (errorObject) => {
    //   dispatch(loadMessagesError(errorObject.message))
    // })
  }
}

const chatMessageLoading = () => ({
  type: types.CHAT_MESSAGE_LOADING
})

const chatMessageSuccess = () => ({
  type: types.CHAT_MESSAGE_SUCCESS
})

const chatMessageError = error => ({
  type: types.CHAT_MESSAGE_ERROR,
  error
})

const chatUpdateMessage = text => ({
  type: types.CHAT_MESSAGE_UPDATE,
  text
})

const loadMessagesSuccess = messages => ({
  type: types.CHAT_LOAD_MESSAGES_SUCCESS,
  messages
})

const loadMessagesError = error => ({
  type: types.CHAT_LOAD_MESSAGES_ERROR,
  error
})
