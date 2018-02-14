import React, { Component } from "react";
import { StyleSheet, View, StatusBar } from "react-native";

//import points from "../assets/points.json";

import { generateRandomPoints } from './shared/utils/geo';
import Map from "./scenes/Map";

const Minsk = {
    latitude: 53.914931,
    longitude: 27.5875025
}

const points = generateRandomPoints(Minsk, 1 * 1000 * 500, 100);

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#1d2c4d" barStyle="light-content" />
                <Map
                    points={points}
                    region={Minsk}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
        alignItems: "center",
        top: 0,
        bottom: 0
    }
});
