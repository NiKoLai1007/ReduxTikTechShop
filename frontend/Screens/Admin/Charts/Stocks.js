import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
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
};

const ProductStockChart = () => {
  const [productStockData, setProductStockData] = useState({ labels: [], datasets: [{ data: [] }] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductStockData();
  }, []);

  const fetchProductStockData = async () => {
    try {
      // Generate fake product data with stock counts ranging from 1 to 10
      const fakeProducts = Array.from({ length: 10 }, (_, index) => ({
        name: `Product ${index + 1}`,
        countInStock: index + 1,
      }));

      // Extract product names and stock counts from fakeProducts
      const productNames = fakeProducts.map(product => product.name);
      const stockCounts = fakeProducts.map(product => product.countInStock);

      // Configure chart data
      const chartData = {
        labels: productNames,
        datasets: [
          {
            data: stockCounts
          }
        ]
      };

      setProductStockData(chartData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product stock data:', error);
      setError('Error fetching data. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Product Stock Chart</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <BarChart
          data={productStockData}
          width={Dimensions.get('window').width - 40} // Adjust the width as needed
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
        />
      )}
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
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default ProductStockChart;