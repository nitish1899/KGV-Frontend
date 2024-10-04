import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
export default function TermsAndConditions({ navigation, route }) {
    const [isChecked, setIsChecked] = useState(false);

    const handleAccept = () => {
        if (isChecked) {
            // Set terms accepted to true and go back to the main form
            route.params.onAccept();
            navigation.goBack();
        }
    };

    return (
        <LinearGradient colors={['#545a2c', '#FFF']} style={styles.gradient}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Image
                    source={require("../assets/images/kgv.png")} // Replace with your image URL or local file
                    style={styles.image}
                />
                <Text style={styles.header}>Terms and Conditions</Text>
                <Text style={styles.text}>
                    {/* Add your Terms and Conditions text here */}
                    These are the terms and conditions...
                </Text>
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                        style={[styles.checkbox,{backgroundColor: isChecked ? '#06264D' : '#ccc'}]}
                        onPress={() => setIsChecked(!isChecked)}
                    >
                        {isChecked && <Text style={styles.checkmark}>✔</Text>}
                    </TouchableOpacity>
                    <Text style={styles.checkboxLabel}>I have read and agree to the terms</Text>
                </View>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: isChecked ? '#06264D' : '#ccc' }]}
                    disabled={!isChecked}
                    onPress={handleAccept}
                >
                    <Text style={styles.buttonText}>Accept and Continue</Text>
                    <Icon name="arrow-forward" size={24} color="#FFF" />
                </TouchableOpacity>
            </ScrollView>
            </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    boxContainer: {
        backgroundColor: '#fff', // White background for the box
        borderRadius: 10, // Rounded corners for the box
        borderWidth: 4, // Light border
        borderColor: '#E0E0E0', // Light gray border color
        padding: 20, // Padding inside the box
        shadowColor: '#000', // Subtle shadow for elevation
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3, // Elevation for Android shadow
    },
    content: {
        flex: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#06264D',
        textAlign: 'center',
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        marginBottom: 20,
        textAlign: 'justify',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#06264D',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginRight: 10,
    },
    checkmark: {
        fontSize: 18,
        color: '#FFF',
    },
    checkboxLabel: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#06264D',
        borderRadius: 6,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    buttonDisabled: {
        backgroundColor: '#B0BEC5',
    },
    buttonText: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: '600',
        marginRight: 10,
    },
    image: {
        width: 100, // Adjust width according to your need
        height: 100, // Adjust height according to your need
        marginBottom: 20,
    },
});


// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, CheckBox, ScrollView } from 'react-native';
// import Icon from '@expo/vector-icons/MaterialIcons';

// export default function TermsAndConditions1({ navigation, route }) {
//     const [isChecked, setIsChecked] = useState(false);

//     const handleAccept = () => {
//         if (isChecked) {
//             route.params.onAccept();
//             navigation.goBack();
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <ScrollView style={styles.content}>
//                 <Text style={styles.header}>Terms and Conditions</Text>
//                 <Text style={styles.text}>
//                     {/* Add your Terms and Conditions text here */}
//                     These are the terms and conditions...
//                 </Text>
//                 <View style={styles.checkboxContainer}>
//                     <TouchableOpacity
//                         style={[styles.checkbox,{backgroundColor: isChecked ? '#06264D' : '#ccc'}]}
//                         onPress={() => setIsChecked(!isChecked)}
//                     >
//                         {isChecked && <Text style={styles.checkmark}>✔</Text>}
//                     </TouchableOpacity>
//                     <Text style={styles.checkboxLabel}>I have read and agree to the terms</Text>
//                 </View>
//                 <TouchableOpacity
//                     style={[styles.button, { backgroundColor: isChecked ? '#06264D' : '#ccc' }]}
//                     disabled={!isChecked}
//                     onPress={handleAccept}
//                 >
//                     <Text style={styles.buttonText}>Accept and Continue</Text>
//                     <Icon name="arrow-forward" size={24} color="#FFF" />
//                 </TouchableOpacity>
//             </ScrollView>
//         </View>
//     );
// }



// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 50,
//         backgroundColor: '#F5F7FA', // Light background for the overall page
//         justifyContent: 'center', // Center the box in the screen
//         borderRadius: 10, // Rounded corners for the box
//         borderWidth: 4, // Light border
//         borderColor: '#E0E0E0', // Light gray border color
//     },
//     boxContainer: {
//         backgroundColor: '#fff', // White background for the box
//         borderRadius: 10, // Rounded corners for the box
//         borderWidth: 4, // Light border
//         borderColor: '#E0E0E0', // Light gray border color
//         padding: 20, // Padding inside the box
//         shadowColor: '#000', // Subtle shadow for elevation
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//         elevation: 3, // Elevation for Android shadow
//     },
//     content: {
//         flex: 1,
//     },
//     header: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#06264D',
//         textAlign: 'center',
//         marginBottom: 20,
//     },
//     text: {
//         fontSize: 16,
//         lineHeight: 24,
//         color: '#333',
//         marginBottom: 20,
//         textAlign: 'justify',
//     },
//     checkboxContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 30,
//     },
//     checkbox: {
//         width: 24,
//         height: 24,
//         borderWidth: 2,
//         borderColor: '#06264D',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 4,
//         marginRight: 10,
//     },
//     checkmark: {
//         fontSize: 18,
//         color: '#FFF',
//     },
//     checkboxLabel: {
//         fontSize: 16,
//         color: '#333',
//         fontWeight: '500',
//     },
//     button: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#06264D',
//         borderRadius: 6,
//         paddingVertical: 12,
//         paddingHorizontal: 20,
//         marginTop: 20,
//     },
//     buttonDisabled: {
//         backgroundColor: '#B0BEC5',
//     },
//     buttonText: {
//         fontSize: 16,
//         color: '#FFF',
//         fontWeight: '600',
//         marginRight: 10,
//     },
// });
