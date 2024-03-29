import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, Image } from 'react-native';
import { Container } from "native-base"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios"
import baseURL from "../../assets/common/baseurl"
import AuthGlobal from "../../Context/Store/AuthGlobal"
import { logoutUser } from "../../Context/Actions/Auth.actions"
import OrderCard from '../../Shared/OrderCard';
import EasyButton from '../../Shared/StyledComponents/EasyButton';

const UserProfile = (props) => {
  const context = useContext(AuthGlobal)
  const [userProfile, setUserProfile] = useState('')
  const [orders, setOrders] = useState([])
  const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        navigation.navigate("Login")
      }
      AsyncStorage.getItem("jwt")
        .then((res) => {
          axios
            .get(`${baseURL}users/${context.stateUser.user.userId}`, {
              headers: { Authorization: `Bearer ${res}` },
            })
            .then((user) => setUserProfile(user.data))
        })
        .catch((error) => console.log(error))
      axios
        .get(`${baseURL}orders`)
        .then((x) => {
          const data = x.data;
          console.log(data)
          const userOrders = data.filter(
            (order) =>
              order.user ? (order.user._id === context.stateUser.user.userId) : false
          );
          setOrders(userOrders);
        })
        .catch((error) => console.log(error))
      return () => {
        setUserProfile();
      }
    }, [context.stateUser.isAuthenticated]))

  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        {userProfile && userProfile.image ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
            <Image
              source={{ uri: userProfile.image }}
              style={styles.profileImage}
            />
            <Text style={{ fontSize: 30, marginLeft: 10 }}>
              {userProfile.name}
            </Text>
          </View>
        ) : null}
        <View style={{ marginTop: 20 }}>
          <Button title={"Profile"} onPress={() => navigation.navigate('UserProfile')} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button title= "Update" onPress= {() => navigation.navigate('UserUpdate')} />
        </View>
        <View style={{ marginTop: 80 }}>
          <Button title={"Sign Out"} onPress={() => [
            AsyncStorage.removeItem("jwt"),
            logoutUser(context.dispatch)
          ]} />
          <View style={styles.order}>
            <Text style={{ fontSize: 20 }}>My Orders</Text>
            <View>
              {orders ? (
                orders.map((order) => {
                  return <OrderCard key={order.id} item={order} />;
                })
              ) : (
                <View style={styles.order}>
                  <Text>You have no orders</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  subContainer: {
    alignItems: "center",
    marginTop: 60
  },
  profileImage: {
    width: 100, // Adjust the size as needed
    height: 100,
    borderRadius: 50, // Creates a circle
    marginBottom: 20,
  },
  order: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 60
  }
})

export default UserProfile;
