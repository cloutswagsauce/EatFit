import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Platform, ActivityIndicator, Alert, TouchableOpacity, Dimensions } from 'react-native';
import Error from './Error';
import { currencyFormatter } from '../util/formatting';
import CartContext from '../store/CartContext';
import useHttp from '../hooks/useHttp';
import CustomButton from './CustomButton'; // Import the custom button
import MealDetailModal from './MealDetailModal'; // Import the modal component


const requestConfig = {};

const windowWidth = Dimensions.get('window').width;
const itemMargin = 8;
const numColumns = 1;

export default function FoodItems() {
  const cartCtx = useContext(CartContext);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  function handleAddItemToCart(item) {
    cartCtx.addItem(item);
    Alert.alert('Item Added', `${item.name} has been added to your cart.`);
  }

  function handleItemPress(item) {
    setSelectedMeal(item);
    setModalVisible(true);
  }

  function handleCloseModal() {
    setModalVisible(false);
    setSelectedMeal(null);
  }
  const baseUrl = Platform.OS === 'ios' ? 'http://192.168.1.178:3000' : 'http://10.0.2.2:3000';

  const { data: foodList, isLoading, error } = useHttp(`${baseUrl}/meals`, requestConfig, []);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Fetching meals...</Text>
      </View>
    );
  }

  if (error) {
    return <Error title="Failed to fetch data" message={error} />;
  }

  return (
    <View style={styles.container}>
      
      <FlatList
        style={styles.list}
        data={foodList}
        showsVerticalScrollIndicator={false}  // Hides the vertical scrollbar
        showsHorizontalScrollIndicator={false}  // Hides the horizontal scrollbar if applicable
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => handleItemPress(item)}
          >
            <View style={styles.mealItem}>
              <Image source={{ uri: `${baseUrl}/${item.image}` }} style={styles.image} />
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.price}>{currencyFormatter.format(item.price)}</Text>
              
              <View style={styles.buttonContainer}>
                <CustomButton title="Add to Cart" onPress={() => handleAddItemToCart(item)} />
              </View>
            </View>
            <View style={styles.itemMacro}>
              <Text style={styles.nutrientTitle}>Nutritional Information</Text>
              <View style={styles.nutrientTable}>
                <View style={styles.nutrientRow}>
                  <Text style={styles.nutrientColumn}>Calories:</Text>
                  <Text style={styles.nutrientColumn}>{item.nutrients.calories}</Text>
                </View>
                <View style={styles.nutrientRow}>
                  <Text style={styles.nutrientColumn}>Protein:</Text>
                  <Text style={styles.nutrientColumn}>{item.nutrients.protein}</Text>
                </View>
                <View style={styles.nutrientRow}>
                  <Text style={styles.nutrientColumn}>Carbs:</Text>
                  <Text style={styles.nutrientColumn}>{item.nutrients.carbohydrates}</Text>
                </View>
                <View style={styles.nutrientRow}>
                  <Text style={styles.nutrientColumn}>Fat:</Text>
                  <Text style={styles.nutrientColumn}>{item.nutrients.fat}</Text>
                </View>
                <View style={styles.nutrientRow}>
                  <Text style={styles.nutrientColumn}>Sugar:</Text>
                  <Text style={styles.nutrientColumn}>{item.nutrients.sugar}</Text>
                </View>
                <View style={styles.nutrientRow}>
                  <Text style={styles.nutrientColumn}>Fiber:</Text>
                  <Text style={styles.nutrientColumn}>{item.nutrients.fiber}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      
      <MealDetailModal
        visible={modalVisible}
        onClose={handleCloseModal}
        meal={selectedMeal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: itemMargin,
    backgroundColor: '#fff',
  },
  list: {
    flexGrow: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeTitle: {
    fontSize: 24,
    marginLeft: 6,
    fontWeight: "bold"

  },
  touchable: {
    flex: 1,
    flexDirection: "row",
    margin: itemMargin / 2,
    gap: 10,
    alignItems: 'stretch',
  },
  mealItem: {
    flex: 1,
    padding: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    justifyContent: 'space-between', // Distribute space between children
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
    textAlign: 'center', // Center the title
  },
  price: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center', // Center the price
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 'auto', // Push the button to the bottom
  },
  itemMacro: {
    flex: 1,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  nutrientTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    width: 100
  },
  nutrientTable: {
    flexDirection: 'column',
  },
  nutrientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  nutrientColumn: {
    fontSize: 14,
    color: '#666',
  },
});
