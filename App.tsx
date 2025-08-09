// import {View, Text, SafeAreaView} from 'react-native';
// import React, { useEffect } from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import Routes from './src/routes/Routes';
// import {store} from './src/redux/store';
// import {Provider} from 'react-redux';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import Toast from 'react-native-toast-message';
// import messaging from '@react-native-firebase/messaging'
// import notifee from '@notifee/react-native';


// const App = () => {
//     useEffect(() => {
//     const unsubscribe = messaging().onMessage(async (message: any) => {

//       console.log("message?.data",message?.notification)
//       if (message?.notification) {
//         await notifee.displayNotification(message?.notification);
//       }
//     });

//     return unsubscribe;
//   }, []);


//   return (

//     <Provider store={store}>
//       <NavigationContainer>
//         <Routes />
//       <Toast/>
//       </NavigationContainer>
//     </Provider>


//   );
// };

// export default App;


import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/Routes';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { Platform, SafeAreaView, StatusBar } from 'react-native';

const App = () => {
  useEffect(() => {
    // Create channel on start
    async function setup() {
      // if (Platform.OS === 'android') {
        await notifee.requestPermission();
        await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
          importance: 4, // HIGH
        });
     
    } 
    setup();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (message) => {

      if (message?.notification) {
        await notifee.displayNotification({
          title: message.notification.title,
          body: message.notification.body,
          android: {
            channelId: 'default',
            pressAction: {
              id: 'default',
            },
          },
        });
      }
    });

    return unsubscribe;
  }, []);

  return (

    <Provider store={store}>
      <StatusBar  barStyle={'dark-content'}/>
      <NavigationContainer>
        <Routes />
        <Toast />
      </NavigationContainer>
    </Provider>
    
  );
};

export default App;
