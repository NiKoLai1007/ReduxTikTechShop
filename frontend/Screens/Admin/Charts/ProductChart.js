import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import axios from 'axios';
import baseURL from '../../../assets/common/baseurl';

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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

      const categoryCountMap = {};
      products.forEach((product) => {
        const categoryName = product.category.name;
        if (categoryCountMap[categoryName]) {
          categoryCountMap[categoryName]++;
        } else {
          categoryCountMap[categoryName] = 1;
        }
      });

      const categories = Object.keys(categoryCountMap);
      const categoryColors = ['#FF5733', '#FFBD33', '#33FF57', '#33D1FF', '#B833FF', '#FF33E9'];
      const categoryCountArray = categories.map((category, index) => ({
        name: category,
        count: categoryCountMap[category],
        color: categoryColors[index % categoryColors.length],
      }));

      setProductData(categoryCountArray);
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
