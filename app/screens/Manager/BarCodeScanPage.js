import React, { useState, useEffect} from 'react';
import { Alert, Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function Scanner({navigation}){

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [order, setOrder] = useState(null);

    useEffect(() => {
      const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      };
  
      getBarCodeScannerPermissions();

      return navigation.addListener('focus', () => {
        setScanned(false);
      });
    }, [navigation]);
  
    var order_info;
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      setOrder(JSON.parse(data)[0]) //data is a stringfied array of order info
      
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
            {scanned && navigation.navigate('OrderTakenPage', order) }
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