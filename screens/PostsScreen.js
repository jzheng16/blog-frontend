import React, { Component, useEffect, useState } from 'react';
import { Stylesheet, View, Button, TouchableOpacity, ScrollView, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import imagePlaceholder from '../assets/images/image-placeholder.png';
import { withNavigation, NavigationEvents } from 'react-navigation';
import AppStyles from '../AppStyles';



function Posts(props) {

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState(100);

  useEffect(() => {
    console.log('called');
    async function fetchPosts() {
      if (page > lastPage) {
        return;
      }
      setLoading(true);
      const res = await fetch(`http://10.0.2.2:8000/api/posts?page=${page}&results=5`);
      const json = await res.json();
      setPosts([...posts, ...json.data]);
      setLastPage(json.last_page);
      setLoading(false);
    }

    fetchPosts();
  }, [page])





  return (
    <View>
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
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </View>
            </TouchableOpacity>

          )
        }
        }
        keyExtractor={item => item.id.toString()}
      />

      <ActivityIndicator
        style={AppStyles.loading}
        animating={loading}
        size="large"
        color="blue"
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
    fontWeight: 'bold'
  },
  description: {
    fontSize: 12
  }
}

export default withNavigation(Posts);