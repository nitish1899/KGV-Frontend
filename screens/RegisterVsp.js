import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, Text, TextInput, StyleSheet, View, Image, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Picker } from '@react-native-picker/picker';

export default ({ navigation }) => {
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const [formData, setFormData] = useState({
        phoneNumber: '',
        email: '',
        name: '',
        type: 'broker',
        address: '',
        city: '',
        state: '',
        pin: ''
    });

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async () => {
        console.log('Form Data:', formData);
        try {
            const response = await fetch('https://kgv-backend.onrender.com/api/v1/vsp/vspsignup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            console.log('Response:', result);

            if (response.ok) {
                Alert.alert('Success', 'Registration successful');
                navigation.navigate('Landing');
            } else {
                Alert.alert('Error', result.message || 'Registration failed');
            }
        } catch (error) {
            console.log('Error:', error); // Added log
            Alert.alert('Error', `Error: ${error}`);
        }
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <LinearGradient colors={['#06264D', "#FFF"]} style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, padding: 20 }}>
                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={styles.container}
                    scrollEnabled={true}
                    enableAutomaticScroll={true}
                    enableOnAndroid={true}
                    extraScrollHeight={100}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <Image
                        source={require("../assets/images/logo-removebg-preview 1.png")}
                        style={styles.logo}
                    />
                    <Text style={styles.registerText}>Register</Text>

                    <TextInput
                        placeholder='Phone Number'
                        style={styles.input}
                        placeholderTextColor="#000"
                        onChangeText={(text) => handleChange('phoneNumber', text)}
                        value={formData.phoneNumber}
                        keyboardType="phone-pad"
                    />
                    <TextInput
                        placeholder='Email'
                        style={styles.input}
                        placeholderTextColor="#000"
                        onChangeText={(text) => handleChange('email', text)}
                        value={formData.email}
                        keyboardType="email-address"
                    />
                    <TextInput
                        placeholder='Name'
                        style={styles.input}
                        placeholderTextColor="#000"
                        onChangeText={(text) => handleChange('name', text)}
                        value={formData.name}
                    />
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={formData.type}
                            style={styles.picker}
                            onValueChange={(itemValue) => handleChange('type', itemValue)}
                        >
                            <Picker.Item label="Owner" value="owner" />
                            <Picker.Item label="Broker" value="broker" />
                        </Picker>
                    </View>
                    <TextInput
                        placeholder='Address'
                        style={styles.input}
                        placeholderTextColor="#000"
                        onChangeText={(text) => handleChange('address', text)}
                        value={formData.address}
                    />
                    <View style={styles.rowContainer}>
                        <TextInput
                            placeholder='City'
                            style={[styles.input, styles.halfInput]}
                            placeholderTextColor="#000"
                            onChangeText={(text) => handleChange('city', text)}
                            value={formData.city}
                        />
                        <TextInput
                            placeholder='State'
                            style={[styles.input, styles.halfInput, styles.leftMargin]}
                            placeholderTextColor="#000"
                            onChangeText={(text) => handleChange('state', text)}
                            value={formData.state}
                        />
                    </View>
                    <TextInput
                        placeholder='Pincode'
                        style={styles.input}
                        placeholderTextColor="#000"
                        onChangeText={(text) => handleChange('pin', text)}
                        value={formData.pin}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleRegister}
                    >
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>

                {!keyboardVisible && (
                    <View style={styles.footer}>
                        <Image
                            source={require("../assets/images/mantra.jpg")}
                            style={styles.smallImage}
                        />
                        <View style={styles.footerTextContainer}>
                            <Text style={styles.footerText}>Made in</Text>
                            <Image
                                source={require("../assets/images/image 10.png")}
                                style={styles.smallImage}
                            />
                        </View>
                        <Image
                            source={require("../assets/images/make-in-India-logo.jpg")}
                            style={styles.largeImage}
                        />
                    </View>
                )}
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20
    },
    logo: {
        width: 201,
        height: 181,
        alignSelf: 'center',
        marginBottom: 20
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        padding: 10,
        width: '80%',
        marginVertical: 10,
        fontSize: 16
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        width: '80%',
        marginTop: 20
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    registerText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20
    },
    pickerContainer: {
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        width: '80%',
        marginVertical: 10
    },
    picker: {
        width: '100%'
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    },
    halfInput: {
        width: '45%'
    },
    leftMargin: {
        marginLeft: 10
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 20
    },
    smallImage: {
        width: 60,
        height: 60
    },
    footerTextContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    footerText: {
        color: '#000',
        paddingLeft: 2
    },
    largeImage: {
        width: 80,
        height: 80
    }
});


