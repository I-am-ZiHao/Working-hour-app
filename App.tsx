import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import React from 'react';
import { StyleSheet } from 'react-native';
import RootNavigator from './navigators/RootNavigator';
import { dbInit } from './helpers/db';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    dbInit()
      .then(() => {
        console.log('successfully initialized db');
      })
      .catch((err) => {
        console.log('init db failed.');
        throw err;
      });
  }, []);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setIsReady(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return <RootNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
