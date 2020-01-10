import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default props => {
  const [values, setValues] = useState({ email: '', password: '', confirmPassword: '' });

  async function signup() {
    const { email, password, confirmPassword } = values;

    // TODO: Perform validation 

    const res = await fetch('http://10.0.2.2:8000/api/signup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(values)
    });
    const token = res.json();

    // Store in local storage

  }
  return (
    <View style={styles.container}>
      <TextInput
        name="email"
        onChangeText={(email) => setValues({ ...values, email })}
        value={values.email}
        autoCompleteType="email"
        autoFocus={true}
        // onFocus={this.makeShitLookNice}
        placeholder="Email Address"
        textContentType="emailAddress"
        onSubmitEditing={null} // This event fires when the user presses submit on their keyboard 
      />
      <TextInput
        name="password"
        onChangeText={(password) => setValues({ ...values, password })}
        value={values.password}
        autoCompleteType="password"
        autoFocus={true}
        // onFocus={this.makeShitLookNice}
        placeholder="Password"
        textContentType="newPassword"
        secureTextEntry={true}
        onSubmitEditing={null} // This event fires when the user presses submit on their keyboard 
      />
      <TextInput
        name="password"
        onChangeText={(confirmPassword) => setValues({ ...values, confirmPassword })}
        value={values.confirmPassword}
        autoCompleteType="password"
        autoFocus={true}
        // onFocus={this.makeShitLookNice}
        placeholder="password Address"
        textContentType="newPassword"
        secureTextEntry={true}
        onSubmitEditing={null} // This event fires when the user presses submit on their keyboard 
      />
      <TouchableOpacity
        onPress={signup}
      >
        <Text> Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Login')}
      >
        <Text> Already have an account? Login!</Text>
      </TouchableOpacity>
    </View>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});