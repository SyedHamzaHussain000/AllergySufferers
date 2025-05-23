import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes/Routes';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (

    <Provider store={store}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </Provider>


  );
};

export default App;
