
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, Image, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const scaleWidth = (size) => (width / 375) * size; // 375 is base screen width (iPhone X)
const scaleHeight = (size) => (height / 812) * size; // 812 is base screen height (iPhone X)

const PrimumpaymentImageUpload = ({ route }) => {
    // Destructure parameters from the route
    const { formData, amount, visitorId } = route.params;

    const [images, setImages] = useState([]);
    const [visitorIdState, setVisitorId] = useState(visitorId || '');
    const [amountState, setAmount] = useState(amount || '');
    const navigation = useNavigation();

    const handleImagePicker = () => {
        launchImageLibrary(
            { mediaType: 'photo', quality: 1, selectionLimit: 4 },
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.assets) {
                    setImages(response.assets); // Set the selected images
                }
            }
        );
    };

    const handleSubmit = async () => {
        if (!visitorIdState || !amountState || images.length === 0) {
            Alert.alert('Please upload image after payments.');
            return;
        }

        const formData = new FormData();
        images.forEach((image, index) => {
            formData.append('images', {
                uri: image.uri,
                name: image.fileName || `image${index + 1}`.jpg,
                type: image.type,
            });
        });

        formData.append('visitorId', visitorIdState);
        formData.append('amount', amountState);

        try {
            const response = await axios.post('https://kgv-backend.onrender.com/api/primumupload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            Alert.alert('Success', response.data.message);
            setImages([]);
            setVisitorId('');
            setAmount('');

            navigation.navigate("KitBookingPaymentSuccess", {
                paymentProofId: response.data.data._id,
                userId: visitorId,
                contestParticipation: false
            });
        } catch (error) {
            console.error('Upload error:', error.response ? error.response.data : error.message);
            Alert.alert('Error', error.response?.data?.message || 'An error occurred during the upload');
        }
    };

    return (
        <LinearGradient colors={['#06264D', "#FFF"]} style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, padding: 40 }}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Payment Information</Text>
                </View>

                <ScrollView>
                    <View style={styles.imageContainer}>
                        <Text style={styles.text}>Pay using the following details and submit the reciept below</Text>
                        <Text style={styles.text}>Scan the QR code to make a payment:</Text>
                        <Image
                            source={require("../assets/images/scanner.png")}
                            style={styles.image}
                        />

                        <Text style={styles.text}>UPI Transfer Details:</Text>
                        <View style={styles.card}>
                            <Text style={styles.text1}>UPI ID : KGVL@sbi</Text>
                        </View>
                        <Text style={styles.text}>Bank Transfer Details:</Text>
                        <View style={styles.card}>
                            <Text style={styles.text1}>Bank Account No : 00000042073223703</Text>
                            <Text style={styles.text1}>IFSC Code : SBIN0004381</Text>
                        </View>
                        <Text style={styles.text2}>Your payable amount is ₹{amount} for booking:</Text>
                    </View>

                    <View style={styles.container}>
                        <TouchableOpacity style={styles.button} onPress={handleImagePicker}>
                            <Text style={styles.buttonText}>Select Images</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Display selected images */}
                    <View style={styles.imageContainer}>
                        {images.map((image, index) => (
                            <Image
                                key={index}
                                source={{ uri: image.uri }}
                                style={styles.selectedImage}
                            />
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    headingContainer: {
        alignItems: 'center',
        marginVertical: scaleHeight(20),
    },
    headingText: {
        fontSize: scaleWidth(28),
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.25)', // Optional shadow for text
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
    imageContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: scaleHeight(20),
    },
    image: {
        width: scaleWidth(180),
        height: scaleHeight(180),
        margin: scaleWidth(10),
        borderRadius: scaleWidth(10),
        borderColor: '#FFFFFF',
        borderWidth: 2,
        backgroundColor: '#f9f9f9', // Add background color for fallback
    },
    selectedImage: {
        width: scaleWidth(150),
        height: scaleHeight(150),
        margin: scaleWidth(10),
        borderRadius: scaleWidth(10),
    },
    text: {
        fontSize: scaleWidth(16),
        marginBottom: scaleHeight(10),
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: scaleHeight(24), // Improved readability with line-height
    },
    text2: {
        fontSize: scaleWidth(18),
        marginVertical: scaleHeight(10),
        color: '#FFD700', // Golden color for emphasis
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text1: {
        fontSize: scaleWidth(16),
        color: '#FFFFFF',
        marginVertical: scaleHeight(5),
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white
        padding: scaleHeight(15),
        borderRadius: scaleWidth(10),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: scaleHeight(2) },
        shadowOpacity: 0.3,
        shadowRadius: scaleWidth(4),
        elevation: 5,
        margin: scaleWidth(10),
        width: '90%',
        alignSelf: 'center',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: scaleHeight(20),
        paddingHorizontal: scaleWidth(20),
    },
    button: {
        backgroundColor: '#1E90FF', // Bright blue for the button
        padding: scaleHeight(15),
        borderRadius: scaleWidth(10),
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: scaleHeight(3) },
        shadowOpacity: 0.4,
        shadowRadius: scaleWidth(4),
        minWidth: scaleWidth(120),
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: scaleWidth(16),
        fontWeight: 'bold',
    },
});

