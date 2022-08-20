import { View, Text, ScrollView, FlatList,StyleSheet,StatusBar } from 'react-native'
import React,{useState,useEffect} from 'react'

import { db } from '../../../database/firebase';
import { getAuth } from 'firebase/auth';













export default function Orderpage() {
    const auth = getAuth();
    const user = auth.currentUser;
    const [data, setdata]=useState()
      useEffect(()=>{
        const a =[]
        db.collection('Reservation').get().then(Doc=>{
          Doc.forEach((Doc)=>{
            a.push(Doc.data())
          })
          setdata(a)
        })


    
      },[]);
      
      const Item = ({ title, subtitle }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      );
      const renderItem = ({ item }) => (
          <Item title={item.Name} subtitle={'Table: '+item.Table_Type+'\nCount:'+ item.Number_of_People}  />
      );
      
  return (
    <ScrollView style={{paddingHorizontal:15, paddingVertical:40}}>
        {/* Order View */}
            
            
    <View style={{marginVertical:20}}>

<Text style={{fontSize:18}} > Recent Orders</Text>

<FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      backgroundColor: "white",
    },
  
    item: {
      backgroundColor: '#ffdca3',
      padding: 10,
      marginVertical: 5,
      marginHorizontal: 14,
      borderRadius: 15,
    },
    title: {
      fontSize: 22,
      fontWeight:"bold",
      //color:"white",
    },
    subtitle:{
      fontSize: 16,
      color:"black",
    }
  });