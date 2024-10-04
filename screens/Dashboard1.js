import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Dashboard1 = ({ route }) => {
    const { vehicleno } = route.params;
    const [products, setProducts] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchKits = async () => {
            try {
                const response = await axios.get('https://kgv-backend.onrender.com/api/kits/get');
                setProducts(response.data.data); 
            } catch (error) {
                console.log("Error fetching kits:", error);
            }
        };

        fetchKits();
    }, []);

    const renderProduct = ({ item }) => {
        // You can dynamically change the images and descriptions based on the product
        const imageSource = (item.name === 'HX1') ? require('../assets/images/cart3.png') :
                            (item.name === 'HX2') ? require('../assets/images/cart2.png') :
                            require('../assets/images/cart1.png');

        const description = (item.name === 'HX1') ? 'Discover how our innovative solutions infuse new life into discarded materials. Our Waste to Wealth initiative seamlessly combines sustainability with performance, providing riders with an eco-friendly ride. Explore the journey of every mile, showcasing the transformation of waste into valuable resources.' :
                            (item.name === 'HX2') ? 'Make your journey a blissful, joyful, pocket-friendly, eco-friendly, and stress-free with our HX-2 Series specially designed for the hustlers heroes.' :
                            'Prepare to take your bike adventures to new heights with our electrifying hybrid upgrade! Brace yourself for an exciting journey into the future as you seamlessly ride with sustainable fuel, making a positive impact on the climate along the way.';

        return (
            <View style={styles.productContainer}>
                <Image source={imageSource} style={styles.productImage} />
                <Text style={styles.productHeading}>{item.name}</Text>
                <Text style={styles.productDescription}>{description}</Text>
                <TouchableOpacity
                    style={styles.priceButton}
                    onPress={() => navigation.navigate('Recomanded', { vehicleno })}
                >
                    <Text style={styles.priceButtonText}>Price: {item.price}₹</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <LinearGradient colors={['#06264D', '#FFF']} style={styles.gradientBackground}>
            <View style={styles.container}>
                <View style={styles.nav}>
                    <View style={styles.textContainer}>
                      
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Recomanded', { vehicleno })}>
                        <Icon name="cart" size={30} color="#FFF" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.descriptionText}>
                    KGV is a smart e-mobility solution provider that aims to cater to the society as it reduces the immense burden on the middle and lower segment of the community by reducing the cost of commuting by more than 90%.
                </Text>

                <FlatList
                    data={products}
                    renderItem={renderProduct}
                    keyExtractor={item => item._id}
                    contentContainerStyle={styles.productList}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
    },
    nav: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
    },
    descriptionText: {
        paddingTop: 20,
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
        lineHeight: 24,
    },
    productList: {
        alignItems: 'center',
    },
    productContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
    },
    productImage: {
        width: 260,
        height: 180,
        marginBottom: 10,
    },
    productHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productDescription: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    priceButton: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    priceButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Dashboard1;


// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';

// const Dashboard1 = ({ route }) => {
//     const { vehicleno } = route.params;
//     const [products, setProducts] = useState([]);
//     const navigation = useNavigation();

//     useEffect(() => {
//         const fetchKits = async () => {
//             try {
//                 const response = await axios.get('https://kgv-backend.onrender.com/api/kits/get');
//                 setProducts(response.data.data); // Set the products from the API response
//             } catch (error) {
//                 console.log("Error fetching kits:", error);
//             }
//         };

//         fetchKits();
//     }, []);

//     const renderProduct = ({ item }) => (
//         <View style={styles.productContainer}>
//             {/* Use require with local images or handle dynamic URLs */}
//             <Image source={require('../assets/images/cart1.png')} style={styles.productImage} />
//             <Text style={styles.productHeading}>{item.name}</Text>
//             <Text style={styles.productDescription}>
//                 Description for {item.name} goes here.
//             </Text>
//             <TouchableOpacity
//                 style={styles.priceButton}
//                 onPress={() => navigation.navigate('Recomanded', { vehicleno })}
//             >
//                 <Text style={styles.priceButtonText}>Price: {item.cost}₹</Text>
//             </TouchableOpacity>
//         </View>
//     );

