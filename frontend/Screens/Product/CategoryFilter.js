import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, FlatList, View } from 'react-native';
import { Badge, Text, VStack, Divider, HStack } from 'native-base';

const CategoryFilter = (props) => {
    console.log(props.categories)
    return (
        <ScrollView
            bounces={true}
            horizontal={true}
            style={{ backgroundColor: "#000000" }}
        >
            <VStack space={4} divider={<Divider />} w="100%">
                <HStack justifyContent="space-between">
                    <TouchableOpacity
                        key={1}
                        onPress={() => {
                            props.categoryFilter('all'), props.setActive(-1)
                        }}
                    >
                        <Badge style={[styles.center, { margin: 10, height: 50, },
                        props.active === -1 ? styles.active : styles.inactive]} colorScheme="info" >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>All</Text>
                        </Badge>
                    </TouchableOpacity>
                    {props.categories.map((item) => (
                        <TouchableOpacity
                            key={item._id}
                            onPress={() => {
                                props.categoryFilter(item._id),
                                    props.setActive(props.categories.indexOf(item))
                            }}
                        >
                            <Badge
                                style={[styles.center,
                                { margin: 10, height: 50 },
                                props.active == props.categories.indexOf(item) ? styles.active : styles.inactive
                                ]}
                            >
                                <Text Textstyle={{ color: 'black' }}>{item.name}</Text>
                            </Badge>
                        </TouchableOpacity>
                    ))}
                </HStack>
            </VStack>
        </ScrollView>


    )
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    badge: {
        margin: 5,
        height: 100, // Increased padding horizontally
        width: 80,
        paddingVertical: 15, // Increased padding vertically
        borderRadius: 40,
        marginBottom: 30,
    },
    active: {
        backgroundColor: '#F6BE00'
    },
    inactive: {
        backgroundColor: '#F6BE00'
    }
})

export default CategoryFilter;