import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./screens/Home";
import Add from "./screens/Add";
import Login from './screens/login';
import Edit from "./screens/Edit";

const Stack = createNativeStackNavigator();

function MyStack(){
    return(
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen 
            name="Add" 
            options={{presentation: 'modal'}}
            component={Add}/>
            <Stack.Screen 
            name="Edit" 
            options={{presentation: 'modal'}}
            component={Edit}/>
        </Stack.Navigator>
    )
}

export default function Navigation(){
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}