//     return (
//         <LinearGradient colors={['#06264D', '#FFF']} style={styles.gradientBackground}>
//             <View style={styles.container}>
//                 <View style={styles.nav}>
//                     <View style={styles.textContainer}>
//                         {/* Additional text or elements */}
//                     </View>
//                     <TouchableOpacity onPress={() => navigation.navigate('Recomanded', { vehicleno })}>
//                         <Icon name="cart" size={30} color="#FFF" />
//                     </TouchableOpacity>
//                 </View>

//                 <Text style={styles.descriptionText}>
//                     KGV is a smart e-mobility solution provider that aims to cater to the society as it reduces the immense burden on the middle and lower segment of the community by reducing the cost of commuting by more than 90%.
//                 </Text>

//                 <FlatList
//                     data={products}
//                     renderItem={renderProduct}
//                     keyExtractor={item => item._id}
//                     contentContainerStyle={styles.productList}
//                     showsVerticalScrollIndicator={false}
//                 />
//             </View>
//         </LinearGradient>
//     );
// };

// const styles = StyleSheet.create({
//     gradientBackground: {
//         flex: 1,
//     },
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingTop: 80,
//     },
//     nav: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         width: '100%',
//         paddingHorizontal: 20,
//         justifyContent: 'space-between',
//     },
//     textContainer: {
//         flex: 1,
//         alignItems: 'center',
//     },
//     descriptionText: {
//         paddingTop: 20,
//         fontSize: 18,
//         color: 'white',
//         textAlign: 'center',
//         paddingHorizontal: 20,
//         marginBottom: 20,
//         lineHeight: 24,
//     },
//     productList: {
//         alignItems: 'center',
//     },
//     productContainer: {
//         marginBottom: 20,
//         padding: 15,
//         backgroundColor: '#f8f8f8',
//         borderRadius: 10,
//         width: '100%',
//         maxWidth: 400,
//         alignItems: 'center',
//     },
//     productImage: {
//         width: 260,
//         height: 180,
//         marginBottom: 10,
//     },
//     productHeading: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 5,
//     },
//     productDescription: {
//         fontSize: 16,
//         textAlign: 'center',
//         marginBottom: 10,
//     },
//     priceButton: {
//         backgroundColor: 'green',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 5,
//     },
//     priceButtonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default Dashboard1;


// import React from 'react';
// import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
// import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons for icons
// import { useNavigation } from '@react-navigation/native';

// const Dashboard1 = ({ route }) => {
//     const { vehicleno } = route.params;
//     const navigation = useNavigation();
    
//     console.log(vehicleno)

//     const products = [
//         { id: '1', image: require('../assets/images/cart1.png'), price:'45000₹', heading: 'KGV HX3', description: 'Prepare to take your bike adventures to new heights with our electrifying hybrid upgrade! Brace yourself for an exciting journey into the future as you seamlessly ride with sustainable fuel, making a positive impact on the climate along the way.' },
//         { id: '2', image: require('../assets/images/cart2.png'), price:'39000₹', heading: 'KGV HX2', description: 'Make your journey a blissful, joyful , pocket-friendly,eco-friendly and stressfree with our HX-2 Series specially designed for the hustlers heroes' },
//         { id: '3', image: require('../assets/images/cart3.png'), price:'38000₹', heading: 'KGV HX1', description: 'Discover how our innovative solutions infuse new life into discarded materials. Our Waste to Wealth initiative seamlessly combines sustainability with performance, providing riders with an eco-friendly ride. Explore the journey of every mile, showcasing the transformation of waste into valuable resources. Join us in our mission to smart e-mobility hybrid revolution for a cleaner,brighter future.' },
//     ];

