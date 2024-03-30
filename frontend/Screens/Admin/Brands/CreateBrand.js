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
import { useNavigation } from "@react-navigation/native";





var { width } = Dimensions.get("window")


const CreateBrand = () => {

  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [icon, setIcon] = useState([]);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) { console.log(result)
      setIcon((prevImages) => [...prevImages, result.assets[0].uri]);
    }
  };

  const removeImage = (index) => {
    setIcon((prevImages) => prevImages.filter((_, i) => i !== index));
  };

    useEffect(() => {
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res);
            })
            .catch((error) => console.log(error));
    }, [])



    const addBrand = async () => {
        const brand = {
            name: name,
            color: color,
            icon: icon // Pass array of image URIs
        };
        brand.icon = await setImageUpload(brand.icon)

        const formData = await setFormData(brand)

        console.log(brand.icon)
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                // Authorization: `Bearer ${token}`,
            }
        };

        axios
            .post(`${baseURL}brands/create`, formData, config)
            .then((res) => {
                setName('');
                setIcon([]);
                setColor("");
                navigation.navigate("Brands")

            })
            .catch((error) => console.log(error.response));

    }

    
    return (
        <View style={{ flex: 1 }}>
            <View >
                <Text style={{ marginLeft: 10}}>Name</Text>
                <TextInput
                    value={name}
                    style={styles.input}
                    onChangeText={(text) => setName(text)}
                    placeholder="Brand Name"
                />
                <Text style={{ marginLeft: 10}}>Color</Text>
                <TextInput
                    value={color}
                    style={styles.input}
                    onChangeText={(text) => setColor(text)}
                    placeholder="Color"

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
                    {icon.map((image, index) => (
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