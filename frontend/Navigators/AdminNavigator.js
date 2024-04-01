import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Orders from "../Screens/Admin/Orders"
import Products from "../Screens/Admin/Products"
import ProductForm from "../Screens/Admin/ProductForm"
import Categories from "../Screens/Admin/Categories"
import Brands from "../Screens/Admin/Brands/Brands"
import UserCharts from "../Screens/Admin/Charts/UserCharts"
import CreateBrand from "../Screens/Admin/Brands/CreateBrand"
import UpdateBrand from "../Screens/Admin/Brands/UpdateBrand"
import Users from "../Screens/Admin/Users"

const Stack = createStackNavigator();

const AdminNavigator= () => {
    
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Products"
                component={Products}
                options={{
                    title: "Products"
                }}
            />
            <Stack.Screen name="Categories" component={Categories} />
            <Stack.Screen name="Brands" component={Brands} />
            <Stack.Screen name="CreateBrands" component={CreateBrand} />
            <Stack.Screen name="UpdateBrand" component={UpdateBrand} />
            <Stack.Screen name="Orders" component={Orders} />
            <Stack.Screen name="ProductForm" component={ProductForm} />
            <Stack.Screen name="UserCharts" component={UserCharts} />
            <Stack.Screen name="Users" component={Users} />
        </Stack.Navigator>
    )
}
export default  AdminNavigator