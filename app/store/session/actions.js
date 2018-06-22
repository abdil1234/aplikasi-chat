import * as types from './actionTypes'
import axios from 'axios'
import API_URL from '../../services/api'
import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import auth from '@feathersjs/authentication-client';
import superagent from 'superagent';
import localStorage from 'localstorage-memory';
import { AsyncStorage} from 'react-native';
import decode from 'jwt-decode';

const feathersClient = feathers();
feathersClient.configure(rest(API_URL).superagent(superagent))
      .configure(auth({ storage: AsyncStorage }));





export const restoreSession = () => {
  return (dispatch,getState) => {
    dispatch(sessionRestoring())

    const jwt = feathersClient.passport.getJWT().then(function(response){
        const user =decode(response);
        if (user.userId) {
          dispatch(sessionSuccess(user.userId))
        }else {
          alert("keluar");
        }
    })
    .catch(function(error){
      dispatch(sessionLogout())
      
    });;



    
      
  }
}

export const loginUser = (email, password) => {
  return (dispatch,getState) => {
    dispatch(sessionLoading())
    feathersClient.authenticate({
      strategy: 'local',
      email: email,
      password: password
    })
    .then(response => {
      console.log('Authenticated!', response);
      return feathersClient.passport.verifyJWT(response.accessToken);

      
    })
    .then(payload => {
      console.log('JWT Payload', payload);
      return feathersClient.service('users').get(payload.userId);
    })
    .then(user => {
      feathersClient.set('user', user);
      dispatch(sessionSuccess(user.id))
      console.log('User', feathersClient.get('user'));
    })
    .catch(function(error){
      dispatch(sessionError(error));
    });
  }
}

export const signupUser = (email, password) => {
  return (dispatch) => {
    dispatch(sessionLoading())
    axios.post(`${API_URL}/users`, {
      email: email,
      password: password,
    })
    .then(function (response) {
      dispatch(sessionSuccess(response.data))
    })
    .catch(function (error) {
      dispatch(sessionError(error));
    });    
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    feathersClient.logout();
    dispatch(sessionLoading())

    
    dispatch(sessionLogout())
      
  }
}

const sessionRestoring = () => ({
  type: types.SESSION_RESTORING
})

const sessionLoading = () => ({
  type: types.SESSION_LOADING
})

const sessionSuccess = user => ({
  type: types.SESSION_SUCCESS,
  user
})

const sessionError = error => ({
  type: types.SESSION_ERROR,
  error
})

const sessionLogout = () => ({
  type: types.SESSION_LOGOUT
})
