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
        
</View>
</ScrollView>
  )
}

export default UserCharts
