// @refresh reset
import React, { Component, useEffect, useState } from 'react';
import { Stylesheet, View, Button, TouchableOpacity, ScrollView, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import imagePlaceholder from '../assets/images/image-placeholder.png';
import { withNavigation, NavigationEvents } from 'react-navigation';
import AppStyles from '../AppStyles';
import { useSelector, useDispatch } from 'react-redux';
import { gettingPosts } from '../store/action-creators/posts';

// Display some meaningful dummy photos - TODO: Enable functionality to upload images to something like s3
// const imagePaths = {
//   health: '../assets/health.png',
//   programming: '../assets/coding.jpg',
//   javascript: '../assets/javascript.jpg'

// }

function Posts(props) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const lastPage = useSelector(state => state.posts.lastPage);
  const posts = useSelector(state => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchPosts() {
      if (page > lastPage) {
        return;
      }
      console.log('getting Page...', page)
      setLoading(true);
      dispatch(gettingPosts(page));
      setLoading(false);

    }

    fetchPosts();
  }, [page])



  return (
    <View>
      <ActivityIndicator
        style={AppStyles.loading}
        animating={loading}
        size="large"
        color="blue"
      />

      <FlatList
        data={posts}
        onEndReached={() => setPage(page + 1)}
        // Indicates the point in which to start loading, 0 means gotta scroll to bottom 
        onEndReachedThreshold={0.01}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => props.navigation.navigate('SinglePost', {
              postId: item.id,
              title: item.title
            })}>
              <View style={styles.post}>
                <Text style={styles.categoryTitle}> {item.category_name} </Text>
                <Image
                  style={styles.image}
                  source={imagePlaceholder} />
                <View style={styles.cardDescription}>

                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description.substring(0, 50).concat('...')}</Text>
                </View>
              </View>
            </TouchableOpacity>

          )
        }
        }
        keyExtractor={item => item.id.toString()}
      />

    </View>

  )



}

/* <NavigationEvents
        onWillFocus={fetchPosts}
      /> */

const styles = {
  post: {
    flex: 1,
    // justifyContent: 'center',
    width: '100%',
    // marginLeft: 'auto',
    // marginRight: 'auto',
    // marginTop: 16,
    // marginBottom: 16,
    borderColor: 'gray',
    borderStyle: 'solid',
    borderWidth: 1,

  },
  categoryTitle: {
    padding: 5,
    fontSize: 16
  },

  cardDescription: {
    padding: 10
  },

  image: {
    width: '100%',
    height: 200,

  },

  button: {
    width: '100%',
    height: 200,

  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Mont'
  },
  description: {
    fontSize: 12,
    fontFamily: 'Mont'
  }
}


// const mapStateToProps = (state) => ({
//   posts: state.posts.posts,
//   lastPage: state.posts.lastPage
// });

// const mapDispatchToProps = (dispatch) => ({
//   gettingPosts(page) {
//     return dispatch(gettingPosts(page))
//   }
// });

export default withNavigation(Posts);

