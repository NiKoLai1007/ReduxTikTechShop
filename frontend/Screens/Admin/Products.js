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
import { Input, VStack, Heading, Box } from "native-base"
import Icon from "react-native-vector-icons/FontAwesome"
import { useFocusEffect } from "@react-navigation/native"
import { Searchbar } from 'react-native-paper';
import ListItem from "./ListItem"

import axios from "axios"
import baseURL from "../../assets/common/baseurl"
import AsyncStorage from '@react-native-async-storage/async-storage'
var { height, width } = Dimensions.get("window")
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import { useNavigation } from "@react-navigation/native"

const Products = (props) => {
    const [productList, setProductList] = useState([]);
    const [productFilter, setProductFilter] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();
    const navigation = useNavigation()
    const [refreshing, setRefreshing] = useState(false);

    const ListHeader = () => {
        return (
            <View
                elevation={1}
                style={styles.listHeader}
            >
                <View style={styles.headerItem}></View>
                <View style={styles.headerItem}>
                    <Text style={{ fontWeight: '600' }}>Brand</Text>
                </View>
                <View style={styles.headerItem}>
                    <Text style={{ fontWeight: '600' }}>Name</Text>
                </View>
                <View style={styles.headerItem}>
                    <Text style={{ fontWeight: '600' }}>Category</Text>
                </View>
                <View style={styles.headerItem}>
                    <Text style={{ fontWeight: '600' }}>Price</Text>
                </View>
            </View>
        )
    }

    const searchProduct = (text) => {
        if (text === "") {
            setProductFilter(productList)
        }
        setProductFilter(
            productList.filter((i) =>
                i.name.toLowerCase().includes(text.toLowerCase())
            )
        )
    }

    const deleteProduct = (id) => {
        axios
            .delete(`${baseURL}products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const products = productFilter.filter((item) => item.id !== id)
                setProductFilter(products)
            })
            .catch((error) => console.log(error));
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            axios
                .get(`${baseURL}products`)
                .then((res) => {
                    // console.log(res.data)
                    setProductList(res.data);
                    setProductFilter(res.data);
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
                    .get(`${baseURL}products`)
                    .then((res) => {
                        console.log(res.data)
                        setProductList(res.data);
                        setProductFilter(res.data);
                        setLoading(false);
                    })

                return () => {
                    setProductList();
                    setProductFilter();
                    setLoading(true);
                }
            },
            [],
        )
    )

    return (
        <Box>
            <ScrollView horizontal={true}>
                <View style={styles.buttonContainer}>
                <EasyButton
                    medium
                    onPress={() => navigation.navigate("Orders")}
                    style={styles.blackButton}
                >
                    <Icon name="shopping-bag" size={30} color="white" />
                    <Text style={styles.buttonText}>Orders</Text>
                </EasyButton>

                <EasyButton
                    medium
                    onPress={() => navigation.navigate("ProductForm")}
                    style={styles.blackButton}
                >
                    <Icon name="plus" size={18} color="white" />
                    <Text style={styles.buttonText}>Products</Text>
                </EasyButton>

                <EasyButton
                    medium
                    onPress={() => navigation.navigate("Categories")}
                    style={styles.blackButton}
                >
                    <Icon name="plus" size={18} color="white" />
                    <Text style={styles.buttonText}>Categories</Text>
                </EasyButton>

                <EasyButton
                    medium
                    onPress={() => navigation.navigate("Brands")}
                    style={styles.blackButton}
                >
                    <Icon name="plus" size={18} color="white" />
                    <Text style={styles.buttonText}>Brands</Text>
                </EasyButton>

                <EasyButton
                    medium
                    onPress={() => navigation.navigate("Users")}
                    style={styles.blackButton}
                >
                    <Icon name="user" size={18} color="white" />
                    <Text style={styles.buttonText}>Users</Text>
                </EasyButton>

                <EasyButton
                    medium
                    onPress={() => navigation.navigate("UserCharts")}
                    style={styles.blackButton}
                >
                    <Icon name="bar-chart" size={18} color="white" />
                    <Text style={styles.buttonText}>Charts</Text>
                </EasyButton>
                </View>
            </ScrollView>
            <Searchbar width="80%"
                placeholder="Search"
                onChangeText={(text) => searchProduct(text)}
            />
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


        </Box>
    );
}

const styles = StyleSheet.create({
    listHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'gainsboro'
    },
    headerItem: {
        margin: 3,
        width: width / 6
    },
    spinner: {
        height: height / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        marginBottom: 160,
        backgroundColor: 'white'
    },
    buttonContainer: {
        margin: 20,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    blackButton: {
        backgroundColor: 'black', // Set the background color to black
    },
    buttonText: {
        marginLeft: 4,
        color: 'white'
    }
})

export default Products;
