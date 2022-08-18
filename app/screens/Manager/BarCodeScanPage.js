import React, { useState, useEffect} from 'react';
import { Alert, Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function Scanner({navigation}){

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
  
    useEffect(() => {
      const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      };
  
      getBarCodeScannerPermissions();
      const unsubscribe = navigation.addListener('focus', () => {
        setScanned(false);
      });
      return unsubscribe;
    }, []);
  
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      Alert.alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    return (
      <SafeAreaView style={{flex:1,backgroundColor: 'orange'}}>
          
          <View style={styles.container}>
          <Text style={styles.title}> Scan QR Code </Text>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{height:300, width: 300}}
            />
            {scanned && navigation.navigate('OrderTakenPage') }
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
  }
});