import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const Congratulation = ({ route }) => {
    const { formData } = route.params;
    const navigation = useNavigation();
    const amount = 10;

    console.log("hello", formData);

    // const handlePayment = () => {
    //     if (formData && formData.userId && amount) {
    //         navigation.navigate('ContestpaymentImageUpload', {
    //             formData,
    //             userId: formData.userId,
    //             amount
    //         });
    //     } else {
    //         // Handle case where required data is missing
    //         console.log('Missing required data for navigation.');
    //     }
    // };


    const handlePayment = async () => {
        try {
            const amountInPaise = Math.round(Number(amount));

            // Fetch Razorpay key
            const { data: { key } } = await axios.get("https://kgv-backend.onrender.com/api/getkey");

            // Create order
            const { data: { order } } = await axios.post("https://kgv-backend.onrender.com/api/v1/payment/newcheckout", { amount: amountInPaise });
            const options = {
                key,
                amount: order.amount,
                currency: "INR",
                name: "Payment to KGV",
                description: "Passionate about KGV",
                image: "https://raw.githubusercontent.com/jagdish97897/kgvl/main/logokgv.cb6e50d56b55ae361cd7-removebg-preview.png",
                order_id: order.id,
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone,
                },
                notes: {
                    name: formData.name,
                    phone: formData.phone,
                    adhaarno: formData.adhaarno,
                    dailyrunning: formData.dailyrunning,
                    vehicleno: formData.vehicleno,
                    email: formData.email,
                },
                theme: {
                    color: "#121212",
                },
            };

            RazorpayCheckout.open(options)
                .then(async (data) => {
                    console.log(`Payment Successful: ${data.razorpay_payment_id}`);

                    const verificationResponse = await axios.post("https://kgv-backend.onrender.com/api/v1/payment/contest/payment-verification", {
                        ...data
                    });

                    if (verificationResponse.data.success) {
                        // Navigate to the success screen
                        navigation.navigate('PaymentSuccessnew', {
                            paymentId: data.razorpay_payment_id,
                            formData,
                        });
                    } else {
                        // Handle failure (if any)
                        Alert.alert('Payment Verification Failed', 'Please contact support.');
                    }
                })
                .catch((error) => {
                    console.log("Razorpay Payment Error:", error);
                    // Alert.alert(`Error: ${error.code} | ${error.description}`);
                });
        } catch (error) {
            console.log("Error:", error.message);
            Alert.alert('Error', error.message);
        }
    };

    return (
        <LinearGradient colors={['#06264D', '#FFF']} style={styles.gradientBackground}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.bannerText}>Join The Contest</Text>

                {/* Card for Contest Participation */}
                <View style={styles.card}>
                    <Text style={styles.cardHeader}>Participation Free</Text>
                    <Text style={styles.cardBody}> Pay ₹10 to enter the contest and secure your spot now!</Text>
                    <TouchableOpacity style={styles.cardButton} onPress={handlePayment}>
                        <Text style={styles.buttonText}>Pay ₹10</Text>
                    </TouchableOpacity>
                </View>

                {/* Divider with OR */}
                <View style={styles.divider}>

                    <LottieView
                        source={require('../assets/images/animation9.json')}
                        autoPlay
                        loop
                        style={styles.backgroundAnimation1}
                    />
                    <LottieView
                        source={require('../assets/images/animation8.json')}
                        autoPlay
                        loop
                        style={styles.backgroundAnimation1}
                    />
                    <LottieView
                        source={require('../assets/images/animation9.json')}
                        autoPlay
                        loop
                        style={styles.backgroundAnimation1}

                    />
                    <LottieView
                        source={require('../assets/images/animation9.json')}
                        autoPlay
                        loop
                        style={styles.backgroundAnimation1}
                    />
                    <View style={styles.line} />
                    <Text style={styles.orText}>OR</Text>
                    <View style={styles.line} />
                </View>

                {/* Contest Card with Image on the Left and Text on the Right */}
                <Text style={styles.bannerText}>Join KGV Mitra Club</Text>
                <LottieView
                    source={require('../assets/images/animation8.json')}
                    autoPlay
                    loop
                    style={styles.backgroundAnimation1}
                />
                <LottieView
                    source={require('../assets/images/animation8.json')}
                    autoPlay
                    loop
                    style={styles.backgroundAnimation1}
                />
                <LottieView
                    source={require('../assets/images/animation9.json')}
                    autoPlay
                    loop
                    style={styles.backgroundAnimation1}
                />
                <LottieView
                    source={require('../assets/images/animation8.json')}
                    autoPlay
                    loop
                    style={styles.backgroundAnimation1}
                />
                <View style={styles.cardRow}>



                    {/* Image on the left */}
                    <Image
                        source={require("../assets/images/kgvmitr.png")}
                        style={styles.logo}
                    />

                    {/* Text on the right */}
                    <View style={styles.textContainer}>
                        <Text style={styles.cardBody}>
                            1. No Participation Fee.
                        </Text>
                        <Text style={styles.cardBody}>
                            2. Get Assured Price On Joining.
                        </Text>
                        <Text style={styles.cardBody}>
                            3. Get Free Access To Unlimited Contests All Around The Year.
                        </Text>
                        <Text style={styles.cardBody}>
                            4. Be Part Of The KGV Community & Earn 3000 Points On Each Referral.
                        </Text>
                    </View>

                    <LottieView
                        source={require('../assets/images/animation9.json')}
                        autoPlay
                        loop
                        style={styles.backgroundAnimation1}

                    />
                    <LottieView
                        source={require('../assets/images/animation9.json')}
                        autoPlay
                        loop
                        style={styles.backgroundAnimation1}

                    />
                    <LottieView
                        source={require('../assets/images/animation9.json')}
                        autoPlay
                        loop
                        style={styles.backgroundAnimation1}
                    />

                </View>


                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Register1')}
                >
                    <Text style={styles.buttonText}>KGV Mitra Club</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: height * 0.1,
        paddingHorizontal: width * 0.05,
    },
    banner: {
        width: '90%',
        backgroundColor: '#06264D',
        paddingVertical: height * 0.02,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: height * 0.02,
        marginTop: height * 0.04,
        borderRadius: 8,
    },
    bannerText: {
        color: 'white',
        fontSize: width * 0.06,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: height * 0.02,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#06264D',
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.2,
        borderRadius: 8,
        marginTop: -height * 0.08,
    },
    buttonText: {
        color: 'white',
        fontSize: width * 0.045,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: height * 0.03,
        width: '90%',
        marginBottom: height * 0.03,
        elevation: 20,
    },
    cardHeader: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        color: '#06264D',
        marginBottom: height * 0.02,
    },
    cardBody: {
        fontSize: width * 0.04,
        color: '#333',
        marginBottom: height * 0.03,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: height * 0.03,
        width: '90%',
        marginBottom: height * 0.03,
        borderRadius: 10,
    },
    textContainer: {
        flex: 1,
    },
    cardButton: {
        backgroundColor: '#06264D',
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.2,
        borderRadius: 8,
        alignItems: 'center',
    },
    logo: {
        width: 180,
        height: 240,
        alignSelf: 'center',
        marginBottom: 20,
        marginLeft: -60,
        marginTop: -80,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: height * 0.03,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#333',
    },
    orText: {
        marginHorizontal: width * 0.03,
        fontSize: width * 0.04,
        color: '#333',
    },
    backgroundAnimation: {
        position: 'absolute',
        width: '100%',  // Adjust the width
        height: height * 0.16,
        marginLeft: width * 0.29,
        top: -120,  // Position at the top
        zIndex: 1,  // Make sure it is below other content
    },
    backgroundAnimation1: {
        position: 'absolute',
        width: '100%',  // Adjust the width
        height: height * 0.16,
        marginRight: width * 0.29,
        top: -90,  // Position at the top
        zIndex: 1,  // Make sure it is below other content
    },

});

export default Congratulation;