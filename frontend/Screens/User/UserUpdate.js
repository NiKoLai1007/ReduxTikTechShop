import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import baseURL from "../../assets/common/baseurl"
import { useNavigation } from '@react-navigation/native';

const UserUpdate = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState('default_avatar.jpg');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const navigation = useNavigation()

    

    const getProfile = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem('jwt');
        const user = await AsyncStorage.getItem('user');
        console.log(token)
        if (!token) {
            setIsAuthenticated(false);
            navigation.navigate('Login');
            return;
        }
        const config = {
            headers: {
                Authorization: `bearer ${token}`,
            },
        };
        try {
            const { data } = await axios.get(`${baseURL}users/profile`, config);
                console.log(data)
                setName(data.name);
                setEmail(data.email);
                setAvatarPreview(data.image);
                setLoading(false);
            
        } catch (error) {
            console.error(error);
            setLoading(false);
            setError('User not found');
        }
    };

    const updateProfile = async (formData) => {
        const token = await AsyncStorage.getItem('jwt');
        try {
            // const formData = new FormData();
            // formData.append('name', name);
            // formData.append('email', email);
            // formData.append('avatar', avatar);

            const response = await axios.put(`${baseURL}users/profile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `${token}`,
                }
            });
            setIsUpdated(true);
            // Handle success response
        } catch (error) {
            console.error(error.response.data);
            setError('Error updating profile');
            // Handle error response
        }
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault()
        console.log(name, email)
        if (!name || !email) {
            Alert.alert('Validation Error', 'Name and Email are required');
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('image', avatar);
        setLoading(true);
        updateProfile(formData);
        navigation.navigate('UserProfile')
    };

    const handleChooseAvatar = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setAvatar(result.uri);
            setAvatarPreview(result.uri);
        }
    };
    useEffect(() => {
        getProfile();
    }, []);

    
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Update Profile</Text>
            <Image source={{ uri: avatarPreview }} style={styles.avatar} />
            <TouchableOpacity onPress={handleChooseAvatar}>
                <Text>Choose Avatar</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <Button title="Update Profile" onPress={handleUpdateProfile} />
            
            {isUpdated && <Text>Profile updated successfully!</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});

export default UserUpdate;