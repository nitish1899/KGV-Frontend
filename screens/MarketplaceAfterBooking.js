import React, { useState } from 'react';
import { Button, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, TextInput, Image,KeyboardAvoidingView, ScrollView, Modal } from 'react-native';
import { AntDesign, Feather, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

  
export default function MyPage() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [sortMenuVisible, setSortMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const navigation = useNavigation();

  const handleDocumentsClick = () => {
    // Navigate to the Documents page
    navigation.navigate('Documents');
  };

  const handleAccountTypeClick = () => {
    // Navigate to the Account Type page
    navigation.navigate('AccountType');
  };

  const handleDeleteAccountClick = () => {
    // Navigate to the Delete Account page
    navigation.navigate('DeleteAccount');
  };

  const handleLogoutClick = () => {
    // Navigate to the Logout page
    navigation.navigate('Logout');
  };

  const navigateBack = () => {
    // Add navigation logic to go back to the previous page
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigateToSettings = () => {
    // Add navigation logic to go to settings page
  };

  const navigateToHelp = () => {
    // Add navigation logic to go to help page
  };

  const navigateToAbout = () => {
    // Add navigation logic to go to about page
  };

  const navigateToLegal = () => {
    // Add navigation logic to go to legal page
  };


  return (
    <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
        
      <View className="relative min-h-screen mt-[30px] bg-blue-300">
        {/* Header */}
        <View className="bg-blue-300" style={{  flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height:60, paddingHorizontal: 30, }}>
          {/* Left Arrow */}
          <TouchableOpacity onPress={navigateBack}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>

        <Text className="mr-[110px] font-bold text-2xl">Current bid :</Text>  
      {/* {image && <Image source={{ uri: image }} style={styles.image} onPress={pickImage}/>} */}
      </View>
          {/* Right Menu */}
          <TouchableOpacity onPress={toggleMenu}>
            <Feather name="menu" size={24} color="black" />
          </TouchableOpacity>
        </View>

        

        {/* Menu Options */}
        {menuVisible && (
          <View style={{ position: 'absolute', top: 50, right: 20, backgroundColor: 'white', padding: 10, borderRadius: 5, elevation: 5, zIndex:2 }}>
            <TouchableOpacity onPress={()=>{navigation.navigate('Settings')}} style={{ marginBottom: 10 }}>
              <Text>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToHelp} style={{ marginBottom: 10 }}>
              <Text>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('About')}} style={{ marginBottom: 10 }}>
              <Text>About</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('Legal')}}>
              <Text>Legal</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity onPress={() => { setSortMenuVisible(!sortMenuVisible) }}>
        <View className="border-2 h-[30px] w-[110px] ml-[260px] flex-row "><Text className="font-bold mt-1 ml-2 ">Sort By</Text><View className="ml-2 mt-1 border-2 h-[20px] w-[30px] flex items-center"><MaterialCommunityIcons name="sort" size={17} color="black" /></View></View>
        </TouchableOpacity>
        {/* Menu Options */}
        {sortMenuVisible && (
          <View style={{ position: 'absolute', top: 90, right: 20, backgroundColor: 'white', padding: 10, borderRadius: 5, elevation: 5, zIndex:2 }}>
            <TouchableOpacity onPress={navigateToSettings} style={{ marginBottom: 10 }}>
              <Text>Distance</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToHelp} style={{ marginBottom: 10 }}>
              <Text>Price Lowest to Highest</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToAbout} style={{ marginBottom: 10 }}>
              <Text>About</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToLegal}>
              <Text>Legal</Text>
            </TouchableOpacity>
          </View>
        )}
        <View className=" py-4 h-[90%] w-[100%] flex items-center">
        <View className="w-[95%] bg-white h-[100px] mb-1">
            <Text className=" pl-4 pt-3 font-bold text-lg">Vechile Id</Text>
            <View className="flex-row"><Text className="pt-5 font-thin pl-3">4.5 | 1 hr 20 mins away| 30km</Text>
            <Text className=" pl-[80px] pt-3  text-lg">123</Text></View>
        </View>
        <View className="w-[95%] bg-white h-[100px] my-1">
            <Text className=" pl-4 pt-3 font-bold text-lg">Vechile Id</Text>
            <View className="flex-row"><Text className="pt-5 font-thin pl-3">4.5 | 1 hr 20 mins away| 30km</Text>
            <Text className=" pl-[80px] pt-3  text-lg">123</Text></View>
        </View>
        <View className="w-[95%] bg-white h-[100px] my-1">
            <Text className=" pl-4 pt-3 font-bold text-lg">Driver's Name</Text>
            <View className="flex-row"><Text className="pt-5 font-thin pl-3">4.5 | 1 hr 20 mins away| 30km</Text>
            <Text className=" pl-[80px] pt-3  text-lg">123</Text></View>
        </View>
        <View className="w-[95%] bg-white h-[100px] my-1">
            <Text className=" pl-4 pt-3 font-bold text-lg">Driver's Name</Text>
            <View className="flex-row"><Text className="pt-5 font-thin pl-3">4.5 | 1 hr 20 mins away| 30km</Text>
            <Text className=" pl-[80px] pt-3  text-lg">123</Text></View>
        </View>
        <View className="w-[95%] bg-white h-[100px] mt-1">
            <Text className=" pl-4 pt-3 font-bold text-lg">Driver's Name</Text>
            <View className="flex-row"><Text className="pt-5 font-thin pl-3">4.5 | 1 hr 20 mins away| 30km</Text>
            <Text className=" pl-[80px] pt-3  text-lg">123</Text></View>
        </View>
        <View className="w-[100%] bg-white h-[120px] rounded-2xl">
            <Text className=" pl-[80px]  text-lg">Choose to accept or Rebid</Text>
            <View className="flex-row">
                <TouchableOpacity onPress={openModal}><View className=" h-[40px] bg-gray-200 w-[100px] ml-[70px] mt-5 rounded-2xl border-2 border-blue-700"></View></TouchableOpacity>
                {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View className="" style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View className="h-[300px] flex-column" style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' }}>
          <View  className="ml-[250px]"><AntDesign name="close" size={24} color="black" onPress={closeModal}  /></View>
            <Text className="text-2xl ml-[80px]">Congrats</Text>
            <Text className=" mt-[40px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor .</Text>
            
          </View>
        </View>
      </Modal>

                <TouchableOpacity onPress={()=> navigation.navigate('RebidPrice')}><View className=" h-[40px] bg-gray-200  w-[100px] ml-11 mt-5 rounded-2xl border-2 border-red-700"></View></TouchableOpacity>
            </View>
        </View>
        </View>
        

        {/* Footer */}
        <View className="mt-[30px] absolute bottom-0 w-full bg-black p-1" style={{  flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
          <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
            <AntDesign name="home" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: 'blue', borderRadius: 24, padding: 10 }}>
            <Entypo name="shop" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate('Profile')}}>
            <AntDesign name="user" size={24} color="white" />
          </TouchableOpacity>
        </View>

      </View>
    </TouchableWithoutFeedback>
  );
}