//     const renderProduct = ({ item }) => (
//         <View style={styles.productContainer}>
//             <Image source={item.image} style={styles.productImage} />
//             <Text style={styles.productHeading}>{item.heading}</Text>
//             <Text style={styles.productDescription}>{item.description}</Text>
//             <TouchableOpacity style={styles.priceButton} onPress={() => navigation.navigate('Recomanded', {vehicleno})}>
//                 <Text style={styles.priceButtonText}>Price: {item.price}</Text>
//             </TouchableOpacity>
//         </View>
//     );

//     return (
//         <LinearGradient colors={['#06264D', '#FFF']} style={styles.gradientBackground}>
//             <View style={styles.container}>
//                 <View style={styles.nav}>
//                     <View style={styles.textContainer}>
                      
//                     </View>
//                     <TouchableOpacity onPress={() => navigation.navigate('Recomanded', {vehicleno})}>
//                         <Icon name="cart" size={30} color="#FFF"  />
//                     </TouchableOpacity>
//                 </View>

//                 <Text style={styles.descriptionText}>
//                     KGV is a smart e-mobility solution provider that aims to cater to the society as it reduces the immense burden on the middle and lower segment of the community by reducing the cost of commuting by more than 90%.
//                 </Text>

//                 <FlatList
//                     data={products}
//                     renderItem={renderProduct}
//                     keyExtractor={item => item.id}
//                     contentContainerStyle={styles.productList}
//                     showsVerticalScrollIndicator={false}
//                 />
//             </View>
//         </LinearGradient>
//     );
// };

// const styles = StyleSheet.create({
//     gradientBackground: {
//         flex: 1,
//     },
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingTop: 80,
//     },
//     nav: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         width: '100%',
//         paddingHorizontal: 20,
//         justifyContent: 'space-between', // Distributes space between text and cart icon
//     },
//     textContainer: {
//         flex: 1, // Takes up available space to center the text
//         alignItems: 'center',
//     },
//     welcomeText: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: 'white',
//     },
//     descriptionText: {
//         paddingTop: 20, // Adjusted paddingTop
//         fontSize: 18,
//         color: 'white',
//         textAlign: 'center',
//         paddingHorizontal: 20,
//         marginBottom: 20,
//         lineHeight: 24,
//     },
//     productList: {
//         alignItems: 'center',
//     },
//     productContainer: {
//         marginBottom: 20,
//         padding: 15,
//         backgroundColor: '#f8f8f8',
//         borderRadius: 10,
//         width: '100%',
//         maxWidth: 400,
//         alignItems: 'center',
//     },
//     productImage: {
//         width: 260,
//         height: 180,
//         marginBottom: 10,
//     },
//     productHeading: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 5,
//     },
//     productDescription: {
//         fontSize: 16,
//         textAlign: 'center',
//         marginBottom: 10,
//     },
//     priceButton: {
//         backgroundColor: 'green',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 5,
//     },
//     priceButtonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default Dashboard1;



// import React from 'react';
// import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
// import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons for icons
// import { useNavigation } from '@react-navigation/native';

// const Dashboard1 = ({ route }) => {
//     const { user } = route.params;
//     const navigation = useNavigation();
    
//     console.log('Received user in Dashboard1:', user);

//     const products = [
//         { id: '1', image: require('../assets/images/cart1.png'), heading: 'KGV HX3', description: 'Prepare to take your bike adventures to new heights with our electrifying hybrid upgrade! Brace yourself for an exciting journey into the future as you seamlessly ride with sustainable fuel, making a positive impact on the climate along the way.' },
//         { id: '2', image: require('../assets/images/cart2.png'), heading: 'KGV HX2', description: 'Make your journey a blissful, joyful , pocket-friendly,eco-friendly and stressfree with our HX-2 Series specially designed for the hustlers heroes' },
//         { id: '3', image: require('../assets/images/cart3.png'), heading: 'KGV HX1', description: 'Discover how our innovative solutions infuse new life into discarded materials. Our Waste to Wealth initiative seamlessly combines sustainability with performance, providing riders with an eco-friendly ride. Explore the journey of every mile, showcasing the transformation of waste into valuable resources. Join us in our mission to smart e-mobility hybrid revolution for a cleaner,brighter future.' },
//     ];

