import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';

const CheckoutButton = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    contact: '',
    amount: '',
  });

  const handleChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const checkoutHandler = async () => {
    try {
      // Get Razorpay key
      const { data: { key } } = await axios.get("https://kgv-backend.onrender.com/api/getkey");
      console.log("Razorpay Key:", key);

      // Create order
      const { data: { order } } = await axios.post("https://kgv-backend.onrender.com/api/v1/visitor/placeOrder", { amount: formData.amount });
      console.log("Order ID:", order.id);
      console.log("Order Amount:", order.amount);

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "6 Pack Programmer",
        description: "Tutorial of RazorPay",
        image: "https://i.imgur.com/3g7nmJC.png",
        order_id: order.id,
        callback_url: "https://kgv-backend.onrender.com/api/v1/visitor/verifyPayment",
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
        },
        notes: {
          "address": formData.address
        },
        theme: {
          "color": "#121212"
        }
      };

      // Open Razorpay checkout
      if (RazorpayCheckout) {
        RazorpayCheckout.open(options).then((data) => {
          // Handle success
          Alert.alert(`Success: ${data.razorpay_payment_id}`);
        }).catch((error) => {
          // Handle error
          console.log("Razorpay Error:", error);
          Alert.alert(`Error: ${error.code} | ${error.description}`);
        });
      } else {
        console.log("RazorpayCheckout is not initialized properly.");
        Alert.alert('Error', 'RazorpayCheckout is not initialized.');
      }

    } catch (error) {
      console.log("Error:", error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={formData.address}
        onChangeText={(text) => handleChange('address', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={formData.contact}
        onChangeText={(text) => handleChange('contact', text)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={formData.amount}
        onChangeText={(text) => handleChange('amount', text)}
        keyboardType="numeric"
      />
      <Button title="Pay Now" onPress={checkoutHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8
  }
});

export default CheckoutButton;


// import React from 'react';
// import { View, Button, StyleSheet, Alert } from 'react-native';
// import RazorpayCheckout from 'react-native-razorpay';
// import axios from 'axios';

// const CheckoutButton = () => {
//   const checkoutHandler = async (amount) => {
//     try {
//       // Get Razorpay key
//       const { data: { key } } = await axios.get("https://kgv-backend.onrender.com/api/getkey");
//       console.log("Razorpay Key:", key);

//       // Create order
//       const { data: { order } } = await axios.post("https://kgv-backend.onrender.com/api/v1/visitor/placeOrder", { amount });
//       console.log("Order ID:", order.id);
//       console.log("Order Amount:", order.amount);


//       const options = {
//         key,
//         amount: order.amount, 
//         currency: "INR",
//         name: "6 Pack Programmer",
//         description: "Tutorial of RazorPay",
//         image: "https://i.imgur.com/3g7nmJC.png",
//         order_id: order.id,
//         callback_url: "https://kgv-backend.onrender.com/api/v1/visitor/verifyPayment",
//         prefill: {
//           name: "Jagdish Singh",
//           email: "jagdish0000singh@gmail.com",
//           contact: "9999999999"
//         },
//         notes: {
//           "address": "Razorpay Corporate Office"
//         },
//         theme: {
//           "color": "#121212"
//         }
//       };

//       // Open Razorpay checkout
//       if (RazorpayCheckout) {
//         RazorpayCheckout.open(options).then((data) => {
//           // Handle success
//           Alert.alert(`Success: ${data.razorpay_payment_id}`);
//         }).catch((error) => {
//           // Handle error
//           console.log("Razorpay Error:", error);
//           Alert.alert(`Error: ${error.code} | ${error.description}`);
//         });
//       } else {
//         console.log("RazorpayCheckout is not initialized properly.");
//         Alert.alert('Error', 'RazorpayCheckout is not initialized.');
//       }

//     } catch (error) {
//       console.log("Error:", error);
//       Alert.alert('Error', 'Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Pay Now" onPress={() => checkoutHandler(10000)} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16
//   },
// });

// export default CheckoutButton;


// import React, { useState, useEffect } from 'react';
// import { LinearGradient } from 'expo-linear-gradient';
// import { SafeAreaView, Text, TextInput, StyleSheet, View, Image, TouchableOpacity, Keyboard, Alert } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { Picker } from '@react-native-picker/picker';

// export default ({ navigation }) => {
//   const [keyboardVisible, setKeyboardVisible] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     address: '',
//     contact: '',
//     amount: '',
//   });

//   const handleChange = (name, value) => {
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const validateForm = () => {
//     const { name, email, address, contact, amount } = formData;
//     if (!name || !email || !address || !contact || !amount) {
//       Alert.alert('Error', 'Please fill all fields');
//       return false;
//     }
//     return true;
//   };

//   const handlePlaceOrder = async () => {
//     if (!validateForm()) return;

//     try {
//       const response = await fetch('https://kgv-backend.onrender.com/api/v1/visitor/placeOrder', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData) // Send formData as JSON
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Alert.alert('Success', 'Order placed successfully');
//         handleVerifyPayment(data.orderId);
//       } else {
//         Alert.alert('Error', data.message || 'Failed to place order');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Something went wrong, please try again');
//     }
//   };

//   const handleVerifyPayment = async (orderId) => {
//     try {
//       const response = await fetch(`https://kgv-backend.onrender.com/api/v1/visitor/verifyPayment`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ orderId })
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Alert.alert('Success', 'Payment verified successfully');
//         navigation.navigate('SuccessPage');
//       } else {
//         Alert.alert('Error', data.message || 'Failed to verify payment');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Something went wrong, please try again');
//     }
//   };

//   useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
//       setKeyboardVisible(true);
//     });
//     const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
//       setKeyboardVisible(false);
//     });

//     return () => {
//       keyboardDidShowListener.remove();
//       keyboardDidHideListener.remove();
//     };
//   }, []);

//   return (
//     <LinearGradient colors={['#06264D', "#FFF"]} style={{ flex: 1 }} >
//       <SafeAreaView style={{ flex: 1, padding: 20 }} >
//         <KeyboardAwareScrollView
//           resetScrollToCoords={{ x: 0, y: 0 }}
//           contentContainerStyle={styles.container}
//           scrollEnabled={true}
//           enableAutomaticScroll={true}
//           enableOnAndroid={true}
//           extraScrollHeight={100}
//           showsVerticalScrollIndicator={false}
//           showsHorizontalScrollIndicator={false}
//         >
//           <Image
//             source={require("../assets/images/kgv.png")}
//             style={styles.logo}
//           />
//           <Text style={styles.registerText}>Payment</Text>
//           <TextInput
//             placeholder='Name'
//             style={styles.input}
//             placeholderTextColor="#000"
//             onChangeText={(text) => handleChange('name', text)}
//             value={formData.name}
//           />
//           <TextInput
//             placeholder='Email'
//             style={styles.input}
//             placeholderTextColor="#000"
//             onChangeText={(text) => handleChange('email', text)}
//             value={formData.email}
//           />
//           <TextInput
//             placeholder='Address'
//             style={styles.input}
//             placeholderTextColor="#000"
//             onChangeText={(text) => handleChange('address', text)}
//             value={formData.address}
//           />
//           <TextInput
//             placeholder='Phone Number'
//             style={styles.input}
//             placeholderTextColor="#000"
//             onChangeText={(text) => handleChange('contact', text)}
//             value={formData.contact}
//             keyboardType='phone-pad'
//           />


//           <View style={styles.pickerContainer}>
//             <Picker
//               selectedValue={formData.amount}
//               style={styles.picker}
//               onValueChange={(itemValue) => handleChange('amount', itemValue)}
//             >
//               <Picker.Item label="Select Amount" value="" />
//               <Picker.Item label="500" value="500" />
//               <Picker.Item label="1000" value="1000" />
//               <Picker.Item label="1500" value="1500" />
//             </Picker>

//           </View>

//           <TouchableOpacity
//             style={styles.button}
//             onPress={handlePlaceOrder}
//           >
//             <Text style={styles.buttonText}>Place Order</Text>
//           </TouchableOpacity>
//         </KeyboardAwareScrollView>

//         {!keyboardVisible && (
//           <View style={styles.footer}>
//             <Image
//               source={require("../assets/images/mantra.jpg")}
//               style={styles.footerImage}
//             />
//             <View style={styles.footerTextContainer}>
//               <Text style={styles.footerText}>Made in</Text>
//               <Image
//                 source={require("../assets/images/image 10.png")}
//                 style={styles.footerFlag}
//               />
//             </View>
//             <Image
//               source={require("../assets/images/make-in-India-logo.jpg")}
//               style={styles.footerLogo}
//             />
//           </View>
//         )}
//       </SafeAreaView>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   logo: {
//     width: 201,
//     height: 181,
//     alignSelf: 'center',
//     marginBottom: 20
//   },
//   input: {
//     borderBottomWidth: 2,
//     borderBottomColor: 'black',
//     borderStyle: 'solid',
//     padding: 10,
//     width: '80%',
//     marginTop: 10
//   },
//   pickerContainer: {
//     borderBottomWidth: 2,
//     borderBottomColor: 'black',
//     borderStyle: 'solid',
//     padding: 10,
//     width: '80%',
//     marginTop: 10,
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     padding: 15,
//     borderRadius: 50,
//     alignItems: 'center',
//     width: '100%',
//     marginTop: 20,
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   registerText: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 20
//   },
//   footer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     marginTop: 16,
//   },
//   footerImage: {
//     width: 60,
//     height: 60,
//   },
//   footerTextContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   footerText: {
//     color: '#000',
//     paddingLeft: 2,
//   },
//   footerFlag: {
//     width: 40,
//     height: 20,
//   },
//   footerLogo: {
//     width: 80,
//     height: 60,
//   }
// });


// import React, { useState, useEffect } from 'react';
// import { LinearGradient } from 'expo-linear-gradient';
// import { SafeAreaView, Text, TextInput, StyleSheet, View, Image, TouchableOpacity, Keyboard, Alert } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { Picker } from '@react-native-picker/picker';

// export default ({ navigation }) => {
//     const [keyboardVisible, setKeyboardVisible] = useState(false);
//     const [formData, setFormData] = useState({
//         firstname: '',
//         lastname: '',
//         email: '',
//         address: '',
//         phoneNumber: '',
//         amount: '', 
//     });

//     const handleChange = (name, value) => {
//         setFormData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handlePlaceOrder = async () => {
//         try {
//             const response = await fetch('http://localhost:8005/api/v1/visitor/placeOrder', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 Alert.alert('Success', 'Order placed successfully');
//                 handleVerifyPayment(data.orderId);
//             } else {
//                 Alert.alert('Error', data.message || 'Failed to place order');
//             }
//         } catch (error) {
//             Alert.alert('Error', 'Something went wrong, please try again');
//         }
//     };

//     const handleVerifyPayment = async (orderId) => {
//         try {
//             const response = await fetch(`http://localhost:8005/api/v1/visitor/verifyPayment`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ orderId })
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 Alert.alert('Success', 'Payment verified successfully');
//                 navigation.navigate('SuccessPage');
//             } else {
//                 Alert.alert('Error', data.message || 'Failed to verify payment');
//             }
//         } catch (error) {
//             Alert.alert('Error', 'Something went wrong, please try again');
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
//                         source={require("../assets/images/kgv.png")}
//                         style={styles.logo}
//                     />
//                     <Text style={styles.registerText}>Payment</Text>
//                     <TextInput
//                         placeholder='firstname'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         onChangeText={(text) => handleChange('firstname', text)}
//                         value={formData.firstname}
//                     />
//                     <TextInput
//                         placeholder='lastname'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         onChangeText={(text) => handleChange('lastname', text)}
//                         value={formData.lastname}
//                     />
//                     <TextInput
//                         placeholder='email'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         onChangeText={(text) => handleChange('email', text)}
//                         value={formData.email}
//                     />
//                     <TextInput
//                         placeholder='Address'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         onChangeText={(text) => handleChange('address', text)}
//                         value={formData.address}
//                     />
//                     <TextInput
//                         placeholder='Phone Number'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         onChangeText={(text) => handleChange('phoneNumber', text)}
//                         value={formData.phoneNumber}
//                         keyboardType='phone-pad'
//                     />

//                     {/* New Picker for Select Amount */}
//                     <View style={styles.pickerContainer}>
//                         <Picker
//                             selectedValue={formData.amount}
//                             style={styles.picker}
//                             onValueChange={(itemValue) => handleChange('amount', itemValue)}
//                         >
//                             <Picker.Item label="Select Amount" value="" />
//                             <Picker.Item label="500" value="500" />
//                             <Picker.Item label="1000" value="1000" />
//                             <Picker.Item label="1500" value="1500" />
//                         </Picker>
//                     </View>

//                     <TouchableOpacity 
//                         style={styles.button} 
//                         onPress={handlePlaceOrder}
//                     >
//                         <Text style={styles.buttonText}>add</Text>
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
//         alignSelf: 'center',
//         marginBottom: 20
//     },
//     input: {
//         borderBottomWidth: 2,
//         borderBottomColor: 'black',
//         borderStyle: 'solid',
//         padding: 10,
//         width: '80%',
//         marginTop: 10
//     },
//     pickerContainer: {
//         borderBottomWidth: 2,
//         borderBottomColor: 'black',
//         borderStyle: 'solid',
//         padding: 10,
//         width: '80%',
//         marginTop: 10,
//     },
//     picker: {
//         height: 50,
//         width: '100%',
//     },
//      button: {
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
//     registerText: {
//         fontSize: 32,
//         fontWeight: 'bold',
//         color: '#000',
//         marginBottom: 20
//     },
//     loginLink: {
//         marginTop: 20,
//     },
//     loginText: {
//         color: '#007BFF',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     footer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//         marginTop: 16,
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
//         color: '#000',
//         paddingLeft: 2,
//     },
//     footerFlag: {
//         width: 40,
//         height: 20,
//     },
//     footerLogo: {
//         width: 80,
//         height: 60,
//     }
// });


// import React, { useState, useEffect } from 'react';
// import { LinearGradient } from 'expo-linear-gradient';
// import { SafeAreaView, Text, TextInput, StyleSheet, View, Image, TouchableOpacity, Keyboard, Alert } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// export default ({ navigation }) => {
//     const [keyboardVisible, setKeyboardVisible] = useState(false);
//     const [formData, setFormData] = useState({
//         firstname: '',
//         lastname: '',
//         email: '',
//         address: '',
//         phoneNumber: '',
//     });

//     const handleChange = (name, value) => {
//         setFormData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handlePlaceOrder = async () => {
//         try {
//             const response = await fetch('http://localhost:8005/api/v1/visitor/placeOrder', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 Alert.alert('Success', 'Order placed successfully');
//                 handleVerifyPayment(data.orderId); // You can call this automatically or based on user action
//             } else {
//                 Alert.alert('Error', data.message || 'Failed to place order');
//             }
//         } catch (error) {
//             Alert.alert('Error', 'Something went wrong, please try again');
//         }
//     };

//     const handleVerifyPayment = async (orderId) => {
//         try {
//             const response = await fetch(`http://localhost:8005/api/v1/visitor/verifyPayment`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ orderId })
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 Alert.alert('Success', 'Payment verified successfully');
//                 navigation.navigate('SuccessPage'); // Navigate to success page if needed
//             } else {
//                 Alert.alert('Error', data.message || 'Failed to verify payment');
//             }
//         } catch (error) {
//             Alert.alert('Error', 'Something went wrong, please try again');
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
//                         source={require("../assets/images/kgv.png")}
//                         style={styles.logo}
//                     />
//                     <Text style={styles.registerText}>Register</Text>
//                     <TextInput
//                         placeholder='firstname'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         onChangeText={(text) => handleChange('firstname', text)}
//                         value={formData.firstname}
//                     />
//                     <TextInput
//                         placeholder='lastname'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         onChangeText={(text) => handleChange('lastname', text)}
//                         value={formData.lastname}
//                     />
//                     <TextInput
//                         placeholder='email'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         onChangeText={(text) => handleChange('email', text)}
//                         value={formData.email}
//                     />
//                     <TextInput
//                         placeholder='Address'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         onChangeText={(text) => handleChange('address', text)}
//                         value={formData.address}
//                     />
//                     <TextInput
//                         placeholder='Phone Number'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         onChangeText={(text) => handleChange('phoneNumber', text)}
//                         value={formData.phoneNumber}
//                         keyboardType='phone-pad'
//                     />
//                     <TouchableOpacity 
//                         style={styles.button} 
//                         onPress={handlePlaceOrder} // Call the function here
//                     >
//                         <Text style={styles.buttonText}>add</Text>
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
//         alignSelf: 'center',
//         marginBottom: 20
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
//     registerText: {
//         fontSize: 32,
//         fontWeight: 'bold',
//         color: '#000',
//         marginBottom: 20
//     },
//     loginLink: {
//         marginTop: 20,
//     },
//     loginText: {
//         color: '#007BFF',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     footer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//         marginTop: 16,
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
//         color: '#000',
//         paddingLeft: 2,
//     },
//     footerFlag: {
//         width: 40,
//         height: 20,
//     },
//     footerLogo: {
//         width: 80,
//         height: 60,
//     }
// });



// import React, { useState, useEffect } from 'react';
// import { LinearGradient } from 'expo-linear-gradient';
// import { SafeAreaView, Text, TextInput, StyleSheet, View, Image, TouchableOpacity, Keyboard, Alert } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// export default ({ navigation }) => {
//     const [keyboardVisible, setKeyboardVisible] = useState(false);
//     const [formData, setFormData] = useState({
//         firstname: '',
//         lastname: '',
//         email: '',
//         address: '',
//         phoneNumber: '',

//     });

//     const handleChange = (name, value) => {
//         setFormData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
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
//                         source={require("../assets/images/kgv.png")}
//                         style={styles.logo}
//                     />
//                     <Text style={styles.registerText}>Register</Text>
//                     <TextInput
//                         placeholder='firstname'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         onChangeText={(text) => handleChange('firstname', text)}
//                         value={formData.firstname}
//                     />
//                     <TextInput
//                         placeholder='lastname'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         onChangeText={(text) => handleChange('lastname', text)}
//                         value={formData.lastname}
//                     />
//                     <TextInput
//                         placeholder='email'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         onChangeText={(text) => handleChange('email', text)}
//                         value={formData.email}
                     
//                     />
//                     <TextInput
//                         placeholder='Address'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         onChangeText={(text) => handleChange('address', text)}
//                         value={formData.address}
//                     />
//                   <TextInput
//                         placeholder='Phone Number'
//                         style={styles.input}
//                         placeholderTextColor="#000"
//                         onChangeText={(text) => handleChange('phoneNumber', text)}
//                         value={formData.phoneNumber}
//                         keyboardType='phone-pad'
//                     />
                   
//                     <TouchableOpacity 
//                         style={styles.button} 
//                         onPress={}
//                     >
//                         <Text style={styles.buttonText}>add</Text>
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
//         alignSelf: 'center',
//         marginBottom: 20
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
//     registerText: {
//         fontSize: 32,
//         fontWeight: 'bold',
//         color: '#000',
//         marginBottom: 20
//     },
//     loginLink: {
//         marginTop: 20,
//     },
//     loginText: {
//         color: '#007BFF',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     footer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//         marginTop: 16,
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
//         color: '#000',
//         paddingLeft: 2,
//     },
//     footerFlag: {
//         width: 40,
//         height: 20,
//     },
//     footerLogo: {
//         width: 80,
//         height: 60,
//     }
// });
