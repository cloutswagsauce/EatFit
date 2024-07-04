// AccountIcon.js
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AccountIcon = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={() => navigation.navigate('Profile')}
    >
      <MaterialCommunityIcons name="account" size={36} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 50,
    padding: 5

  },
});

export default AccountIcon;
