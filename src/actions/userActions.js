import firebase from 'firebase'
import { Alert } from 'react-native'

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
const userLoginSuccess = user => ({
  type: USER_LOGIN_SUCCESS,
  user
})

export const USER_LOGOUT = 'USER_LOGOUT'
const userLogout = () => ({
  type: USER_LOGOUT,
})

export const tryLogin = ({ email, password }) => dispatch => {

  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      const action = userLoginSuccess(user)
      dispatch(action)
    })
    .catch( err => {
      if(err.code === 'auth/user-not-found') {
        return Alert.alert(
          'Usuario nao encontrado',
          'Deseja criar um novo usuario?',
          [{
            text: 'Nao',
            onPress: () => {
              console.log('Nao criar novo usuario')
            },
            style: 'cancel'
          }, {
            text: 'Sim',
            onPress: () => {
              firebase
                .auth()
                .createUserWithEmailAndPassword(mail, password)
                .then(loginUserSuccess)
                .catch(loginUserFailed)
            }
          }],
          { cancelable: false }
        )
      }
      loginUserFailed(err)
    })
    .then( () => this.setState({ isLoading: false }))
}