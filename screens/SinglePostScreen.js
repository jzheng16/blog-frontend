import React, { useState, useEffect } from 'react';
import { Stylesheet, Text, Image, View, Button, ActivityIndicator } from 'react-native';
import estimate from '../helpers/estimate';
import timestampToDate from '../helpers/timestampToDate';
import AppStyles from '../AppStyles';

export default function SinglePost(props) {

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {

    // Can't make useEffect callback function be async, instead declare the function inside and then call it
    const postId = props.navigation.getParam('postId', null);

    const fetchPost = async () => {
      try {
        const res = await fetch(`http://10.0.2.2:8000/api/posts/${postId}`);
        const post = await res.json();
        setPost(post);
        setLoading(true);

      } catch (err) {
        // Show a error page
        console.log(err);
      }

    }

    fetchPost(postId);

  }, []);

  console.log('What is post??', post);
  const { user, category } = post;
  return (
    <View>
      {Object.keys(post).length === 0 ?
        <ActivityIndicator
          style={AppStyles.loading}
          animating={loading}
          size="large"
          color="blue"
        />
        :
        <View>
          <Text> {post.title} </Text>
          <Text> {category.name}</Text>
          <View>

            <Text> {user.name} </Text>
            <Text> {estimate(post.description)} min read.</Text>
            <Text> {timestampToDate(post.created_at)} </Text>

          </View>

          <View>
            <Image style={{ height: 100 }} source={require('../assets/images/image-placeholder.png')} />
            <Text> {post.description} </Text>

          </View>

          <Button
            onPress={() => { props.navigation.goBack() }}
            title="Go Back"
          />
        </View>
      }

    </View>
  )

}

SinglePost.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam('title', 'god dammit')
  }
}