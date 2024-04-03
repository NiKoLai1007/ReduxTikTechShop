import React from 'react'
  import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Dimensions,
    RefreshControl,
    ScrollView
} from "react-native";
import ProductChart from "../Charts/ProductChart"
import SalesChart from "../Charts/SalesChart"
import Stocks from "../Charts/Stocks"

  

const UserCharts = () => {

    
  return (
    <ScrollView>
    <View>
        <View>
            <ProductChart/>
        </View>
        <View>
          <SalesChart/>
        </View>
        <View>
          <Stocks />
        </View>
        
</View>
</ScrollView>
  )
}

export default UserCharts
