import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, TouchableOpacity } from 'react-native';
import AppStyles from '../AppStyles';
import PostsScreen from './PostsScreen';
console.log(AppStyles)

export default function CreateScreen(props) {

  // Will need the ability to let a user select a category later and maybe other things
  const [post, setPost] = useState({ title: '', description: '' });



  onSubmit = async () => {
    const res = await fetch("http://10.0.2.2:8000/api/post", {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(post)
    });

    if (res.status = 201) {
      props.navigation.navigate('Home');
    } else {
      // do some error logging show some red
    }


  }


  return (
    <View style={styles.container} >
      <Text style={styles.text}>Publish New Post</Text>
      <Text style={styles.label}> Title </Text>
      <TextInput
        name="title"
        style={styles.titleInput}
        placeholder="Title"
        onChangeText={title => setPost({ ...post, title })}
        value={post.title}
      />

      <Text style={styles.label}> Description </Text>
      <TextInput
        name="description"
        style={styles.description}
        onChangeText={description => setPost({ ...post, description })}
        placeholder="Description"

        value={post.descriptionInpuit}
      />
      <TouchableOpacity
        onPress={() => onSubmit()}
        title="Create new post"
        style={[AppStyles.button, styles.button]}
      >
        <Text style={styles.buttonText}> Create Post </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={() => this.onSubmit()}>
          <View>
            <Text> Touchable Opacity </Text>
          </View>
        </TouchableOpacity> */}



    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    padding: 15
  },

  label: {
    marginVertical: 15,
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  titleInput: {
    padding: 20,
    width: "100%",
    fontWeight: 'bold',
    fontSize: 20
  },
  descriptionInput: {
    padding: 20

  },

  button: {


    width: '50%',
    padding: 10,
    alignSelf: 'center'
  },
  buttonText: {
    color: 'white',
    textTransform: 'uppercase',
    marginHorizontal: 'auto',
    textAlign: 'center'
  }
});

CreateScreen.navigationOptions = {
  title: 'POSTING POSTING...',
}


