import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView, Image, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfileButton1 from './ProfileButton1';
import CustomModal1 from './CustomModel1.js';
const { width, height } = Dimensions.get('window');

const CustomCheckbox = ({ isChecked, onPress, label }) => (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
        <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
            {isChecked && <Text style={styles.checkmark}>✔</Text>}
        </View>
        <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
);

const AddonitemToCart2 = ({ route }) => {
    const { kitName, visitorId, visitorBikeDetailsId, visitorName, vehicleno, cartItemId, user } = route.params;
    const [addonItems, setAddonItems] = useState([]);
    const [selectedAddons, setSelectedAddons] = useState([]);
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);

    useEffect(() => {
        axios.get(`https://kgv-backend.onrender.com/api/kits/search/${kitName}`)
            .then(response => {
                if (response.data.success) {
                    setAddonItems(response.data.data.addonItems);
                } else {
                    Alert.alert('Error', response.data.message);
                }
            })
            .catch(error => {
                Alert.alert('Error', 'Failed to fetch addon items');
                console.log(error);
            });
    }, [kitName]);

    const handleIncreaseAddon = (addon) => {
        const existingAddon = selectedAddons.find(item => item.name === addon.name);
        if (existingAddon) {
            if (existingAddon.quantity < 2) {
                setSelectedAddons(selectedAddons.map(item =>
                    item.name === addon.name ? { ...item, quantity: item.quantity + 1 } : item
                ));
            } else {
                Alert.alert('Limit Reached', 'You can only add up to 2 of each addon.');
            }
        } else {
            setSelectedAddons([...selectedAddons, { ...addon, quantity: 1 }]);
        }
    };

    const handleDecreaseAddon = (addon) => {
        const existingAddon = selectedAddons.find(item => item.name === addon.name);
        if (existingAddon) {
            if (existingAddon.quantity > 1) {
                setSelectedAddons(selectedAddons.map(item =>
                    item.name === addon.name ? { ...item, quantity: item.quantity - 1 } : item
                ));
            } else {
                setSelectedAddons(selectedAddons.filter(item => item.name !== addon.name));
            }
        }
    };

    const handlePostAddonsToCart = () => {
        const data = {
            cartItemId,
            addons: selectedAddons,
            visitorId,
        };

        axios.post('https://kgv-backend.onrender.com/api/cart/kit/addons', data)
            .then(response => {
                if (response.data.updatedCartItem) {
                    Alert.alert('Success', 'Addons added to cart successfully!');
                    navigation.navigate('ViewCartItem2', { visitorId, visitorName, user });
                } else {
                    Alert.alert('Error', 'Failed to add addons to cart');
                }
            })
            .catch(error => {
                Alert.alert('Error', 'An error occurred while adding addons to cart');
                console.log(error);
            });
    };

    const totalSelectedAddons = selectedAddons.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <LinearGradient colors={['#545a2c', '#FFF']} style={styles.gradient}>
            <SafeAreaView style={styles.container}>
                <Image source={require('../assets/images/kgvmitr.png')} style={styles.image} />
                <ProfileButton1 onPress={() => setModalVisible(true)} />
                <Text style={styles.descriptionText}>
                    .. Following items are eligible for {kitName}!
                </Text>
                <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                    {addonItems.map((item) => {
                        const price = Number(item.price);
                        const surcharge = price * 0.05; // 5% surcharge
                        const mrp = price + surcharge;

                        return (
                            <View key={item._id} style={styles.itemDetails}>
                                {item.name === 'Battery' && (
                                    <Image source={require('../assets/images/battery.png')} style={styles.itemImage} />
                                )}
                                {item.name === 'Charger 4A' && (
                                    <Image source={require('../assets/images/charger.png')} style={styles.itemImage} />
                                )}
                                {item.name === 'Fast Charger 8A' && (
                                    <Image source={require('../assets/images/charger8A.png')} style={styles.itemImage} />
                                )}

                                <Text style={styles.itemText}>{item.name}</Text>
                                <Text style={styles.itemDescription}>Current Price: {item.price}</Text>
                                <Text style={styles.mrpPrice}>MRP: {mrp}</Text>

                                <View style={styles.quantityContainer}>
                                    <TouchableOpacity onPress={() => handleDecreaseAddon(item)} style={styles.quantityButton}>
                                        <Icon name="remove" size={20} color="#FFF" />
                                    </TouchableOpacity>
                                    <Text style={styles.quantityText}>
                                        {selectedAddons.find(addon => addon.name === item.name)?.quantity || 0}
                                    </Text>
                                    <TouchableOpacity onPress={() => handleIncreaseAddon(item)} style={styles.quantityButton}>
                                        <Icon name="add" size={20} color="#FFF" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}

                    {selectedAddons.length > 0 && (
                        <>
                            <CustomCheckbox
                                isChecked={termsAccepted}
                                onPress={() => setTermsAccepted(!termsAccepted)}
                                label="Accept Terms and Conditions"
                            />
                            <TouchableOpacity
                                onPress={handlePostAddonsToCart}
                                disabled={!termsAccepted}
                                style={[
                                    styles.checkoutButton,
                                    { backgroundColor: termsAccepted ? '#ff9800' : '#ccc' },
                                ]}
                            >
                                <Text style={styles.checkoutButtonText}>Submit Selected Addons</Text>
                            </TouchableOpacity>
                        </>
                    )}
                    <Text style={styles.totalAddonsText}>Total Addons Selected: {totalSelectedAddons}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ViewCartItems2', { visitorId, visitorName, user })}>
                        <Text style={styles.forgotPinText}>Skip.?</Text>
                    </TouchableOpacity>
                </ScrollView>
                <CustomModal1
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    navigation={navigation}
                    user={user}
                />
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: width * 0.05, // 5% of screen width
        paddingTop: height * 0.03,       // 3% of screen height
    },
    image: {
        width: width * 0.25,             // 25% of screen width
        height: height * 0.25,           // 25% of screen height
        marginBottom: height * 0.03,     // 3% of screen height
    },
    scrollContainer: {
        alignItems: 'center',
        paddingVertical: height * 0.03,  // 3% of screen height
    },
    itemDetails: {
        backgroundColor: '#FFF',
        padding: width * 0.04,           // 4% of screen width
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        marginBottom: height * 0.03,     // 3% of screen height
        width: '100%',
        alignItems: 'center',
    },
    itemText: {
        fontSize: width * 0.04,          // 4% of screen width
        color: '#333',
        marginBottom: height * 0.01,     // 1% of screen height
        textAlign: 'center',
    },
    itemDescription: {
        fontSize: width * 0.035,         // 3.5% of screen width
        color: '#555',
        marginBottom: height * 0.02,     // 2% of screen height
        textAlign: 'center',
    },
    mrpPrice: {
        fontSize: width * 0.035,         // 3.5% of screen width
        color: 'red',
        marginBottom: height * 0.01,     // 1% of screen height
        textDecorationLine: 'line-through',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        padding: width * 0.025,          // 2.5% of screen width
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        marginHorizontal: width * 0.02,  // 2% of screen width
    },
    quantityText: {
        fontSize: width * 0.04,          // 4% of screen width
        color: '#333',
        fontWeight: 'bold',
    },
    checkoutButton: {
        marginTop: height * 0.03,        // 3% of screen height
        paddingVertical: height * 0.02,  // 2% of screen height
        paddingHorizontal: width * 0.08, // 8% of screen width
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    checkoutButtonText: {
        color: '#FFF',
        fontSize: width * 0.045,         // 4.5% of screen width
        fontWeight: 'bold',
        textAlign: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: height * 0.015,  // 1.5% of screen height
    },
    checkbox: {
        width: width * 0.06,             // 6% of screen width
        height: width * 0.06,            // 6% of screen width
        borderWidth: 2,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: width * 0.03,       // 3% of screen width
    },
    checkboxChecked: {
        backgroundColor: '#4CAF50',
    },
    checkmark: {
        color: '#FFF',
        fontSize: width * 0.04,          // 4% of screen width
    },
    checkboxLabel: {
        fontSize: width * 0.035,         // 3.5% of screen width
        color: '#333',
    },
    totalAddonsText: {
        fontSize: width * 0.04,          // 4% of screen width
        color: '#333',
        marginTop: height * 0.03,        // 3% of screen height
    },
    forgotPinText: {
        marginTop: height * 0.015,       // 1.5% of screen height
        fontSize: width * 0.04,          // 4% of screen width
        color: '#1e90ff',
    },
    itemImage: {
        width: width * 0.25,             // 25% of screen width
        height: width * 0.25,            // Keep it square
        marginBottom: height * 0.02,     // 2% of screen height
    },
    descriptionText: {
        fontSize: width * 0.05,          // 5% of screen width
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: height * 0.03,     // 3% of screen height
        textAlign: 'center',
    },
});
export default AddonitemToCart2;