import React,{useState, setValue} from 'react';
import {View, Switch, SafeAreaView, StyleSheet,Button, Image, ImageBackground,Text, TextInput,TouchableOpacity} from 'react-native';
import {PrimaryButton} from '../../components/Button'

export default function Manager_home({navigation}) {
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

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
      <SafeAreaView style={styles.background}>
        <Image style={styles.logo} source={require('../../assets/table-management.png')} />
        <Text style={styles.check_in}> Checked-In </Text>
          <TouchableOpacity
              onPress={buttonClickedHandler}
              style={styles.roundButton1}>

              <Text style={styles.number}>08</Text>  
          </TouchableOpacity>
          
          <View style={styles.switchBotton}>
          <Text style={styles.onoff}>Slide to Turn On/Off Pre-check-In</Text>  
          <Switch
              trackColor={{ false: "#767577", true: "#767577" }}
              thumbColor={isEnabled ? "#0BF10B" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              activeText={'On'}
              inActiveText={'Off'}
              value={isEnabled}
            />
          </View>

          <View style={styles.container1}>
              <View style={styles.parent1}>
                  <PrimaryButton title='Menu'
                  btnContainer={{
                    height:40,
                    width:130,
                    right:40,
                    borderRadius:20
                  }} onPress={()=>navigation.navigate('Manger_menu')}
                  />
                  <PrimaryButton title='Report'
                  btnContainer={{
                    height:40,
                    width:130,
                    left:40,
                    borderRadius:20
                  }}/>
                  
            </View>
              
          </View>

      </SafeAreaView>
  
    );
}
  const styles = StyleSheet.create({
  background:{
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center'
  },

  logo:{
    height: 220,
    width: 400,        
    top: 80
  },

  check_in:{
    color: 'orange',
    
    top: 150,
    fontSize: 32,
    alignContent: 'center',
    alignItems: 'center',
    fontWeight:'bold',
    
  },

  roundButton1:{
      width: 150,
      height: 150,
      top: 180,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 100,
      backgroundColor: 'orange',
  },

  number:{
    
    
    color: 'black',
    textAlign: 'center',
    fontSize: 34
  },

  switchBotton: {
      flex: 2,
      alignItems: "center",
      justifyContent: "center",
      top:150
      
  },

  onoff:{
    margin: 1,
    width: 300,
    height: 60,
    color: 'grey',
    textAlign: 'center',
    fontSize: 12
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
      backgroundColor: "orange",
      padding: 18,
      width: "46%",
      height: 60,
      borderRadius:10
  },
  text: {
      fontSize: 18,
      color: "white",
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
      top: 80
    },
});