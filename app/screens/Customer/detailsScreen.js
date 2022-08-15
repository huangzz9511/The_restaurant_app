import { Text, View, SafeAreaView, StyleSheet,  Image, ScrollView,Alert } from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {SecondButton} from '../../components/Button'
import {db} from '../../database/firebase'
import { getAuth } from "firebase/auth";
import Icona from 'react-native-vector-icons/MaterialCommunityIcons';

import { foods } from '../Menu/food'

const DetailsScreen = ({navigation, route})=>{
    const [count, setCount] = useState(0);
    const item = route.params;
    const auth = getAuth();
    const user = auth.currentUser;

    const handlebook =()=> {

        const dataref =db
        .collection('Reservation')
        .doc(user.email)

        dataref.collection('Food')
    
        .add({
            
            
            name_of_dish :  item.name ,
            number_of_dish : count,
        
          
        })
        

        navigation.navigate('CartScreen', {name: item.name, price: item.price, image: item.image, count: count})

            console.log(item.name,count,item.price)
      }

    return(
    <SafeAreaView style={{backgroundColor: 'white'}}>

        <View style={style.header} >

            <Icon name ='arrow-back-ios' size={28} onPress={navigation.goBack}/>
            <Text style={{fontSize: 20, fontWeight: 'bold' }} onPress={navigation.goBack}>Details</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator ={false}>
            <View 
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 280,

            }}>
                <Image source={item.image} style={{height: 220, width: 220,borderRadius:30 }}/>
            </View>
            <View style={style.details}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                    <Text style={{fontSize: 25, fontWeight: 'bold', color: 'white' }}>{item.name}</Text>
                    <View style={style.iconContaioner}> 
                    <Icon name='favorite-border' color={'orange'} size={25} />
                    </View>
                    </View>
                    <Text style={style.detailsText}>
                        {item.details}
                    </Text>
                    <View style={{marginHorizontal: 10, marginVertical:20, paddingVertical: -20, flexDirection: 'row', justifyContent:'space-between'}}  >

                    <Text style={{fontWeight: 'bold', color: 'white'}} > Number </Text>
                    <View style={{alignSelf:'baseline'}}>
                    <Icona name='minus-circle-outline' size={18} color='white'  onPress={()=> {setCount(count-1)}}/>
                    </View>
                    <Text style={{color: 'white'}} >{count}</Text>
                    <View > 
                    <Icona name='plus-circle-outline' size={18} color='white' onPress={()=> {setCount(count+1)}}/>

                    </View>
                 </View>
                    <View style={{marginTop: 80, marginBottom: 40 }}>
                        <SecondButton title='Pre-Order'
                        btnContainer={{
                            height:50,
                            width:250,
                            alignSelf:'center',
                            
                        }} onPress={handlebook}/>
                    </View>
                </View>
           
        </ScrollView>

    </SafeAreaView>
)}


const style = StyleSheet.create({ 
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal : 20
    },
    details: {
        paddingHorizontal: 20,
        paddingBottom: 60,
        paddingTop: 40,
        backgroundColor: 'orange',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,

    },

    iconContaioner: {
        backgroundColor: 'white',
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,

    },
    detailsText:{
        marginTop:10,
        lineHeight: 22,
        fontSize:16,
        color: 'white',
        
    }
})

export default DetailsScreen;