import { Text, View,Image,SafeAreaView } from 'react-native'
import React, { Component } from 'react'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const AuthLayout =({title, subtitle, titleContainerStyle, childern}) =>{





    return(

        <SafeAreaView
        style={{
            flex:1,
            paddingVertical: 24,
            backgroundColor: 'orange'
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
                    ...titleContainerStyle
                }} >

                    <Text style={{
                        textAlign: 'center',
                         fontSize: 22, lineHeight: 30
                    }}>
                        {title}
                    </Text>

                    <Text style={{
                        textAlign:'center',
                        color: 'darkgray',
                        marginTop:8,
                         fontSize: 16, lineHeight: 22
                    }} >
                        {subtitle}
                    </Text>

                </View>

                {/* Content */}

                {childern}



            </KeyboardAwareScrollView>


        </SafeAreaView>
    )



}


export default AuthLayout;