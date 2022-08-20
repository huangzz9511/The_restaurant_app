import React, { useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator,TextInput, Alert, SafeAreaView } from 'react-native';
import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Button} from 'react-native-paper';
import {db} from '../../database/firebase'

export default function CheckOut({navigation, route}){
  const email = route.params;

  const dataref = db.collection('Reservation').doc(email);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsIsLoading, setCartItemsIsLoading] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  // Fetch DEtails from firebase

  db.collection('Reservation').doc(email).collection('Food').get().then(DocumentSnapshot => {
    const a=[]
    if (!DocumentSnapshot.empty){
      DocumentSnapshot.forEach((DocumentSnapshot)=>{  
        a.push(DocumentSnapshot.data())
      });
      setCartItems(a);
    }     
    
  })

  //Check mark handler
  let selectHandler = (index, value) => {
    const newItems = [...cartItems]; // clone the array 
    newItems[index]['checked'] = value == 1 ? 0 : 1; // set the new value 
    setCartItems(newItems ); // set new state
    dataref.collection('Food').get().then(DocumentSnapshot => {
      
      DocumentSnapshot.forEach(doc =>{
        if (newItems[index]['id'] == doc.data().id) {
          doc.ref.update({checked: newItems[index]['checked']});
          
        }
      })})
  }
  
  let selectHandlerAll = (value) => {
    const newItems = [...cartItems]; // clone the array 
    newItems.map((item, index) => {
      newItems[index]['checked'] = value == true ? 0 : 1; // set the new value 
    });
    setCartItems(newItems);
    setSelectAll((value == true ? false : true));

    dataref.collection('Food').get().then(DocumentSnapshot => {
      
      DocumentSnapshot.forEach(doc =>{
        
          doc.ref.update({checked: !value});
          
        
      })})
  }

  const deleteHandler = (index) => {
    const newItems = [...cartItems];
    Alert.alert(
      'Are you sure you want to delete this item from your cart?',
      '',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Delete', onPress: () => {
          let updatedCart = cartItems; /* Clone it first */
          updatedCart.splice(index, 1); /* Remove item from the cloned cart state */
          setCartItems(updatedCart); /* Update the state */
          dataref.collection('Food').get().then(DocumentSnapshot => {
      
            DocumentSnapshot.forEach(doc =>{
              if (newItems[index]['id'] == doc.data().id) {
                doc.ref.delete();
                
              }
            })})
        }},
      ],
      { cancelable: false }
    );
    
  }
  
  const quantityHandler = (action, index) => {
    const newItems = [...cartItems]; // clone the array 
    
    let currentQty = newItems[index]['qty'];
    if(action == 'more'){
      newItems[index]['qty'] = currentQty + 1;
      
    
      dataref.collection('Food').get().then(DocumentSnapshot => {
      
      DocumentSnapshot.forEach(doc =>{
        if (newItems[index]['id'] == doc.data().id) {
          doc.ref.update({qty: newItems[index]['qty']});
          
        }
      })})

    } else if(action == 'less'){
      newItems[index]['qty'] = currentQty > 1 ? currentQty - 1 : 1;
      dataref.collection('Food').get().then(DocumentSnapshot => {
      
        DocumentSnapshot.forEach(doc =>{
          if (newItems[index]['id'] == doc.data().id) {
            doc.ref.update({qty: newItems[index]['qty']});
            
          }
        })})
    }
    
    setCartItems(newItems); // set new state
  }


  
  const subtotalPrice = () => {
    if(cartItems){
      return cartItems.reduce((sum, item) => sum + (item.checked == 1 ? item.qty * item.salePrice : 0), 0 );
    }
    return 0;
  }
  const handleCheckOut =() =>{
    db.collection('Reservation').doc(email).delete();
    Alert.alert('All set!')
    navigation.navigate('Manager_home')
  }

  return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#f6f6f6',marginTop:40}}>
        <Text style={styles.title}> Check Out </Text>

				<View style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 10}}>
					<View style={[styles.centerElement, {width: 50, height: 50}]}>
						<Ionicons name="ios-cart" size={25} color="#000" onPress={()=>navigation.goBack()}/>
					</View>
					<View style={[styles.centerElement, {height: 50}]}>
						<Text style={{fontSize: 18, color: '#000'}}>Shopping Cart</Text>
					</View>
				</View>
				
				
				{cartItemsIsLoading ? (
					<View style={[styles.centerElement, {height: 300}]}>
						<ActivityIndicator size="large" color="#ef5739" />
					</View>
				) : (
					<ScrollView>	
						{cartItems && cartItems.map((item, i) => (
							<View key={i} style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 100}}>
								<View style={[styles.centerElement, {width: 60}]}>
									<TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => selectHandler(i, item.checked)}>
										<Ionicons name={item.checked == 1 ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"} size={25} color={item.checked == 1 ? "#0faf9a" : "#aaaaaa"} />
									</TouchableOpacity>
								</View>
								<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
									{/*<TouchableOpacity  style={{paddingRight: 10}}>
										<Image source={{uri: item.thumbnailImage}} style={[styles.centerElement, {height: 60, width: 60, backgroundColor: '#eeeeee'}]} />
            </TouchableOpacity>*/}
									<View style={{flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
										<Text numberOfLines={1} style={{fontSize: 15}}>{item.name}</Text>
										
                    <Text numberOfLines={1} style={{color: '#333333', marginVertical: 5}}>${(item.qty * item.salePrice).toFixed(2)}</Text>
										<View style={{flexDirection: 'row'}}>
											<TouchableOpacity onPress={() => quantityHandler('less', i)} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
												<MaterialIcons name="remove" size={22} color="#cccccc" />
											</TouchableOpacity>
											<Text style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#cccccc', paddingHorizontal: 7, paddingTop: 3, color: '#bbbbbb', fontSize: 13 }}>{item.qty}</Text>
											<TouchableOpacity onPress={() => quantityHandler('more', i)} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
												<MaterialIcons name="add" size={22} color="#cccccc" />
											</TouchableOpacity>
										</View>
									</View>
									
								</View>
								<View style={[styles.centerElement, {width: 60}]}>
									<TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => deleteHandler(i)}>
										<Ionicons name="md-trash" size={25} color="#ee4d2d" />
									</TouchableOpacity>
									
								</View>
							</View>
							
						))}
					</ScrollView>
				)}
				
				{!cartItemsIsLoading &&
					<View style={{backgroundColor: '#fff', borderTopWidth: 2, borderColor: '#f6f6f6', paddingVertical: 5, paddingBottom:30}}>
						<View style={{flexDirection: 'row'}}>
							<View style={[styles.centerElement, {width: 60}]}>
								<View style={[styles.centerElement, {width: 32, height: 32}]}>
									<MaterialCommunityIcons name="ticket" size={25} color="#f0ac12" />
								</View>
							</View>
							<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'space-between', alignItems: 'center'}}>
								<Text>Voucher</Text>
								<View style={{paddingRight: 20}}>
									<TextInput 
										style={{paddingHorizontal: 10, backgroundColor: '#f0f0f0', height: 25, borderRadius: 4}} 
										placeholder="Enter voucher code" 
										value={''}
										onChangeText={(searchKeyword) => {
											
										} }
									/> 
								</View>
							</View>
						</View>
						<View style={{flexDirection: 'row'}}>
							<View style={[styles.centerElement, {width: 60}]}>
								<TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => selectHandlerAll(selectAll)}>
									<Ionicons name={selectAll == true ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"} size={25} color={selectAll == true ? "#0faf9a" : "#aaaaaa"} />
								</TouchableOpacity>
							</View>
							<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'space-between', alignItems: 'center'}}>
								<Text>Select All</Text>
								<View style={{flexDirection: 'row', paddingRight: 20, alignItems: 'center'}}>
									<Text style={{color: '#8f8f8f'}}>SubTotal: </Text>
									<Text>${subtotalPrice().toFixed(2)}</Text>
								</View>
							</View>
						</View>
            <Button style={styles.button} 
              mode="contained"
              color="#0faf9a" 
              onPress={ handleCheckOut }>
              <Text style={{fontSize: 18}}>Check Out</Text>
            </Button>
					</View>
				}
			</SafeAreaView>
  );
}


const styles = StyleSheet.create({
  title:{
    color:'#0faf9a',
    fontWeight:'bold',
    fontSize: 30,
    marginBottom: 10,
    alignSelf: 'center',
  },
  button: {
    width:'60%', 
    height: 40, 
    marginTop:10, 
    justifyContent:'center',
    alignSelf: 'center',
  },
  centerElement: {
    justifyContent: 'center', 
    alignItems: 'center'
  },
});