//     const renderProduct = ({ item }) => (
//         <View style={styles.productContainer}>
//             <Image source={item.image} style={styles.productImage} />
//             <Text style={styles.productHeading}>{item.heading}</Text>
//             <Text style={styles.productDescription}>{item.description}</Text>
//         </View>
//     );

//     return (
//         <LinearGradient colors={['#06264D', '#FFF']} style={styles.gradientBackground}>
//             <View style={styles.container}>
//                 <View style={styles.nav}>
//                     <View style={styles.textContainer}>
//                         <Text style={styles.welcomeText}>Welcome, {user?.data?.name}!</Text>
//                     </View>
//                     <TouchableOpacity onPress={() => navigation.navigate('Kyc1')}>
//                         <Icon name="cart" size={30} color="#FFF"  />
//                     </TouchableOpacity>
//                 </View>

//                 <Text style={styles.descriptionText}>
//                     KGV is a smart e-mobility solution provider that aims to cater to the society as it reduces the immense burden on the middle and lower segment of the community by reducing the cost of commuting by more than 90%.
//                 </Text>

//                 <FlatList
//                     data={products}
//                     renderItem={renderProduct}
//                     keyExtractor={item => item.id}
//                     contentContainerStyle={styles.productList}
//                     showsVerticalScrollIndicator={false}
//                 />
//             </View>
//         </LinearGradient>
//     );
// };

// const styles = StyleSheet.create({
//     gradientBackground: {
//         flex: 1,
//     },
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingTop: 80,
//     },
//     nav: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         width: '100%',
//         paddingHorizontal: 20,
//         justifyContent: 'space-between', // Distributes space between text and cart icon
//     },
//     textContainer: {
//         flex: 1, // Takes up available space to center the text
//         alignItems: 'center',
//     },
//     welcomeText: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: 'white',
//     },
//     descriptionText: {
//         paddingTop: 20, // Adjusted paddingTop
//         fontSize: 18,
//         color: 'white',
//         textAlign: 'center',
//         paddingHorizontal: 20,
//         marginBottom: 20,
//         lineHeight: 24,
//     },
//     productList: {
//         alignItems: 'center',
//     },
//     productContainer: {
//         marginBottom: 20,
//         padding: 15,
//         backgroundColor: '#f8f8f8',
//         borderRadius: 10,
//         width: '100%',
//         maxWidth: 400,
//         alignItems: 'center',
//     },
//     productImage: {
//         width: 260,
//         height: 180,
//         marginBottom: 10,
//     },
//     productHeading: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 5,
//     },
//     productDescription: {
//         fontSize: 16,
//         textAlign: 'center',
//     },
// });

// export default Dashboard1;

// import React from 'react';
// import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
// import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons for icons
// import { useNavigation } from '@react-navigation/native';

// const Dashboard1 = ({ route }) => {
//     const { user } = route.params;
//     const navigation = useNavigation();
    
//     console.log('Received user in Dashboard1:', user);

//     const products = [
//       { id: '1', image: require('../assets/images/cart1.png'), heading: 'KGV HX3', description: 'Prepare to take your bike adventures to new heights with our electrifying hybrid upgrade! Brace yourself for an exciting journey into the future as you seamlessly ride with sustainable fuel, making a positive impact on the climate along the way.' },
//       { id: '2', image: require('../assets/images/cart2.png'), heading: 'KGV HX2', description: 'Are you passionate about cycling and interested in bringing the joy of riding KGV hybrid bikes to your community? Join us as a distributor and be a part of our journey to redefine urban commuting!' },
//       { id: '3', image: require('../assets/images/cart3.png'), heading: 'KGV HX1', description: 'Are you passionate about cycling and interested in bringing the joy of riding KGV hybrid bikes to your community? Join us as a distributor and be a part of our journey to redefine urban commuting!' },
//   ];

