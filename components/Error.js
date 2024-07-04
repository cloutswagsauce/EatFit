import React from 'react'
import { View, Text, StyleSheet} from 'react-native';

export default function Error({title, message}) {
  return (
    <View className='error'>
        <Text>Error Screen</Text>
      <Text>{title}</Text>
      <Text>{message}</Text>
    </View>
  )
}
