import { AppLoading, SplashScreen } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppNavigator from './navigation/AppNavigator';

import { initStore } from './store';
import { Provider } from 'react-redux';



const store = initStore();



export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [isSplashReady, setSplashReady] = useState(false);

  if (!isSplashReady) {
    return (
      <AppLoading
        startAsync={loadSplashResources}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setSplashReady)}
      />
    );
  }

  if (!isLoadingComplete) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Image
          source={require('./assets/images/splash.gif')}
          onLoad={() => loadResourcesAsync(setLoadingComplete)}
        />
      </View>
    )
  }

  return (
    <Provider store={store}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    </Provider>
  );

}

async function loadResourcesAsync(setLoadingComplete) {

  SplashScreen.hide();
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
      require('./assets/images/splash.gif'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
      'Mont': require('./assets/fonts/Montserrat-Regular.ttf')
    }),
  ]);
  // TODO: Remove this 
  setTimeout(() => {

    setLoadingComplete(true);
  }, 1000);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setSplashReady) {
  setSplashReady(true);
}

function loadSplashResources() {
  const gif = require('./assets/images/splash.gif');
  return Asset.fromModule(gif).downloadAsync();
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
