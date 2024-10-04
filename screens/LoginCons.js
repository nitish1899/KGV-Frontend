
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, Text, TextInput, StyleSheet, View, Image, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

export default ({ navigation }) => {
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);

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

    const handleLogin = async () => {
        try {
            const requestData = isOtpSent ? { phoneNumber, otp } : { phoneNumber };

            // Send request to the same endpoint
            const response = await axios.get('https://kgv-backend.onrender.com/api/v1/consumer/login', requestData);

            if (response.status === 200) {

                if (!isOtpSent) {
                    setIsOtpSent(true);
                    Alert.alert('Success', 'OTP sent successfully');
                } else {
                    Alert.alert('Success', 'Login successful');
                    navigation.navigate('HomePreKyc');
                }
            } else {
                throw new Error('Operation failed');
            }
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <LinearGradient colors={['#06264D', "#FFF"]} style={{ flex: 1 }} >
            <SafeAreaView style={{ flex: 1, padding: 40 }} >
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
                    <Text style={styles.loginText}>Login</Text>

                    <TextInput
                        placeholder='Enter your phone number'
                        style={styles.input}
                        placeholderTextColor="#000"
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />

                    {isOtpSent && (
                        <TextInput
                            placeholder='Enter OTP'
                            style={styles.input}
                            placeholderTextColor="#000"
                            keyboardType="numeric"
                            value={otp}
                            onChangeText={setOtp}
                        />
                    )}

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                    >
                        <Text style={styles.buttonText}>{isOtpSent ? 'Send OTP' : 'Login'}</Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>

                {!keyboardVisible && (
                    <View style={styles.footer}>
                        <Image
                            source={require("../assets/images/mantra.jpg")}
                            style={styles.footerImage}
                        />
                        <View style={styles.footerTextContainer}>
                            <Text style={styles.footerText}>Made in</Text>
                            <Image
                                source={require("../assets/images/image 10.png")}
                                style={styles.footerFlag}
                            />
                        </View>
                        <Image
                            source={require("../assets/images/make-in-India-logo.jpg")}
                            style={styles.footerLogo}
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
        justifyContent: 'center'
    },
    logo: {
        width: 201,
        height: 181,
        alignSelf: 'center'
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        borderStyle: 'solid',
        padding: 10,
        width: '80%',
        marginTop: 10
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        width: '100%',
        marginTop: 30,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    footerImage: {
        width: 60,
        height: 60,
    },
    footerTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerText: {
        color: 'black',
        paddingLeft: 2,
    },
    footerFlag: {
        width: 40,
        height: 20,
    },
    footerLogo: {
        width: 80,
        height: 60,
    },
});


// import React, { useState, useEffect } from 'react';
// import { LinearGradient } from 'expo-linear-gradient';
// import { SafeAreaView, Text, TextInput, StyleSheet, View, Image, TouchableOpacity, Keyboard, Alert } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import axios from 'axios';

// export default ({ navigation }) => {
//     const [keyboardVisible, setKeyboardVisible] = useState(false);
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [otp, setOtp] = useState('');
//     const [isOtpSent, setIsOtpSent] = useState(false);
//     const [lastOtpRequestTime, setLastOtpRequestTime] = useState(null);

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

//     const handleSendOtp = async () => {
//         const currentTime = new Date().getTime();
//         if (lastOtpRequestTime && (currentTime - lastOtpRequestTime) < 60000) { 
//             Alert.alert('Error', 'Please wait a minute before requesting another OTP');
//             return;
//         }

//         try {
//             const response = await axios.get('https://kgv-backend.onrender.com/api/v1/consumer/sendOtp', {
//                 params: { phoneNumber }
//             });
//             if (response.status === 200) {
//                 setIsOtpSent(true);
//                 setLastOtpRequestTime(currentTime);
//                 Alert.alert('Success', 'OTP sent successfully');
//             }
//         } catch (error) {
//             Alert.alert('Error', 'Failed to send OTP');
//         }
//     };

//     const handleLogin = async () => {
//         try {
//             const response = await axios.get('https://kgv-backend.onrender.com/api/v1/consumer/login', {
//                 params: { phoneNumber, otp }
//             });
//             if (response.status === 200) {
//                 Alert.alert('Success', 'Login successful');
//                 navigation.navigate('HomePreKyc');
//             }
//         } catch (error) {
//             Alert.alert('Error', 'Invalid OTP or login failed');
//         }
//     };

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
//                     <Text style={styles.loginText}>Login</Text>

//                     <TextInput
//                         placeholder='Enter your phone number'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         keyboardType="phone-pad"
//                         value={phoneNumber}
//                         onChangeText={setPhoneNumber}
//                     />

//                     {isOtpSent && (
//                         <TextInput
//                             placeholder='Enter OTP'
//                             style={styles.input}
//                             placeholderTextColor="#000"
//                             keyboardType="numeric"
//                             value={otp}
//                             onChangeText={setOtp}
//                         />
//                     )}

//                     <TouchableOpacity
//                         style={styles.button}
//                         onPress={isOtpSent ? handleLogin : handleSendOtp}
//                     >
//                         <Text style={styles.buttonText}>{isOtpSent ? 'Login' : 'Send OTP'}</Text>
//                     </TouchableOpacity>
//                 </KeyboardAwareScrollView>

//                 {!keyboardVisible && (
//                     <View style={styles.footer}>
//                         <Image
//                             source={require("../assets/images/mantra.jpg")}
//                             style={styles.footerImage}
//                         />
//                         <View style={styles.footerTextContainer}>
//                             <Text style={styles.footerText}>Made in</Text>
//                             <Image
//                                 source={require("../assets/images/image 10.png")}
//                                 style={styles.footerFlag}
//                             />
//                         </View>
//                         <Image
//                             source={require("../assets/images/make-in-India-logo.jpg")}
//                             style={styles.footerLogo}
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
//         marginTop: 30,
//     },
//     buttonText: {
//         color: '#FFF',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     loginText: {
//         fontSize: 32,
//         fontWeight: 'bold',
//         color: '#000',
//     },
//     footer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//         marginTop: 20,
//     },
//     footerImage: {
//         width: 60,
//         height: 60,
//     },
//     footerTextContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     footerText: {
//         color: 'black',
//         paddingLeft: 2,
//     },
//     footerFlag: {
//         width: 40,
//         height: 20,
//     },
//     footerLogo: {
//         width: 80,
//         height: 60,
//     },
// });


// import React, { useState, useEffect } from 'react';
// import { LinearGradient } from 'expo-linear-gradient';
// import { SafeAreaView, Text, TextInput, StyleSheet, View, Image, TouchableOpacity, Keyboard, Alert } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import axios from 'axios';

// export default ({ navigation }) => {
//     const [keyboardVisible, setKeyboardVisible] = useState(false);
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [otp, setOtp] = useState('');
//     const [isOtpSent, setIsOtpSent] = useState(false);

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

//     const handleSendOtp = async () => {
//         try {
//             const response = await axios.get('https://kgv-backend.onrender.com/api/v1/consumer/sendOtp', {
//                 params: { phoneNumber }
//             });
//             if (response.status === 200) {
//                 setIsOtpSent(true);
//                 Alert.alert('Success', 'OTP sent successfully');
//             }
//         } catch (error) {
//             Alert.alert('Error', 'Failed to send OTP');
//         }
//     };

//     const handleLogin = async () => {
//         try {
//             const response = await axios.get('https://kgv-backend.onrender.com/api/v1/consumer/login', {
//                 params: { phoneNumber, otp }
//             });
//             if (response.status === 200) {
//                 Alert.alert('Success', 'Login successful');
//                 navigation.navigate('HomePreKyc');
//             }
//         } catch (error) {
//             Alert.alert('Error', 'Invalid OTP or login failed');
//         }
//     };

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
//                     <Text style={styles.loginText}>Login</Text>

//                     <TextInput
//                         placeholder='Enter your phone number'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         keyboardType="phone-pad"
//                         value={phoneNumber}
//                         onChangeText={setPhoneNumber}
//                     />

//                     {isOtpSent && (
//                         <TextInput
//                             placeholder='Enter OTP'
//                             style={styles.input}
//                             placeholderTextColor="#000"
//                             keyboardType="numeric"
//                             value={otp}
//                             onChangeText={setOtp}
//                         />
//                     )}

//                     <TouchableOpacity
//                         style={styles.button}
//                         onPress={isOtpSent ? handleLogin : handleSendOtp}
//                     >
//                         <Text style={styles.buttonText}>{isOtpSent ? 'Login' : 'Send OTP'}</Text>
//                     </TouchableOpacity>
//                 </KeyboardAwareScrollView>

//                 {!keyboardVisible && (
//                     <View style={styles.footer}>
//                         <Image
//                             source={require("../assets/images/mantra.jpg")}
//                             style={styles.footerImage}
//                         />
//                         <View style={styles.footerTextContainer}>
//                             <Text style={styles.footerText}>Made in</Text>
//                             <Image
//                                 source={require("../assets/images/image 10.png")}
//                                 style={styles.footerFlag}
//                             />
//                         </View>
//                         <Image
//                             source={require("../assets/images/make-in-India-logo.jpg")}
//                             style={styles.footerLogo}
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
//         marginTop: 30,
//     },
//     buttonText: {
//         color: '#FFF',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     loginText: {
//         fontSize: 32,
//         fontWeight: 'bold',
//         color: '#000',
//     },
//     footer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//         marginTop: 20,
//     },
//     footerImage: {
//         width: 60,
//         height: 60,
//     },
//     footerTextContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     footerText: {
//         color: 'black',
//         paddingLeft: 2,
//     },
//     footerFlag: {
//         width: 40,
//         height: 20,
//     },
//     footerLogo: {
//         width: 80,
//         height: 60,
//     },
// });


// import React, { useState, useEffect } from 'react';
// import { LinearGradient } from 'expo-linear-gradient';
// import { SafeAreaView, Text, TextInput, StyleSheet, View, Image, TouchableOpacity, Keyboard, Alert } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import axios from 'axios';

// export default ({ navigation }) => {
//     const [keyboardVisible, setKeyboardVisible] = useState(false);
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [otp, setOtp] = useState('');
//     const [isOtpSent, setIsOtpSent] = useState(false);

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

//     const handleSendOtp = async () => {
//         try {
//             const response = await axios.get('http://localhost:8005/api/v1/consumer/sendOtp', {
//                 params: { phoneNumber }
//             });
//             if (response.status === 200) {
//                 setIsOtpSent(true);
//                 Alert.alert('Success', 'OTP sent successfully');
//             }
//         } catch (error) {
//             Alert.alert('Error', 'Failed to send OTP');
//         }
//     };

//     const handleLogin = async () => {
//         try {
//             const response = await axios.get('http://localhost:8005/api/v1/consumer/login', {
//                 params: { phoneNumber, otp }
//             });
//             if (response.status === 200) {
//                 Alert.alert('Success', 'Login successful');
//                 navigation.navigate('HomePreKyc');
//             }
//         } catch (error) {
//             Alert.alert('Error', 'Invalid OTP or login failed');
//         }
//     };

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
//                     <Text style={styles.loginText}>Login</Text>

//                     <TextInput
//                         placeholder='Enter your phone number'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         keyboardType="phone-pad"
//                         value={phoneNumber}
//                         onChangeText={setPhoneNumber}
//                     />

//                     {isOtpSent && (
//                         <TextInput
//                             placeholder='Enter OTP'
//                             style={styles.input}
//                             placeholderTextColor="#000"
//                             keyboardType="numeric"
//                             value={otp}
//                             onChangeText={setOtp}
//                         />
//                     )}

//                     <TouchableOpacity
//                         style={styles.button}
//                         onPress={isOtpSent ? handleLogin : handleSendOtp}
//                     >
//                         <Text style={styles.buttonText}>{isOtpSent ? 'Login' : 'Send OTP'}</Text>
//                     </TouchableOpacity>
//                 </KeyboardAwareScrollView>

//                 {!keyboardVisible && (
//                     <View style={styles.footer}>
//                         <Image
//                             source={require("../assets/images/mantra.jpg")}
//                             style={styles.footerImage}
//                         />
//                         <View style={styles.footerTextContainer}>
//                             <Text style={styles.footerText}>Made in</Text>
//                             <Image
//                                 source={require("../assets/images/image 10.png")}
//                                 style={styles.footerFlag}
//                             />
//                         </View>
//                         <Image
//                             source={require("../assets/images/make-in-India-logo.jpg")}
//                             style={styles.footerLogo}
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
//         marginTop: 30,
//     },
//     buttonText: {
//         color: '#FFF',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     loginText: {
//         fontSize: 32,
//         fontWeight: 'bold',
//         color: '#000',
//     },
//     footer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//         marginTop: 20,
//     },
//     footerImage: {
//         width: 60,
//         height: 60,
//     },
//     footerTextContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     footerText: {
//         color: 'black',
//         paddingLeft: 2,
//     },
//     footerFlag: {
//         width: 40,
//         height: 20,
//     },
//     footerLogo: {
//         width: 80,
//         height: 60,
//     },
// });


// import React, { useState, useEffect } from 'react';
// import { LinearGradient } from 'expo-linear-gradient';
// import { SafeAreaView, Text, TextInput, StyleSheet, View, Image, TouchableOpacity, Keyboard, Alert } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import axios from 'axios';

// export default ({ navigation }) => {
//     const [keyboardVisible, setKeyboardVisible] = useState(false);
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [otp, setOtp] = useState('');
//     const [isOtpSent, setIsOtpSent] = useState(false);

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

//     const handleSendOtp = async () => {
//         try {
//             const response = await axios.post('http://localhost:8005/api/v1/consumer/sendOtp', { phoneNumber });
//             if (response.status === 200) {
//                 setIsOtpSent(true);
//                 Alert.alert('Success', 'OTP sent successfully');
//             }
//         } catch (error) {
//             Alert.alert('Error', 'Failed to send OTP');
//         }
//     };

//     const handleLogin = async () => {
//         try {
//             const response = await axios.post('http://localhost:8005/api/v1/consumer/login', { phoneNumber, otp });
//             if (response.status === 200) {
//                 Alert.alert('Success', 'Login successful');
//                 navigation.navigate('HomePreKyc');
//             }
//         } catch (error) {
//             Alert.alert('Error', 'Invalid OTP or login failed');
//         }
//     };

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
//                     <Text style={styles.loginText}>Login</Text>

//                     <TextInput
//                         placeholder='Enter your phone number'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         keyboardType="phone-pad"
//                         value={phoneNumber}
//                         onChangeText={setPhoneNumber}
//                     />

//                     {isOtpSent && (
//                         <TextInput
//                             placeholder='Enter OTP'
//                             style={styles.input}
//                             placeholderTextColor="#000"
//                             keyboardType="numeric"
//                             value={otp}
//                             onChangeText={setOtp}
//                         />
//                     )}

//                     <TouchableOpacity
//                         style={styles.button}
//                         onPress={isOtpSent ? handleLogin : handleSendOtp}
//                     >
//                         <Text style={styles.buttonText}>{isOtpSent ? 'Login' : 'Send OTP'}</Text>
//                     </TouchableOpacity>
//                 </KeyboardAwareScrollView>

//                 {!keyboardVisible && (
//                     <View style={styles.footer}>
//                         <Image
//                             source={require("../assets/images/mantra.jpg")}
//                             style={styles.footerImage}
//                         />
//                         <View style={styles.footerTextContainer}>
//                             <Text style={styles.footerText}>Made in</Text>
//                             <Image
//                                 source={require("../assets/images/image 10.png")}
//                                 style={styles.footerFlag}
//                             />
//                         </View>
//                         <Image
//                             source={require("../assets/images/make-in-India-logo.jpg")}
//                             style={styles.footerLogo}
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
//         marginTop: 30,
//     },
//     buttonText: {
//         color: '#FFF',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     loginText: {
//         fontSize: 32,
//         fontWeight: 'bold',
//         color: '#000',
//     },
//     footer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//         marginTop: 20,
//     },
//     footerImage: {
//         width: 60,
//         height: 60,
//     },
//     footerTextContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     footerText: {
//         color: 'black',
//         paddingLeft: 2,
//     },
//     footerFlag: {
//         width: 40,
//         height: 20,
//     },
//     footerLogo: {
//         width: 80,
//         height: 60,
//     },
// });

// import React, { useState, useEffect } from 'react';
// import { LinearGradient } from 'expo-linear-gradient';
// import { SafeAreaView, Text, TextInput, StyleSheet, View, Image, TouchableOpacity, Keyboard } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// export default ({ navigation }) => {
//     const [keyboardVisible, setKeyboardVisible] = useState(false);

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
//                    <Text style={styles.loginText}>Login</Text>
                    
//                     <TextInput placeholder='GSTIN' style={styles.input} placeholderTextColor="#000" />
//                     <TextInput placeholder='Whatsapp Number' style={styles.input} placeholderTextColor="#000" />
//                     <TextInput placeholder='Company Name' style={styles.input} placeholderTextColor="#000" />
//                     <TextInput placeholder='Email ID' style={styles.input} placeholderTextColor="#000" />
//                     <TextInput placeholder='Website' style={styles.input} placeholderTextColor="#000" />

//                     <TouchableOpacity 
//                         style={styles.button} 
//                         onPress={() => navigation.navigate('HomePreKyc')}
//                     >
//                         <Text style={styles.buttonText}>Login</Text>
//                     </TouchableOpacity>
//                 </KeyboardAwareScrollView>
                
//                 {!keyboardVisible && (
//                     <View className="flex-row items-center justify-around gap-16  ">
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
//     loginText: {
//         fontSize: 32,
//         fontWeight: 'bold',
//         color: '#000',
//         marginVertical: 20, // Adjust spacing as needed
//     },
// });



// import React, { useState, useEffect } from 'react';
// import { LinearGradient } from 'expo-linear-gradient';
// import { SafeAreaView, Text, TextInput, StyleSheet, View, Image, TouchableOpacity, Keyboard } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// export default ({ navigation }) => {
//     const [keyboardVisible, setKeyboardVisible] = useState(false);

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
//                 >
//                     <Image
//                         source={require("../assets/images/logo-removebg-preview 1.png")}
//                         style={styles.logo}
//                     />
                    
//                     <TextInput placeholder='GSTIN' style={styles.input} placeholderTextColor="#000" />
//                     <TextInput placeholder='Whatsapp Number' style={styles.input} placeholderTextColor="#000" />
//                     <TextInput placeholder='Company Name' style={styles.input} placeholderTextColor="#000" />
//                     <TextInput placeholder='Email ID' style={styles.input} placeholderTextColor="#000" />
//                     <TextInput placeholder='Website' style={styles.input} placeholderTextColor="#000" />

//                     <TouchableOpacity 
//                         style={styles.button} 
//                         onPress={() => navigation.navigate('HomePreKyc')}
//                     >
//                         <Text style={styles.buttonText}>Login</Text>
//                     </TouchableOpacity>
//                 </KeyboardAwareScrollView>
                
//                 {!keyboardVisible && (
//                     // <View style={styles.footer}>
//                     //     <Image
//                     //         source={require("../assets/images/mantra.jpg")}
//                     //         style={styles.footerImage}
//                     //     />
//                     //     <View style={styles.footerTextContainer}>
//                     //         <Text style={styles.footerText}>Made in</Text>
//                     //         <Image
//                     //             source={require("../assets/images/image 10.png")}
//                     //             style={styles.flagImage}
//                     //         />
//                     //     </View>
//                     //     <Image
//                     //         source={require("../assets/images/make-in-India-logo.jpg")}
//                     //         style={styles.footerLogo}
//                     //     />
//                     // </View>
//                     <View className="flex-row items-center justify-around gap-16 mt-16 ">
//                     <Image
//                       source={require("../assets/images/mantra.jpg")}
//                       className="w-[60px] h-[60px]"
//                     />
//                     <View className="flex-row items-center">
//                       <Text className="text-black pl-2">Made in</Text>
//                       <Image
//                         source={require("../assets/images/image 10.png")}
//                         className="w-10 h-5"
//                       />
//                     </View>
//                     <Image
//                       source={require("../assets/images/make-in-India-logo.jpg")}
//                       className="w-20 h-12"
//                     />
//                   </View>
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
   
// });


// import { LinearGradient } from 'expo-linear-gradient';
// import { SafeAreaView, Text, TextInput, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// export default ({ navigation }) => {
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
//                 >
//                     <Image
//                         source={require("../assets/images/logo-removebg-preview 1.png")}
//                         style={styles.logo}
//                     />
                    
//                     <TextInput placeholder='GSTIN' style={styles.input} placeholderTextColor="#000" />
//                     <TextInput placeholder='Whatsapp Number' style={styles.input} placeholderTextColor="#000" />
//                     <TextInput placeholder='Company Name' style={styles.input} placeholderTextColor="#000" />
//                     <TextInput placeholder='Email ID' style={styles.input} placeholderTextColor="#000" />
//                     <TextInput placeholder='Website' style={styles.input} placeholderTextColor="#000" />
                   

//                 <TouchableOpacity 
//                     style={styles.button} 
//                     onPress={() => navigation.navigate('HomePreKyc')}
//                 >
//                     <Text style={styles.buttonText}>Login</Text>
//                 </TouchableOpacity>

//                 </KeyboardAwareScrollView>
//                 <View className="flex-row items-center justify-around gap-16 mt-16 ">
//           <Image
//             source={require("../assets/images/mantra.jpg")}
//             className="w-[60px] h-[60px]"
//           />
//           <View className="flex-row items-center">
//             <Text className="text-black pl-2">Made in</Text>
//             <Image
//               source={require("../assets/images/image 10.png")}
//               className="w-10 h-5"
//             />
//           </View>
//           <Image
//             source={require("../assets/images/make-in-India-logo.jpg")}
//             className="w-20 h-12"
//           />
//         </View>
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
  
// });



// import { LinearGradient } from 'expo-linear-gradient';
// import { SafeAreaView, Text, TextInput, StyleSheet, View, Button,Image,TouchableOpacity } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



// export default ({ navigation }) => {
//     return (
//         <LinearGradient colors={['#06264D', "#FFF"]} style={{ flex: 1 }} >
//             <SafeAreaView style={{ flex: 1, padding: 40 }}       >
//                 <KeyboardAwareScrollView
//                     resetScrollToCoords={{ x: 0, y: 0 }}
//                     contentContainerStyle={styles.container}
//                     scrollEnabled={true}
//                     enableAutomaticScroll={true}
//                     enableOnAndroid={true}
                   
//                 >

//                     <Image
//           source={require("../assets/images/logo-removebg-preview 1.png")}
//          className=" self-center w-[201px] h-[181px]"
//         />
                    
//                     <TextInput placeholder='GSTIN' style={styles.input} placeholderTextColor="#000" />
//                     <TextInput placeholder='Whatsapp Number' style={styles.input} placeholderTextColor="#000" />
//                     <TextInput placeholder='Company Name' style={styles.input} placeholderTextColor="#000" />
//                     <TextInput placeholder='Email ID' style={styles.input} placeholderTextColor="#000" />
//                     <TextInput placeholder='Website' style={styles.input} placeholderTextColor="#000" />
                    
//                 </KeyboardAwareScrollView>

//                 <TouchableOpacity 
//                         style={styles.button} 
//                         onPress={() => navigation.navigate('HomePreKyc')}
//                     >
//                         <Text style={styles.buttonText}>Login</Text>
//                     </TouchableOpacity>
//                 <View className="flex-row items-center justify-around gap-16 mt-16 ">
//           <Image
//             source={require("../assets/images/mantra.jpg")}
//             className="w-[60px] h-[60px]"
//           />
//           <View className="flex-row items-center">
//             <Text className="text-black pl-2">Made in</Text>
//             <Image
//               source={require("../assets/images/image 10.png")}
//               className="w-10 h-5"
//             />
//           </View>
//           <Image
//             source={require("../assets/images/make-in-India-logo.jpg")}
//             className="w-20 h-12"
//           />
//         </View>

//             </SafeAreaView>
//         </LinearGradient>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
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
//         marginTop: 20,
//     },
//     buttonText: {
//         color: '#FFF',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });



// import {LinearGradient} from 'expo-linear-gradient';
// import { SafeAreaView, Text, TextInput, StyleSheet, View, Button } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



// export default ({navigation}) => {
//     return (
//         <LinearGradient colors={['#06264D', "#FFF"]} style={{flex: 1}} >
//             <SafeAreaView style={{flex: 1, padding: 10}} >
//             <KeyboardAwareScrollView
//             resetScrollToCoords={{ x: 0, y: 0 }}
//             contentContainerStyle={styles.container}
//             scrollEnabled={true}
//             enableAutomaticScroll={true}
//             enableOnAndroid={true}
//             >
//                 {/* <Logo /> */}
                
//                 <TextInput placeholder='GSTIN' style={styles.input} placeholderTextColor="#000" />
//                 <TextInput placeholder='Whatsapp Number' style={styles.input} placeholderTextColor="#000" />
//                 <TextInput placeholder='Company Name' style={styles.input} placeholderTextColor="#000" />
//                 <TextInput placeholder='Email ID' style={styles.input} placeholderTextColor="#000" />
//                 <TextInput placeholder='Website' style={styles.input} placeholderTextColor="#000" />
//                 <Button title="Login" style={{marginTop: 20}} onPress={() => navigation.navigate('HomePreKyc')} />
//             </KeyboardAwareScrollView>
            
//             <View style={{alignItems: 'center', flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
//                 {/* <Ind /> */}
//                 <Text> Made In India</Text>
//             </View>
           
//             </SafeAreaView>
//         </LinearGradient>
//     );
// };

// const styles = new StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     input: {
//         borderBottomWidth: 2,
//         borderBottomColor: 'black',
//         borderStyle: 'solid',
//         padding: 10,
//         width: '100%',
//         marginTop: 10
//     }
// })
