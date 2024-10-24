import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, SafeAreaView, Button } from 'react-native'; // Import Button
import { Card } from 'react-native-paper';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import ProfileButton from './ProfileButton';
import CustomModal from './CustomModal';

const { width, height } = Dimensions.get('window');

const BillingSummary = ({ route, navigation }) => {
    const { cartId, visitorId, user } = route.params; // Ensure visitorId is included in route params
    const [data, setData] = useState(null);
    const [buyerDetails, setBuyerDetails] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    console.log('user', user);

    useEffect(() => {
        // Fetch cart data
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://kgv-backend.onrender.com/api/cart/item/${cartId}`);
                setData(response.data);
            } catch (error) {
                console.log('Error fetching cart data:', error);
            }
        };
        fetchData();
    }, [cartId]);

    useEffect(() => {
        // Fetch buyer details using visitorId
        const fetchBuyerDetails = async () => {
            try {
                const response = await axios.get(`https://kgv-backend.onrender.com/api/v1/visitor/details/${visitorId}`);
                setBuyerDetails(response.data.data[0]);
            } catch (error) {
                console.log('Error fetching buyer details:', error);
            }
        };
        if (visitorId) {
            fetchBuyerDetails();
        }
    }, [visitorId]);

    if (!data || !buyerDetails) {
        return <Text>Loading...</Text>;
    }

    const { cartItems } = data;

    const calculateTax = (price) => {
        const cgstRate = 0;
        const sgstRate = 0;
        const igstRate = 0.18; // 18%
        const cgst = price * cgstRate;
        const sgst = price * sgstRate;
        const igst = price * igstRate;
        return { cgst, sgst, igst };
    };

    const totalBeforeTax = cartItems.reduce((sum, item) => sum + item.item.totalPrice, 0);
    const totalTax = cartItems.reduce((sum, item) => {
        const { igst } = calculateTax(item.item.totalPrice);
        return sum + igst;
    }, 0);
    const totalAmount = totalBeforeTax + totalTax;

    const handleContinue = () => {
        const totalItems = cartItems.length;
        const userId = visitorId;
        navigation.navigate('BookingKit', { visitorId: userId, user, totalItems: totalItems, totalAmount, totalBeforeTax, totalTax });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Use the ProfileButton component */}
            <ProfileButton onPress={() => setModalVisible(true)} />
            <LinearGradient colors={['#06264D', '#FFF']} style={styles.gradientBackground}>
                {/* Heading Section */}
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Billing Details</Text>
                </View>

                {/* Details Section */}
                <Card style={styles.detailsCard}>
                    <View style={styles.detailsContainer}>
                        <View style={styles.detailsColumn}>
                            <Text style={styles.detailsTitle}>Buyer:</Text>
                            <Text style={styles.detailsText}>{buyerDetails.fullName}</Text>
                            <Text style={styles.detailsText}>{buyerDetails.address}</Text>
                            <Text style={styles.detailsText}>{buyerDetails.phoneNumber}</Text>
                        </View>
                    </View>
                </Card>

                {/* Table Section */}
                <ScrollView style={styles.tableContainer}>
                    <Card style={styles.tableCard}>
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>S.No</Text>
                            <Text style={styles.tableHeaderText}>Product Name</Text>
                            <Text style={styles.tableHeaderText}>Rate</Text>
                            <Text style={styles.tableHeaderText}>CGST</Text>
                            <Text style={styles.tableHeaderText}>SGST</Text>
                            <Text style={styles.tableHeaderText}>IGST</Text>
                            <Text style={styles.tableHeaderText}>Addons</Text>
                            <Text style={styles.tableHeaderText}>Total Amount</Text>
                        </View>
                        {cartItems.map((item, index) => {
                            const { igst } = calculateTax(item.item.totalPrice);
                            return (
                                <View key={item._id} style={styles.tableRow}>
                                    <Text style={styles.tableData}>{index + 1}</Text>
                                    <Text style={styles.tableData}>{item.item.name}</Text>
                                    <Text style={styles.tableData}>{item.item.kitPrice}</Text>
                                    <Text style={styles.tableData}>0%</Text>
                                    <Text style={styles.tableData}>0%</Text>
                                    <Text style={styles.tableData}>{(igst * 100 / item.item.totalPrice).toFixed(2)}%</Text>
                                    <View style={styles.addonsContainer}>
                                        {item.item.addons.map((addon) => (
                                            <Text key={addon._id} style={styles.addonText}>
                                                {addon.name} - ₹{addon.price}
                                            </Text>
                                        ))}
                                    </View>
                                    <Text style={styles.tableData}>{item.item.totalPrice}</Text>
                                </View>
                            );
                        })}
                    </Card>
                </ScrollView>

                {/* Footer Section */}
                <Card style={styles.footerCard}>
                    <View style={styles.footerContainer}>
                        <View style={styles.footerRow}>
                            <Text style={styles.footerLabel}>Total Before Tax:</Text>
                            <Text style={styles.footerValue}>₹{totalBeforeTax}</Text>
                        </View>
                        <View style={styles.footerRow}>
                            <Text style={styles.footerLabel}>Total Tax Amount:</Text>
                            <Text style={styles.footerValue}>₹{totalTax}</Text>
                        </View>
                        <View style={styles.footerRow}>
                            <Text style={styles.footerLabel}>Total Amount:</Text>
                            <Text style={styles.footerValue}>₹{totalAmount}</Text>
                        </View>
                    </View>
                </Card>

                {/* Continue Button */}
                <View style={styles.buttonContainer}>
                    <Button title="Continue" onPress={handleContinue} color="#0073e6" />
                </View>
            </LinearGradient>
            <CustomModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                navigation={navigation}
                user={user}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradientBackground: {
        flex: 1,
        paddingHorizontal: width * 0.05, // 5% of screen width
        paddingVertical: height * 0.02, // 2% of screen height
    },
    headingContainer: {
        alignItems: 'center',
        marginVertical: height * 0.01, // 1% of screen height
    },
    headingText: {
        fontSize: width * 0.06, // Scales with screen width
        fontWeight: 'bold',
        color: '#FFF',
    },
    detailsCard: {
        marginVertical: height * 0.01, // 1% of screen height
        borderRadius: 10,
        elevation: 2,
        padding: width * 0.04, // 4% of screen width
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailsColumn: {
        flex: 1,
        paddingHorizontal: width * 0.02, // 2% of screen width
    },
    detailsTitle: {
        fontSize: width * 0.04, // Scales with screen width
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    detailsText: {
        fontSize: width * 0.035, // Scales with screen width
        color: '#666',
        marginBottom: 3,
    },
    tableCard: {
        marginVertical: height * 0.01, // 1% of screen height
        borderRadius: 10,
        elevation: 2,
    },
    tableContainer: {
        flex: 1,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#0073e6',
        padding: width * 0.02, // 2% of screen width
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    tableHeaderText: {
        flex: 1,
        fontSize: width * 0.035, // Scales with screen width
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: width * 0.02, // 2% of screen width
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tableData: {
        flex: 1,
        fontSize: width * 0.035,
        color: '#333',
        textAlign: 'center',
    },
    addonsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addonText: {
        fontSize: width * 0.03, // Scales with screen width
        color: '#333',
    },
    footerCard: {
        marginVertical: height * 0.01, // 1% of screen height
        borderRadius: 10,
        elevation: 2,
        padding: width * 0.04, // 4% of screen width
        backgroundColor: '#0073e6',
    },
    footerContainer: {
        flexDirection: 'column',
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    footerLabel: {
        fontSize: width * 0.04, // Scales with screen width
        fontWeight: 'bold',
        color: '#ffffff',
    },
    footerValue: {
        fontSize: width * 0.04, // Scales with screen width
        // fontWeight: 'bold',
        color: '#ffffff',
    },
    buttonContainer: {
        marginTop: height * 0.02, // 2% of screen height
        alignItems: 'center',
    },
});

export default BillingSummary;