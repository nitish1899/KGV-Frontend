import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, Text, TextInput, StyleSheet, View, Image, TouchableOpacity, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default ({ navigation }) => {
    const [keyboardVisible, setKeyboardVisible] = useState(false);

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
 
                    <TextInput placeholder=' Number' style={styles.input} placeholderTextColor="#000" />
                 
                    
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => navigation.navigate('HomePreKyc')}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
                
                {!keyboardVisible && (
                    <View className="flex-row items-center justify-around gap-16  ">
                        <Image
                            source={require("../assets/images/mantra.jpg")}
                            className="w-[60px] h-[60px]"
                        />
                        <View className="flex-row items-center">
                            <Text className="text-black pl-2">Made in</Text>
                            <Image
                                source={require("../assets/images/image 10.png")}
                                className="w-10 h-5"
                            />
                        </View>
                        <Image
                            source={require("../assets/images/make-in-India-logo.jpg")}
                            className="w-20 h-12"
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
        marginTop: 90,
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
});


// import {LinearGradient} from 'expo-linear-gradient';
// import { SafeAreaView, Text, TextInput, StyleSheet, View, Button } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import Logo from '../assets/images/logo.svg';
// import Ind from '../assets/images/ind.svg';
// // import Button from '../components/Buttons/Button';

// export default ({navigation}) => {
//     return (
//         <LinearGradient colors={['#FFF', "#FFF"]} style={{flex: 1}}>
//             <SafeAreaView style={{flex: 1, padding: 10}}>
//             <KeyboardAwareScrollView
//             resetScrollToCoords={{ x: 0, y: 0 }}
//             contentContainerStyle={styles.container}
//             scrollEnabled={true}
//             enableAutomaticScroll={true}
//             enableOnAndroid={true}
//             >
//                 {/* <Logo /> */}
//                 <TextInput placeholder='Vendor Firm Name' style={styles.input} placeholderTextColor="#000" />
//                 <TextInput placeholder='Owner Name' style={styles.input} placeholderTextColor="#000" />
//                 <TextInput placeholder='Whatsapp Number' style={styles.input} placeholderTextColor="#000" />
//                 <TextInput placeholder='Email ID' style={styles.input} placeholderTextColor="#000" />
//                 <TextInput placeholder='Address' style={styles.input} placeholderTextColor="#000" />
//                 <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
//                     <TextInput placeholder='City' style={[styles.input, {width: 100}]} placeholderTextColor="#000" />
//                     <TextInput placeholder='State' style={[styles.input, {width: 150, marginLeft: 50}]} placeholderTextColor="#000" />
//                 </View>
//                 <TextInput placeholder='Pincode' style={styles.input} placeholderTextColor="#000" />
//                 <Button title="Login" style={{marginTop: 20}} onPress={() => navigation.navigate('Home')} />
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
