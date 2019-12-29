# blog-frontend

A blog mainly to learn React Native. It will be coupled with a Laravel backend API.


## React Navigation 

Installation was not the smoothest. React Native "links" native dependencies and before React Native 0.60, you would have to manually link dependencies. However, >.060 doesn't guarantee every package will link fully so check instructions.

**createStackNavigation** is a component that allows us to create a browser-like history stack. It gives us a back button on the header. 
**createAppContainer** links your top-level navigator to the app environemnt and state.

**createStackNavigation** gives screens access to a navigate prop that allows us to 
 1. Navigate - Redirect us to another screen, does not redirect if we are already on the screen. If we navigate to the home page defined, it will remove the back button unlike push.
 2. Push - Same as navigate but will redirect to the screen again if we're already on it and adds it to the stack.
 3. goBack - Programmatically trigger a redirect to the previous screen.
 4. popToTop - Go back to first screen in stack 


 ### Differences betwee React Native and React 

  A key difference is how lifecycle hooks are executed between the web and mobile. When you leave a component on the web, its componentWillUnmount hook gets called.

  On mobile, that does not happen since the component remains mounted on the stack. 
  Vist A -> componentDidMount -> navigate to B -> componentDidMount called but not componentWillUnmount of A -> back to A -> B's componentWillUnmount executed but not A's componentDidMount 


  So the question is: how do we know when a user is leaving / coming back to a component? 
  React Native adds more lifecycle events via the navigation prop.
  1. willFocus 


### Passing params

  1. Pass it as an object as a second parameter in navigate / push
  2. Read it by accessing **getParams(paramName, defaultValue)**


### Setting the Header
A screen component has access to a static navigationOptions oibject that allows for several configurations such as title
To use params in the header, transform navigationOptions to a function and that will signal react navigation to call it with a object containing navigation, navigationOptions, screenProps





## Platform specific code

React Native exports an object called platform that allows us to determine which platform / version is being used
Use this object if the amount of platform specific code is minimal

If you need entirely different components to render based on the platform, consider adding .ios / .android to components and then react native will automatically import the right one. EX: BigButton.ios.js vs BigButton.android.js

