import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from "./app/route/homeStack";
import Profile from "./app/screens/Customer/Profile"
import Signin from "./app/screens/Welcome/Signin"
//function App() {
  //return< Login />
  //return "Hello"
  //return <Login />
  //return (
  //  <div className="App">
  //    <h3>Build Sign Up & Login UI Template in React</h3>
  //  </div>
  //);
//}

export default function App() 
{
  return(
    <NavigationContainer>
    <AuthNavigator />
    </NavigationContainer>
 )
 
};