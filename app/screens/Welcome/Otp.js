import { Text, View,SafeAreaView,Image } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import OTPInputView from '@twotalltotems/react-native-otp-input'
import { PrimaryButton, SecondButton } from '../../components/Button'






const Otp = ({navigation}) =>{
  
    const [timer, setTimer] = React.useState(60)
    async function confirmCode() {
        try {
          await confirm.confirm(code);
        } catch (error) {
          console.log('Invalid code.');
        }
      }
    
    React.useEffect(()=> {
        let interval = setInterval(() => {
            setTimer (prevTimer => {
                if (prevTimer > 0){
                    return prevTimer -1
                } else {
                    return prevTimer
                }
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <SafeAreaView
        style={{
            flex:1,
            paddingVertical: 24,
            backgroundColor: 'white'
        }} 
        >
            <KeyboardAwareScrollView
            keyboardDismissMode='on-drag'
            contentContainerStyle={{
                flex:1,
                paddingHorizontal: 24
            }}>

                {/* App Icon */}

                <View 
                style={{
                    alignItems:'center'
                }}>

                    <Image 
                    source={require('../../assets/third.jpg')}
                    resizeMode='contain'
                    style={{
                        height: 200,
                        width:300
                    }}/>

                </View>

                {/* Title */}

                <View
                style={{
                    marginTop: 14,
                    
                }} >

                    <Text style={{
                        textAlign: 'center',
                         fontSize: 22, lineHeight: 30
                    }}>
                        OTP Authentication
                    </Text>

                    <Text style={{
                        textAlign:'center',
                        color: 'gray',
                        marginTop:48,
                         fontSize: 16, lineHeight: 22,
                         
                    }} >
                        An authentication code had been sent to Registerd email
                    </Text>

                </View>

                {/* OTP Input */}


                <View 
                style={{
                    flex:1,
                    marginTop: 48
                }} >
                    <OTPInputView 
                    pinCount={4}
                    style={{
                        width: '100%',
                        height: 50
                    }} 
                    codeInputFieldStyle={{
                        width:65,
                        height: 65,
                        borderRadius: 12,
                        backgroundColor: 'lightgray',
                        color: 'black',
                        fontSize: 16, lineHeight: 22
                    }}
                    onCodeFilled={(code) => {
                        console.log(code)
                    }}
                    />
                    {/* Coundown Timer */}

                    <View
                    style={{
                        flexDirection:'row',
                        justifyContent: 'center',
                        marginTop: 24
                    }} >

                        <Text style={{color: 'gray', fontSize: 16, lineHeight: 22}} > Didn't recive code?</Text>
                        <SecondButton 
                        title={`Resend (${timer}s)`}
                        disabled={timer == 0 ? false : true}
                        btnContainer={{
                            marginLeft: 8
                        }} 
                        titlestyle={{
                            color:'orange',
                            fontSize: 16, lineHeight: 22
                        }}
                        onPress={()=> {setTimer(60), sendVerificationCode}}
                        />
                    </View>
                </View>
                {/* Footer */}
                
                <View style={{top:-40}}>
                    <PrimaryButton 
                    title='Continue'
                    btnContainer={{
                        height: 50,
                        alignItems: 'center',
                        borderRadius: 12,
                        backgroundColor: 'orange'
                    }}
                    onPress={()=> {confirmCode ,navigation.replace('Onbording')}} />
                </View>

                <View 
                style={{
                    marginTop: 14,
                    alignItems: 'center',
                    top: -20,

                }}>
                    <Text 
                    style={{
                        color:'gray',
                        fontSize: 16, lineHeight: 22
                    }} >
                        By creating an account, you agree to our,
                    </Text>
                    <SecondButton 
                    title='Terms and Condition'
                    titlestyle={{
                        color:'orange',
                        fontSize: 16, lineHeight: 22
                    }}
                    onPress={()=> console.log('TNC')} />
                </View>


            </KeyboardAwareScrollView>


        </SafeAreaView>
    )
  
}



export default Otp;