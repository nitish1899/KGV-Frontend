
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Share } from 'react-native';

const CustomModal = ({ modalVisible, setModalVisible, navigation, user }) => {
    const visitorId = user?.data?.userId;
    const referralCode = user?.data?.myReferralCode ?? 'take premium plan for referral code';

    const onShare = async () => {
        try {
            const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.tsilteam.KGVHybridSol';
            const shareUrl = `${playStoreUrl} & referralCode=${referralCode}`;
            const result = await Share.share({
                message: `Download this amazing app using my referral link: ${shareUrl}`,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log('Shared with activity type:', result.activityType);
                } else {
                    console.log('Share was successful');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('Share was dismissed');
            }
        } catch (error) {
            console.log('Error sharing:', error.message);
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Menu</Text>

                    {/* Profile Section */}
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                            setModalVisible(false);
                            navigation.navigate('Profile', { userId: user?.data?.userId, user });
                        }}
                    >
                        <Text style={styles.modalButtonText}>Profile</Text>
                    </TouchableOpacity>

                    {/* View Cart Section */}
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                            setModalVisible(false);
                            navigation.navigate('ViewCartItems', { visitorId: user?.data?.userId, visitorName: user?.data?.fullName, user });
                        }}
                    >
                        <Text style={styles.modalButtonText}>View Cart</Text>
                    </TouchableOpacity>

                    {/* View All Orders Section */}
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                            setModalVisible(false);
                            navigation.navigate('Viewallorders', { visitorId, user });
                        }}
                    >
                        <Text style={styles.modalButtonText}>View all Orders</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                            setModalVisible(false);
                            onShare(); // Call share function
                        }}
                    >
                        <Text style={styles.modalButtonText}>Share</Text>
                    </TouchableOpacity>

                    {/* Premium User Section */}
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                            setModalVisible(false);
                            navigation.navigate('PremiumUser', { visitorId });
                        }}
                    >
                        <Text style={styles.modalButtonText}> KGV Mitra Club</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                            setModalVisible(false);
                            navigation.navigate('MultipleImageUpload');
                        }}
                    >
                        <Text style={styles.modalButtonText}>Participate Contest</Text>
                    </TouchableOpacity>
                    {/* Close Button */}
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.modalButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: 300,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalButton: {
        backgroundColor: '#06264D',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default CustomModal;


// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Modal, Share, Alert } from 'react-native';
// import branch from 'react-native-branch';

// const CustomModal = ({ modalVisible, setModalVisible, navigation, user }) => {
//   const visitorId = user?.data?.userId;
//   const [referralCode, setReferralCode] = useState(null);
//   console.log(referralCode)

//   // Fetch or set the referral code if not directly available
//   useEffect(() => {
//     // Assuming the referralCode is coming from user's data or needs to be fetched
//     if (user?.data?.referralCode) {
//       setReferralCode(user.data.referralCode);
//     } else {
//       // Fetch referral code logic if needed
//       setReferralCode('DEFAULT_REFERRAL_CODE'); // Placeholder if referralCode not found
//     }
//   }, [user]);

//   const onShare = async () => {
//     try {
//       if (!referralCode) {
//         Alert.alert('Error', 'Referral code not available.');
//         return;
//       }

//       // Generate Branch link with the dynamic referral code
//       const generateBranchLink = async (referralCode) => {
//         try {
//           // Create a Branch Universal Object
//           let branchUniversalObject = await branch.createBranchUniversalObject('share', {
//             title: 'Share My App',
//             contentDescription: 'Invite your friends and earn rewards!',
//             contentMetadata: {
//               customMetadata: {
//                 referralCode: referralCode, // Include referral code in metadata
//               },
//             },
//           });

//           // Define link properties and share options
//           const linkProperties = {
//             feature: 'share',
//             channel: 'app',
//             campaign: 'referral', // Optional but recommended for tracking purposes
//           };

//           const shareOptions = {
//             messageHeader: 'Invite Your Friends',
//             messageBody: 'Check out this app and use my referral code!',
//           };

//           // Generate a short URL
//           let { url } = await branchUniversalObject.generateShortUrl(linkProperties, shareOptions);
//           return url; // Return the generated URL
//         } catch (error) {
//           console.error('Error generating Branch link:', error);
//           throw error; // Ensure error is caught in the outer block
//         }
//       };

//       const branchLink = await generateBranchLink(referralCode);

//       if (branchLink) {
//         // Share the link using the Share API
//         const result = await Share.share({
//           message: `Check out this app and use my referral code: ${referralCode}\n\n${branchLink}`,
//         });

//         if (result.action === Share.sharedAction) {
//           if (result.activityType) {
//             console.log(`Shared with activity type: ${result.activityType}`);
//           } else {
//             console.log('Share was successful');
//           }
//         } else if (result.action === Share.dismissedAction) {
//           console.log('Share was dismissed');
//         }
//       } else {
//         console.log('Failed to generate the Branch link');
//       }
//     } catch (error) {
//       console.log('Error sharing:', error.message);
//     }
//   };

//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={modalVisible}
//       onRequestClose={() => setModalVisible(false)}
//     >
//       <View style={styles.modalContainer}>
//         <View style={styles.modalContent}>
//           <Text style={styles.modalTitle}>Menu</Text>

//           {/* Profile Section */}
//           <TouchableOpacity
//             style={styles.modalButton}
//             onPress={() => {
//               setModalVisible(false);
//               navigation.navigate('Profile', { userId: user?.data?.userId, user });
//             }}
//           >
//             <Text style={styles.modalButtonText}>Profile</Text>
//           </TouchableOpacity>

//           {/* View Cart Section */}
//           <TouchableOpacity
//             style={styles.modalButton}
//             onPress={() => {
//               setModalVisible(false);
//               navigation.navigate('ViewCartItems', {
//                 visitorId: user?.data?.userId,
//                 visitorName: user?.data?.fullName,
//                 user,
//               });
//             }}
//           >
//             <Text style={styles.modalButtonText}>View Cart</Text>
//           </TouchableOpacity>

//           {/* View All Orders Section */}
//           <TouchableOpacity
//             style={styles.modalButton}
//             onPress={() => {
//               setModalVisible(false);
//               navigation.navigate('Viewallorders', { visitorId, user });
//             }}
//           >
//             <Text style={styles.modalButtonText}>View all Orders</Text>
//           </TouchableOpacity>

//           {/* Share Section */}
//           <TouchableOpacity
//             style={styles.modalButton}
//             onPress={() => {
//               setModalVisible(false);
//               onShare(); // Call share function
//             }}
//           >
//             <Text style={styles.modalButtonText}>Share</Text>
//           </TouchableOpacity>

//           {/* Premium User Section */}
//           <TouchableOpacity
//             style={styles.modalButton}
//             onPress={() => {
//               setModalVisible(false);
//               navigation.navigate('PremiumUser', { visitorId });
//             }}
//           >
//             <Text style={styles.modalButtonText}>KGV Mitra Club</Text>
//           </TouchableOpacity>

//           {/* Close Button */}
//           <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
//             <Text style={styles.modalButtonText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     width: 300,
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   modalButton: {
//     backgroundColor: '#06264D',
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//     width: '100%',
//     alignItems: 'center',
//   },
//   modalButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });
// export default CustomModal;


// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Modal, Share } from 'react-native';

// const CustomModal = ({ modalVisible, setModalVisible, navigation, user }) => {
//     const visitorId = user?.data?.userId;
//     const referralCode = user?.data?.referralCode || 'DEFAULT_CODE';

//     const onShare = async () => {
//         try {
//             const shareUrl = `?referralCode=${referralCode}`;
//             const result = await Share.share({
//                 message: `Download this amazing app using my referral link: ${shareUrl}`,
//             });

//             if (result.action === Share.sharedAction) {
//                 if (result.activityType) {
//                     console.log('Shared with activity type:', result.activityType);
//                 } else {
//                     console.log('Share was successful');
//                 }
//             } else if (result.action === Share.dismissedAction) {
//                 console.log('Share was dismissed');
//             }
//         } catch (error) {
//             console.log('Error sharing:', error.message);
//         }
//     };

//     return (
//         <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisible}
//             onRequestClose={() => setModalVisible(false)}
//         >
//             <View style={styles.modalContainer}>
//                 <View style={styles.modalContent}>
//                     <Text style={styles.modalTitle}>Menu</Text>

//                     {/* Profile Section */}
//                     <TouchableOpacity
//                         style={styles.modalButton}
//                         onPress={() => {
//                             setModalVisible(false);
//                             navigation.navigate('Profile', { userId: user?.data?.userId, user });
//                         }}
//                     >
//                         <Text style={styles.modalButtonText}>Profile</Text>
//                     </TouchableOpacity>

//                     {/* View Cart Section */}
//                     <TouchableOpacity
//                         style={styles.modalButton}
//                         onPress={() => {
//                             setModalVisible(false);
//                             navigation.navigate('ViewCartItems', { visitorId: user?.data?.userId, visitorName: user?.data?.fullName, user });
//                         }}
//                     >
//                         <Text style={styles.modalButtonText}>View Cart</Text>
//                     </TouchableOpacity>

//                     {/* View All Orders Section */}
//                     <TouchableOpacity
//                         style={styles.modalButton}
//                         onPress={() => {
//                             setModalVisible(false);
//                             navigation.navigate('Viewallorders', { visitorId, user });
//                         }}
//                     >
//                         <Text style={styles.modalButtonText}>View all Orders</Text>
//                     </TouchableOpacity>

//                     {/* Share Section */}
//                     <TouchableOpacity
//                         style={styles.modalButton}
//                         onPress={() => {
//                             setModalVisible(false);
//                             onShare(); // Call share function
//                         }}
//                     >
//                         <Text style={styles.modalButtonText}>Share</Text>
//                     </TouchableOpacity>

//                     {/* Close Button */}
//                     <TouchableOpacity
//                         style={styles.modalButton}
//                         onPress={() => setModalVisible(false)}
//                     >
//                         <Text style={styles.modalButtonText}>Close</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </Modal>
//     );
// };

// const styles = StyleSheet.create({
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0,0,0,0.5)',
//     },
//     modalContent: {
//         backgroundColor: 'white',
//         borderRadius: 10,
//         padding: 20,
//         width: 300,
//         alignItems: 'center',
//     },
//     modalTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     modalButton: {
//         backgroundColor: '#06264D',
//         padding: 10,
//         borderRadius: 5,
//         marginTop: 10,
//         width: '100%',
//         alignItems: 'center',
//     },
//     modalButtonText: {
//         color: 'white',
//         fontSize: 16,
//     },
// });

// export default CustomModal;



// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

// const CustomModal = ({ modalVisible, setModalVisible, navigation, user }) => {
//     const visitorId = user?.data?.userId;

//     return (
//         <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisible}
//             onRequestClose={() => setModalVisible(false)}
//         >
//             <View style={styles.modalContainer}>
//                 <View style={styles.modalContent}>
//                     <Text style={styles.modalTitle}>Menu</Text>

//                     {/* Profile Section */}
//                     <TouchableOpacity
//                         style={styles.modalButton}
//                         onPress={() => {
//                             setModalVisible(false);
//                             navigation.navigate('Profile', { userId: user?.data?.userId, user });
//                         }}
//                     >
//                         <Text style={styles.modalButtonText}>Profile</Text>
//                     </TouchableOpacity>

//                     {/* Settings Section */}
//                     <TouchableOpacity
//                         style={styles.modalButton}
//                         onPress={() => {
//                             setModalVisible(false);
//                             navigation.navigate('ViewCartItems', { visitorId: user?.data?.userId, visitorName: user?.data?.fullName, user });
//                         }}
//                     >
//                         <Text style={styles.modalButtonText}>View Cart</Text>
//                     </TouchableOpacity>

//                     {/* Other Section */}
//                     <TouchableOpacity
//                         style={styles.modalButton}
//                         onPress={() => {
//                             setModalVisible(false);
//                             navigation.navigate('Viewallorders', { visitorId, user });
//                         }}
//                     >
//                         <Text style={styles.modalButtonText}>View all Orders</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         style={styles.modalButton}
//                         // onPress={() => {
//                         //     setModalVisible(false);
//                         //     navigation.navigate('Viewallorders', { visitorId, user });
//                         // }}
//                     >
//                         <Text style={styles.modalButtonText}>Share</Text>
//                     </TouchableOpacity>

//                     {/* Close Button */}
//                     <TouchableOpacity
//                         style={styles.modalButton}
//                         onPress={() => setModalVisible(false)}
//                     >
//                         <Text style={styles.modalButtonText}>Close</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </Modal>
//     );
// };

// const styles = StyleSheet.create({
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0,0,0,0.5)',
//     },
//     modalContent: {
//         backgroundColor: 'white',
//         borderRadius: 10,
//         padding: 20,
//         width: 300,
//         alignItems: 'center',
//     },
//     modalTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     modalButton: {
//         backgroundColor: '#06264D',
//         padding: 10,
//         borderRadius: 5,
//         marginTop: 10,
//         width: '100%',
//         alignItems: 'center',
//     },
//     modalButtonText: {
//         color: 'white',
//         fontSize: 16,
//     },
// });

// export default CustomModal;
