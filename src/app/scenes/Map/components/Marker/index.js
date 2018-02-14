import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const offset_map_small = 0.0001;
import { Marker as MapViewMarker } from "react-native-maps";

export default class Marker extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const pointCount = this.props.properties.point_count;
        const latitude = this.props.geometry.coordinates[1],
            longitude = this.props.geometry.coordinates[0];

        if (this.props.renderCluster) {
            const cluster = {
                pointCount,
                coordinate: { latitude, longitude },
                clusterId: this.props.properties.cluster_id
            };
            return this.props.renderCluster(cluster, this.onPress);
        }

        let scaleUpRatio = this.props.scaleUpRatio
            ? this.props.scaleUpRatio(pointCount)
            : 1 + Math.min(pointCount, 999) / 100;
        if (isNaN(scaleUpRatio)) {
            console.warn(
                "scaleUpRatio must return a Number, falling back to default"
            ); // eslint-disable-line
            scaleUpRatio = 1 + Math.min(pointCount, 999) / 100;
        }

        let textForCluster = "1";

        let width = Math.floor(
                this.props.clusterInitialDimension * scaleUpRatio
            ),
            height = Math.floor(
                this.props.clusterInitialDimension * scaleUpRatio
            ),
            fontSize = Math.floor(
                this.props.clusterInitialFontSize * scaleUpRatio
            ),
            borderRadius = Math.floor(width / 2);

        // cluster dimension upper limit
        width =
            width <= this.props.clusterInitialDimension * 2
                ? width
                : this.props.clusterInitialDimension * 2;

        height =
            height <= this.props.clusterInitialDimension * 2
                ? height
                : this.props.clusterInitialDimension * 2;

        fontSize = fontSize <= 18 ? fontSize : 18;

        if (pointCount >= 2 && pointCount <= 10) {
            textForCluster = pointCount.toString();
        }
        if (pointCount > 10 && pointCount <= 25) {
            textForCluster = "10+";
        }
        if (pointCount > 25 && pointCount <= 50) {
            textForCluster = "25+";
        }
        if (pointCount > 50 && pointCount <= 100) {
            textForCluster = "50+";
        }
        if (pointCount > 100) {
            textForCluster = "100+";
        }

        const { containerStyle, textStyle } = this.props;

        return (
            <Marker coordinate={{ latitude, longitude }} onPress={this.onPress}>
                <View
                    style={[
                        styles.container,
                        containerStyle,
                        { width, height, borderRadius }
                    ]}
                >
                    <Text style={[styles.counterText, textStyle, { fontSize }]}>
                        {textForCluster}
                    </Text>
                </View>
            </Marker>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        alignItems: "center",
        borderColor: "#65bc46",
        justifyContent: "center",
        backgroundColor: "#fff"
    },
    counterText: {
        fontSize: 16,
        color: "#65bc46",
        fontWeight: "400"
    }
});
