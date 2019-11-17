import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'

import FormRow from '../components/FormRow'

export default class LoginPage extends React.Component {
  render() {
    return(
      <View>
        <FormRow>
          <TextInput
          underlineColorAndroid={'gray'}
          placeholder="seu@email.com"
          style={styles.input}
          />
          <TextInput
          underlineColorAndroid={'gray'}
          placeholder="******"
          secureTextEntry
          style={styles.input}
          />
        </FormRow>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,

  }
})