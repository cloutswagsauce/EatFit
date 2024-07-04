import React from 'react';
import { View, Text, StyleSheet, Modal, Image, Button, Platform } from 'react-native';
import { currencyFormatter } from '../util/formatting';
const baseUrl = Platform.OS === 'ios' ? 'http://192.168.1.178:3000' : 'http://10.0.2.2:3000';

export default function MealDetailModal({ visible, onClose, meal }) {
  if (!meal) {
    return null;
  }
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={{ uri: `${baseUrl}/${meal.image}` }} style={styles.image} />
          <Text style={styles.title}>{meal.name}</Text>
          <Text style={styles.price}>{currencyFormatter.format(meal.price)}</Text>
          <Text style={styles.description}>{meal.description}</Text>
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
});
