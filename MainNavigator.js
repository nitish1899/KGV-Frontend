import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from './screens/Landing';
import Register from './screens/Register';
import Login from './screens/Login';
import ForgotPin from './screens/ForgotPin';
import Welcome from './screens/Welcome';
import Ourproduct from './screens/Ourproduct';
import Visitordetails from './screens/Visitordetails';
import Visitorchart from './screens/Visitorchart';
import Visitorcomparechart from './screens/Visitorcomparechart';
import BookingKit from './screens/BookingKit';
import CheckoutButton from './screens/CheckoutButton';
import BookingCheckout from './screens/BookingCheckout';
import Recomanded from './screens/Recomanded';
import AddToCart from './screens/AddToCart';
import ViewCartItems from './screens/ViewCartItems';
import SummaryCart from './screens/SummaryCart';
import PaymentSuccess from './screens/PaymentSuccess';
import Profile from './screens/Profile';
import Viewallorders from './screens/Viewallorders';
import BillingSummary from './screens/BillingSummary';
import PaymentPage from './screens/PaymentPage';
import Congratulation from './screens/Congratulation';
import PaymentSuccessnew from './screens/PaymentSuccessnew';
import MultipleImageUpload from './screens/MediaImageUpload';
import PremiumUser from './screens/PremiumUser';
import KgvPaymentSuccess from './screens/KgvPaymantSuccess';
import UserNavigator from './UserNavigator';
import MainNavigator1 from './MainNavigator1';
import Register1 from './screens/Register1';
import SpinFeature from './screens/SpinFeature';
import TermsAndConditions from './screens/TermsAndConditions';
import PremiumPayment from './screens/PremiumPayment';
import KitBookingPaymentSuccess from './screens/KitBookingPaymentSuccess';
import PaymentImageUpload from './screens/PaymentImageUpload';
import ContestpaymentImageUpload from './screens/ContestpaymentImageUpload';
import PrimumpaymentImageUpload from './screens/PrimumpaymentImageUpload';

const Stack = createNativeStackNavigator();

export default () => {
   return (
      <>
         <Stack.Navigator initialRouteName='Landing' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="ForgotPin" component={ForgotPin} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Register1" component={Register1} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Ourproduct" component={Ourproduct} />
            <Stack.Screen name="Visitordetails" component={Visitordetails} />
            <Stack.Screen name="Visitorchart" component={Visitorchart} />
            <Stack.Screen name="Visitorcomparechart" component={Visitorcomparechart} />
            <Stack.Screen name="Recomanded" component={Recomanded} />
            <Stack.Screen name="AddToCart" component={AddToCart} />
            <Stack.Screen name="ViewCartItems" component={ViewCartItems} />
            <Stack.Screen name="SummaryCart" component={SummaryCart} />
            <Stack.Screen name="BookingKit" component={BookingKit} />
            <Stack.Screen name="CheckoutButton" component={CheckoutButton} />
            <Stack.Screen name="BookingCheckout" component={BookingCheckout} />
            <Stack.Screen name="PaymentPage" component={PaymentPage} />
            <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
            <Stack.Screen name="Viewallorders" component={Viewallorders} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="BillingSummary" component={BillingSummary} />
            <Stack.Screen name="Congratulation" component={Congratulation} />
            <Stack.Screen name="PaymentSuccessnew" component={PaymentSuccessnew} />
            <Stack.Screen name="MultipleImageUpload" component={MultipleImageUpload} />
            <Stack.Screen name="PremiumUser" component={PremiumUser} />
            <Stack.Screen name="KgvPaymentSuccess" component={KgvPaymentSuccess} />
            <Stack.Screen name="UserNavigator" component={UserNavigator} />
            <Stack.Screen name="SpinFeature" component={SpinFeature} />
            <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
            <Stack.Screen name="PremiumPayment" component={PremiumPayment} />
            <Stack.Screen name="PaymentImageUpload" component={PaymentImageUpload} />
            <Stack.Screen name="KitBookingPaymentSuccess" component={KitBookingPaymentSuccess} />
            <Stack.Screen name="ContestpaymentImageUpload" component={ContestpaymentImageUpload} />
            <Stack.Screen name="PrimumpaymentImageUpload" component={PrimumpaymentImageUpload} />
            <Stack.Screen name="MainNavigator1" component={MainNavigator1} />
         </Stack.Navigator>
      </>
   );

}