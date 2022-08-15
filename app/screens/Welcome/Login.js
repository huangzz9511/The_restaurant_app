import React, { useState,useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import {View, SafeAreaView, StyleSheet,Button, Image, ImageBackground,Text, TextInput,TouchableOpacity, Pressable} from 'react-native';
import {db} from '../../database/firebase'


import {getAuth,  signInWithEmailAndPassword} from 'firebase/auth'


function Login(props) {
    const[email, setEmail]= useState('')    // set Email and password varible for cath user input
   const[password, setPassword] = useState('')
   const navigation = useNavigation()      // set navigation to change the screen after user login


   useEffect(() => { 
    const auth=getAuth();
                        //function for user to move on to home screen after  login 
    const unsubscribe = auth.onAuthStateChanged( user => {
        if (user){
            navigation.replace('Customer_main')
        }
    })

    return unsubscribe

   }, [])




   const handleLogin = () =>{    
    const auth = getAuth();  //Handel Login by firebase

        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Log in with: ',user.email);
        })
        .catch(error => alert(error.message))

        

   }

  


    return (
        <SafeAreaView style={styles.background}>
            <Image style={styles.logo} source={require('../../assets/Logo1.png')} />
            <TextInput
             placeholder='Email'
             value={email}
             onChangeText={text => setEmail(text)}
             style={styles.username}
             placeholderTextColor={'white'}
             />

            <TextInput 
            placeholder='Password'
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.username}
             secureTextEntry
             placeholderTextColor={'white'}
             />


            <TouchableOpacity  style={styles.line}>  
            <Button title='Forgot Password?'  onPress={() => navigation.navigate('Forgot_pass')} />
            </TouchableOpacity>

            <Pressable  style={styles.signin}>

                <Button title='Login'  onPress={handleLogin} />
            </Pressable>


            <Text style={styles.line} >________ OR _______</Text>


            <TouchableOpacity  style={styles.Signup}>
                
                <Button title='SignUp'  onPress={() => navigation.navigate('SignUp')} />
            </TouchableOpacity>
        
            

        
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    background:{
        backgroundColor: 'orange',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    logo:{
        height: 107,
        width: 300,        
        
        top: -210    
    },
    username:{
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        padding: 8,
        margin: 10,
        width: 300,
        top: -170,
        color: 'white'
        
    },
    signin:{  
        top: -130,
        
        
    },
    line:{
        top: -128,
        color: 'white',
        
    },
    Signup:{
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        padding: 8,
        
        width: 300,
        top: -110,
        
    }
})

export default Login;



