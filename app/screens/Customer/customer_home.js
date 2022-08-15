import React from "react";
import { View,Image, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";
import {PrimaryButton} from "../../components/Button";





const Customer_home = ({navigation}) => {



    return(


        <SafeAreaView 
        style={{flex:1 ,
        backgroundColor: 'white'}}>
            <View style={{height: 400}}>
                <Image style={{
                    width: '80%',
                    resizeMode: 'contain',
                    top: -10,
                    alignSelf: 'center'
                }} source={require('../Customer/Res.png')} />
            </View>
            <View style={styles.textcontainer}>
                <View>
                <Text style={{
                    fontSize: 32,
                    top: 50,
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>
                    Reservation
                </Text>
                <Text 
                style={{marginTop: 80,
                fontSize: 18,
                textAlign: 'center',
                color: 'gray'

                }}>
                    Reserver yourself before anyone
                </Text>
                </View>
                <View style={styles.indicatorContainer}>
                    <View style={styles.curruntIndicetor}/>
                    <View style={styles.indicator}/>
                    <View style={styles.indicator}/>  
                </View>
                <PrimaryButton onPress={() => navigation.navigate('Customer_main')}
                title="Get Started"/>
            </View>
            
        </SafeAreaView>

    );

}

const styles = StyleSheet.create({

    textcontainer:{
        flex: 1,
        paddingHorizontal: 50,
        justifyContent: 'space-between',
        paddingBottom:100
        
    },
    indicatorContainer:{
        height:50,
        flex:1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'

    },

    curruntIndicetor:{
        height:12,
        width:30,
        borderRadius:10,
        backgroundColor: 'orange',
        marginHorizontal: 5
    },
    indicator:{
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: 'gray',
        marginHorizontal: 5
    },

    
})


export default Customer_home;