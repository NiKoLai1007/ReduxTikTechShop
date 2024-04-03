import React from "react"
import { StyleSheet, Image, SafeAreaView, View } from "react-native"

const Header = () => {
    return (
        //<View style={styles.header}>
        <SafeAreaView style={styles.header}>
            <Image
                source={require("../assets/logo.png")}
                resizeMode="contain"
                style={{ height: 100 }}
            />

        </SafeAreaView>
        //</View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 100,
        flexDirection: 'row',
        alignContent: "center",
        justifyContent: "center",
        padding: 20,
        marginTop: -100,
        marginBottom: -10,
    }
})

export default Header


