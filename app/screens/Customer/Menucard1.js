import React from 'react'
import { Text, View, SafeAreaView,StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, FlatList, Dimensions, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {foods,menu, categories} from '../Menu/food';


const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

function Menucard({navigation}) {

  const [selectedCategoryIndex, setselectedCategoryIndex] = React.useState(null);
  const [selectedMenu, setSelectedMenu] = React.useState(foods);
  const [Search, setSearch] = React.useState(true)
  const [Filter, setFilter] = React.useState(foods)
  //React.useEffect(()=>{
   // handleChangeCategory(selectedCategoryIndex, selectedMenutype)
  //}, [])


  // helper function for search
  const onSearch = (text) =>{
    const tempList = foods.filter(item=>{
      const itemData = item.name ? item.name.toUpperCase(): ''.toUpperCase()
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    } )
    setFilter(tempList)
    
  }

  // Helper function for catagories

  function mapfood (){
    //setSelectedMenuType=foods.categories.filter(a => a.id.includes(id))

  }
  
  function OnSelectCategory (category){
    let menulist = foods.filter(a=>a.categories.includes(category.id))

    setSelectedMenu(menulist)
    setselectedCategoryIndex(category)
    if(!selectedCategoryIndex){
      return foods
    } return foods.filter((item)=> item.categories === selectedCategoryIndex)
    

  }

  function getCategorynamebyId (id){
    let category = categories.filter(a=>a.id == id)

    if(category.length > 0){
      return category[0].name}

    return ""
  }


  function ListCategories (){

    const renderItem = ({ item }) => {
      return (
          <TouchableOpacity
              style={{
                  padding: 12,
                  paddingBottom: 12 * 2,
                  backgroundColor: (selectedCategoryIndex?.id == item.id) ? 'orange' : 'white',
                  borderRadius: 24,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                  ...style.shadow
              }}
              onPress={() => OnSelectCategory(item)}
          >
              <View
                  style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: (selectedCategoryIndex?.id == item.id) ? 'white' : 'lightGray'
                  }}
              >
                  <Image
                      source={item.image}
                      resizeMode="contain"
                      style={{
                          width: 30,
                          height: 30
                      }}
                  />
              </View>

              <Text
                  style={{
                      marginTop: 12,
                      color: (selectedCategoryIndex?.id == item.id) ? 'white' : 'black',
                      fontSize:15,
                       fontWeight: 'bold'
                  }}
              >
                  {item.name}
              </Text>
          </TouchableOpacity>
      )
  }
    return(
      <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: 12 * 2 }}
                />
    )
    
    }

    const Card = ({food}) => {
      
      return(
        <TouchableHighlight 
        underlayColor={'white'} 
        activeOpacity={0.9} 
        onPress={()=> navigation.navigate('detailsScreen', food)}
        >

        <View style ={style.card}>
          <View style={{alignItems: 'center', top :-40}}>
            <Image source={food.image} style ={{height: 120, width: 120}} />
          </View>

          {food.categories.map((categoryId) => {
                return(
                  <View style={{flexDirection:'row', alignSelf: 'center', marginTop:-30, paddingVertical:10}}
                  key={categoryId}>
                    <Text > {getCategorynamebyId(categoryId)} </Text>
                    </View>
                )
              })}

          <View style ={{marginHorizontal : 10}}>
            <Text style={{fontSize:18, fontWeight: 'bold', textAlign: 'center',}}> {food.name}</Text>
            <Text style={{fontSize:14, color: 'gray', marginTop: 2, textAlign: 'center'}}> {food.ingredients}</Text>
          </View>



          <View style={{marginTop:10,
             marginHorizontal:20,
             flexDirection: 'row',
             justifyContent: 'space-between',
              }}> 


              <Text style={{fontSize: 18, fontWeight: 'bold'}}> ${food.price}</Text>
              
              <View style={style.addtobtn}>
                <Icon name='add' size={20} color='white'/>
              </View>

          </View>

        </View>

      </TouchableHighlight>

      );
    }


    //function handleChangeCategory(categoryId, menuTypeId){

      //find the menu based on the menuTypeId
      //let selectedMenu = menu.find(a => a.id == menuTypeId)


      //set the menu based on categoryId
      //setMenuList(selectedMenu?.list.filter(a=> a.categories.includs(categoryId)))

    //}


    
    return (

      <SafeAreaView style={{flex:1,backgroundColor: 'white'}}>

      <View style={style.header}>
        <View>
          <View>
            <Text style={{flexDirection: 'row'}} >
              <Text style={{fontSize: 28}}>Hello, </Text>
              <Text style={{fontSize: 28, fontWeight: 'bold', marginLeft: 10}}>
                Jenish 
                </Text>

            </Text>
          </View>

          <Text 
          style={{marginTop: 5, 
          fontSize: 22, 
          color: '#FEDAC5'
          }}>
            Help yourself for select order
          </Text>


        </View>

        <Image 
        source={require('../../assets/profile.png'
        )} 
        style={{height:50, width: 50, borderRadius: 25}}

        />
      </View>
 
      <View style={{
        marginTop:40,
        flexDirection: 'row',
        paddingHorizontal: 20,
      }}>


        <View style={style.inputcontainer}>

          <Icon name='search' size={28} />

          <TextInput 
          style={{flex:1, fontSize:18, color:'gray'}}
          placeholder='Search foods...'
          onChangeText={(text)=>onSearch(text)}
          />

        </View>

        <View style={style.sortBtn}>

          <Icon name='tune' size={28} color='#FEDAC5' />

        </View>

      </View>

      <View>

    {ListCategories()}

      </View>
      { Search &&
      <FlatList 
      keyExtractor={item => `${item.id}`}
      showsVerticalScrollIndicator ={false}
      numColumns={2}
      data={Filter}
      renderItem={({item}) => <Card food={item} />}
      />
      }

      

    </SafeAreaView>
    )
  }


  const style=StyleSheet.create({
    header:{
      marginTop:20,
      flexDirection:'row',
      justifyContent:'space-between',
      paddingHorizontal:20,
   },
   inputcontainer:{
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    paddingHorizontal: 20,

   },

   sortBtn:{
    width:50,
    height: 50,
    marginLeft: 10,
    backgroundColor: 'orange',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
   },
   catagoriesListContainer:{
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20
,
   },
   categorryBtn:{
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
    

   },
   container: {
    flex: 1,
    backgroundColor:'lightGray'
},
shadow: {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
},

   categorryBtnImgCon:{
    height: 35,
    width: 35,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignContent: 'center',
   },

   card:{
    height:220,
    width:cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: 'white',
    shadowColor: '#ededed',
    shadowRadius: 10,
    shadowOpacity: 3,
    borderWidth:1,
    borderColor: '#f5f5f5',
    alignContent: 'flex-end'
    
    
    

   },
   addtobtn:{
    height: 30,
    width: 30,
    borderRadius: 30,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',

   }
  });


export default Menucard;



