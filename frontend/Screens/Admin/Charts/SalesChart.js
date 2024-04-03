import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import baseURL from "../../../assets/common/baseurl";

const Chart = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseURL}orders`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error loading orders", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Aggregate order count for each day
  const orderCountData = {};
  orders.forEach((order) => {
    const date = new Date(order.dateOrdered).toLocaleDateString();
    if (!orderCountData[date]) {
      orderCountData[date] = 0;
    }
    orderCountData[date]++;
  });

  // Extract labels and data for the line chart
  let labels = Object.keys(orderCountData);
  let data = labels.map((label) => orderCountData[label]);

  // Reverse the order of labels and data
  labels = labels.reverse();
  data = data.reverse();

  // Configure chart appearance
  const chartConfig = {
    backgroundColor: "#FF66C4",
    backgroundGradientFrom: "#664229",
    backgroundGradientTo: "#CBA387",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Number of Orders Per Day</Text>
        <View style={styles.chartContainer}>
          <LineChart
            data={{
              labels: labels,
              datasets: [{ data: data }],
            }}
            width={Dimensions.get("window").width - 32}
            height={220}
            yAxisLabel="#"
            chartConfig={chartConfig}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 18,
  },
});

export default Chart;
