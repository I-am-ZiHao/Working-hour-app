import { StyleSheet } from 'react-native';

const DefaultStyles = StyleSheet.create({
  bodyText: {
    fontFamily: 'open-sans',
    fontSize: 18,
  },
  cardText: {
    fontFamily: 'open-sans-bold',
    fontSize: 15,
  },
  cardMain: {
    fontFamily: 'open-sans-bold',
    fontSize: 45,
  },
  smallCardText: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
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