//     const renderProduct = ({ item }) => (
//         <View style={styles.productContainer}>
//             <Image source={item.image} style={styles.productImage} />
//             <Text style={styles.productDescription}>{item.description}</Text>
//         </View>
//     );

//     return (
//         <LinearGradient colors={['#06264D', '#FFF']} style={styles.gradientBackground}>
//             <View style={styles.container}>
//                 <View style={styles.nav}>
//                     <View style={styles.textContainer}>
//                         <Text style={styles.welcomeText}>Welcome, {user?.data?.name}!</Text>
//                     </View>
//                     <TouchableOpacity onPress={() => navigation.navigate('Kyc1')}>
//                         <Icon name="cart" size={30} color="#FFF"  />
//                     </TouchableOpacity>
//                 </View>

//                 <Text style={styles.descriptionText}>KGV is a smart e-mobility solution provider that aims to cater to the society as it reduces the immense burden on the middle and lower segment of the community by reducing the cost of commuting by more than 90%.</Text>
//                 <FlatList
//                     data={products}
//                     renderItem={renderProduct}
//                     keyExtractor={item => item.id}
//                     contentContainerStyle={styles.productList}
//                     showsVerticalScrollIndicator={false}
//                 />
//             </View>
//         </LinearGradient>
//     );
// };

// const styles = StyleSheet.create({
//     gradientBackground: {
//         flex: 1,
//     },
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingTop: 80,
//     },
//     nav: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         width: '100%',
//         paddingHorizontal: 20,
//         justifyContent: 'space-between', // Distributes space between text and cart icon
//     },
//     textContainer: {
//         flex: 1, // Takes up available space to center the text
//         alignItems: 'center',
//     },
//     welcomeText: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: 'white', // Assuming you want white text on a red background
//     },
//     descriptionText: {
//       paddingTop: 80,
//       fontSize: 18,
//       color: 'white',
//       textAlign: 'center', // Center-align text
//       paddingHorizontal: 20, // Add padding to the left and right
//       marginBottom: 20,
//       lineHeight: 24, // Optional: Adjust line height for better readability
//   },
//     productList: {
//         alignItems: 'center',
//     },
//     productContainer: {
//         marginBottom: 20,
//         padding: 15,
//         backgroundColor: '#f8f8f8',
//         borderRadius: 10,
//         width: '100%',
//         maxWidth: 400,
//         alignItems: 'center',
//     },
//     productImage: {
//         width: 260,
//         height: 150,
//         marginBottom: 10,
//     },
//     productDescription: {
//         fontSize: 16,
//         textAlign: 'center',
//     },
// });

// export default Dashboard1;


// import React from 'react';
// import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons for icons
// import { useNavigation } from '@react-navigation/native';

// const Dashboard1 = ({ route }) => {
//     const { user } = route.params;
//     const navigation = useNavigation();
    
//     console.log('Received user in Dashboard1:', user);

//     const products = [
//         { id: '1', image: require('../assets/images/kgv.png'), description: 'Are you passionate about cycling and interested in bringing the joy of riding KGV hybrid bikes to your community? Join us as a distributor and be a part of our journey to redefine urban commuting!' },
//         { id: '2', image: require('../assets/images/kgv.png'), description: 'Are you passionate about cycling and interested in bringing the joy of riding KGV hybrid bikes to your community? Join us as a distributor and be a part of our journey to redefine urban commuting!' },
//         { id: '3', image: require('../assets/images/kgv.png'), description: 'Are you passionate about cycling and interested in bringing the joy of riding KGV hybrid bikes to your community? Join us as a distributor and be a part of our journey to redefine urban commuting!' },
//     ];