// import React, { useState, useEffect } from 'react';
// import { LinearGradient } from 'expo-linear-gradient';
// import { SafeAreaView, Text, TextInput, StyleSheet, View, Image, TouchableOpacity, Keyboard, Alert } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { Picker } from '@react-native-picker/picker';

// export default ({ navigation }) => {
//     const [keyboardVisible, setKeyboardVisible] = useState(false);

//     const [formData, setFormData] = useState({
//         phoneNumber: '',
//         email: '',
//         name: '',
//         type: 'broker',
//         address: '',
//         city: '',
//         state: '',
//         pin: ''
//     });

//     const handleChange = (name, value) => {
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleRegister = async () => {
//         console.log('Form Data:', formData);
//         try {
//             const response = await fetch('http://192.168.1.74:8005/api/v1/vsp/vspsignup', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });

//             const result = await response.json();

//             console.log('Response:', result);

//             if (response.ok) {
//                 Alert.alert('Success', 'Registration successful');
//                 navigation.navigate('Landing');
//             } else {
//                 Alert.alert('Error', result.message || 'Registration failed');
//             }
//         } catch (error) {
//             Alert.alert('Error', `Error: ${error}`);
//         }
//     };

//     useEffect(() => {
//         const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
//             setKeyboardVisible(true);
//         });
//         const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
//             setKeyboardVisible(false);
//         });

//         return () => {
//             keyboardDidShowListener.remove();
//             keyboardDidHideListener.remove();
//         };
//     }, []);

//     return (
//         <LinearGradient colors={['#06264D', "#FFF"]} style={{ flex: 1 }}>
//             <SafeAreaView style={{ flex: 1, padding: 20 }}>
//                 <KeyboardAwareScrollView
//                     resetScrollToCoords={{ x: 0, y: 0 }}
//                     contentContainerStyle={styles.container}
//                     scrollEnabled={true}
//                     enableAutomaticScroll={true}
//                     enableOnAndroid={true}
//                     extraScrollHeight={100}
//                     showsVerticalScrollIndicator={false}
//                     showsHorizontalScrollIndicator={false}
//                 >
//                     <Image
//                         source={require("../assets/images/logo-removebg-preview 1.png")}
//                         style={styles.logo}
//                     />
//                     <Text style={styles.registerText}>Register</Text>

//                     <TextInput
//                         placeholder='Phone Number'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         onChangeText={(text) => handleChange('phoneNumber', text)}
//                         value={formData.phoneNumber}
//                         keyboardType="phone-pad"
//                     />
//                     <TextInput
//                         placeholder='Email'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         onChangeText={(text) => handleChange('email', text)}
//                         value={formData.email}
//                         keyboardType="email-address"
//                     />
//                     <TextInput
//                         placeholder='Name'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         onChangeText={(text) => handleChange('name', text)}
//                         value={formData.name}
//                     />
//                     <View style={styles.pickerContainer}>
//                         <Picker
//                             selectedValue={formData.type}
//                             style={styles.picker}
//                             onValueChange={(itemValue) => handleChange('type', itemValue)}
//                         >
//                             <Picker.Item label="Owner" value="owner" />
//                             <Picker.Item label="Broker" value="broker" />
//                         </Picker>
//                     </View>
//                     <TextInput
//                         placeholder='Address'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         onChangeText={(text) => handleChange('address', text)}
//                         value={formData.address}
//                     />
//                     <View style={styles.rowContainer}>
//                         <TextInput
//                             placeholder='City'
//                             style={[styles.input, styles.halfInput]}
//                             placeholderTextColor="#000"
//                             onChangeText={(text) => handleChange('city', text)}
//                             value={formData.city}
//                         />
//                         <TextInput
//                             placeholder='State'
//                             style={[styles.input, styles.halfInput, styles.leftMargin]}
//                             placeholderTextColor="#000"
//                             onChangeText={(text) => handleChange('state', text)}
//                             value={formData.state}
//                         />
//                     </View>
//                     <TextInput
//                         placeholder='Pincode'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         onChangeText={(text) => handleChange('pin', text)}
//                         value={formData.pin}
//                         keyboardType="numeric"
//                     />
//                     <TouchableOpacity
//                         style={styles.button}
//                         onPress={handleRegister}
//                     >
//                         <Text style={styles.buttonText}>Register</Text>
//                     </TouchableOpacity>
//                 </KeyboardAwareScrollView>

//                 {!keyboardVisible && (
//                     <View style={styles.footer}>
//                         <Image
//                             source={require("../assets/images/mantra.jpg")}
//                             style={styles.smallImage}
//                         />
//                         <View style={styles.footerTextContainer}>
//                             <Text style={styles.footerText}>Made in</Text>
//                             <Image
//                                 source={require("../assets/images/image 10.png")}
//                                 style={styles.smallImage}
//                             />
//                         </View>
//                         <Image
//                             source={require("../assets/images/make-in-India-logo.jpg")}
//                             style={styles.largeImage}
//                         />
//                     </View>
//                 )}
//             </SafeAreaView>
//         </LinearGradient>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingBottom: 20
//     },
//     logo: {
//         width: 201,
//         height: 181,
//         alignSelf: 'center',
//         marginBottom: 20
//     },
//     input: {
//         borderBottomWidth: 2,
//         borderBottomColor: 'black',
//         padding: 10,
//         width: '80%',
//         marginVertical: 10,
//         fontSize: 16
//     },
//     button: {
//         backgroundColor: '#007BFF',
//         padding: 15,
//         borderRadius: 50,
//         alignItems: 'center',
//         width: '80%',
//         marginTop: 20
//     },
//     buttonText: {
//         color: '#FFF',
//         fontSize: 16,
//         fontWeight: 'bold'
//     },
//     registerText: {
//         fontSize: 32,
//         fontWeight: 'bold',
//         color: '#000',
//         marginBottom: 20
//     },
//     pickerContainer: {
//         borderBottomWidth: 2,
//         borderBottomColor: 'black',
//         width: '80%',
//         marginVertical: 10
//     },
//     picker: {
//         width: '100%'
//     },
//     rowContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '80%'
//     },
//     halfInput: {
//         width: '45%'
//     },
//     leftMargin: {
//         marginLeft: 10
//     },
//     footer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//         marginTop: 20
//     },
//     smallImage: {
//         width: 60,
//         height: 60
//     },
//     footerTextContainer: {
//         flexDirection: 'row',
//         alignItems: 'center'
//     },
//     footerText: {
//         color: '#000',
//         paddingLeft: 2
//     },
//     largeImage: {
//         width: 80,
//         height: 80
//     }
// });


// import React, { useState, useEffect } from 'react';
// import { LinearGradient } from 'expo-linear-gradient';
// import { SafeAreaView, Text, TextInput, StyleSheet, View, Image, TouchableOpacity, Keyboard } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { Picker } from '@react-native-picker/picker';
// export default ({ navigation }) => {
//     const [keyboardVisible, setKeyboardVisible] = useState(false);

//     const [formData, setFormData] = useState({
//         phoneNumber: '',
//         email: '',
//         name:'',
//         type: 'owner',
//         address: '',
//         city: '',
//         state: '',
//         pin:''
//     });

//     const handleChange = (name, value) => {
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleRegister = async () => {
//         try {
//             const response = await fetch('http://192.168.1.74:8005/api/v1/vsp/vspsignup', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 Alert.alert('Success', 'Registration successful');
//                 navigation.navigate('Landing');
//             } else {
//                 Alert.alert('Error', result.message || 'Registration failed');
//             }
//         } catch (error) {
//             Alert.alert('Error', `error : ${error}`);
//         }
//     };

//     useEffect(() => {
//         const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
//             setKeyboardVisible(true);
//         });
//         const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
//             setKeyboardVisible(false);
//         });

//         return () => {
//             keyboardDidShowListener.remove();
//             keyboardDidHideListener.remove();
//         };
//     }, []);

//     return (
//         <LinearGradient colors={['#06264D', "#FFF"]} style={{ flex: 1 }} >
//             <SafeAreaView style={{ flex: 1, padding: 40 }} >
//                 <KeyboardAwareScrollView
//                     resetScrollToCoords={{ x: 0, y: 0 }}
//                     contentContainerStyle={styles.container}
//                     scrollEnabled={true}
//                     enableAutomaticScroll={true}
//                     enableOnAndroid={true}
//                     extraScrollHeight={100}
//                     showsVerticalScrollIndicator={false}
//                     showsHorizontalScrollIndicator={false}
//                 >
//                     <Image
//                         source={require("../assets/images/logo-removebg-preview 1.png")}
//                         style={styles.logo}
//                     />
//                      <Text style={styles.registerText}>Register</Text>
                    
//                      <TextInput
//                         placeholder='Phone Number'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         onChangeText={(text) => handleChange('phoneNumber', text)}
//                         value={formData.phoneNumber}
//                     />
//                      <TextInput
//                         placeholder='Email'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         onChangeText={(text) => handleChange('email', text)}
//                         value={formData.email}
//                     />
//                      <View style={styles.pickerContainer}>
//                         <Picker
//                             selectedValue={formData.type}
//                             style={styles.picker}
//                             onValueChange={(itemValue) => handleChange('type', itemValue)}
//                         >
//                             <Picker.Item label="Owner" value="owner" />
//                             <Picker.Item label="Broker" value="broker" />
//                         </Picker>
//                     </View>
//                     <TextInput 
//                     placeholder='Name' 
//                     style={styles.input} 
//                     placeholderTextColor="#000"
//                     onChangeText={(text) => handleChange('name', text)}
//                     value={formData.name}
//                      />
                    
//                     <TextInput 
//                     placeholder='Address' 
//                     style={styles.input} 
//                     placeholderTextColor="#000"
//                     onChangeText={(text) => handleChange('address', text)}
//                     value={formData.address} 
//                     />
//                     <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
//                       <TextInput placeholder='City' style={[styles.input, {width: 70}]} placeholderTextColor="#000" onChangeText={(text) => handleChange('city', text)} value={formData.city}  />
//                          <TextInput placeholder='State' style={[styles.input, {width: 150, marginLeft: 50}]} placeholderTextColor="#000" onChangeText={(text) => handleChange('state', text)} value={formData.state}  />
//                     </View>
//                     <TextInput 
//                     placeholder='Pincode' 
//                     style={styles.input} 
//                     placeholderTextColor="#000" 
//                     onChangeText={(text) => handleChange('pin', text)}
//                     value={formData.pin} />
//                     <TouchableOpacity 
//                         style={styles.button} 
//                         onPress={handleRegister}
//                     >
//                         <Text style={styles.buttonText}>Register</Text>
//                     </TouchableOpacity>
//                 </KeyboardAwareScrollView>
                
//                 {!keyboardVisible && (
//                     <View className="flex-row items-center justify-around gap-16 ">
//                         <Image
//                             source={require("../assets/images/mantra.jpg")}
//                             className="w-[60px] h-[60px]"
//                         />
//                         <View className="flex-row items-center">
//                             <Text className="text-black pl-2">Made in</Text>
//                             <Image
//                                 source={require("../assets/images/image 10.png")}
//                                 className="w-10 h-5"
//                             />
//                         </View>
//                         <Image
//                             source={require("../assets/images/make-in-India-logo.jpg")}
//                             className="w-20 h-12"
//                         />
//                     </View>
//                 )}
//             </SafeAreaView>
//         </LinearGradient>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     logo: {
//         width: 201,
//         height: 181,
//         alignSelf: 'center'
//     },
//     input: {
//         borderBottomWidth: 2,
//         borderBottomColor: 'black',
//         borderStyle: 'solid',
//         padding: 10,
//         width: '80%',
//         marginTop: 10
//     },
//     button: {
//         backgroundColor: '#007BFF',
//         padding: 15,
//         borderRadius: 50,
//         alignItems: 'center',
//         width: '100%',
//         marginTop: 90,
//     },
//     buttonText: {
//         color: '#FFF',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     registerText: {
//         fontSize: 32,
//         fontWeight: 'bold',
//         color: '#000',
    
//     },
//     pickerContainer: {
//         borderBottomWidth: 2,
//         borderBottomColor: 'black',
//         borderStyle: 'solid',
//         width: '80%',
//         marginTop: 10
//     },
//     picker: {
//         width: '100%',
//     },
// });