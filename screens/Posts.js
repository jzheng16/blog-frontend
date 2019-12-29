import React, { Component } from 'react';
import { Stylesheet, View, Button, TouchableOpacity, ScrollView, Text, Image } from 'react-native';


class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    }
  }

  // 10.0.0.2.2 points to AVD which I am using for android emulator 
  componentDidMount() {
    fetch("http://10.0.2.2:8000/api/posts")
      .then(res => res.json())
      .then(posts => {
        this.setState({ posts })
      })
      .catch(error => console.log('There has been a problem with your fetch operation: ' + error.message))

  }

  render() {
    return (
      <ScrollView>
        <Text> Posts </Text>
        {this.state.posts.map(post => (
          <View key={post.id}>
            <Text>{post.title}</Text>
            <Text>{post.description}</Text>
          </View>
        ))}

      </ScrollView>

    )
  }

}

export default Posts;