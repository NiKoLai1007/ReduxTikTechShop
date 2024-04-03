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
import LoginButton from "../../Shared/StyledComponents/LoginButton";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import Divider from '../../Shared/StyledComponents/Divider';

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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer} showsVerticalScrollIndicator={false}>
        {userProfile && userProfile.image ? (
          <View style={{ flexDirection: 'flex', alignItems: 'center', marginLeft: 10 }}>
            {/* Display the user's name */}
            <Text style={styles.profileName}>{userProfile.name}</Text>
            {/* Display the user's image */}
            <Image
              source={{ uri: userProfile.image }}
              style={styles.profileImage}
            />
          </View>
        ) : null}
        <View style={{ flexDirection: 'row' }}>
          <EasyButton
            large
            profile
            onPress={() => navigation.navigate('ProfileInfo')}
          ><Text style={{ color: "white", fontWeight: 'bold' }}>Info</Text>
          </EasyButton>
          <EasyButton
            large
            profile1
            onPress={() => navigation.navigate('UserUpdate')}
          ><Text style={{ color: "white", fontWeight: 'bold' }}>Update Profile</Text>
          </EasyButton>
        </View>
        <View style={{ marginTop: 80 }}>
          {/* <Button title={"Sign Out"} onPress={() => [
            AsyncStorage.removeItem("jwt"),
            logoutUser(context.dispatch)
          ]} /> */}
          <EasyButton
            large
            dangerProf
            onPress={() => [
              AsyncStorage.removeItem("jwt"),
              logoutUser(context.dispatch)
            ]}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Sign Out</Text>
          </EasyButton>
          <Divider />
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    width: 415,

  },
  profileName: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#C49D19',
    marginLeft: -160,
    marginBottom: 30,
  },
  subContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  profileImage: {
    width: 300, // Adjust the size as needed
    height: 300,
    borderRadius: 50, // Creates a circle
    marginBottom: 20,
    // marginLeft: 50,
  },
  order: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 60
  }
})

export default UserProfile;
