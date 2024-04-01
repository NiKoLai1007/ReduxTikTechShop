import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Dimensions,
    RefreshControl
} from "react-native";

import baseURL from "../../assets/common/baseurl"
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

var { height, width } = Dimensions.get("window");

const UserList = () => {
    const [userList, setUserList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    const fetchData = useCallback(() => {
        setRefreshing(true);
        axios.get(`${baseURL}users`)
            .then((res) => {
                setUserList(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching user list", error);
                setLoading(false);
            })
        
            .finally(() => setRefreshing(false));
    }, []);

    useFocusEffect(fetchData);

    return (
        
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="red" style={styles.spinner} />
            ) : (
                <FlatList
                    data={userList}
                    renderItem={({ item }) => (
                        <View style={styles.userItem}>
                            <Text>Email: {item.email}</Text>
                            <Text>Name: {item.name}</Text>
                            <Text>Role: {item.role}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    spinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
});

export default UserList;
