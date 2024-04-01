import React, { useState, useCallback } from "react";
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
import { Searchbar } from 'react-native-paper';
import { useFocusEffect } from "@react-navigation/native"
import axios from "axios"
import baseURL from "../../assets/common/baseurl"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from "@react-navigation/native"


var { height, width } = Dimensions.get("window")


const UserList = () => {
    const [userLists, setUserLists] = useState([]);
    const [userFilter, setUserFilter] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);


    const ListHeader = () => {
        return (
            <View
                elevation={1}
                style={styles.listHeader}
            >
                <View style={styles.headerItem}></View>
                <View style={styles.headerItem}>
                    <Text style={{ fontWeight: '600' }}>Email</Text>
                </View>
                <View style={styles.headerItem}>
                    <Text style={{ fontWeight: '600' }}>Name</Text>
                </View>
                <View style={styles.headerItem}>
                    <Text style={{ fontWeight: '600' }}>Role</Text>
                </View>
            </View>
        )
    }

    // const searchUser = (text) => {
    //     if (text === "") {
    //         setUserFilter(userLists)
    //     }
    //     setUserFilter(
    //         userLists.filter((i) =>
    //             i.name.toLowerCase().includes(text.toLowerCase())
    //         )
    //     )
    // }


    // const deleteProduct = (id) => {
    //     axios
    //         .delete(`${baseURL}users/${id}`, {
    //             headers: { Authorization: `Bearer ${token}` },
    //         })
    //         .then((res) => {
    //             const users = productFilter.filter((item) => item.id !== id)
    //             setUserFilter(users)
    //         })
    //         .catch((error) => console.log(error));
    // }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            axios
                .get(`${baseURL}users`)
                .then((res) => {
                    //console.log(user)
                     setUserLists(res.data);
                     setUserFilter(res.data);
                    setLoading(false);
                })
            setRefreshing(false);
        }, 2000);
    }, []);

    useFocusEffect(
        useCallback(
            () => {
                // Get Token
                AsyncStorage.getItem("jwt")
                   .then((res) => {
                        setToken(res)
                    })
                   .catch((error) => console.log(error))
                axios
                   .get(`${baseURL}users`)
                   .then((res) => {
                        console.log(res.data)
                        setUserLists(res.data); // set the userLists state variable with the fetched data
                    })
                   .catch((error) => {
                        console.error("Error fetching user list", error);
                        setLoading(false);
                    })
    
                return () => {
                    setUserLists();
                    setUserFilter();
                    setLoading(true);
                }
            },
            [],
        )
    )

    return (
        <View elevation={1}
            style={styles.listHeader}>

            <View style={styles.headerItem}></View>
            <View style={styles.headerItem}>
                <Text style={styles.headerEmail}>Email</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={styles.headerName}>Name</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={styles.headerRole}>Role</Text>
            </View>


            {/* <Searchbar width="80%"
                placeholder="Search"
                onChangeText={(text) => searchUser(text)}
            /> */}
            {loading ? (
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            ) : (<FlatList
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListHeaderComponent={ListHeader}
                data={productFilter}
                renderItem={({ item, index }) => (
                    <ListItem
                        item={item}
                        index={index}
                        deleteProduct={deleteProduct}

                    />
                )}
                keyExtractor={(item) => item.id}
            />)}
        </View>
    );
};

const styles = StyleSheet.create({
    //...
    listHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'gainsboro'
    },
    headerItem: {
        margin: 3,
        width: width / 6,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    //...
    headerEmail: {
        fontWeight: '600',
        color: 'black'
    },
    headerName: {
        fontWeight: '600',
        color: 'black'
    },
    headerRole: {
        fontWeight: '600',
        color: 'black'
    },
    //...
});

export default UserList
