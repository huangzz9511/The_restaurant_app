import React from "react";
import { View, StyleSheet, Text, TouchableOpacity} from "react-native";




const PrimaryButton = ({title, onPress = () => {}}) =>{

    return <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View style={styles.btnContainer}>
            <Text style={styles.title}>{title} </Text>
        </View>
    </TouchableOpacity>


}
const SecondButton = ({title, onPress = () => {}}) =>{

    return <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View style={{...styles.btnContainer, backgroundColor: 'white'}}>
            <Text style={{...styles.title, color: 'orange' }}>{title} </Text>
        </View>
    </TouchableOpacity>


}

const styles = StyleSheet.create({
    btnContainer:{
        backgroundColor: 'orange',
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        color:'white',
        fontWeight:'bold',
        fontSize:18,

    }
})

export  {PrimaryButton, SecondButton};