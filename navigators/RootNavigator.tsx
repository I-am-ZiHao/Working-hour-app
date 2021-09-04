import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../views/Home';
import Detail from '../views/Detail';
import AddItem from '../views/AddItem';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootNavParamList = {
  Home: undefined;
  Detail: { record_id: string };
  AddItem: undefined;
};

const Stack = createNativeStackNavigator<RootNavParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="AddItem" component={AddItem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
