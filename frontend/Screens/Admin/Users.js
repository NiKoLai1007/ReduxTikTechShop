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
import UserList from './UserList';

const Users = () => {
  return (
    <ScrollView>
    <View>
        
        <UserList/>
</View>
</ScrollView>
  )
}


export default Users
