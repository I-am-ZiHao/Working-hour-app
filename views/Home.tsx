import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({});

const Home = () => {
  const navigator = useNavigation();

  return (
    <View>
      <Button
        title="Detail"
        onPress={() => {
          navigator.navigate('Detail');
        }}
      />
      <Button
        title="AddItem"
        onPress={() => {
          navigator.navigate('AddItem');
        }}
      />
    </View>
  );
};

export default Home;
