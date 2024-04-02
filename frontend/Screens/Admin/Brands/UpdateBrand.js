import React, { Fragment, useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setFormData, setImageUpload } from "../../../utils/formData";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import baseurl from "../../../assets/common/baseurl";

const UpdateBrand = ({ route }) => {
  const id = route.params;
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [icon, setIcon] = useState([]);
  // const [rerender, setRerender] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setIcon((prevImages) => [...prevImages, result.assets[0].uri]);
      // setRerender([]);
      // console.log(rerender);
    }
  };

  const removeImage = (index) => {
    setIcon((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const addBrand = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const brand = {
      name: name,
      color: color,
      icon: icon,
    };
    console.log(icon);
    brand.icon = await setImageUpload(brand.icon);

    const formData = await setFormData(brand);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${token}`,
      },
    };

    axios
      .put(`${baseurl}brands/update/${id}`, formData, config)
      .then((res) => {
        setName("");
        setColor("");
        setIcon([]);
        navigation.navigate("Brands");
      })
      .catch((error) => alert(error));
  };

  useFocusEffect(
    useCallback(() => {
      getBrand();
    }, [])
  );

  const getBrand = async () => {
    try {
      await axios
        .get(`${baseurl}get/brands/${id}`)
        .then((response) => {
          setName(response.data.brand.name);
          setColor(response.data.brand.color);
          setIcon(response.data.brand.icon);
        })
        .catch((error) => console.log(error.response));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>

      <Text style={{ marginLeft: 10 }}>Name</Text>
      <TextInput
        value={name}
        style={styles.input}
        onChangeText={(text) => setName(text)}
        placeholder="Brand Name"
      />

      <Text style={{ marginLeft: 10 }}>Color</Text>
      <TextInput
        value={color}
        style={styles.input}
        onChangeText={(text) => setColor(text)}
        placeholder="Brand Color"
      />

      <Button
        colorScheme="secondary"
        onPress={pickImage}
        style={{ marginLeft: 10 }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Pick Image</Text>
      </Button>
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
        {/* {rerender.length > 0
          ? rerender.map((image, index) => (
              <View key={index} style={{ flexDirection: "row", margin: 7 }}>
                <Image
                  source={{ uri: image }}
                  style={{ width: 100, height: 100, margin: 5 }}
                />
                <TouchableOpacity onPress={() => removeImage(index)}>
                  <FontAwesome
                    name="remove"
                    size={24}
                    color="red"
                    style={{ marginLeft: 6 }}
                  />
                </TouchableOpacity>
              </View>
            )) */}
        {icon.map((icon, index) => (
          <View key={index} style={{ flexDirection: "row", margin: 7 }}>
            <Image
              source={{ uri: icon }}
              style={{ width: 100, height: 100, margin: 5 }}
            />
            <TouchableOpacity onPress={() => removeImage(index)}>
              <FontAwesome
                name="remove"
                size={24}
                color="red"
                style={{ marginLeft: 6 }}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={{ alignItems: "center" }}>
        <Button onPress={addBrand}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
        </Button>
      </View>
    </View>
  );
};

export default UpdateBrand;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 9,
    padding: 5,
  },
});