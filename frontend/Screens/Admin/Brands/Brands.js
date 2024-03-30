import React, { useEffect, useState } from "react"
import {
    View,
    Text,
    FlatList,
    Dimensions,
    TextInput,
    StyleSheet,
    Button
} from "react-native"
import EasyButton from "../../../Shared/StyledComponents/EasyButton"
import baseURL from "../../../assets/common/baseurl";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Center } from "native-base";
// import { add } from "react-native-reanimated";
import {useFocusEffect} from '@react-navigation/core'
import { useCallback } from "react";

var { width } = Dimensions.get("window")

const Item = (props) => {
    return (
        <View style={styles.item}>
            <View>
                <Text> Name: {props.item.name}</Text>
                <Text> Location: {props.item.location}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <EasyButton
                    primary
                    medium
                    onPress={() => props.navigation.navigate('UpdateBrands', { brandId: props.item._id })}
                    style={{ marginRight: 10 }}
                >
                    <Text style={{ color: "white", fontWeight: "bold" }}>Update</Text>
                </EasyButton>
                <EasyButton
                    danger
                    medium
                    onPress={() => props.delete(props.item._id)}
                >
                    <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
                </EasyButton>
            </View>
        </View>
    )
}

const Brands = ({ navigation }) => {

    const [brands, setBrands] = useState([]);
    const [brandName, setBrandName] = useState();
    const [brandLocation, setBrandLocation] = useState();
    const [token, setToken] = useState();

    // useEffect(() => {
    //     AsyncStorage.getItem("jwt")
    //         .then((res) => {
    //             setToken(res);
    //         })
    //         .catch((error) => console.log(error));

    //     axios
    //         .get(`${baseURL}/brands`)
    //         .then((res) => {setBrands(res.data.brandList)
    //             console.log(res.data.brandList)})
    //         .catch((error) => alert("Error load brands"))

    //     return () => {
    //         setBrands();
    //         setToken();
    //     }
    // }, [])

    useFocusEffect(useCallback(()=>{
        // AsyncStorage.getItem("jwt")
        //     .then((res) => {
        //         setToken(res);
        //     })
        //     .catch((error) => console.log(error));

        axios
            .get(`${baseURL}brands/all/brands`)
            .then((res) => {setBrands(res.data.brandList)
                console.log(res.data.brandList)})
            .catch((error) => alert("Error load brands"))

        return () => {
            setBrands();
            // setToken();
        }
    },[])) 

    // const addBrand = () => {
    //     const brand = {
    //         name: brandName,
    //         location: brandLocation
    //     };

    //     const config = {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         }
    //     };

    //     axios
    //         .post(`${baseURL}/brands/create`, brand, config)
    //         .then((res) => setBrands([...brands, res.data]))
    //         .catch((error) => alert("Error to load brands"));

    //     setBrandName("")
    //     setBrandLocation("");
    // }

    const deleteBrand = (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        axios
            .delete(`${baseURL}/brands/${id}`, config)
            .then((res) => {
                const newBrands = brands.filter((item) => item.id !== id);
                setBrands(newBrands);
            })
            .catch((error) => alert("Error delete brands"));
    }

    return (
        <View style={{ position: "relative", height: "100%" }}>
            <View style={{ marginBottom: 60 }}>
                <FlatList
                    data={brands}
                    renderItem={({ item, index }) => (
                        <Item item={item} index={index} delete={deleteBrand} navigation={navigation} />
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
            
            <View style={styles.bottomBar}>

                {/* <Text>Name</Text>
                <TextInput
                    value={brandName}
                    style={styles.input}
                    onChangeText={(text) => setBrandName(text)}
                    placeholder="Brand Name"
                />
                <Text>Location</Text>
                <TextInput
                    value={brandLocation}
                    style={styles.input}
                    onChangeText={(text) => setBrandLocation(text)}
                    placeholder="Location"
                />
                <EasyButton
                    medium
                    primary
                    onPress={() => addBrand()}
                >
                    <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
                </EasyButton> */}
                
                
                <Button title="ADD" onPress={() => navigation.navigate('CreateBrands')} />
              
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomBar: {
        // backgroundColor: "white",
        width: 2000,
        height: 120,
        padding: 2,
        marginLeft: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 0,
        left: 150
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1
    },
    item: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 1,
        padding: 5,
        margin: 5,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 5
    }
})

export default Brands;