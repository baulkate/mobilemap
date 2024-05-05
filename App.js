import * as React from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker } from "react-native-maps"

export default function App() {
  //para ma set ang initial location with the use of latitude and longitude
	const [ pin, setPin ] = React.useState({
    latitude: 8.47263285304873, 
		longitude: 124.70559918389833,
	})

  //para na sa search bar chuchu so if tuslokon nimo ang imong gi search kay mo produce siya ug lain nga pin showing na dayun sa imong gi search na location
	const [ region, setRegion ] = React.useState({
    latitude: 8.47263285304873, 
		longitude: 124.70559918389833,
		latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
	})

	return (
		<View style={{ marginTop: 20, flex: 1, backgroundColor: "black"}}>
      {/* mao ni siya ang sa search bar kibali nag install ug Google Place Autocomplete libraries for this and nag gamit ta ug Google Map API */}
			<GooglePlacesAutocomplete
				placeholder="Search"
				fetchDetails={true}
				GooglePlacesSearchQuery={{
					rankby: "distance"
				}}
				onPress={(data, details = null) => {
					// 'details' is provided when fetchDetails = true
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
					components: "country:ph", //set the location to the philippines 
					types: "establishment",
					radius: 30000,
					location: `${region.latitude}, ${region.longitude}`
				}}
				styles={{
					container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
					listView: { backgroundColor: "black" }
				}}
			/>
      
      {/* in this we install the react native map libraries for the map  */}
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
        {/* kini first marker is para sa place nga atong i search ang mo gawas ana sa map is katong Pin */}
				<Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
        
        {/* kini 2nd marker is para sa initial place same nag gihapon ang mo gawas ana sa map is katong Pin */}
				<Marker
					coordinate={pin}
					draggable={true}
					onDragStart={(e) => {
						console.log("Drag start", e.nativeEvent.coordinates)
					}}

          //nag use sab ug "onDragEnd" component so ma drag drag nato ang naka pin sa initial place nga atong gi set"
          onDragEnd={(e) => {
						setPin({
							latitude: e.nativeEvent.coordinate.latitude,
							longitude: e.nativeEvent.coordinate.longitude
						})
					}}
				>
					<Callout>
           {/*nag use sab tag "Callout" component para if atong tuslokon ang inital pin naay text nga mo gawas nga "I'm here" */}
						<Text>I'm here</Text>
					</Callout>
				</Marker>
          
          {/*if you notice naay circle atong gi set the initial pin it's because nag use sab ta ug "Circle" component nya get set nato ang radius ug 1000 */}
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