//     const renderProduct = ({ item }) => (
//         <View style={styles.productContainer}>
//             <Image source={item.image} style={styles.productImage} />
//             <Text style={styles.productDescription}>{item.description}</Text>
//         </View>
//     );

//     return (
//         <View style={styles.container}>
//             <View style={styles.nav}>
//                 <View style={styles.textContainer}>
//                     <Text style={styles.welcomeText}>Welcome, {user?.data?.name}!</Text>
//                 </View>
//                 <TouchableOpacity onPress={() => navigation.navigate('Kyc1')}>
//                     <Icon name="cart" size={30} color="#000" />
//                 </TouchableOpacity>
//             </View>

//             <Text style={styles.descriptionText}>Are you passionate about cycling and interested in bringing the joy of riding KGV hybrid bikes to your community? Join us as a distributor and be a part of our journey to redefine urban commuting!</Text>
//             <FlatList
//                 data={products}
//                 renderItem={renderProduct}
//                 keyExtractor={item => item.id}
//                 contentContainerStyle={styles.productList}
//                 showsVerticalScrollIndicator={false}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingTop: 80,
//     },
//     nav: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         width: '100%',
//         paddingHorizontal: 20,
//         justifyContent: 'space-between', // Distributes space between text and cart icon
//     },
//     textContainer: {
//         flex: 1, // Takes up available space to center the text
//         alignItems: 'center',
//     },
//     welcomeText: {
//         fontSize: 24,
//         fontWeight: 'bold',
       
//     },
//     descriptionText: {
//         fontSize: 18,
//         marginBottom: 20,
//         textAlign: 'center',
//     },
//     productList: {
//         alignItems: 'center',
//     },
//     productContainer: {
//         marginBottom: 20,
//         padding: 15,
//         backgroundColor: '#f8f8f8',
//         borderRadius: 10,
//         width: '100%',
//         maxWidth: 400,
//         alignItems: 'center',
//     },
//     productImage: {
//         width: 150,
//         height: 150,
//         marginBottom: 10,
//     },
//     productDescription: {
//         fontSize: 16,
//         textAlign: 'center',
//     },
// });

// export default Dashboard1;


// import React from 'react';
// import { View, Text, StyleSheet, FlatList, Image,TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';
// const Dashboard1 = ({ route }) => {
//     const { user } = route.params;
//     const navigation = useNavigation();
//     console.log('Received user in Dashboard1:', user);

//     const products = [
//         { id: '1', image: require('../assets/images/kgv.png'), description: 'Are you passionate about cycling and interested in bringing the joy of riding KGV hybrid bikes to your community? Join us as a distributor and be a part of our journey to redefine urban commuting!' },
//         { id: '2', image: require('../assets/images/kgv.png'), description: 'Are you passionate about cycling and interested in bringing the joy of riding KGV hybrid bikes to your community? Join us as a distributor and be a part of our journey to redefine urban commuting!' },
//         { id: '3', image: require('../assets/images/kgv.png'), description: 'Are you passionate about cycling and interested in bringing the joy of riding KGV hybrid bikes to your community? Join us as a distributor and be a part of our journey to redefine urban commuting!' },
//     ];

//     const renderProduct = ({ item }) => (
//         <View style={styles.productContainer}>
//             <Image source={item.image} style={styles.productImage} />
//             <Text style={styles.productDescription}>{item.description}</Text>
//         </View>
//     );

//     return (
//         <View style={styles.container}>
//           <View  style={styles.nav}>
//           <Text style={styles.welcomeText}>Welcome, {user?.data?.name}!</Text>
//                 <TouchableOpacity onPress={() => navigation.navigate('Kyc1')}>
//                 <Icon name="cart" size={30} color="#000" />
//                 </TouchableOpacity>
//           </View>
        
