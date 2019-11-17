import React from 'react'
import {  ActivityIndicator,
          StyleSheet,
          View,
          Text,
          TextInput,
          Button,
          Alert
        } from 'react-native'
import firebase from 'firebase'

import FormRow from '../components/FormRow'

export default class LoginPage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      mail: '',
      password: '',
      isLoading: false,
      message: '',
    }
  }

  componentDidMount(){
    const config = {
      apiKey: "AIzaSyAvLs0OasMmO23Kb_uiy6P6vydYgVGHZfA",
      authDomain: "series-d4d1b.firebaseapp.com",
      databaseURL: "https://series-d4d1b.firebaseio.com",
      projectId: "series-d4d1b",
      storageBucket: "series-d4d1b.appspot.com",
      messagingSenderId: "701534723441",
      appId: "1:701534723441:web:73bea90bb87d22c05bead0",
      measurementId: "G-28SKELPPTL"
    }
    firebase.initializeApp(config)
  }

  onChangeHandler(key, value){
    this.setState({ [key]: value })
  }

  tryLogin(){
    this.setState({ isLoading: true, message: '' })
    const { mail, password } = this.state

    const loginUserSuccess = user => {
      this.setState({ message: 'Sucesso' })
    }

    const loginUserFailed = err => {
      this.setState({ message: this.getMessageByErrorCode(err.code) })
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(mail, password)
      .then(loginUserSuccess)
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

  getMessageByErrorCode(errorCode){
    switch (errorCode) {
      case 'auth/wrong-password':
        return 'Senha Incorreta'
      case 'auth/user-not-found':
        return 'Usuario nao encontrado'
      case 'auth/invalid-email':
        return 'Email Invalido'
      case 'auth/user-disabled':
        return 'Usuario desabilitado'
      default:
        return 'Erro desconhecido'
    }
  }

  renderButton(){
    if (this.state.isLoading)
      return <ActivityIndicator />
    return(
      <Button
        title='Entrar'
        onPress={ () => this.tryLogin()}
      />
    )
  }

  renderMessage(){
    const { message } = this.state
    if(!message)
      return null
    
    return(
      <View>
        <Text>
          { message }
        </Text>
      </View>
    )
  }

  render() {
    return(
      <View style={ styles.container }>
        <FormRow >
          <TextInput
            underlineColorAndroid={ 'gray' }
            style={ styles.input }
            placeholder="seu@email.com"
            value={ this.state.mail }
            onChangeText={ value => this.onChangeHandler('mail', value) }
          />
        </FormRow>
        <FormRow>
          <TextInput
            underlineColorAndroid={ 'gray' }
            style={ styles.input }
            placeholder="******"
            value={ this.state.password }
            secureTextEntry
            onChangeText={ value => this.onChangeHandler('password', value) }
          />
        </FormRow>
        { this.renderButton() }
        { this.renderMessage() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
  }
})