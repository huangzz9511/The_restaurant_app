import React, { useState, useEffect} from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { Button} from 'react-native-paper';

export default function CheckOut({navigation}){


    return (
      <SafeAreaView style={{flex:1,backgroundColor: 'orange'}}>
          
          <View style={styles.container}>
            <Text style={styles.title}> Check Out </Text>

            <Button style={styles.button} 
                mode="contained"
                color="white" 
                onPress={() => navigation.navigate('Manager_home')}>
                <Text style={{fontSize: 18}}>Done</Text>
            </Button>
          </View>

      </SafeAreaView>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  title:{
    color:'white',
    fontWeight:'bold',
    fontSize: 30,
    marginTop: 150,
    marginBottom: 50
  },
  button: {
    width:'60%', 
    height: 50, 
    marginTop:40, 
    justifyContent:'center'
  }
});