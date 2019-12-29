import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, TouchableOpacity } from 'react-native';


class AddPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: ''
    }
  }


  onSubmit = () => {
    alert('Hello');
  }

  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.text}>New Blog Post</Text>
        <TextInput
          style={styles.title}
          placeholder="Title"
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
        />
        <TextInput
          style={styles.description}
          placeholder="Description"
          onChangeText={description => this.setState({ description })}
          value={this.state.description}
        />
        <Button
          onPress={() => this.onSubmit()}
          title="Create new post"
        />

        <TouchableOpacity onPress={() => this.onSubmit()}>
          <View>
            <Text> Touchable Opacity </Text>
          </View>
        </TouchableOpacity>



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    color: 'blue',
    fontSize: 48
  },
  title: {
    flex: 1,
    padding: 20,
    width: "100%"
  },
  description: {
    flex: 4,
    backgroundColor: "blue"
  }
});

export default AddPost;
