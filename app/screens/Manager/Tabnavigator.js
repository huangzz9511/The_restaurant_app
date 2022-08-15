import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Menucard from '../Customer/Menucard';
import Reservation from '../Customer/Reservation';
import Icon from 'react-native-vector-icons/MaterialIcons' ; 

const Tab = createBottomTabNavigator();

const Tabnavigator =()=>{
    return(
        <Tab.Navigator tabBarOption={{
            style:{
                height:55,
                borderTopWidth:0,
                elevation:0,
              },
              showLabel:false,
              activeTintColor:'orange',
                
            
        }}>
            <Tab.Screen name="Menu"
            component={Menucard}
            options={{tabBarIcon:()=>(
            <Icon name='restaurant'
            color='orange'
            size={28}
            
            />
            ),
            headerShown: false}}
              />
            <Tab.Screen 
            name="Reservation" 
            component={Reservation} 
            options={{tabBarIcon:(color)=>(
            <Icon name="date-range"
            color={color}
            size={28} 
             />
            ),
            headerShown: false}}
              />
              </Tab.Navigator> )}




export default Tabnavigator;