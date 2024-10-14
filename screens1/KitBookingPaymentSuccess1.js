import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // To add a gradient background
import { MaterialIcons } from '@expo/vector-icons'; // For success icon
import axios from 'axios';

const KitBookingPaymentSuccess1 = ({ route }) => {
    const navigation = useNavigation();
    const { paymentProofId, userId } = route.params;

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {

                const userData = await axios.get(`http://192.168.1.9:8005/api/v1/visitor/details/${userId}`);
                setUser(userData);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    const handleClick = () => {
        navigation.navigate('Welcome1', { user });
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#28a745" />
            </SafeAreaView>
        );
    }

    return (
        <LinearGradient
            colors={['#545a2c', '#FFF']}
            style={styles.gradientBackground}
        >
            <SafeAreaView style={styles.container}>

                <View style={styles.iconContainer}>
                    <MaterialIcons name="check-circle" size={150} color="#fff" />
                </View>

                <Text style={styles.successText}>Thank You!</Text>

                <Text style={styles.paymentProofText}>Token Number: {paymentProofId}</Text>

                <Text style={styles.infoText}>
                    Your submitted details will be verified within 24 hours. You will receive updates at your registered email.
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleClick}
                >
                    <LinearGradient
                        colors={['#28a745', '#218838']}
                        style={styles.buttonBackground}
                    >
                        <Text style={styles.buttonText}>Go To Main Menu</Text>
                    </LinearGradient>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    iconContainer: {
        marginBottom: 20,
    },
    successText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginVertical: 10,
    },
    paymentProofText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#f0f0f0',
        marginVertical: 20,
        textAlign: 'center',
    },
    infoText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#dcdcdc',
        textAlign: 'center',
        marginBottom: 40,
    },
    button: {
        width: '80%',
        borderRadius: 25,
        elevation: 5,
    },
    buttonBackground: {
        padding: 15,
        alignItems: 'center',
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default KitBookingPaymentSuccess1;

// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const KitBookingPaymentSuccess = ({ route }) => {
//     const navigation = useNavigation();
//     const { paymentProofId, userId } = route.params;

//     const handleClick = () => {
//         navigation.navigate('Welcome', { userId });
//     };

//     return (
//         <SafeAreaView style={styles.container}>

//             <Text style={styles.successText}>Thank you for sharing the details.</Text>

//             <Text style={styles.paymentProofText}> Token number: {paymentProofId}</Text>

//             <Text style={styles.text}>Your Submitted details will be verified within 24 hours.You will get all update at your mail.</Text>

//             <TouchableOpacity
//                 style={styles.button}
//                 onPress={handleClick}
//             >
//                 <Text style={styles.buttonText}>Go To Main menu</Text>
//             </TouchableOpacity>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//         backgroundColor: '#f0f0f0',
//     },
//     animation: {
//         width: 150,
//         height: 150,
//     },
//     successText: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginVertical: 20,
//         color: '#28a745',
//     },
//     text: {
//         fontSize: 14,
//         fontWeight: 'bold',
//         marginVertical: 20,
//         color: '#28a750',
//     },
//     paymentProofText: {
//         fontSize: 16,
//         fontWeight: '600',
//         color: '#333',
//         marginBottom: 20,
//     },
//     detailsContainer: {
//         width: '100%',
//         padding: 20,
//         backgroundColor: '#fff',
//         borderRadius: 10,
//         shadowColor: '#000',
//         shadowOpacity: 0.1,
//         shadowRadius: 10,
//         elevation: 5,
//         marginBottom: 30,
//     },
//     detailsTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//         color: '#444',
//     },
//     detailText: {
//         fontSize: 16,
//         marginBottom: 5,
//         color: '#666',
//     },
//     button: {
//         backgroundColor: '#28a745',
//         padding: 15,
//         borderRadius: 10,
//         width: '80%',
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default KitBookingPaymentSuccess;
