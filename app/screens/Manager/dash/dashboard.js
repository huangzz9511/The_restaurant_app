import { SafeAreaView, ScrollView, Text, View,Image, Pressable, TouchableHighlight, Dimensions,FlatList  } from 'react-native'
import React, { useEffect } from 'react'
import { VictoryBar, VictoryChart, VictoryTheme, VictoryCustomTheme, VictoryLine, VictoryScatter, VictoryAxis} from "victory-native";
import order from './order';






function Dashboard ({navigation}){
    
    const chartData= [
        { x: 1, y: 2 },
        { x: 1.5, y: 2.3 },
        { x: 2, y: 2 },
        { x: 2.5, y: 2.2 },
        { x: 3, y: 1.5 },
        { x: 3.5, y: 2.1 },
        { x: 4, y: 2.5 }
    ]

    // Horizontal List View

    const List = () =>{
        return (

        <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingVertical: 30,alignItems: 'center',}}>
            
            <View style={{paddingHorizontal:5}} >
                <TouchableHighlight onPress={()=>navigation.navigate('Sales')} underlayColor={'white'}  >
            <View style={{height:70,width:70,borderRadius:60,borderWidth:1,borderColor:'blue', justifyContent:'center',marginBottom:5}} >     
                    <Image style={{height:35,width:35,alignSelf:'center'}} source={require('../../../assets/data/bar-chart.png')}  /> 
                                   
                     </View>
                     </TouchableHighlight>
                <Text style={{alignSelf:'center',color:'blue'}} >Analytics</Text>
            </View>
            <View style={{paddingHorizontal:5}}>
            <View style={{height:70,width:70,borderRadius:60,borderWidth:1,borderColor:'orange', justifyContent:'center',marginBottom:5}} >               
                    <Image style={{height:35,width:35,alignSelf:'center'}} source={require('../../../assets/data/people.png')} />                
            </View>
                <Text style={{alignSelf:'center',color:'orange'}} >Customers</Text>
            </View>
            <View style={{paddingHorizontal:5}}>
            <View style={{height:70,width:70,borderRadius:60,borderWidth:1,borderColor:'pink', justifyContent:'center',marginBottom:5}} >               
                    <Image style={{height:35,width:35,alignSelf:'center'}} source={require('../../../assets/data/note.png')} />                
            </View>
                <Text style={{alignSelf:'center',color:'pink'}} >Orders</Text>
            </View>
            <View style={{paddingHorizontal:5}}>
            <View style={{height:70,width:70,borderRadius:60,borderWidth:1,borderColor:'lightgreen', justifyContent:'center',marginBottom:5}} >               
                    <Image style={{height:35,width:35,alignSelf:'center'}} source={require('../../../assets/data/sales.png')} />                
            </View>
                <Text style={{alignSelf:'center',color:'lightgreen'}} >Tasks</Text>
            </View>
            <View style={{paddingHorizontal:5}}>
            <View style={{height:70,width:70,borderRadius:60,borderWidth:1,borderColor:'yellowgreen', justifyContent:'center',marginBottom:5}} >               
                    <Image style={{height:35,width:35,alignSelf:'center'}} source={require('../../../assets/data/bar-chart.png')} />                
            </View>
                <Text style={{alignSelf:'center',color:'yellowgreen'}} >Sales</Text>
            </View>

            

        </ScrollView>
    )}


    // Revenue look

    const Card = () =>{

        return(
            <View style={{flexDirection:'row', justifyContent:'space-around'}} >
            <View 
                style={{height:90, width:110, borderColor:'blue',borderWidth:1, borderRadius:10, justifyContent:'center'}} >
                    <Text style={{color:'gray',alignSelf:'center',fontSize:12,paddingVertical:3}} >TOTAL</Text>
                    <Text style={{color:'gray',alignSelf:'center',fontSize:12,paddingVertical:3}} >REVENUE</Text>
                    <Text style={{color:'lightblue',alignSelf:'center', fontSize:18,paddingVertical:3}} >$32,575</Text>
            </View>
            <View 
                style={{height:90, width:110, borderColor:'blue',borderWidth:1, borderRadius:10, justifyContent:'center'}} >
                    <Text style={{color:'gray',alignSelf:'center',fontSize:12,paddingVertical:3}} >TOTAL</Text>
                    <Text style={{color:'gray',alignSelf:'center',fontSize:12,paddingVertical:3}} >PROFIT</Text>
                    <Text style={{color:'lightblue',alignSelf:'center', fontSize:18,paddingVertical:3}} >$20,580</Text>
            </View>
            <View 
                style={{height:90, width:110, borderColor:'blue',borderWidth:1, borderRadius:10, justifyContent:'center'}} >
                    <Text style={{color:'gray',alignSelf:'center',fontSize:12,paddingVertical:3}} >TOTAL</Text>
                    <Text style={{color:'gray',alignSelf:'center',fontSize:12,paddingVertical:3}} >VIEWS</Text>
                    <Text style={{color:'lightblue',alignSelf:'center', fontSize:18,paddingVertical:3}} >17,100</Text>
            </View>
            </View>
        )
    } 




    return (

        

        <SafeAreaView style={{marginHorizontal:10,marginVertical:20}} >
            
            <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{alignSelf:'center', marginTop:20,}}>
        <Text style={{fontSize:20}}>Dashboard</Text>
      </View>
      <List />
      
      <View>
        <Text style={{fontSize:18}} >Overview</Text>
      </View>

        {/* Chart */}

      <View >
        <VictoryChart theme={VictoryCustomTheme}
            height={220}
            width={380}
            >
            <VictoryLine 
                style={{
                    data:{
                        stroke:'black'
                    },
                    
                }}
                interpolation="natural"
                data={chartData}
                categories={{
                    x: ['Jan','Feb','Mar','Apr','May'],
                    y:['15','30','45']
                }} />

                <VictoryScatter 
                    data={chartData}
                    size={5}
                    style={{
                        data:{
                            fill: 'blue',
                            
                        }
                    }} />

                <VictoryAxis
                style={{
                    grid:{
                        stroke:'transparent'
                    }
                }} />
                <VictoryAxis
                dependentAxis
                style={{
                    axis:{
                        stroke:'transparent'
                    },
                    grid:{
                        stroke:'gray',
                        strokeDasharray: "4, 8",
                        strokeWidth: 0.6
                    }
                }} />
        </VictoryChart>
      </View>
    
    <Card />

    {/* Order View */}
            
            
    <View style={{marginVertical:20}}>

        <Text style={{fontSize:18}} > Recent Orders</Text>

        {order.map((order, index)=>
        <View style={{flexDirection:'row', marginTop:20, justifyContent:'space-between'}}>

        <View style={{height:50, width:50,borderRadius:40, borderColor:'gray',borderWidth:1,}} >
            <Image style={{height:50,width:50,borderRadius:40}} source={order.image}/>
        </View>
        <View style={{paddingHorizontal:20,justifyContent:'flex-start', flex:1,alignSelf:'center'}}>
        <Text style={{color:'black',paddingBottom:2}}>
            {order.name} 
        </Text>
        <Text style={{fontSize:12,color:'gray'}}>{order.table}</Text>
        </View>

        <View style={{marginHorizontal:20,alignSelf:'center'}}>
            <Text >${order.price}</Text>
        </View>
        
        

    </View>)}
    
      
     
      
                
    </View>
    </ScrollView>
      </SafeAreaView>
      
      
    )
  
}




export default Dashboard;