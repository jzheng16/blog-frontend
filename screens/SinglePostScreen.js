import React, { useState, useEffect } from 'react';
import { Stylesheet, Text, Image, View, Button } from 'react-native';


export default function SinglePost(props) {

  const [post, setPost] = useState({});

  useEffect(() => {

    // Can't make useEffect callback function be async, instead declare the function inside and then call it
    const postId = props.navigation.getParam('postId', null);

    const fetchPost = async () => {
      try {
        const res = await fetch(`http://10.0.2.2:8000/api/posts/${postId}`);
        const post = await res.json();
        setPost(post);

      } catch (err) {
        // Show a error page
        console.log(err);
      }

    }

    fetchPost(postId);

  }, []);

  return (
    <View>
      <Text> {post.id} </Text>

      <Button
        onPress={() => { props.navigation.goBack() }}
        title="Go Back"
      />

    </View>
  )

}

SinglePost.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam('title', 'god dammit')
  }
}