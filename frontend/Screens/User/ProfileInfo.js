import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import baseURL from "../../assets/common/baseurl";


const ProfileInfo = ({ navigation }) => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getProfile = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('jwt');
            if (!token) {
                navigation.navigate('Login');
                return;
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get(`${baseURL}users/profile`, config);
            setUserProfile(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError('User not found');
            setLoading(false);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            {loading ? (
                <Text>Loading...</Text>
            ) : error ? (
                <Text>{error}</Text>
            ) : (
                <View style={styles.profileContainer}>
                    {userProfile?.image && (
                        <Image
                            source={{ uri: userProfile.image }}
                            style={styles.profileImage}
                        />
                    )}
                    <Text style={styles.text}>
                        Email: {userProfile?.email || ""}
                    </Text>
                    <Text style={styles.text}>
                        Name: {userProfile?.name || ""}
                    </Text>
                    <Text style={styles.text}>
                        Phone: {userProfile?.phone || ""}
                    </Text>
                        
                
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 10,
        zIndex: 1,
    },
    profileContainer: {
        alignItems: 'center',
        paddingTop: 50,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    text: {
        margin: 5,
        fontSize: 20,
    },
});

export default ProfileInfo;
