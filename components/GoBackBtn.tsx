import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const GoBackBtn = () => {
  const navigator = useNavigation<StackNavigationProp<any>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ marginLeft: 10 }}
        onPress={() => {
          navigator.goBack();
        }}
      >
        <Icon type="material" name="arrow-back-ios" color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default GoBackBtn;
