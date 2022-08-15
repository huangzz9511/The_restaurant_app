import React,{useState, useEffect}from "react";
import {Alert, View,Image, Text, StyleSheet, SafeAreaView, TextInput, ScrollView, TouchableOpacity,Dimensions } from "react-native";
import {PrimaryButton} from "../../components/Button";
import Watch from '../Menu/Time';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {db} from '../../database/firebase'
import { getAuth } from "firebase/auth";
import Table from "../Menu/Table";
import firebase from "firebase/compat";
import { Manager_db } from '../../database/ManagerFirebase'


const ReservationDetails=({navigation, route})=>{


        const item = route.params;
        const [count, setCount] = useState(0);
        const [currentDate, setCurrentDate] = useState('');
        const [selectedCategoryIndex, setselectedCategoryIndex] = useState(0);
        const auth = getAuth();
        const user = auth.currentUser;
        useEffect(() => {
          var date = new Date().getDate(); //Current Date
          var month = new Date().getMonth() + 1; //Current Month
          var year = new Date().getFullYear(); //Current Year
          var hours = new Date().getHours(); //Current Hours
          var min = new Date().getMinutes(); //Current Minutes
          var sec = new Date().getSeconds(); //Current Seconds
          setCurrentDate(
            date + '/' + month + '/' + year 
            + ' ' + hours + ':' + min + ':' + sec
          );
        }, []);
        
        //    {Counter function}

          function Counter(){
            
            
              const addCountHandler = () => {
                if (count === parseInt(item.size))
                {return;}
                setCount(count + 1);
              };
              const removeCountHandler = () => {
                if(count === 0){
                  return;  
                }
                setCount(count - 1);
              };
            
              return (
                <View style={{marginHorizontal: 10, marginVertical:20, paddingVertical: -20, flexDirection: 'row', justifyContent:'space-between'}}  >
                <Text style={{fontWeight: 'bold'}} > Number Of Persons</Text>
                    <View style={{alignSelf:'baseline'}}>
                    <Icon name='minus-circle-outline' size={18}  onPress={removeCountHandler}/>
                    </View>
                    <Text >{count}</Text>
                    <View > 
                    <Icon name='plus-circle-outline' size={18}  onPress={addCountHandler}/>

                    </View>
                    </View>
              );
            };
            
          const handlebook =() =>{
            
            db
            .collection('Reservation')
            .doc(user.email)
            .set(
              {
                
                Date : currentDate,
                Table_Type: item.name,
                Number_of_People: count
                
            
              }
            
            )
            .then(()=> console.log('data added'))
            .catch((error)=>alert(error.message))
            
            //Manager_db
            //.collection('Reservation')
            //.add(
            //  {
            //    'Date' : firebase.firestore.Timestamp.now(),
            //    'Email' : user.email,
            //    'Table Type': item.name,
            //    'Number of People': count
            //  }
            //)
  
            navigation.navigate('OrderSubmit', Table)
          }
        
        const ListCategories =()=>{
          
        
      return(

        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.catagoriesListContainer}
        >

          {Watch.map((category,index)=>(

            <TouchableOpacity 
            key={index} 
            activeOpacity={0.8}
            onPress={()=> setselectedCategoryIndex(index)} 
            >

              <View style={{
                backgroundColor:selectedCategoryIndex == index 
                ? 'orange' 
                : '#FEDAC5',
                ...style.categorryBtn
                }}>

                  

                  <Text 
                    style={{fontSize:15,
                       fontWeight: 'bold',
                        marginLeft: 10,
                         color: selectedCategoryIndex == index
                          ? 'white' 
                          : 'orange'
                           }}>
                    {category.tme}
                  </Text>

                </View>

            </TouchableOpacity>
          ))}

        </ScrollView>
      )
    }





    const List =()=>{
                
        return(

                <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <View style={style.categorryBtnn}>
  
                    
  
                    <Text 
                      style={{fontSize:15,
                         fontWeight: 'bold',
                          marginLeft:10,
                           color:'white' 
                            
                             }}>
                      {item.desO}
                      
                    </Text>
                    </View>
                    <View style={style.categorryBtnn}>
  
                    
  
                    <Text 
                      style={{fontSize:15,
                         fontWeight: 'bold',
                          marginLeft: 8,
                           color:'white' 
                            
                             }}>
                      {item.desT}
                      
                    </Text>
                    </View>
                    <View style={style.categorryBtnn}>
  
                    
  
                    <Text 
                      style={{fontSize:15,
                         fontWeight: 'bold',
                          marginLeft:20,
                           color:'white' ,
                           
                            
                             }}>
                      {item.desS}
                      
                    </Text>
                    </View>
                  </View>
                  
  
              
            
  
          
        )
      }


    return(
        <ScrollView>
        <View 
        style={{flex:1,
            backgroundColor: 'white'}}
            >
                

                
                <View style={{height: 400, width:Dimensions.width,justifyContent: 'center', alignContent: 'center', }} >
                
                    <Image  source={item.image} 
                    style={{height: 270, width:400, borderBottomLeftRadius:25, borderBottomRightRadius:25, right:4}} />

                <View style ={{borderRadius: 15,
                bordercolor: 'white', 
                shadowColor: '#171717',
                shadowOffset: {width: -2, height: 4},
                shadowOpacity: 0.2,
                shadowRadius: 3,  
                height: 100, width: 320, 
                top : -20, backgroundColor: 'white', alignSelf:'center', }}> 


                <View style={{flexDirection: 'row' , justifyContent: 'space-between'}}>

                    <View style={{marginLeft:8,marginTop:8}} >

                        <Text style={{color: 'lightblue',fontSize:20,}}>{item.name}</Text>

                    </View>


                    <View style={{marginRight:5,marginTop:32}} >
                        <Text style={{fontSize:18, color: 'orange'}}> Available</Text>
                    </View>
                </View>

                <View style={{marginTop:5, alignSelf:'center', marginHorizontal: 10}}>
                    <List />
                </View>
                
                </View>                   
                </View>

                <View style={{marginHorizontal: 10, justifyContent: 'space-between', paddingHorizontal: 1, paddingVertical: 10, }}>
                <Text style={{fontSize:16, fontWeight:'bold',}}> Details</Text>
                <Text style={{fontSize:14, color: 'gray', alignSelf:'flex-start', paddingTop: 10}}> Seize the Momemt. Meet Spark,a mini drone that features all of DJI's signature technologies, allowing you to size the moment whenever you feel inspired </Text>
                 
                 </View>

                 

                    <Counter />
                 

                 

                 <View style={{marginHorizontal: 20, marginVertical:20, paddingVertical: 20}}>

                 <Text style={{fontWeight: 'bold'}} > AddComments</Text>

                 <TextInput style={{height:100, width:350,borderRadius: 15,
                 backgroundColor: 'white',borderColor:'white',  shadowColor: 'gray', shadowOffset: {height: 4, width:-2}, shadowOpacity: 0.2, shadowRadius: 3
                 
                 }} placeholder='Write Comments' />

                 </View>




                

                

               

                <View style={{paddingBottom:70}}>
            

                <PrimaryButton
                btnContainer={{
                  height:50,
                  borderRadius:50,
                  width:200,
                  alignSelf: 'center',
                  
                }}
                onPress={handlebook}
                    title='Book Now'/>
                </View>


        </View>
        </ScrollView >
    )


    


}

const style = StyleSheet.create({
categorryBtn:{
    height: 45,
    width: 100,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
    

   },
categorryBtnn:{
    height: 33,
    width: 80,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
    backgroundColor: 'lightblue'
    

   },

   categorryBtnImgCon:{
    height: 35,
    width: 35,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignContent: 'center',
   },
  
})






export default ReservationDetails;