export default PrimumpaymentImageUpload;


// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, Alert, ScrollView, Image, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import axios from 'axios';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useNavigation } from '@react-navigation/native';


// const { width, height } = Dimensions.get('window');
// const scaleWidth = (size) => (width / 375) * size; // 375 is base screen width (iPhone X)
// const scaleHeight = (size) => (height / 812) * size; // 812 is base screen height (iPhone X)


// const PrimumpaymentImageUpload = ({ route }) => {
//     // Destructure parameters from the route
//     const { formData, amount, visitorId } = route.params;

//     const [images, setImages] = useState([]);
//     const [visitorIdState, setVisitorId] = useState(visitorId || '');
//     const [amountState, setAmount] = useState(amount || '');
//     const navigation = useNavigation();

//     const handleImagePicker = () => {
//         launchImageLibrary(
//             { mediaType: 'photo', quality: 1, selectionLimit: 4 },
//             (response) => {
//                 if (response.didCancel) {
//                     console.log('User cancelled image picker');
//                 } else if (response.error) {
//                     console.log('ImagePicker Error: ', response.error);
//                 } else if (response.assets) {
//                     setImages(response.assets); // Set the selected images
//                 }
//             }
//         );
//     };

//     const handleSubmit = async () => {
//         if (!visitorIdState || !amountState || images.length === 0) {
//             Alert.alert('Please upload image after payments.');
//             return;
//         }

//         const formData = new FormData();
//         images.forEach((image, index) => {
//             formData.append('images', {
//                 uri: image.uri,
//                 name: image.fileName || `image${index + 1}`.jpg,
//                 type: image.type,
//             });
//         });

//         formData.append('visitorId', visitorIdState);
//         formData.append('amount', amountState);

//         try {
//             const response = await axios.post('https://kgv-backend.onrender.com/api/primumupload', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             Alert.alert('Success', response.data.message);
//             setImages([]);
//             setVisitorId('');
//             setAmount('');

//             navigation.navigate("KitBookingPaymentSuccess", {
//                 paymentProofId: response.data.data._id,
//                 userId: visitorId,
//                 contestParticipation: false
//             });
//         } catch (error) {
//             console.error('Upload error:', error.response ? error.response.data : error.message);
//             Alert.alert('Error', error.response?.data?.message || 'An error occurred during the upload');
//         }
//     };


//     return (
//         <LinearGradient colors={['#06264D', "#FFF"]} style={{ flex: 1 }}>
//             <SafeAreaView style={{ flex: 1, padding: 40 }}>
//                 <View style={styles.headingContainer}>
//                     <Text style={styles.headingText}>Payment Information</Text>
//                 </View>

