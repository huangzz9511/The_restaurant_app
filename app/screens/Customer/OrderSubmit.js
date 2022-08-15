import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { PrimaryButton } from '../../components/Button'
import {db} from '../../database/firebase'
import { getAuth } from "firebase/auth";


export default function OrderSubmit({navigation, route}) {
  const [ udata, setudata] = useState('')
  const item = route.params
  const auth = getAuth();
  const user = auth.currentUser;
  
  
 
  
  React.useEffect(()=>{
  
    db 
    .collection('Reservation').doc(user.email).get().then(DocumentSnapshot => {
      if (DocumentSnapshot.exists){
        const udata = DocumentSnapshot.data()
        return setudata(udata)
      }
      
    })},[])
  
  
  
  
  
  //if(!doc.exists){console.log('No such data')}
  //else{console.log(doc)}
  

  return (
    <SafeAreaView style={{ backgroundColor:'white',
    position: 'absolute', 
    top: 0, left: 0, 
    right: 0, bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'}}>

      <View >

        <Image source={require('../../assets/table_res.gif')} style={{height:280,width:280}}/>

        <Text style={{alignSelf:'center', color:'#FF4655', fontSize:22}}>Your Table has been Reserved</Text>
        </View>

        <View style={{marginTop:40, flexDirection:'row',justifyContent:'space-between'}}>
            
            <Image style={{height:30, width:30, }} source={require('../../assets/order/clock.png')}/>
            
        <Text style={{alignSelf:'center', color:'#FF4655', fontSize:18, marginLeft:20}}>{udata.Date}</Text>
        </View>

        <View style={{marginTop:40, flexDirection:'row',justifyContent:'space-between'}}>
            
            <Image style={{height:30, width:30, }} source={require('../../assets/order/dining-table.png')}/>
            
        <Text style={{alignSelf:'center', color:'#FF4655', fontSize:18, marginLeft:20}}>{udata.Table_Type}</Text>
        </View>

        <View style={{marginTop:40, flexDirection:'row',justifyContent:'space-between'}}>
            
            <Image style={{height:30, width:30, }} source={require('../../assets/data/people.png')}/>
            
        <Text style={{alignSelf:'center', color:'#FF4655', fontSize:18, marginLeft:20}}>{udata.Number_of_People}</Text>
        </View>

        
      
      <View style={{ marginTop:40}} >
      <PrimaryButton title={'Continue'}  btnContainer={{height:60,width:200, borderRadius: 20,backgroundColor:'#FF4600'}} onPress={()=>navigation.replace('Conf_res')} /></View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})