import React from 'react'
import 'react-native-gesture-handler'
import { createStackNavigator } from "@react-navigation/stack"; ``
import Login from "../screens/Welcome/Login";
import Forget_pass from "../screens/Welcome/Forget_pass";
import Registration from "../screens/Welcome/Registration";
import customer_home from '../screens/Customer/customer_home';
import { SafeAreaView } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { tabBarOption, Image, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Con from 'react-native-vector-icons/Octicons';
import Menucard from '../screens/Customer/Menucard';
import Reservation from '../screens/Customer/Reservation'
import Manager_home from '../screens/Manager/Manager_home';
import DetailsScreen from '../screens/Customer/detailsScreen';
import OnBording from '../screens/Customer/OnBording';
import Signin from '../screens/Welcome/Signin';
import Profile from '../screens/Customer/Profile'

import Signup from '../screens/Welcome/Signup';
import Otp from '../screens/Welcome/Otp';
import Tabnavigator from '../screens/Manager/Tabnavigator';
import ReservationHome from '../screens/Customer/ReservationHome';
import ReservationDetails from '../screens/Customer/ReservationDetails';
import Confirm_res from '../screens/Customer/confirm_res';
import Dashboard from '../screens/Manager/dash/dashboard';
import CartScreen from '../screens/Customer/CartScreen';

import Scanner from '../screens/Manager/BarCodeScanPage';
import TakeOrder from '../screens/Manager/OrderTakenPage';
import CheckOut from '../screens/Manager/CheckOutPage';

import Sales from '../screens/Manager/dash/sales';
import OrderSubmit from '../screens/Customer/OrderSubmit';


const Stack= createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator tabBarOption={{
      style: {
        height: 55,
        borderTopWidth: 0,
        elevation: 0,
      },
      showLabel: false,
      activeTintColor: 'orange',


    }}>
      <Tab.Screen name="Menu"
        component={Menucard}
        options={{
          tabBarIcon: () => (
            <Icon name='restaurant'
              color='orange'
              size={28}

            />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="ReservationHome"
        component={ReservationHome}
        options={{
          tabBarIcon: (color) => (
            <Icon name="date-range"
              color={color}
              size={28}
            />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: (color) => (
            <View style={{
              height: 50, width: 60,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              borderColor: 'orange',
              borderWidth: 2,
              borderRadius: 30,
              top: -25,
              elevation: 5,
            }}>
              <Icon name="shopping-cart" color={color} size={28} />
            </View>
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: (color) => (
            <Icon name="face"
              color={color}
              size={28} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="About"
        component={Login}
        options={{
          tabBarIcon: (color) => (
            <Con name="question"
              color={color}
              size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const AuthNavigator = () => (

  <Stack.Navigator>

    <Stack.Screen name='Signin' component={Signin} options={{ headerShown: false }} />
    <Stack.Screen name='OrderSubmit' component={OrderSubmit} options={{ headerShown: false }} />
    <Stack.Screen name='Man_Dash' component={Dashboard} options={{ headerShown: false }} />
    <Stack.Screen name='Sales' component={Sales} options={{ headerShown: false }} />
    <Stack.Screen name='CartScreen' component={CartScreen} options={{ headerShown: false }} />

    <Stack.Screen name='Conf_res' component={Confirm_res} options={{ headerShown: false }} />
    <Stack.Screen name='Menu' component={Menucard} options={{ headerShown: false }} />
    <Stack.Screen name='ReservationHome' component={ReservationHome} options={{ headerShown: false }} />
    <Stack.Screen name='ReservationDetails' component={ReservationDetails} options={{ headerShown: false }} />

    <Stack.Screen name='Manager_home' component={Manager_home} options={{ headerShown: false }} />
    {/*<Stack.Screen name='Manger_menu'  component={Manager_Menu} options={{headerShown: false}}/>
    <Stack.Screen name='Revenue'  component={Revenue} options={{headerShown: false}}/>
    <Stack.Screen name='Waitinglist'  component={Waitinglist} options={{headerShown: false}}/>
    <Stack.Screen name='Menu_edit'  component={Menu_edit} options={{headerShown: false}}/>
    <Stack.Screen name='Menu_input'  component={Menu_input} options={{headerShown: false}}/>*/}

    <Stack.Screen name='BarCodeScanPage' component={Scanner} options={{ headerShown: false }} />
    <Stack.Screen name='OrderTakenPage' component={TakeOrder} options={{ headerShown: false }} />
    <Stack.Screen name='CheckOutPage' component={CheckOut} options={{ headerShown: false }} />

    <Stack.Screen name='OnBording' component={OnBording} options={{ headerShown: false }} />
    <Stack.Screen name='Otp' component={Otp} options={{ headerShown: false }} />
    <Stack.Screen name='Customer_main' component={BottomNavigator} options={{ headerShown: false }} />
    <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />

    <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
    <Stack.Screen name='Customer_home' component={customer_home} options={{ headerShown: false }} />
    <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />

    {/*
    <Stack.Screen name='Signup'  component={Registration} />
    */}


    <Stack.Screen name='detailsScreen' component={DetailsScreen} options={{ headerShown: false }} />

    <Stack.Screen name='Forgot_pass' component={Forget_pass} options={{ headerShown: false }} />

  </Stack.Navigator>

)

export default AuthNavigator;