//                 <ScrollView>
//                     <View style={styles.imageContainer}>
//                         <Text style={styles.text}>Pay using the following details and submit the reciept below</Text>
//                         <Text style={styles.text}>Scan the QR code to make a payment:</Text>
//                         <Image
//                             source={require("../assets/images/scanner.png")}
//                             style={styles.image}
//                         />

//                         <Text style={styles.text}>UPI Transfer Details:</Text>
//                         <View style={styles.card}>
//                             <Text style={styles.text1}>UPI ID : KGVL@sbi</Text>
//                         </View>
//                         <Text style={styles.text}>Bank Transfer Details:</Text>
//                         <View style={styles.card}>
//                             <Text style={styles.text1}>Bank Account No : 00000042073223703</Text>
//                             <Text style={styles.text1}>IFSC Code : SBIN0004381</Text>
//                         </View>
//                         <Text style={styles.text2}>Your payable amount is ₹{amount} for booking:</Text>
//                     </View>

//                     <View style={styles.container}>

//                         <TouchableOpacity style={styles.button} onPress={handleImagePicker}>
//                             <Text style={styles.buttonText}>Select Images</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//                             <Text style={styles.buttonText}>Submit</Text>
//                         </TouchableOpacity>
//                     </View>
//                     {/* Display selected images */}
//                     <View style={styles.imageContainer}>
//                         {images.map((image, index) => (
//                             <Image
//                                 key={index}
//                                 source={{ uri: image.uri }}
//                                 style={styles.image}
//                             />
//                         ))}
//                     </View>
//                 </ScrollView>


//             </SafeAreaView>
//         </LinearGradient>
//     );
// };

// const styles = StyleSheet.create({
//     gradientBackground: {
//         flex: 1,
//     },
//     headingContainer: {
//         alignItems: 'center',
//         marginVertical: scaleHeight(20),
//     },
//     headingText: {
//         fontSize: scaleWidth(28),
//         fontWeight: 'bold',
//         color: '#FFFFFF',
//         textAlign: 'center',
//         textShadowColor: 'rgba(0, 0, 0, 0.25)', // Optional shadow for text
//         textShadowOffset: { width: 2, height: 2 },
//         textShadowRadius: 4,
//     },
//     imageContainer: {
//         flexDirection: 'column',
//         alignItems: 'center',
//         marginTop: scaleHeight(20),
//         marginBottom: scaleHeight(20),
//     },
//     image: {
//         width: scaleWidth(180),
//         height: scaleHeight(180),
//         margin: scaleWidth(10),
//         borderRadius: scaleWidth(10),
//         borderColor: '#FFFFFF', // Border to make images stand out
//         borderWidth: 2,
//     },
//     text: {
//         fontSize: scaleWidth(16),
//         marginBottom: scaleHeight(10),
//         marginTop: scaleHeight(10),
//         color: '#FFFFFF',
//         textAlign: 'center',
//         lineHeight: scaleHeight(24), // Improved readability with line-height
//     },
//     text2: {
//         fontSize: scaleWidth(18),
//         marginBottom: scaleHeight(10),
//         marginTop: scaleHeight(10),
//         color: '#000', // Golden color for emphasis
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     card: {
//         backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white
//         padding: scaleHeight(20),
//         borderRadius: scaleWidth(10),
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: scaleHeight(2) },
//         shadowOpacity: 0.3,
//         shadowRadius: scaleWidth(4),
//         elevation: 5,
//         margin: scaleWidth(10),
//         width: '90%',
//         alignSelf: 'center',
//     },
//     container: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         margin: scaleWidth(20),
//         gap: 6
//     },
//     button: {
//         backgroundColor: '#1E90FF', // Bright blue for the button
//         padding: scaleHeight(15),
//         borderRadius: scaleWidth(10),
//         elevation: 5, // Added shadow for button
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: scaleHeight(3) },
//         shadowOpacity: 0.4,
//         shadowRadius: scaleWidth(4),
//         minWidth: scaleWidth(120), // Consistent width for buttons
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: '#FFFFFF',
//         fontSize: scaleWidth(16),
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
// });

// export default PrimumpaymentImageUpload;