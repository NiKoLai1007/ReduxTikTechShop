import React from "react";
import { createStackNavigator } from '@react-navigation/stack'

import Login from "../Screens/User/Login";
import Register from "../Screens/User/Register";
import UserProfile from "../Screens/User/UserProfile";
import UserUpdate from "../Screens/User/UserUpdate";
import ProfileInfo from "../Screens/User/ProfileInfo";

const Stack = createStackNavigator();

const UserNavigator = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="User Profile"
                component={UserProfile}
                options={{
                    headerShown: false
                }}
            />

                <Stack.Screen
                name="UserUpdate"
                component={UserUpdate}
                options={{
                    headerShown: false
                }}
            />

                <Stack.Screen
                name="ProfileInfo"
                component={ProfileInfo}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>


        
    )

}

export default UserNavigator;