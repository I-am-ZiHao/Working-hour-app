import { StyleSheet } from 'react-native';

const DefaultStyles = StyleSheet.create({
  bodyText: {
    fontFamily: 'open-sans',
    fontSize: 22,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 25,
  },
  cardText: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
  },
  cardMain: {
    fontFamily: 'open-sans-bold',
    fontSize: 70,
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DefaultStyles;
