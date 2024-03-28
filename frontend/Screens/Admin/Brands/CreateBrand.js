import React, { Fragment, useEffect, useState } from "react"
import {
    View,
    Text,
    FlatList,
    Dimensions,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image
} from "react-native"
import EasyButton from "../../../Shared/StyledComponents/EasyButton"
import baseURL from "../../../assets/common/baseurl";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from 'expo-image-picker';
import { setFormData, setImageUpload } from "../../../utils/formData";
import { Center, List } from "native-base";
import { FontAwesome } from '@expo/vector-icons';




var { width } = Dimensions.get("window")


const CreateBrand = (navigation) => {

    const [brands, setBrands] = useState([]);
    const [brandName, setBrandName] = useState();
    const [brandLocation, setBrandLocation] = useState();
    const [token, setToken] = useState();
    const [images, setImages] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res);
            })
            .catch((error) => console.log(error));

        axios
            .get(`${baseURL}/brands`)
            .then((res) => setBrands(res.data))
            .catch((error) => alert("Error loading brands"))

        return () => {
            setBrands([]);
            setToken(null);
        }
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            setImages(prevImages => [...prevImages, result.uri]);
        }
    }

    const removeImage = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const addBrand = async () => {
        const brand = {
            name: brandName,
            location: brandLocation,
            images: images // Pass array of image URIs
        };
        brand.images = await setImageUpload(brand.images)

        const formData = await setFormData(brand)


        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            }
        };

        axios
            .post(`${baseURL}/brands/create`, formData, config)
            .then((res) => {
                setBrands([...brands, res.data]);
                setBrandName("");
                setBrandLocation("");
                setImages([]); // Clear image array after submission
                navigation.navigate("Brands")

            })
            .catch((error) => console.log(error.response));

    }

    const renderItem = ({ item }) => (
        <List style={styles.item} >
            <Text>{item.name}</Text>
            <Text>{item.location}</Text>
        </List>
    );

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={brands}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <View >
                <Text style={{ marginLeft: 10}}>Name</Text>
                <TextInput
                    value={brandName}
                    style={styles.input}
                    onChangeText={(text) => setBrandName(text)}
                    placeholder="Brand Name"
                />
                <Text style={{ marginLeft: 10}}>Location</Text>
                <TextInput
                    value={brandLocation}
                    style={styles.input}
                    onChangeText={(text) => setBrandLocation(text)}
                    placeholder="Location"

                />
                <EasyButton
                        medium
                        primary
                        
                        onPress={pickImage}
                        style={{ marginLeft: 10}}
                    >
                    <Text style={{ color: "white", fontWeight: "bold" }}>Pick Image</Text>
                </EasyButton>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
                    {images.map((image, index) => (
                        <View key={index} style={{ flexDirection: 'row', margin: 7 }}>
                            <Image source={{ uri: image }} style={{ width: 100, height: 100, margin: 5 }} />
                            <TouchableOpacity onPress={() => removeImage(index)}>
                                <FontAwesome name="remove" size={24} color="red" style={{ marginLeft: 6 }} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <View style={{ alignItems: "center" }}>
                    <EasyButton
                        medium
                        primary
                        onPress={addBrand}
                    >
                        <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
                    </EasyButton>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomBar: {
        backgroundColor: "white",
        width: width,
        height: 200,
        padding: 10,
        justifyContent: "space-between",


    },
    
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        margin: 9,
        padding: 5,

    },
    item: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
    
})

export default CreateBrand;