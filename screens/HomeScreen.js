// HomeScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import FoodItems from "../components/FoodItems"
import AccountIcon from '../components/AccountIcon';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FoodItems />
      <AccountIcon navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
