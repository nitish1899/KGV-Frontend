import React, { useState } from 'react';
import { View, Text, Alert, ScrollView, Image, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const scaleWidth = (size) => (width / 375) * size; // 375 is base screen width (iPhone X)
const scaleHeight = (size) => (height / 812) * size; // 812 is base screen height (iPhone X)

const PaymentImageUpload1 = ({ route }) => {
  const { formData, amount, visitorId, cartId } = route.params;
  const navigation = useNavigation();

  const [images, setImages] = useState([]);
  const [visitorIdState, setVisitorId] = useState(visitorId || '');
  const [cartIdState, setCartId] = useState(cartId || '');
  const [amountState, setAmount] = useState(amount || '');

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
    formData.append('cartId', cartIdState);
    formData.append('amount', amountState);

    try {
      const response = await axios.post('https://kgv-backend.onrender.com/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Success', response.data.message);
      setImages([]);
      setVisitorId('');
      setCartId('');
      setAmount('');

      navigation.navigate("KitBookingPaymentSuccess1", {
        paymentProofId: response.data.data._id,
        userId: visitorId,
        contestParticipation: false
      });
    } catch (error) {
      console.log('Upload error:', error.response ? error.response.data : error.message);
      Alert.alert('Error', error.response?.data?.message || 'An error occurred during the upload');
    }
  };

  return (
    <LinearGradient colors={['#3b6e33', '#fff']} style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Payment Information</Text>
          </View>

          <View style={styles.imageContainer}>
            <Text style={styles.text}>Pay using the following details and submit the receipt below:</Text>
            <Text style={styles.text}>Scan the QR code to make a payment:</Text>
            <Image source={require("../assets/images/scanner.png")} style={styles.qrImage} />

            <Text style={styles.text}>UPI Transfer Details:</Text>
            <View style={styles.card}>
              <Text style={styles.cardText}>UPI ID: KGVL@sbi</Text>
            </View>
            <Text style={styles.text}>Bank Transfer Details:</Text>
            <View style={styles.card}>
              <Text style={styles.cardText}>Bank Account No: 00000042073223703</Text>
              <Text style={styles.cardText}>IFSC Code: SBIN0004381</Text>
            </View>
            <Text style={styles.amountText}>Your payable amount is ₹{amountState} for booking:</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleImagePicker}>
              <Text style={styles.buttonText}>Select Images</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.imagePreviewContainer}>
            {images.map((image, index) => (
              <Image key={index} source={{ uri: image.uri }} style={styles.uploadedImage} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: scaleWidth(20),
  },
  headingContainer: {
    alignItems: 'center',
    marginVertical: scaleHeight(15),
  },
  headingText: {
    fontSize: scaleWidth(28),
    fontWeight: 'bold',
    color: '#fff',
  },
  imageContainer: {
    marginTop: scaleHeight(10),
  },
  text: {
    fontSize: scaleWidth(16),
    marginBottom: scaleHeight(10),
    color: '#fff',
    textAlign: 'center',
  },
  qrImage: {
    width: '100%',
    height: scaleHeight(250),
    resizeMode: 'contain',
    marginVertical: scaleHeight(15),
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: scaleHeight(15),
    paddingHorizontal: scaleWidth(20),
    borderRadius: 10,
    marginBottom: scaleHeight(15),
    elevation: 3,
  },
  cardText: {
    fontSize: scaleWidth(16),
    color: '#333',
    fontWeight: '500',
  },
  amountText: {
    fontSize: scaleWidth(16),
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: scaleHeight(10),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: scaleHeight(20),
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: scaleHeight(15),
    paddingHorizontal: scaleWidth(30),
    borderRadius: 25,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: scaleWidth(16),
    fontWeight: '600',
    textAlign: 'center',
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginVertical: scaleHeight(20),
  },
  uploadedImage: {
    width: scaleWidth(200),
    height: scaleHeight(200),
    margin: scaleWidth(10),
    borderRadius: 10,
    resizeMode: 'cover',
  },
});

export default PaymentImageUpload1;



// import React, { useState } from 'react';
// import { View, Text, Alert, ScrollView, Image, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import axios from 'axios';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useNavigation } from '@react-navigation/native';

// const { width, height } = Dimensions.get('window');

// const scaleWidth = (size) => (width / 375) * size; // 375 is base screen width (iPhone X)
// const scaleHeight = (size) => (height / 812) * size; // 812 is base screen height (iPhone X)

// const PaymentImageUpload1 = ({ route }) => {
//   // Destructure parameters from the route
//   const { formData, amount, visitorId, cartId } = route.params;
//   const navigation = useNavigation();

//   const [images, setImages] = useState([]);
//   const [visitorIdState, setVisitorId] = useState(visitorId || '');
//   const [cartIdState, setCartId] = useState(cartId || '');
//   const [amountState, setAmount] = useState(amount || '');

//   const handleImagePicker = () => {
//     launchImageLibrary(
//       { mediaType: 'photo', quality: 1, selectionLimit: 4 },
//       (response) => {
//         if (response.didCancel) {
//           console.log('User cancelled image picker');
//         } else if (response.error) {
//           console.log('ImagePicker Error: ', response.error);
//         } else if (response.assets) {
//           setImages(response.assets); // Set the selected images
//         }
//       }
//     );
//   };

