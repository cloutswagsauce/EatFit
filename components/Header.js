import { Text, View, StyleSheet, Platform, StatusBar, SafeAreaView } from 'react-native'
import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
        
      <View style={styles.headerContainer}>
        <Text style={styles.title}>EatFit</Text>
        <View stlye={styles.divider}></View>
      </View>
      
      
    )
  }
}
const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 60 + (Platform.OS === 'android' ? StatusBar.currentHeight : 0), // Add status bar height for Android
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 25,
    backgroundColor: 'green',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Add padding for Android
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
});