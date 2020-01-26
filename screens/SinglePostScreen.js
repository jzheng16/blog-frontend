import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, Button, ActivityIndicator } from 'react-native';
import estimate from '../helpers/estimate';
import timestampToDate from '../helpers/timestampToDate';
import AppStyles from '../AppStyles';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationEvents } from 'react-navigation';


// Use an onBlur effect to grab the number of counts and update the database? 
// Only update the frontend for now if the user likes it 
export default function SinglePost(props) {

  const [post, setPost] = useState({});
  const [likes, setLikes] = useState(null);
  const [loading, setLoading] = useState(false);


  likePost = () => {
    return setLikes(likes + 1);
  };

  saveLikes = () => {
    if (likes > post.likes) {
      console.log('saving likes...', likes);
      fetch(`http://10.0.2.2:8000/api/updatePost/${post.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ likes: likes })
      })
        .catch(err => console.log(err));
    }
  }

  useEffect(() => {

    // Can't make useEffect callback function be async, instead declare the function inside and then call it
    const postId = props.navigation.getParam('postId', null);

    const fetchPost = async () => {
      try {
        const res = await fetch(`http://10.0.2.2:8000/api/posts/${postId}`);
        const post = await res.json();
        setPost(post);
        setLikes(post.likes)
        setLoading(true);

      } catch (err) {
        // Show a error page
        console.log(err);
      }

    }

    fetchPost(postId);

  }, []);

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
          <Text style={styles.title}> {post.title} </Text>
          <Text style={styles.categor}> {category.name}</Text>
          <Ionicons name="md-checkmark-circle" size={32} color="green" />
          <View>

            <Text> {user.name} </Text>
            <Text> {estimate(post.description)} min read.</Text>
            <Text> {timestampToDate(post.created_at)} </Text>

          </View>
          <View>
            <Text> {likes} Likes </Text>
            <TouchableOpacity
              onPress={likePost}
              style={styles.likeButton}
            >

              <FontAwesome name="thumbs-o-up" size={32} color="black" />

            </TouchableOpacity>
          </View>

          <View>
            <Image style={{ height: 100 }} source={require('../assets/images/image-placeholder.png')} />
            <Text> {post.description} </Text>

          </View>

          <TouchableOpacity
            onPress={likePost}
            style={styles.likeButton}
          >
            <FontAwesome name="thumbs-o-up" size={32} color="black" />
          </TouchableOpacity>


        </View>
      }



      <NavigationEvents
        onWillBlur={payload => {
          saveLikes();
        }}
      />
    </View>
  )

}


const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center'

  },
  category: {
    fontSize: 18
  },
  likeButton: {
    width: 50
  }
})

SinglePost.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam('title', 'god dammit')
  }
}