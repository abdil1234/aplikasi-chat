import * as types from './actionTypes'
import axios from 'axios'
import firebaseService from '../../services/firebase'


export const restoreSession = () => {
  return (dispatch,getState) => {
    dispatch(sessionRestoring())

        if (getState().session.user) {
          dispatch(sessionSuccess(getState().session.user))
        } else {
          dispatch(sessionLogout())
        }
      
  }
}

export const loginUser = (email, password) => {
  return (dispatch,getState) => {
    dispatch(sessionLoading())

    axios.get('http://192.168.43.70:3000/user?email='+email+'&password='+password)
    .then(function (response) {
      let data = response.data.data[0];
     
      dispatch(sessionSuccess(data))
     
    })
    .catch(function (error) {
      dispatch(sessionError(error));
    });

    // firebaseService.auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .catch(error => {
    //     dispatch(sessionError(error.message))
    //   })

    // let unsubscribe = firebaseService.auth()
    //   .onAuthStateChanged(user => {
    //     if (user) {
    //       dispatch(sessionSuccess(user))
    //       unsubscribe()
    //     }
    //   })
  }
}

export const signupUser = (email, password) => {
  return (dispatch) => {
    dispatch(sessionLoading())
    axios.post('http://192.168.43.70:3000/user', {
      email: email,
      password: password,
    })
    .then(function (response) {
      // alert(response.data.id);
      dispatch(sessionSuccess(response.data))
    })
    .catch(function (error) {
      dispatch(sessionError(error));
    });

    // firebaseService.auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .catch(error => {
    //     dispatch(sessionError(error.message));
    //   })

    // let unsubscribe = firebaseService.auth()
    //   .onAuthStateChanged(user => {
    //     if (user) {
    //       dispatch(sessionSuccess(user))
    //       unsubscribe()
    //     }
    //   })
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(sessionLoading())

    firebaseService.auth()
      .signOut()
      .then(() => {
        dispatch(sessionLogout())
      })
      .catch(error => {
        dispatch(sessionError(error.message))
      })
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
