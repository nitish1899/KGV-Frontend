import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const WalletScreen1 = ({ route, navigation }) => {
  const { user } = route.params;
  const userId = user?.data?.userId;
  console.log(userId);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [converted, setConverted] = useState(false);

  const walletApiUrl = `https://kgv-backend.onrender.com/api/wallet/${userId}`;

  useEffect(() => {
    if (userId) {
      checkAndCreateWallet();
    } else {
      console.error('User ID is undefined');
    }
  }, [userId]);

  const checkAndCreateWallet = async () => {
    try {
      const response = await axios.get(walletApiUrl);
      if (response.data?.balance !== undefined) {
        fetchWalletBalance();
        fetchTransactions();
      } else {
        await createWallet();
      }
    } catch (error) {
      if (error.response?.status === 404) {
        await createWallet();
      } else {
        console.error('Error checking wallet:', error);
        Alert.alert('Error', 'Failed to check wallet status.');
      }
    }
  };

  const createWallet = async () => {
    try {
      await axios.post('https://kgv-backend.onrender.com/api/wallet/create', { userId });
      Alert.alert('Wallet Created', 'Your wallet has been successfully created.');
      fetchWalletBalance();
      fetchTransactions();
    } catch (error) {
      console.error('Error creating wallet:', error);
      Alert.alert('Error', 'Failed to create wallet.');
    }
  };

  // Fetch wallet balance
  const fetchWalletBalance = async () => {
    try {
      const response = await axios.get(walletApiUrl);
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${walletApiUrl}/transactions`);
      setTransactions(response.data.transactions);
      const points = response.data.transactions
        .filter(item => item.type === 'credit')
        .reduce((sum, item) => sum + item.amount, 0);
      setTotalPoints(points);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Refresh wallet balance and transactions after adding or paying amount
  const refreshData = async () => {
    await fetchWalletBalance();
    await fetchTransactions();
  };

  // Handle wallet recharge
  const handleRecharge = async () => {
    if (!amount) return Alert.alert('Enter an amount');

    try {
      setLoading(true);
      const response = await axios.post(`${walletApiUrl}/recharge`, { amount });
      setBalance(response.data.balance); // update balance
      Alert.alert('Success', `Wallet recharged by ₹${amount}`);
      setAmount('');
      refreshData(); // Refresh data after recharge
    } catch (error) {
      console.error('Error during recharge:', error);
      Alert.alert('Error', 'Failed to recharge');
    } finally {
      setLoading(false);
    }
  };

  // Handle wallet payment
  const handlePayment = async () => {
    const paymentAmount = 1000; // Example: Payment of 1000

    if (balance < paymentAmount) {
      Alert.alert('Insufficient Balance');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${walletApiUrl}/pay`, { amount: paymentAmount });
      setBalance(response.data.balance); // update balance after payment
      Alert.alert('Payment Success', `Paid ₹${paymentAmount} from Wallet`);
      refreshData(); // Refresh data after payment
    } catch (error) {
      console.error('Error during payment:', error);
      Alert.alert('Error', 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  // Function to convert points to money (assuming 1 point = 0.1 rupees)
  const convertPointsToMoney = () => {
    if (totalPoints > 0 && !converted) {
      const rupees = totalPoints / 10; // Example: 10 points = 1 rupee
      setTotalPoints(0); // Deduct all points after conversion
      setConverted(true); // Disable further conversions
      Alert.alert('Success', `You have converted ₹${rupees} points to rupees.`);
    } else if (converted) {
      Alert.alert('Already Converted', 'You have already converted your points to rupees.');
    } else {
      Alert.alert('Insufficient Points', "You don't have enough points to convert.");
    }
  };

  // Render a single transaction
  const renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <Ionicons
        name={item.type === 'credit' ? 'arrow-down-circle' : 'arrow-up-circle'}
        size={24}
        color={item.type === 'credit' ? 'green' : 'red'}
      />
      <View style={styles.transactionDetails}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={[styles.amount, { color: item.type === 'credit' ? 'green' : 'red' }]}>
        {item.type === 'credit' ? `+ Points.${item.amount}` : `- Points.${item.amount}`}
      </Text>
    </View>
  );

  return (
    <LinearGradient colors={['#545a2c', '#FFF']} style={styles.gradientBackground}>
      <View style={styles.container}>
        {/* Wallet Balance Section */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>Available Wallet Points</Text>
          <Text style={styles.balanceAmount}>{totalPoints}</Text>
        </View>

        {/* Recharge Section */}
        {/* <TextInput
          placeholder="Enter Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={{ borderWidth: 1, marginVertical: 20, padding: 10 }}
        />
        <Button
          title={loading ? 'Recharging...' : 'Recharge Wallet'}
          onPress={handleRecharge}
          disabled={loading}
        /> */}

        {/* Payment Button */}
        {/* <Button
          title={loading ? 'Processing Payment...' : 'Pay ₹1000 using Wallet'}
          onPress={handlePayment}
          color="green"
          disabled={loading}
          style={{ marginTop: 20 }}
        /> */}

        {/* Conversion and Purchase Kit Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={convertPointsToMoney}
            disabled={true} // Disable button if already converted
          >
            <Ionicons name="cash-outline" size={32} color={converted ? 'gray' : 'green'} />
            <Text>Convert to money</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Visitordetails2', { user })}
            disabled={true}
          >
            <Ionicons name="send-outline" size={32} color="red" />
            <Text>Purchase Kit</Text>
          </TouchableOpacity>
        </View>

        {/* Transaction History */}
        <Text style={styles.historyTitle}>TRANSACTION HISTORY</Text>
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.transactionList}
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
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceText: {
    fontSize: 16,
    color: '#FFF',
  },
  balanceAmount: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  actionButton: {
    alignItems: 'center',
  },
  historyTitle: {
    fontSize: 18,
    marginVertical: 10,
    color: '#000',
    fontWeight: 'bold',
  },
  transactionItem: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 2,
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WalletScreen1;


// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput, Button } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import axios from 'axios';

// const WalletScreen1 = ({ route, navigation }) => {
//   const { user } = route.params;
//   const userId = user?.data?.userId;
//   console.log(userId)
//   const [balance, setBalance] = useState(0);
//   const [amount, setAmount] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [transactions, setTransactions] = useState([]);
//   const [totalPoints, setTotalPoints] = useState(0);
//   const [converted, setConverted] = useState(false); // Tracks if points are already converted

//   const walletApiUrl = `https://kgv-backend.onrender.com/api/wallet/${userId}`;

//   useEffect(() => {
//     if (userId) {
//       fetchWalletBalance();
//       fetchTransactions(); // Fetch transactions dynamically
//     } else {
//       console.error('User ID is undefined');
//     }
//   }, [userId]);

//   // Fetch wallet balance
//   const fetchWalletBalance = async () => {
//     try {
//       const response = await axios.get(walletApiUrl);
//       setBalance(response.data.balance);
//     } catch (error) {
//       console.error('Error fetching balance:', error);
//     }
//   };

//   // Fetch transactions
//   const fetchTransactions = async () => {
//     try {
//       const response = await axios.get(`${walletApiUrl}/transactions`);
//       setTransactions(response.data.transactions);
//       const points = response.data.transactions
//         .filter(item => item.type === 'credit')
//         .reduce((sum, item) => sum + item.amount, 0);
//       setTotalPoints(points);
//     } catch (error) {
//       console.error('Error fetching transactions:', error);
//     }
//   };

//   // Refresh wallet balance and transactions after adding or paying amount
//   const refreshData = async () => {
//     await fetchWalletBalance();
//     await fetchTransactions();
//   };

//   // Handle wallet recharge
//   const handleRecharge = async () => {
//     if (!amount) return Alert.alert('Enter an amount');

//     try {
//       setLoading(true);
//       const response = await axios.post(`${walletApiUrl}/recharge`, { amount });
//       setBalance(response.data.balance); // update balance
//       Alert.alert('Success', `Wallet recharged by ₹${amount}`);
//       setAmount('');
//       refreshData(); // Refresh data after recharge
//     } catch (error) {
//       console.error('Error during recharge:', error);
//       Alert.alert('Error', 'Failed to recharge');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle wallet payment
//   const handlePayment = async () => {
//     const paymentAmount = 1000; // Example: Payment of 1000

//     if (balance < paymentAmount) {
//       Alert.alert('Insufficient Balance');
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.post(`${walletApiUrl}/pay`, { amount: paymentAmount });
//       setBalance(response.data.balance); // update balance after payment
//       Alert.alert('Payment Success', `Paid ₹${paymentAmount} from Wallet`);
//       refreshData(); // Refresh data after payment
//     } catch (error) {
//       console.error('Error during payment:', error);
//       Alert.alert('Error', 'Payment failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to convert points to money (assuming 1 point = 0.1 rupees)
//   const convertPointsToMoney = () => {
//     if (totalPoints > 0 && !converted) {
//       const rupees = totalPoints / 10; // Example: 10 points = 1 rupee
//       setTotalPoints(0); // Deduct all points after conversion
//       setConverted(true); // Disable further conversions
//       Alert.alert('Success', `You have converted ₹${rupees} points to rupees.`);
//     } else if (converted) {
//       Alert.alert('Already Converted', 'You have already converted your points to rupees.');
//     } else {
//       Alert.alert('Insufficient Points', "You don't have enough points to convert.");
//     }
//   };

//   // Render a single transaction
//   const renderTransaction = ({ item }) => (
//     <View style={styles.transactionItem}>
//       <Ionicons
//         name={item.type === 'credit' ? 'arrow-down-circle' : 'arrow-up-circle'}
//         size={24}
//         color={item.type === 'credit' ? 'green' : 'red'}
//       />
//       <View style={styles.transactionDetails}>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.date}>{item.date}</Text>
//       </View>
//       <Text style={[styles.amount, { color: item.type === 'credit' ? 'green' : 'red' }]}>
//         {item.type === 'credit' ? `+ Points.${item.amount}` : `- Points.${item.amount}`}
//       </Text>
//     </View>
//   );

//   return (
//     <LinearGradient colors={['#545a2c', '#FFF']} style={styles.gradientBackground}>
//       <View style={styles.container}>
//         {/* Wallet Balance Section */}
//         <View style={styles.balanceContainer}>
//           <Text style={styles.balanceText}>Available Wallet Points</Text>
//           <Text style={styles.balanceAmount}>{totalPoints}</Text>
//         </View>

//         {/* Recharge Section */}
//         <TextInput
//           placeholder="Enter Amount"
//           value={amount}
//           onChangeText={setAmount}
//           keyboardType="numeric"
//           style={{ borderWidth: 1, marginVertical: 20, padding: 10 }}
//         />
//         <Button
//           title={loading ? 'Recharging...' : 'Recharge Wallet'}
//           onPress={handleRecharge}
//           disabled={loading}
//         />

//         {/* Payment Button */}
//         <Button
//           title={loading ? 'Processing Payment...' : 'Pay ₹1000 using Wallet'}
//           onPress={handlePayment}
//           color="green"
//           disabled={loading}
//           style={{ marginTop: 20 }}
//         />

//         {/* Conversion and Purchase Kit Buttons */}
//         <View style={styles.actionContainer}>
//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={convertPointsToMoney}
//             disabled={converted} // Disable button if already converted
//           >
//             <Ionicons name="cash-outline" size={32} color={converted ? 'gray' : 'green'} />
//             <Text>Convert to money</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={() => navigation.navigate('Visitordetails2', { user })}
//           >
//             <Ionicons name="send-outline" size={32} color="red" />
//             <Text>Purchase Kit</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Transaction History */}
//         <Text style={styles.historyTitle}>TRANSACTION HISTORY</Text>
//         <FlatList
//           data={transactions}
//           renderItem={renderTransaction}
//           keyExtractor={item => item.id}
//           contentContainerStyle={styles.transactionList}
//         />
//       </View>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   gradientBackground: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 40,
//   },
//   balanceContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   balanceText: {
//     fontSize: 16,
//     color: '#FFF',
//   },
//   balanceAmount: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#FFF',
//   },
//   actionContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   actionButton: {
//     alignItems: 'center',
//     padding: 10,
//   },
//   historyTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#FFF',
//   },
//   transactionList: {
//     paddingBottom: 20,
//   },
//   transactionItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     elevation: 3,
//   },
//   transactionDetails: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   date: {
//     fontSize: 14,
//     color: '#888',
//   },
//   amount: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default WalletScreen1;





// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput, Button } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import axios from 'axios';

// const WalletScreen1 = ({ route, navigation }) => {
//   const { user } = route.params;
//   const userId = user?.data?.userId; // Safely access userId

//   const [balance, setBalance] = useState(0);
//   const [amount, setAmount] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [transactions, setTransactions] = useState([]);
//   const [totalPoints, setTotalPoints] = useState(0);
//   const [converted, setConverted] = useState(false); // Tracks if points are already converted

//   const walletApiUrl = `https://kgv-backend.onrender.com/api/wallet/${userId}`;

//   useEffect(() => {
//     if (userId) {
//       fetchWalletBalance();
//       fetchTransactions(); // Fetch transactions dynamically
//     } else {
//       console.error('User ID is undefined');
//     }
//   }, [userId]);

//   // Fetch wallet balance
//   const fetchWalletBalance = async () => {
//     try {
//       const response = await axios.get(walletApiUrl);
//       setBalance(response.data.balance);
//     } catch (error) {
//       console.error('Error fetching balance:', error);
//     }
//   };

//   // Fetch transactions
//   const fetchTransactions = async () => {
//     try {
//       const response = await axios.get(`${walletApiUrl}/transactions`);
//       setTransactions(response.data.transactions);
//       const points = response.data.transactions
//         .filter(item => item.type === 'credit')
//         .reduce((sum, item) => sum + item.amount, 0);
//       setTotalPoints(points); // Set total points dynamically
//     } catch (error) {
//       console.error('Error fetching transactions:', error);
//     }
//   };

//   // Handle wallet recharge
//   const handleRecharge = async () => {
//     if (!amount) return Alert.alert('Enter an amount');

//     try {
//       setLoading(true);
//       const response = await axios.post(`${walletApiUrl}/recharge`, { amount });
//       setBalance(response.data.balance); // update balance
//       Alert.alert('Success', `Wallet recharged by ₹${amount}`);
//       setAmount('');
//     } catch (error) {
//       console.error('Error during recharge:', error);
//       Alert.alert('Error', 'Failed to recharge');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle wallet payment
//   const handlePayment = async () => {
//     const paymentAmount = 1000; // Example: Payment of 1000

//     if (balance < paymentAmount) {
//       Alert.alert('Insufficient Balance');
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.post(`${walletApiUrl}/pay`, { amount: paymentAmount });
//       setBalance(response.data.balance); // update balance after payment
//       Alert.alert('Payment Success', `Paid ₹${paymentAmount} from Wallet`);
//     } catch (error) {
//       console.error('Error during payment:', error);
//       Alert.alert('Error', 'Payment failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to convert points to money (assuming 1 point = 0.1 rupees)
//   const convertPointsToMoney = () => {
//     if (totalPoints > 0 && !converted) {
//       const rupees = totalPoints / 10; // Example: 10 points = 1 rupee
//       setTotalPoints(0); // Deduct all points after conversion
//       setConverted(true); // Disable further conversions
//       Alert.alert('Success', `You have converted ₹${rupees} points to rupees.`);
//     } else if (converted) {
//       Alert.alert('Already Converted', 'You have already converted your points to rupees.');
//     } else {
//       Alert.alert('Insufficient Points', "You don't have enough points to convert.");
//     }
//   };

//   // Render a single transaction
//   const renderTransaction = ({ item }) => (
//     <View style={styles.transactionItem}>
//       <Ionicons
//         name={item.type === 'credit' ? 'arrow-down-circle' : 'arrow-up-circle'}
//         size={24}
//         color={item.type === 'credit' ? 'green' : 'red'}
//       />
//       <View style={styles.transactionDetails}>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.date}>{item.date}</Text>
//       </View>
//       <Text style={[styles.amount, { color: item.type === 'credit' ? 'green' : 'red' }]}>
//         {item.type === 'credit' ? `+ Points.${item.amount}` : `- Points.${item.amount}`}
//       </Text>
//     </View>
//   );

//   return (
//     <LinearGradient colors={['#545a2c', '#FFF']} style={styles.gradientBackground}>
//       <View style={styles.container}>
//         {/* Wallet Balance Section */}
//         <View style={styles.balanceContainer}>
//           <Text style={styles.balanceText}>Available Wallet Points</Text>
//           <Text style={styles.balanceAmount}>{totalPoints}</Text>
//         </View>

//         {/* Recharge Section */}
//         <TextInput
//           placeholder="Enter Amount"
//           value={amount}
//           onChangeText={setAmount}
//           keyboardType="numeric"
//           style={{ borderWidth: 1, marginVertical: 20, padding: 10 }}
//         />
//         <Button
//           title={loading ? 'Recharging...' : 'Recharge Wallet'}
//           onPress={handleRecharge}
//           disabled={loading}
//         />

//         {/* Payment Button */}
//         <Button
//           title={loading ? 'Processing Payment...' : 'Pay ₹1000 using Wallet'}
//           onPress={handlePayment}
//           color="green"
//           disabled={loading}
//           style={{ marginTop: 20 }}
//         />

//         {/* Conversion and Purchase Kit Buttons */}
//         <View style={styles.actionContainer}>
//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={convertPointsToMoney}
//             disabled={converted} // Disable button if already converted
//           >
//             <Ionicons name="cash-outline" size={32} color={converted ? 'gray' : 'green'} />
//             <Text>Convert to money</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={() => navigation.navigate('Visitordetails2', { user })}
//           >
//             <Ionicons name="send-outline" size={32} color="red" />
//             <Text>Purchase Kit</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Transaction History */}
//         <Text style={styles.historyTitle}>TRANSACTION HISTORY</Text>
//         <FlatList
//           data={transactions}
//           renderItem={renderTransaction}
//           keyExtractor={item => item.id}
//           contentContainerStyle={styles.transactionList}
//         />
//       </View>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   gradientBackground: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 40,
//   },
//   balanceContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   balanceText: {
//     fontSize: 16,
//     color: '#FFF',
//   },
//   balanceAmount: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#FFF',
//   },
//   actionContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   actionButton: {
//     alignItems: 'center',
//     padding: 10,
//   },
//   historyTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#FFF',
//   },
//   transactionList: {
//     paddingBottom: 20,
//   },
//   transactionItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     elevation: 3,
//   },
//   transactionDetails: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   date: {
//     fontSize: 14,
//     color: '#888',
//   },
//   amount: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default WalletScreen1;


// import React, { useEffect, useState } from 'react';
// import { View, Text, Button, TextInput, Alert } from 'react-native';
// import axios from 'axios';

// const WalletScreen1 = ({ route, navigation }) => {
//   const { user } = route.params;
//   const userId = user?.data?.userId; // Add safe navigation
//   console.log('User ID:', userId);
//   console.log('User Object:', user);

//   const [balance, setBalance] = useState(0);
//   const [amount, setAmount] = useState('');
//   const [loading, setLoading] = useState(false);

//   const walletApiUrl = `https://kgv-backend.onrender.com/api/wallet/${userId}`;
//   console.log('API URL:', walletApiUrl); // Log API URL

//   useEffect(() => {
//     if (userId) {
//       fetchWalletBalance();
//     } else {
//       console.error('User ID is undefined');
//     }
//   }, [userId]);

//   // Fetch wallet balance
//   const fetchWalletBalance = async () => {
//     try {
//       const response = await axios.get(walletApiUrl);
//       console.log('Wallet Balance Response:', response.data); // Log response
//       setBalance(response.data.balance);
//     } catch (error) {
//       console.error('Error fetching balance:', error);
//     }
//   };

//   // Handle wallet recharge
//   const handleRecharge = async () => {
//     if (!amount) return Alert.alert('Enter an amount');

//     try {
//       setLoading(true);
//       const response = await axios.post(`${walletApiUrl}/recharge`, { amount });
//       console.log('Recharge Response:', response.data); // Log response
//       setBalance(response.data.balance); // update balance
//       Alert.alert('Success', `Wallet recharged by ₹${amount}`);
//       setAmount('');
//     } catch (error) {
//       console.error('Error during recharge:', error);
//       Alert.alert('Error', 'Failed to recharge');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle wallet payment
//   const handlePayment = async () => {
//     const paymentAmount = 1000; // Example: Payment of 1000

//     if (balance < paymentAmount) {
//       Alert.alert('Insufficient Balance');
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.post(`${walletApiUrl}/pay`, { amount: paymentAmount });
//       console.log('Payment Response:', response.data); // Log response
//       setBalance(response.data.balance); // update balance after payment
//       Alert.alert('Payment Success', `Paid ₹${paymentAmount} from Wallet`);
//     } catch (error) {
//       console.error('Error during payment:', error);
//       Alert.alert('Error', 'Payment failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Text style={{ fontSize: 24 }}>Wallet Balance: ₹{balance}</Text>

//       <TextInput
//         placeholder="Enter Amount"
//         value={amount}
//         onChangeText={setAmount}
//         keyboardType="numeric"
//         style={{ borderWidth: 1, marginVertical: 20, padding: 10 }}
//       />

//       <Button
//         title={loading ? 'Recharging...' : 'Recharge Wallet'}
//         onPress={handleRecharge}
//         disabled={loading}
//       />

//       <Button
//         title={loading ? 'Processing Payment...' : 'Pay ₹1000 using Wallet'}
//         onPress={handlePayment}
//         color="green"
//         disabled={loading}
//         style={{ marginTop: 20 }}
//       />
//     </View>
//   );
// };

// export default WalletScreen1;


// import React, { useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';

// const transactions = [
//   { id: '1', name: 'Hardik Prajapati', date: 'Sep 27, 2018', amount: 3000, type: 'credit' },
//   { id: '2', name: 'Ravi Patel', date: 'Sep 27, 2018', amount: 3000, type: 'credit' },
//   { id: '3', name: 'Henil Shah', date: 'Sep 27, 2018', amount: 3000, type: 'credit' },
//   { id: '4', name: 'Dominoz', date: 'Sep 27, 2018', amount: 3000, type: 'credit' },
//   { id: '5', name: 'Dhruv Patel', date: 'Sep 27, 2018', amount: 3000, type: 'credit' },
//   { id: '6', name: 'House Rent', date: 'Sep 27, 2018', amount: 3000, type: 'credit' },
//   { id: '7', name: 'Amit Prajapati', date: 'Sep 27, 2018', amount: 3000, type: 'credit' },
//   { id: '8', name: 'Amit Prajapati', date: 'Sep 27, 2018', amount: 3000, type: 'credit' },
//   { id: '9', name: 'Amit Prajapati', date: 'Sep 27, 2018', amount: 3000, type: 'credit' },
//   { id: '10', name: 'Amit Prajapati', date: 'Sep 27, 2018', amount: 3000, type: 'credit' },
//   { id: '11', name: 'Amit Prajapati', date: 'Sep 27, 2018', amount: 3000, type: 'credit' },
// ];

// const WalletScreen1 = ({ route, navigation }) => {
//   const { user } = route.params;
//   console.log(user)
//   console.log(user.data.userId)
//   const userId=user.data.userId
//   console.log(userId)

//   // State to manage total points and conversion status
//   const [totalPoints, setTotalPoints] = useState(
//     transactions.filter(item => item.type === 'credit').reduce((sum, item) => sum + item.amount, 0)
//   );
//   const [converted, setConverted] = useState(false); // Tracks if points are already converted

//   // Function to convert points to money (assuming 1 point = 0.1 rupees)
//   const convertPointsToMoney = () => {
//     if (totalPoints > 0 && !converted) {
//       const rupees = totalPoints / 10; // Example: 10 points = 1 rupee
//       setTotalPoints(rupees); // Deduct all points after conversion
//       setConverted(true); // Disable further conversions
//       Alert.alert('Success', `You have converted ${rupees} points to rupees.`);
//     } else if (converted) {
//       Alert.alert('Already Converted', 'You have already converted your points to rupees.');
//     } else {
//       Alert.alert('Insufficient Points', "You don't have enough points to convert.");
//     }
//   };

//   const renderTransaction = ({ item }) => (
//     <View style={styles.transactionItem}>
//       <Ionicons
//         name={item.type === 'credit' ? 'arrow-down-circle' : 'arrow-up-circle'}
//         size={24}
//         color={item.type === 'credit' ? 'green' : 'red'}
//       />
//       <View style={styles.transactionDetails}>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.date}>{item.date}</Text>
//       </View>
//       <Text style={[styles.amount, { color: item.type === 'credit' ? 'green' : 'red' }]}>
//         {item.type === 'credit' ? `+ Point.${item.amount}` : `- Points.${item.amount}`}
//       </Text>
//     </View>
//   );

//   return (
//     <LinearGradient colors={['#545a2c', '#FFF']} style={styles.gradientBackground}>
//       <View style={styles.container}>
//         {/* Balance Section */}
//         <View style={styles.balanceContainer}>
//           <Text style={styles.balanceText}>Available Wallet Points</Text>
//           <Text style={styles.balanceAmount}>{totalPoints}</Text>
//         </View>

//         {/* Transaction Buttons */}
//         <View style={styles.actionContainer}>
//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={convertPointsToMoney}
//             disabled={converted} // Disable button if already converted
//           >
//             <Ionicons name="cash-outline" size={32} color={converted ? 'gray' : 'green'} />
//             <Text>Convert to money</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={() => {
//               navigation.navigate('Visitordetails2', { user });
//             }}
//           >
//             <Ionicons name="send-outline" size={32} color="red" />
//             <Text>Purchase Kit</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Transaction History */}
//         <Text style={styles.historyTitle}>TRANSACTION HISTORY</Text>
//         <FlatList
//           data={transactions}
//           renderItem={renderTransaction}
//           keyExtractor={item => item.id}
//           contentContainerStyle={styles.transactionList}
//         />
//       </View>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   gradientBackground: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 40,
//   },
//   balanceContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   balanceText: {
//     fontSize: 16,
//     color: '#FFF',
//   },
//   balanceAmount: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#FFF',
//   },
//   actionContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   actionButton: {
//     alignItems: 'center',
//     padding: 10,
//   },
//   historyTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#FFF',
//   },
//   transactionList: {
//     paddingBottom: 20,
//   },
//   transactionItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     elevation: 3,
//   },
//   transactionDetails: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   date: {
//     fontSize: 14,
//     color: '#888',
//   },
//   amount: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default WalletScreen1;



