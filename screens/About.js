import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView,TouchableOpacity, Linking } from 'react-native';


{/* <ProfileCard
  name="John Doe"
  photo="https://via.placeholder.com/150"
  experience="5 years"
  profile="Software Engineer"
/>  */}

const ProfileCard = () => {

  const handleEmailPress = () => {
    Linking.openURL('mailto:example@example.com');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:+1234567890');
  };

  const handleAddressPress = () => {
    const address = 'NSP, Delhi, India';
    const encodedAddress = encodeURIComponent(address);
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`);
  };

  return (
     <>
<Text style={styles.heading}>Advisory Board</Text>
<Text style={styles.subHeading}>Green Earth Paper and Pulp</Text>
<Text style={styles.subSubHeading}>Board Of Directors</Text>
{/* <Text style={styles.heading}>Advisory Board</Text>
<Text style={styles.subHeading}>Green Earth Paper and Pulp</Text>
<Text style={styles.subSubHeading}>Board Of Directors</Text> */}
    <ScrollView>
    <View style={styles.card}>
      <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.photo} />
      <View style={styles.details}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.experience}>Experience: 2yrs</Text>
        <Text style={styles.profile}>Profile: CEO</Text>
      </View>
    </View>

    <View style={styles.card}>
      <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.photo} />
      <View style={styles.details}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.experience}>Experience: 2yrs</Text>
        <Text style={styles.profile}>Profile: CEO</Text>
      </View>
    </View>

    <View style={styles.card}>
      <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.photo} />
      <View style={styles.details}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.experience}>Experience: 2yrs</Text>
        <Text style={styles.profile}>Profile: CEO</Text>
      </View>
    </View>

    <View style={styles.card}>
      <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.photo} />
      <View style={styles.details}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.experience}>Experience: 2yrs</Text>
        <Text style={styles.profile}>Profile: CEO</Text>
      </View>
    </View>

    <View style={styles.card}>
      <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.photo} />
      <View style={styles.details}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.experience}>Experience: 2yrs</Text>
        <Text style={styles.profile}>Profile: CEO</Text>
      </View>
    </View>

    <View style={styles.card}>
      <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.photo} />
      <View style={styles.details}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.experience}>Experience: 2yrs</Text>
        <Text style={styles.profile}>Profile: CEO</Text>
      </View>
    </View>

    <View style={styles.card}>
      <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.photo} />
      <View style={styles.details}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.experience}>Experience: 2yrs</Text>
        <Text style={styles.profile}>Profile: CEO</Text>
      </View>
    </View>
    </ScrollView>

    {/* <View style={styles.footer}>
      <Text style={styles.text}>Contact: +1234567890</Text>
      <Text style={styles.text}>Email: example@example.com</Text>
      <Text style={styles.text}>Address: 123 Street, City, Country</Text>
    </View> */}

<View style={styles.footer}>
      <TouchableOpacity onPress={handlePhonePress}>
        <Text style={styles.link}>Contact: +1234567890</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEmailPress}>
        <Text style={styles.link}>Email: example@example.com</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAddressPress}>
        <Text style={[styles.text, { color: 'blue', textDecorationLine: 'underline' }]}>Address: NSP, Delhi, India</Text>
      </TouchableOpacity>
    </View>
    
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  experience: {
    fontSize: 16,
    marginBottom: 5,
  },
  profile: {
    fontSize: 16,
  },
  heading: {
    paddingTop: 60,
    paddingLeft: 120,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 20,
    color: 'green',
    paddingTop: 40,
    paddingLeft: 80,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subSubHeading: {
    color: 'red',
    paddingTop: 40,
    paddingLeft: 130,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footer: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
  },
  link: {
    fontSize: 14,
    marginBottom: 5,
    textDecorationLine: 'underline',
  },
});

export default ProfileCard;

































// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const AboutScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>About</Text>
//       <Text style={styles.description}>
//         This is a React Native app designed to demonstrate the About section.
//         You can customize this section with your own content.
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });

// export default AboutScreen;








































// import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";

// export default () => {
//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.topBox}>
//                 <Text style={{fontSize: 30, fontWeight: '700'}}>TWCPL</Text>
//             </View>

//             <View style={styles.selectionContainer}>
//                 <Text style={{fontSize: 28, color: '#FFF', marginBottom: 20}}>Where to ship?</Text>

              
//             </View>

//             <View style={styles.ctaWrapper}>
//                 <TouchableOpacity style={styles.cta}>
//                     <Text>Wallet</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.cta}>
//                     <Text>Insurance</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.cta}>
//                     <Text>Help & FAQ</Text>
//                 </TouchableOpacity>
//             </View>
//         </SafeAreaView>
//     )
// }

// const styles = new StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#FFF'
//     },
//     topBox: {
//         backgroundColor: '#70ACC1',
//         height: 250,
//         padding: 50
//     },
//     selectionContainer: {
//         backgroundColor: '#1E40D8',
//         borderRadius: 50,
//         width: '90%',
//         position: 'absolute',
//         top: 170,
//         left: '5%',
//         height: 250,
//         padding: 20
//     },
//     ctaWrapper: {
//         flexDirection: 'row',
//         justifyContent: 'space-evenly',
//         marginTop: 300
//     },
//     cta: {
//         padding: 15,
//         borderRadius: 10,
//         shadowColor: '#1E40D8',
//         shadowOffset: 0,
//         shadowOpacity: 4,
//         borderColor: '#1E40D8',
//         borderWidth: 2,
//         shadowRadius: 10
//     }
// })
