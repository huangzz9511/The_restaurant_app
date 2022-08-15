import React, { Component, useState} from 'react';
import {Alert, View, SafeAreaView, StyleSheet, Button, Image, Text, TextInput,TouchableOpacity} from 'react-native';
import { CheckBox } from 'react-native-elements';
import {db} from '../../database/firebase'
import { getDatabase, ref, set} from "firebase/database";
import firebase from 'firebase/compat';

export default function Registration({navigation}){

    const[email, setEmail]= useState()    // set Email and password varible for cath user input
    const [username, setUserName] = useState()
    const[password, setPassword] = useState()
    const[phone, setPhone] = useState()
    const[toggleCheckBox, setToggleCheckBox] = useState(false)
    

          // set navigation to change the screen after user signup

    const handleClick = () => setToggleCheckBox(!toggleCheckBox)

    const handleSignup = () =>{  
      //handle sigup
      if(email === '' && password === '') {
        Alert.alert('Enter details to signup!')
      } 
      else if (toggleCheckBox === false){
        Alert.alert('Please accept the Terms of Service to signup!')
      }
      else {
        db
        .collection('UserData')
        .doc(email)
        .add({
          name: username,
          phone: phone,
          email: email
        })
      .then(()=>{
        console.log('User added!')
      })
    .catch((error)=> alert(error.message))
    
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        
        console.log('Signup successfully with: ',user.email) ;
       })
        .catch((error) => 
        alert(error.message));

        
       
        

        navigation.navigate('Login')
      }

      
    }
    
    const signUpUser = async ({ name, email, password }) => {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        firebase.auth().currentUser.updateProfile({
          displayName: name
        });
    
        return {};
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            return {
              error: "Email is Already in Use."
            };
          case "auth/invalid-email":
            return {
              error: "Email id Incorrect."
            };
          case "auth/weak-password":
            return {
              error: "Password is week!"
            };
          case "auth/too-many-requests":
            return {
              error: "Give us a moment to process your requests."
            };
          default:
            return {
              error: "Check your Connection."
            };
        }
      }
    };

    

    return (
      <SafeAreaView style={styles.background}>
          <Image style={styles.logo} source={require('../../assets/Logo1.png')} />

          <TextInput
           style={styles.textInput}
            placeholder="Username"
             placeholderTextColor={'lightgray'}
             onChangeText={username => setUserName(username)}
             />

          <TextInput
           style={styles.textInput}
            placeholder="Email Address"
             placeholderTextColor={'lightgray'}
             onChangeText={email => setEmail(email)}
             />

          <TextInput 
          style={styles.textInput}
           placeholder="Phone Number"
            placeholderTextColor={'lightgray'}
            onChangeText={phone => setPhone(phone)}
            />

          <TextInput 
          style={styles.textInput}
           placeholder="Password"
            placeholderTextColor={'lightgray'}
            secureTextEntry
            />

          <TextInput 
          style={styles.textInput}
           placeholder="Repeat Password"
            placeholderTextColor={'lightgray'}
            onChangeText={text => setPassword(text)}
            secureTextEntry
            />

          <CheckBox
            activeOpacity = {1}
            containerStyle = {styles.checkBox}
            textStyle = {styles.checkBoxTitle}
            checked = {toggleCheckBox}
            onPress = {() => handleClick()}
            title = 'I accept the Terms of Service.'
          />

          <TouchableOpacity  style={styles.signup}>
              <Button title='SignUp' color='#F8B864' onPress={handleSignup}  />
              

          </TouchableOpacity>
      
      </SafeAreaView>
      
    );
}

const styles = StyleSheet.create({
  background:{
      backgroundColor: '#191E25',
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
  },
  logo:{
      height: 107,
      width: 300,        
      position: 'absolute',
      top: 150
  },
  textInput:{
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 10,
      padding: 8,
      margin: 10,
      width: 300,
      top: -140,
      color: 'white'
  },
  checkBox:{
    marginTop: 10,
    top: -150,
    borderWidth: 0 ,
    backgroundColor: 'transparent',
  },

  checkBoxTitle:{
    color: 'white'
  },

  signup:{
      borderWidth: 1,
      borderColor: 'orange',
      borderRadius: 10,
      padding: 8,
      
      width: 300,
      top: -140,
      color: 'white'
  }
})