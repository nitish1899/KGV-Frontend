import React, { useState } from 'react';
import { Button, View, Text, TouchableOpacity, TouchableWithoutFeedback, Modal} from 'react-native';
import { AntDesign, Feather, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import { TextInput } from 'react-native';
  
export default function MyPage() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [sortMenuVisible, setSortMenuVisible] = useState(false);

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

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };



  return (
    <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
        
      <View className="relative min-h-screen mt-[30px] ">
        {/* Header */}
        <View className="" style={{  flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height:60, paddingHorizontal: 30, }}>
          {/* Left Arrow */}
          <TouchableOpacity onPress={()=>{navigation.navigate('MarketplaceAfterBooking')}}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>

        
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
       
        <View className=" py-4 h-[88%] w-[100%] flex items-center">
        <View className="w-[95%]  mb-1 ">
        <View className="mx-auto flex-row">
        <View className="h-[30px] w-[30px] border-2 rounded-2xl mt-5"></View>
            <View>
            <Text className=" pl-4 pt-3 font-bold text-2xl">Driver</Text>
            <View className="flex-row">
            <View className="flex-column"><Text className=" text-lg font-bold pl-5">Quote Price: 123</Text>
            <Text className=" font-thin pl-3">4.5 | 1 hr 20 mins away</Text></View></View></View>
            </View>
            <View className="mx-auto">
            <Formik
     initialValues={{ bid: '' }}
     onSubmit={(values) => {navigation.navigate('MarketplaceAfterRebid') }}
   >
     {({ handleChange, handleBlur, handleSubmit, values }) => (
       <View className="mt-[60]">
        <Text className="text-2xl">Rebid :</Text>
         <TextInput className="m-[10%] bg-gray-200 text-black-200"
           onChangeText={handleChange('bid')}
           onBlur={handleBlur('bid')}
           value={values.bid}
           placeholder='Enter Bid'
           keyboardType="numeric"
         />
         
         <Button onPress={handleSubmit} title="Submit" />
       </View>
     )}
   </Formik>
   </View>
        </View>
       
       
        </View>
        

        {/* Footer */}
        <View className="mt-[30px] absolute bottom-0 w-full bg-black p-1" style={{  flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
          <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
            <AntDesign name="home" size={24} color="white" />
          </TouchableOpacity >
          <TouchableOpacity  style={{ backgroundColor: 'blue', borderRadius: 24, padding: 10 }}>
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