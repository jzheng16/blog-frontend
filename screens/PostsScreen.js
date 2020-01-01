import React, { Component } from 'react';
import { Stylesheet, View, Button, TouchableOpacity, ScrollView, Text, Image } from 'react-native';
import imagePlaceholder from '../assets/images/image-placeholder.png';
import { withNavigation } from 'react-navigation';
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
        console.log(posts);
      })
      .catch(error => console.log('There has been a problem with your fetch operation: ' + error.message))

  }

  render() {
    return (
      <ScrollView>
        {this.state.posts.map(post => (
          <TouchableOpacity key={post.id} onPress={() => this.props.navigation.navigate('SinglePost', {
            postId: post.id
          })}>
            <View style={styles.post} key={post.id}>
              <Text style={styles.categoryTitle}> Category </Text>
              <Image
                style={styles.image}
                source={imagePlaceholder} />


              <View style={styles.cardDescription}>
                <Text style={styles.title}>{post.title}</Text>
                <Text style={styles.description}>{post.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
        }

      </ScrollView>

    )
  }

}

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