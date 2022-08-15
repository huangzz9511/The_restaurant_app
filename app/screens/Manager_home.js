import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-navigation';
import CircularProgress from 'react-native-circular-progress-indicator';
import {SecondButton} from '../components/Button'

function Manager_home({navigation}){
    const buttonClickedHandler = () => {
        console.log('You have press the switch!');
    };

    const [value, setValue] = useState("ON");

    const switchPressed = () => {
        console.log('Switch pressed');
        setValue("OFF");
    };
    
    const CButton = ({ text }) => {
        return (
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>{text}</Text>
          </TouchableOpacity>
        );
    };

    return(
        <SafeAreaView style={styles.background}>
            <CircularProgress
                radius={90}
                value={80}
                textColor='#222'
                fontSize={20}
                valueSuffix={'%'}
                inActiveStrokeColor={'#2ecc71'}
                inActiveStrokeOpacity={0.2}
            />
            <Image style={styles.logo} source={require('../pics/Logo1.png')} />
            <Text style={styles.check_in}> Checked-In </Text>
            <TouchableOpacity
                onPress={buttonClickedHandler}
                style={styles.roundButton1}>
                <Text style={styles.number}>08</Text>  
            </TouchableOpacity>
            
            <View style={styles.container1}>
                <View style={styles.parent1}>
                    <CButton text={"MENU"} onPress={()=> navigation.navigate('Customer_main')} />
                    <CButton text={"REPORTS"} />
                </View>
                <TouchableOpacity onPress={buttonClickedHandler} style={styles.roundButton2}>
                    <Text style={styles.switch} onPress={switchPressed}> {value}</Text>            
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    
        );
    }

    const styles = StyleSheet.create({
    background:{
        backgroundColor: '#548B4F',
        flex: 1,
        alignItems: 'center'
    },

    logo:{
        height: 120,
        width: 340,        
        top: 140
    },

    check_in:{
        color: 'white',
        fontFamily:'sans-serif',
        top: 260,
        fontSize: 32,
        alignContent: 'center',
        alignItems: 'center',
        fontWeight:'bold',
        
    },

    roundButton1:{
        width: 150,
        height: 150,
        top: 300,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'white',
    },

    number:{
        margin: 1,
        width: 300,
        height: 60,
        color: 'black',
        textAlign: 'center',
        fontSize: 34
    },

    roundButton2:{
        width:100,
        height: 100,
        borderRadius: 100,
        backgroundColor: '#548B4F',
        borderWidth: 1,
        borderColor:'white',
        alignSelf: 'center',
        alignItems:'center',
        top:-120
    },

    switch:{  
        margin: 1,
        width: 300,
        height: 60,
        color: 'white',
        textAlign: 'center',
        fontSize: 34
    },
    
    button: {
        backgroundColor: "white",
        padding: 18,
        width: "46%",
        height: 60,
    },
    text: {
        fontSize: 18,
        color: "#548B4F",
        textAlign: "center",
        fontWeight:'bold'
    },

    container1: {
        flex: 1,
    },

    parent1: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        top: 450
        },
    }
);
export default Manager_home;
  
