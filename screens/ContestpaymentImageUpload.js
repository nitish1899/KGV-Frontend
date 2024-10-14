import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, Image, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const scaleWidth = (size) => (width / 375) * size; // 375 is base screen width (iPhone X)
const scaleHeight = (size) => (height / 812) * size; // 812 is base screen height (iPhone X)

const ContestpaymentImageUpload = ({ route }) => {
    // Destructure parameters from the route
    const { formData, amount, userId } = route.params;

    const [images, setImages] = useState([]);
    const [UserIdState, setUserId] = useState(userId || '');
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
        if (!UserIdState || !amountState || images.length === 0) {
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

        formData.append('userId', UserIdState);
        formData.append('amount', amountState);

        console.log('formadata', formData)

        try {
            const response = await axios.post('http://192.168.1.9:8005/api/contestupload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            Alert.alert('Success', response.data.message);
            setImages([]);
            setUserId('');
            setAmount('');

            navigation.navigate("KitBookingPaymentSuccess", {
                paymentProofId: response.data.data._id,
                userId
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
                        <Text style={styles.text}> pay using the following details:</Text>
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
                            <Text style={styles.text1}>Bank Account No : 872347578662</Text>
                            <Text style={styles.text1}>IFSC Code : BABR0AIRPOR</Text>

                        </View>
                        <Text style={styles.text2}>Your payable amount is {amount} for booking:</Text>
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
                                style={styles.image}
                            />
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

// const styles = StyleSheet.create({
//     gradientBackground: {
//         flex: 1,
//     },
//     input: {
//         borderWidth: 1,
//         marginBottom: 10,
//         padding: 10,
//     },
//     imageContainer: {
//         flexDirection: 'column', // Stack images vertically
//         alignItems: 'center', // Center images horizontally
//         marginTop: 20,
//     },
//     image: {
//         width: 200,
//         height: 200,
//         margin: 5,
//     },
//     text: {
//         fontSize: 16,
//         marginBottom: 10, // Space between text elements
//         marginTop: 10, // Space between text elements
//         color: '#FFF',
//     },
//     text2: {
//         fontSize: 16,
//         marginBottom: 10, // Space between text elements
//         marginTop: 10, // Space between text elements
//         color: '#FFF',
//         fontWeight: 'bold',
//     },
//     headingContainer: {
//         alignItems: 'center',
//         marginVertical: 20, // 1% of screen height
//     },
//     headingText: {
//         fontSize: 34, // Scales with screen width
//         fontWeight: 'bold',
//         color: '#FFF',
//     },
//     card: {
//         backgroundColor: 'rgba(255, 255, 255, 0.5)', // White with 50% opacity
//         padding: 20,
//         borderRadius: 10,
//         shadowColor: '#000', // Optional shadow for elevation
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.2,
//         shadowRadius: 3.84,
//         elevation: 5, // For Android
//         margin: 10,
//     },
//     container: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         margin: 20,
//     },
//     button: {
//         backgroundColor: '#6200EE', // Purple color
//         padding: 15,
//         borderRadius: 5,
//         elevation: 3, // For shadow on Android
//     },
//     buttonText: {
//         color: '#FFFFFF', // White text color
//         fontSize: 16,
//         textAlign: 'center',
//     },

// });

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
    },
    input: {
        borderWidth: scaleWidth(1),
        marginBottom: scaleHeight(10),
        padding: scaleHeight(10),
    },
    imageContainer: {
        flexDirection: 'column', // Stack images vertically
        alignItems: 'center', // Center images horizontally
        marginTop: scaleHeight(20),
    },
    image: {
        width: scaleWidth(200),
        height: scaleHeight(200),
        margin: scaleWidth(5),
    },
    text: {
        fontSize: scaleWidth(16),
        marginBottom: scaleHeight(10), // Space between text elements
        marginTop: scaleHeight(10), // Space between text elements
        color: '#FFF',
    },
    text2: {
        fontSize: scaleWidth(16),
        marginBottom: scaleHeight(10), // Space between text elements
        marginTop: scaleHeight(10), // Space between text elements
        color: '#FFF',
        fontWeight: 'bold',
    },
    headingContainer: {
        alignItems: 'center',
        marginVertical: scaleHeight(20), // 1% of screen height
    },
    headingText: {
        fontSize: scaleWidth(34), // Scales with screen width
        fontWeight: 'bold',
        color: '#FFF',
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // White with 50% opacity
        padding: scaleHeight(20),
        borderRadius: scaleWidth(10),
        shadowColor: '#000', // Optional shadow for elevation
        shadowOffset: {
            width: 0,
            height: scaleHeight(2),
        },
        shadowOpacity: 0.2,
        shadowRadius: scaleWidth(3.84),
        elevation: 5, // For Android
        margin: scaleWidth(10),
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: scaleWidth(20),
    },
    button: {
        backgroundColor: '#6200EE', // Purple color
        padding: scaleHeight(15),
        borderRadius: scaleWidth(5),
        elevation: 3, // For shadow on Android
    },
    buttonText: {
        color: '#FFFFFF', // White text color
        fontSize: scaleWidth(16),
        textAlign: 'center',
    },
});


export default ContestpaymentImageUpload;