//   const handleSubmit = async () => {
//     if (!visitorIdState || !cartIdState || !amountState || images.length === 0) {
//       Alert.alert('Please upload image after payments.');
//       return;
//     }

//     const formData = new FormData();
//     images.forEach((image, index) => {
//       formData.append('images', {
//         uri: image.uri,
//         name: image.fileName || `image${index + 1}`.jpg,
//         type: image.type,
//       });
//     });

//     formData.append('visitorId', visitorIdState);
//     formData.append('cartId', cartIdState);
//     formData.append('amount', amountState);

//     try {
//       const response = await axios.post('https://kgv-backend.onrender.com/api/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       Alert.alert('Success', response.data.message);
//       setImages([]);
//       setVisitorId('');
//       setCartId('');
//       setAmount('');

//       navigation.navigate("KitBookingPaymentSuccess1", {
//         paymentProofId: response.data.data._id,
//         userId: visitorId,
//         contestParticipation: false
//       });
//     } catch (error) {
//       console.log('Upload error:', error.response ? error.response.data : error.message);
//       Alert.alert('Error', error.response?.data?.message || 'An error occurred during the upload');
//     }
//   };


//   return (
//     <LinearGradient colors={['#545a2c', '#FFF']} style={{ flex: 1 }}>
//       <SafeAreaView style={{ flex: 1, padding: 40 }}>
//         <View style={styles.headingContainer}>
//           <Text style={styles.headingText}>Payment Information</Text>
//         </View>

//         <ScrollView>
//           <View style={styles.imageContainer}>
//             <Text style={styles.text}>Pay using the following details and submit the reciept below:</Text>
//             <Text style={styles.text}>Scan the QR code to make a payment:</Text>
//             <Image
//               source={require("../assets/images/scanner.png")}
//               style={styles.image}
//             />

//             <Text style={styles.text}>UPI Transfer Details:</Text>
//             <View style={styles.card}>
//               <Text style={styles.text1}>UPI ID : KGVL@sbi</Text>
//             </View>
//             <Text style={styles.text}>Bank Transfer Details:</Text>
//             <View style={styles.card}>
//               <Text style={styles.text1}>Bank Account No : 00000042073223703</Text>
//               <Text style={styles.text1}>IFSC Code : SBIN0004381</Text>

//             </View>
//             <Text style={styles.text2}>Your payable amount is ₹{amount} for booking:</Text>
//           </View>

//           {/* <Button title="Select Images" onPress={handleImagePicker} />
//       <Button title="Upload" onPress={handleSubmit} /> */}

//           <View style={styles.container}>

//             <TouchableOpacity style={styles.button} onPress={handleImagePicker}>
//               <Text style={styles.buttonText}>Select Images</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//               <Text style={styles.buttonText}>Submit</Text>
//             </TouchableOpacity>
//           </View>
//           {/* Display selected images */}
//           <View style={styles.imageContainer}>
//             {images.map((image, index) => (
//               <Image
//                 key={index}
//                 source={{ uri: image.uri }}
//                 style={styles.image}
//               />
//             ))}
//           </View>
//         </ScrollView>


//       </SafeAreaView>
//     </LinearGradient>
//   );
// };


// const styles = StyleSheet.create({
//   gradientBackground: {
//     flex: 1,
//   },
//   input: {
//     borderWidth: 1,
//     marginBottom: scaleHeight(10),
//     padding: scaleWidth(10),
//   },
//   imageContainer: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     marginTop: scaleHeight(20),

//   },
//   image: {
//     width: '100%',  // Full width
//     height: '100%', // Full height
//     resizeMode: 'contain', // Keeps the aspect ratio
//   },
//   // image: {
//   //   width: scaleWidth(250),
//   //   height: scaleHeight(280),
//   //   margin: scaleWidth(5),
//   // },
//   text: {
//     fontSize: scaleWidth(16),
//     marginBottom: scaleHeight(10),
//     marginTop: scaleHeight(10),
//     color: '#FFF',
//   },
//   text2: {
//     fontSize: scaleWidth(16),
//     marginBottom: scaleHeight(10),
//     marginTop: scaleHeight(10),
//     color: '#FFF',
//     fontWeight: 'bold',
//   },
//   headingContainer: {
//     alignItems: 'center',
//     marginVertical: scaleHeight(10),
//   },
//   headingText: {
//     fontSize: scaleWidth(28),
//     fontWeight: 'bold',
//     color: '#FFF',
//   },
//   card: {
//     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//     padding: scaleWidth(20),
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: scaleHeight(2),
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 3.84,
//     elevation: 5,
//     margin: scaleWidth(10),
//   },
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     margin: scaleWidth(20),
//     marginBottom: scaleWidth(10),
//   },
//   button: {
//     backgroundColor: '#6200EE',
//     padding: scaleWidth(15),
//     borderRadius: scaleWidth(5),
//     elevation: 3,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: scaleWidth(16),
//     textAlign: 'center',
//   },
// });

// export default PaymentImageUpload1;