import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, Image, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';


const PaymentImageUpload = ({ route }) => {
  // Destructure parameters from the route
  const { amount, visitorId, cartId } = route.params;

  const [images, setImages] = useState([]);
  const [visitorIdState, setVisitorId] = useState(visitorId || '');
  const [cartIdState, setCartId] = useState(cartId || '');
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
    if (!visitorIdState || !cartIdState || !amountState || images.length === 0) {
      Alert.alert('Please fill all fields and select images.');
      return;
    }

    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append('images', {
        uri: image.uri,
        name: image.fileName || `image${index + 1}.jpg`,
        type: image.type,
      });
    });

    formData.append('visitorId', visitorIdState);
    formData.append('cartId', cartIdState);
    formData.append('amount', amountState);
    formData.append('paymentFor', 'KitBooking');

    try {
      const response = await axios.post('http://192.168.1.30:8005/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Success', response.data.message);
      setImages([]);
      setVisitorId('');
      setCartId('');
      setAmount('');
      // console.log('respose data other paymet', response.data.data);
      // navigation.navigate("OtherPaymentSuccess", { orderId: response.data.data._id });
    } catch (error) {
      console.error('Upload error:', error.response ? error.response.data : error.message);
      Alert.alert('Error', error.response?.data?.message || 'An error occurred during the upload');
    }
  };


  return (
    <LinearGradient colors={['#06264D', '#FFF']} style={styles.gradientBackground}>
      <ScrollView style={{ padding: 20 }}>

        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/kgv1.png")} // Keep one image
            style={styles.image}
          />
          <Text style={styles.text}>This is the first text element.</Text>
          <Text style={styles.text}>This is the second text element.</Text>
        </View>

        <Button title="Select Images" onPress={handleImagePicker} />
        <Button title="Upload" onPress={handleSubmit} />

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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  imageContainer: {
    flexDirection: 'column', // Stack images vertically
    alignItems: 'center', // Center images horizontally
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    margin: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10, // Space between text elements
    marginTop: 10, // Space between text elements
  },
});

export default PaymentImageUpload;