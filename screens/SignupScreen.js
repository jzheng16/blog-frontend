import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import { connect } from 'react-redux';


function SignupScreen(props) {
  const [values, setValues] = useState({ email: '', password: '', confirmPassword: '' });

  // Loading screen state 
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  async function signup() {
    const { email, password, confirmPassword } = values;

    // TODO: Perform validation 

    // const res = await fetch('http://10.0.2.2:8000/api/signup', {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   body: JSON.stringify(values)
    // });
    // const token = res.json();

    // Store in local storage

  }
  return (
    <View style={styles.container}>
      {!isLoadingComplete ?

        <>
          <Text style={styles.header}> Register </Text>
          <TextInput
            style={styles.input}
            name="email"
            onChangeText={(email) => setValues({ ...values, email })}
            value={values.email}
            autoCompleteType="email"
            // autoFocus={true}
            // onFocus={this.makeShitLookNice}
            placeholder="Email Address"
            textContentType="emailAddress"
            onSubmitEditing={null} // This event fires when the user presses submit on their keyboard 
          />
          <TextInput
            style={styles.input}
            name="password"
            onChangeText={(password) => setValues({ ...values, password })}
            value={values.password}
            autoCompleteType="password"
            // autoFocus={true}
            // onFocus={this.makeShitLookNice}
            placeholder="Password"
            textContentType="newPassword"
            secureTextEntry={true}
            onSubmitEditing={null} // This event fires when the user presses submit on their keyboard 
          />
          <TextInput
            style={styles.input}
            name="password"
            onChangeText={(confirmPassword) => setValues({ ...values, confirmPassword })}
            value={values.confirmPassword}
            autoCompleteType="password"
            // autoFocus={true}
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
        </>
        :
        <Text> Loading...</Text>

      }
    </View>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,


    backgroundColor: '#334760',
    paddingHorizontal: 40,
    paddingVertical: 80,

  },
  header: {
    color: 'white',
    fontSize: 20,
    paddingBottom: 5,
    textAlign: 'left',
    borderBottomWidth: 1,
    borderBottomColor: '#2E5366',
    marginBottom: 32,


  },
  input: {
    marginBottom: 16,
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1,
    paddingBottom: 5,

  }
});

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});


export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);