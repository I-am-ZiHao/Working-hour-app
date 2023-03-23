import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import React from 'react';
import { dbInit } from './helpers/db';
import RootNavigator from './navigators/RootNavigator';

// const fetchFonts = () => {
//   return Font.loadAsync({
//     'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
//     'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
//   });
// };

export default function App() {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
          'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        });
        await dbInit();
        console.log('successfully initialized db');
        await SplashScreen.hideAsync();
        setIsReady(true);
      } catch (err) {
        console.log('init db failed.');
        throw err;
      }
    })();
  }, []);

  if (!isReady) {
    return null;
  }

  return <RootNavigator />;
}
