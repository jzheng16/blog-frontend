import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default props => {
  const [values, setValues] = useState({ email: '', password: '' });
  async function login() {
    const { email, password } = values;

    // TODO: Perform validation 

    const res = await fetch('http://10.0.2.2:8000/api/login', {
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
        // onFocus={this.makeShitLookNice}
        placeholder="Password"
        textContentType="password"
        secureTextEntry={true}
        onSubmitEditing={null} // This event fires when the user presses submit on their keyboard 
      />

      <TouchableOpacity
        onPress={login}
      >
        <Text> Login </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Signup')}
      >
        <Text> Don't have an account? Sign Up!</Text>
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