import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../views/Home';
import Detail from '../views/Detail';
import AddItem from '../views/AddItem';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from '../constants/colors';
import GoBackBtn from '../components/GoBackBtn';

export type RootNavParamList = {
  Home: undefined;
  Detail: undefined;
  AddItem: undefined;
};

// const Stack = createNativeStackNavigator<RootNavParamList>();
const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: '工時紀錄' }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          // options={{
          //   headerLeft: () => <GoBackBtn />,
          // }}
        />
        <Stack.Screen
          name="AddItem"
          component={AddItem}
          options={{
            title: '新增工時',
            // headerTintColor: 'white',
            // headerLeft: () => <GoBackBtn />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
