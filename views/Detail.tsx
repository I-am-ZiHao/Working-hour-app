import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header as HeaderRNE, Icon } from 'react-native-elements';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';

const styles = StyleSheet.create({});

const Detail = () => {
  const navigator = useNavigation();

  return (
    <>
      <HeaderRNE
        containerStyle={{
          alignItems: 'center',
          alignContent: 'center',
          backgroundColor: Colors.primary,
        }}
        leftComponent={
          <View style={DefaultStyles.headerLeft}>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => {
                navigator.goBack();
              }}
            >
              <Icon type="material" name="arrow-back-ios" color="white" />
            </TouchableOpacity>
          </View>
        }
        centerComponent={{ text: 'Detail', style: DefaultStyles.heading }}
      />
      <View>
        <Text>Detail</Text>
      </View>
    </>
  );
};

export default Detail;
