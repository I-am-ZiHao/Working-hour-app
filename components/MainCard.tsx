import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';

const styles = StyleSheet.create({
  container: {
    width: '45%',
    backgroundColor: Colors.primary2,
    alignSelf: 'center',
  },
  titleContainer: {},
  title: { color: 'white', marginHorizontal: '5%', marginTop: '4%' },
  contentContainer: {
    width: '100%',
    marginBottom: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: { color: 'white' },
  unit: {
    color: 'white',
    marginHorizontal: '5%',
    alignSelf: 'flex-end',
  },
});

export type MainCardProps = {
  title: string;
  mainContent: number;
  onPress?: () => void;
};

const MainCard = ({ title, mainContent, onPress }: MainCardProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Text style={{ ...styles.title, ...DefaultStyles.cardText }}>
          {title}
        </Text>
        <View style={styles.contentContainer}>
          <Text style={{ ...styles.mainContent, ...DefaultStyles.cardMain }}>
            {mainContent}
          </Text>
          <Text style={{ ...styles.unit, ...DefaultStyles.cardText }}>
            小時
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MainCard;