//             <Text style={styles.descriptionText}>Are you passionate about cycling and interested in bringing the joy of riding KGV hybrid bikes to your community? Join us as a distributor and be a part of our journey to redefine urban commuting!</Text>
//             <FlatList
//                 data={products}
//                 renderItem={renderProduct}
//                 keyExtractor={item => item.id}
//                 contentContainerStyle={styles.productList}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingTop: 80,
//     },
//     welcomeText: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         backgroundColor: 'red',
        
//     },
//     nav: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       width: '100%',
//       paddingHorizontal: 20,
//       backgroundColor: 'red',
      
//   },
//     descriptionText: {
//         fontSize: 18,
//         marginBottom: 20,
//         textAlign: 'center',
//     },
//     productList: {
//         alignItems: 'center',
//     },
//     productContainer: {
//         marginBottom: 20,
//         padding: 15,
//         backgroundColor: '#f8f8f8',
//         borderRadius: 10,
//         width: '100%',
//         maxWidth: 400,
//         alignItems: 'center',
//     },
//     productImage: {
//         width: 150,
//         height: 150,
//         marginBottom: 10,
//     },
//     productDescription: {
//         fontSize: 16,
//         textAlign: 'center',
//     },
// });

// export default Dashboard1;


// import React from 'react';
// import { View, Text, StyleSheet, FlatList } from 'react-native';

// const Dashboard1 = ({ route }) => {
//     const { user } = route.params;
    
//     console.log('Received user in Dashboard1:', user);

//     const products = [
//         { id: '1', name: 'Product 1', description: 'Are you passionate about cycling and interested in bringing the joy of riding KGV hybrid bikes to your community? Join us as a distributor and be a part of our journey to redefine urban commuting!' },
//         { id: '2', name: 'Product 2', description: 'Are you passionate about cycling and interested in bringing the joy of riding KGV hybrid bikes to your community? Join us as a distributor and be a part of our journey to redefine urban commuting!' },
//         { id: '3', name: 'Product 3', description: 'Are you passionate about cycling and interested in bringing the joy of riding KGV hybrid bikes to your community? Join us as a distributor and be a part of our journey to redefine urban commuting!' },
//     ];

//     const renderProduct = ({ item }) => (
//         <View style={styles.productContainer}>
//             <Text style={styles.productName}>{item.name}</Text>
//             <Text style={styles.productDescription}>{item.description}</Text>
//         </View>
//     );

//     return (
//         <View style={styles.container}>
//             <Text style={styles.welcomeText}>Welcome, {user?.data?.name}!</Text>
//             <Text style={styles.descriptionText}>Are you passionate about cycling and interested in bringing the joy of riding KGV hybrid bikes to your community? Join us as a distributor and be a part of our journey to redefine urban commuting!:</Text>
//             <FlatList
//                 data={products}
//                 renderItem={renderProduct}
//                 keyExtractor={item => item.id}
//                 contentContainerStyle={styles.productList}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: 60,
//     },
//     welcomeText: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         backgroundColor: 'green',
//     },
//     descriptionText: {
//         fontSize: 18,
//         marginTop: 60,
//         textAlign: 'center',
//         backgroundColor: 'red',
//     },
//     productList: {
//         alignItems: 'center',
//         backgroundColor: 'blue',
//         marginTop: 60,
//     },
//     productContainer: {
//         marginBottom: 20,
//         padding: 15,
//         backgroundColor: '#f8f8f8',
//         borderRadius: 10,
//         width: '100%',
//         maxWidth: 400,
//         alignItems: 'center',
//     },
//     productName: {
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
//     productDescription: {
//         fontSize: 16,
//         textAlign: 'center',
//         marginTop: 5,
//     },
// });

// export default Dashboard1;



// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const Dashboard1 = ({ route }) => {
//     const { user } = route.params;
    
//     console.log('Received user in Dashboard1:', user);

//     return (
//         <View style={styles.container}>
//             <Text style={styles.welcomeText}>Welcome, {user?.data?.name}!</Text>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     welcomeText: {
//         fontSize: 24,
//         fontWeight: 'bold'
//     }
// });

// export default Dashboard1;

