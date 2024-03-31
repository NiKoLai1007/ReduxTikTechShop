import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { Center, Heading } from 'native-base'
import TrafficLight from '../../Shared/StyledComponents/TrafficLight'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/Actions/cartActions';
import { useNavigation } from "@react-navigation/native";

const SingleProduct = ({ route }) => {
    const  navigation = useNavigation();
    const [item, setItem] = useState(route.params.item);
    const [availability, setAvailability] = useState('');
    const [availabilityText, setAvailabilityText] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        if (item.countInStock == 0) {
            setAvailability(<TrafficLight unavailable></TrafficLight>);
            setAvailabilityText("Unavailable")
        } else if (item.countInStock <= 5) {
            setAvailability(<TrafficLight limited></TrafficLight>);
            setAvailabilityText("Limited Stock")
        } else {
            setAvailability(<TrafficLight available></TrafficLight>);
            setAvailabilityText("Available")
        }

        return () => {
            setAvailability(null);
            setAvailabilityText("");
        }
    }, []);

    const handleAddToCart = () => {
        dispatch(addToCart({ ...item, quantity: 1 }));
        // Optionally, show a toast or some other notification here
    };

    const handleReviews = () => {
        navigation.navigate('ReviewList');
    };

    return (
        <Center flexGrow={1}>
            <ScrollView style={{ marginBottom: 80, padding: 5 }}>
                <View>
                    <Image
                        source={{
                            uri: item.image ? item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                        }}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </View> 
                <View style={styles.contentContainer}>
                    <Heading style={styles.contentHeader} size='xl'>{item.name}</Heading>
                    <Text style={styles.contentText}>{item.brand}</Text>
                </View>
                <View style={styles.availabilityContainer}>
                    <View style={styles.availability}>
                        <Text style={{ marginRight: 10 }}>
                            Availability: {availabilityText}
                        </Text>
                        {availability}
                    </View>
                    <Text>{item.description}</Text>
                </View>
                <TouchableOpacity style={styles.addButtonSmall} onPress={handleAddToCart}>
                    <Text style={styles.addButtonText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButtonSmall} onPress={handleReviews}>
                    <Text style={styles.addButtonText}>Reviews</Text>
                </TouchableOpacity>
            </ScrollView>
        </Center >
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentHeader: {
        fontWeight: 'bold',
        marginBottom: 20
    },
    contentText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    availabilityContainer: {
        marginBottom: 20,
        alignItems: "center"
    },
    availability: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    addButtonSmall: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
        width: 150, // Adjust width as needed
        height: 40 // Adjust height as needed
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    }
});

export default SingleProduct;
