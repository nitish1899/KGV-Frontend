import { useRef } from "react";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import RBSheet from "react-native-raw-bottom-sheet";

export default () => {
    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE = 37.771707;
    const LONGITUDE = -122.4053769;
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    
    const refRBSheet = useRef();

    const coordinates = [
        {
          latitude: 37.3317876,
          longitude: -122.0054812,
        },
        {
          latitude: 37.771707,
          longitude: -122.4053769,
        },
      ];

    return (
        <View>
            <MapView
                style={StyleSheet.absoluteFill}
                initialRegion={{
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}>
            
                <MapView.Marker coordinates={coordinates[0]} />
                <MapView.Marker coordinates={coordinates[1]} />
                <MapViewDirections
                    origin={coordinates[0]}
                    destination={coordinates[1]}
                    apikey="AIzaSyA-d6j5Cld3geeg9zGvVfdXjGO0_C2YjCw"
                    strokeWidth={3}
                    strokeColor="black"
                />
                {/* <TouchableOpacity onPress={() => refRBSheet.current.open()} style={{position: 'absolute', bottom: 0, left: '50%', backgroundColor: '#FFF', padding: 10, borderRadius: 20}}>
                    <Text>^</Text>
                </TouchableOpacity>
                <RBSheet
                    ref={refRBSheet}
                    height={300}
                    openDuration={250}
                    animationType="slide"
                    customStyles={{
                        container: {
                        justifyContent: "center",
                        alignItems: "center",
                        borderTopLeftRadius: 24,
                        borderTopRightRadius: 24,
                        backgroundColor: '#FFF5EB',
                        padding: 20,
                        paddingTop: 40,
                        height: 'auto'
                        }
                    }}
                >
                    <TouchableOpacity onPress={() =>  refRBSheet.current.close()}><Text>Close</Text></TouchableOpacity>

                    <Text>Payment Status</Text>
                </RBSheet> */}
        </MapView>
        </View>
    );
}