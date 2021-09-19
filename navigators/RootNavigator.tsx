import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../views/Home';
import Detail from '../views/Detail';
import AddItem from '../views/AddItem';
import { ModifyItem } from '../views/ModifyItem';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

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
        <Stack.Screen name="ModifyItem" component={ModifyItem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
