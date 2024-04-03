import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import axios from 'axios';
import baseURL from '../../../assets/common/baseurl';

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Use white color with opacity
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726"
  }
};

const ProductChart = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const response = await axios.get(`${baseURL}products`);
      const products = response.data;

      const categoryProductMap = {};

      // Group products by category
      products.forEach((product) => {
        const categoryName = product.category.name;
        if (!categoryProductMap[categoryName]) {
          categoryProductMap[categoryName] = [];
        }
        categoryProductMap[categoryName].push(product);
      });

      // Define static colors for categories
      const categoryColors = ['#FF5733', '#FFBD33', '#33FF57', '#33D1FF', '#B833FF', '#FF33E9'];

      // Convert categoryProductMap to an array of objects with static colors
      const categoryDataArray = Object.entries(categoryProductMap).map(([category, products], index) => ({
        name: category,
        count: products.length,
        color: categoryColors[index % categoryColors.length] // Assign static colors based on index
      }));

      setProductData(categoryDataArray);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Product Chart</Text>
      <PieChart
        data={productData}
        width={Dimensions.get('window').width - 40} // Adjust the width as needed
        height={220}
        chartConfig={chartConfig}
        accessor="count"
        backgroundColor="transparent"
        absolute
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 16,
  },
});

export default ProductChart;
