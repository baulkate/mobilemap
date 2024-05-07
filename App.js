import * as React from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker } from "react-native-maps"

export default function App() {
	const [ pin, setPin ] = React.useState({
    latitude: 8.47263285304873, 
		longitude: 124.70559918389833,
	})

	const [ region, setRegion ] = React.useState({
    latitude: 8.47263285304873, 
		longitude: 124.70559918389833,
		latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
	})

	return (
		<View style={{ marginTop: 20, flex: 1, backgroundColor: "black"}}>
			<GooglePlacesAutocomplete
				placeholder="Search"
				fetchDetails={true}
				GooglePlacesSearchQuery={{
					rankby: "distance"
				}}
				onPress={(data, details = null) => {
					console.log(data, details)
					setRegion({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
					})
				}}
				query={{
					key: "AIzaSyDxPmzG0vxJaoL6qJZsnJ4rMwRNb_0XYkM",
					language: "en",
					components: "country:ph",  
					types: "establishment",
					radius: 30000,
					location: `${region.latitude}, ${region.longitude}`
				}}
				styles={{
					container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
					listView: { backgroundColor: "black" }
				}}
			/>
      
			<MapView
				style={styles.map}
				initialRegion={{
          latitude: 8.47263285304873, 
		      longitude: 124.70559918389833,
					latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
				}}
				provider="google"
			>
				<Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
        
				<Marker
					coordinate={pin}
					draggable={true}
					onDragStart={(e) => {
						console.log("Drag start", e.nativeEvent.coordinates)
					}}

          onDragEnd={(e) => {
						setPin({
							latitude: e.nativeEvent.coordinate.latitude,
							longitude: e.nativeEvent.coordinate.longitude
						})
					}}
				>
					<Callout>
						<Text>I'm here</Text>
					</Callout>
				</Marker>
          
				<Circle center={pin} radius={1000} />
			</MapView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height
	}
})