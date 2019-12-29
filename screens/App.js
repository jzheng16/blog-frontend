import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import AddPost from './AddPost';
import Posts from './Posts';
import home from './assets/home-icon.png';
import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Hoe'
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Details', {
            id: '1'
          })}>
          <Text> Click me to go to Details Screen </Text>
        </TouchableOpacity>

      </View>
    )
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = (x) => {
    console.log(x);
    return {
      title: 'hi'
    }
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Details')}>
          <Text> Click me to go to Details Screen again... (wont work using navigate) </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.push('Details')}>
          <Text> Click me to go to Details Screen again... (wil work using push) </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.push('Home')}>
          <Text> Go to the beginning using push </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Home')}>
          <Text> Go to the beginning using navigate </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}>
          <Text> Go back </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen
},
  {
    initialRouteName: 'Home'
  }
);

const AppContainer = createAppContainer(AppNavigator);




export default function App() {
  return (
    <AppContainer />
    // <View style={styles.container}>
    //   <AddPost />
    //   <Posts />
    //   <Image
    //     source={home}
    //     style={styles.image}
    //   />
    // </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'blue',
    fontSize: 48
  },
  image: {
    width: 200,
    height: 200
  }
});
