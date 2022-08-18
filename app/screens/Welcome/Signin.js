import { Text, View, TouchableOpacity, Image, SafeAreaView, Alert } from 'react-native'
import React from 'react'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FormInput from '../../components/FormInput'
import utils from '../../api/utils'
import Switch from '../../components/Switch'
import { PrimaryButton, SecondButton } from '../../components/Button'
import { auth } from '../../database/firebase'
import { Manager_auth } from '../../database/ManagerFirebase'
import { signInWithEmailAndPassword } from 'firebase/auth'



const Signin = ({ navigation }) => {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [emailError, setEmailError] = React.useState('')
  const [saveMe, setSaveMe] = React.useState(false)
  function isEnableSignIn() { return email != '' && password != '' && emailError == '' }
  const [showPass, setShowPass] = React.useState(false)
  const handleLogin = () => {
    //Handel Login by firebase


    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Log in with: ', user.email);
        navigation.navigate('OnBording')
      })

      .catch(error => alert(error.message))


  }
  const handleEmployeeLogin = () => {
    //Handel Login by firebase


    signInWithEmailAndPassword(Manager_auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Log in with: ', user.email);
        navigation.navigate('Manager_home')
      })

      .catch(error => alert(error.message))


  }




  return (

    <SafeAreaView
      style={{
        flex: 1,
        paddingVertical: 12,
        backgroundColor: 'white'
      }}
    >
      <KeyboardAwareScrollView
        keyboardDismissMode='on-drag'
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: 12
        }}>

        {/* App Icon */}

        <View
          style={{
            alignItems: 'center',
            marginTop: -20
          }}>

          <Image
            source={require('../../assets/third.jpg')}
            resizeMode='contain'
            style={{
              height: 250,
              width: 300
            }} />

        </View>

        {/* Title */}

        <View
          style={{
            marginTop: -30,

          }} >

          <Text style={{
            textAlign: 'center',
            fontSize: 22, lineHeight: 30
          }}>
            Let's Log you in
          </Text>

          <Text style={{
            textAlign: 'center',
            color: 'gray',
            marginTop: 8,
            fontSize: 16, lineHeight: 22
          }} >
            Welcome back You've been missed
          </Text>

        </View>





        <View
          style={{
            flex: 1,
            marginTop: 24
          }}>

          {/* Form Input*/}



          <FormInput
            lable="email" KeyboardType='email-address'
            autoCompleteType='email'
            onChange={(value) => {

              //validate email
              utils.validateEmail(value, setEmailError)

              setEmail(value)
            }}
            errormsg={emailError}
            appendComponent={
              <View
                style={{
                  justifyContent: 'center'
                }}>

                <Image
                  source={email == '' || (email != '' && emailError == '') ? require('../../assets/correct.png') : require('../../assets/cancle.png')}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: email == '' ? 'gray' : (email != '' && emailError == '') ? 'green' : 'red',
                  }}

                />

              </View>

            }
          />

          <FormInput
            lable='password'
            securetextEntry={!showPass}
            autoCompleteType='password'
            containerStyle={{
              marginTop: 24,
            }}
            onChange={(value) => setPassword(value)}
            appendComponent={
              <TouchableOpacity
                style={{
                  width: 40,
                  alignItems: 'flex-end',
                  justifyContent: 'center'
                }}
                onPress={() => setShowPass(!showPass)}    >

                <Image
                  source={showPass ? require('../../assets/eye_close.png') : require('../../assets/eye.png')}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: 'gray'
                  }} />

              </TouchableOpacity>
            }
          />

          {/* SAve me & Forgot Password*/}

          < View
            style={{
              flexDirection: 'row',
              marginTop: 24,
              justifyContent: 'space-between',

            }} >

            <Switch
              value={saveMe}
              onChange={(value) => setSaveMe(value)}
            />
            <SecondButton
              title='Forgot Password?'
              onPress={() => navigation.navigate('Forgot_pass')}
            />
          </View>

          {/* LogIN*/}
          <View style={{ alignSelf: 'center', paddingTop: 24 }}>
            <PrimaryButton
              btnContainer={{

                backgroundColor: isEnableSignIn() ? 'orange' : 'rgba(227, 120, 75, 0.4)',
                height: 55, width: 200,
                borderRadius: 24,
                marginTop: 24

              }}
              title='Login'

              disabled={isEnableSignIn() ? false : true}
              //check with firebase
              onPress={handleLogin}
            /></View>

          {/* Sign Up*/}
          <View style={{
            flexDirection: 'row',
            marginTop: 24,
            justifyContent: 'center'
          }}>

            <Text style={{
              color: 'gray',
              fontSize: 16, lineHeight: 22
            }}>
              Don't have an account?
            </Text>
            <SecondButton
              title=' Create an acoount'
              titlestyle={{ color: 'orange' }}
              onPress={() => navigation.navigate('Signup')} />
          </View>

          {/* Employee Sign In */}

          <View style={{ alignSelf: 'center', paddingTop: 4 }}>
            <SecondButton
              btnContainer={{

                backgroundColor: isEnableSignIn() ? 'orange' : 'rgba(227, 120, 75, 0.4)',
                height: 45, width: 100,
                borderRadius: 24,
                marginTop: 24,
                alignSelf: 'center'


              }}
              title='Employee'
              titlestyle={{ color: 'white', fontSize: 12 }}

              disabled={isEnableSignIn() ? false : true}
              //check with firebase
              onPress={handleEmployeeLogin}
            /></View>

        </View>




      </KeyboardAwareScrollView>
    </SafeAreaView>

  )

}


export default Signin;