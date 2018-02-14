import React, { Component } from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";

import { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import supercluster from "supercluster";
import ClusteredMapView from "react-native-maps-super-cluster";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Map extends Component {
    constructor(props) {
        super(props);
    }

    renderMarker = ({ id, location }) => {
        return <Marker key={id} coordinate={location} />;
    };

    renderCluster = (cluster, onPress) => {
        const pointCount = cluster.pointCount,
            coordinate = cluster.coordinate,
            clusterId = cluster.clusterId;

        const clusterEngine = this.map.getClusteringEngine(),
            clusteredPoints = clusterEngine.getLeaves(clusterId, 100);

        return (
            <Marker
                onPress={onPress}
                coordinate={coordinate}
                key={cluster.clusterId}
            >
                <View style={styles.clusterContainer}>
                    <Text style={styles.counterText}>{pointCount}</Text>
                </View>
            </Marker>
        );
    };

    render() {
        let { points, region } = this.props;

        return (
            <ClusteredMapView
                style={styles.map}
                customMapStyle={mapStyle}
                data={points.map(point => {
                    return {
                        id: point.properties._id,
                        location: {
                            longitude: point.geometry.coordinates[0],
                            latitude: point.geometry.coordinates[1]
                        }
                    };
                })}
                ref={r => (this.map = r)}
                renderMarker={this.renderMarker}
                renderCluster={this.renderCluster}
                preserveClusterPressBehavior={true}
                edgePadding={{ top: 32, left: 10, right: 64, bottom: 64 }}
                initialRegion={{
                    ...region,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }}
                radius={64}
            />
        );
    }
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject
    },
    clusterContainer: {
        width: 36,
        height: 36,
        borderWidth: 3,
        borderRadius: 50,
        alignItems: "center",
        borderColor: "#1d2c4d",
        justifyContent: "center",
        backgroundColor: "#fff"
    },
    counterText: {
        fontSize: 16,
        color: "#1d2c4d",
        fontWeight: "400"
    }
});

const mapStyle = [
    {
        elementType: "geometry",
        stylers: [
            {
                color: "#1d2c4d"
            }
        ]
    },
    {
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#8ec3b9"
            }
        ]
    },
    {
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#1a3646"
            }
        ]
    },
    {
        featureType: "administrative.country",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#4b6878"
            }
        ]
    },
    {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#64779e"
            }
        ]
    },
    {
        featureType: "administrative.province",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#4b6878"
            }
        ]
    },
    {
        featureType: "landscape.man_made",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#334e87"
            }
        ]
    },
    {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [
            {
                color: "#023e58"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
            {
                color: "#283d6a"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#6f9ba5"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#1d2c4d"
            }
        ]
    },
    {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#023e58"
            }
        ]
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#3C7680"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [
            {
                color: "#304a7d"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#98a5be"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#1d2c4d"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
            {
                color: "#2c6675"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#255763"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#b0d5ce"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#023e58"
            }
        ]
    },
    {
        featureType: "transit",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#98a5be"
            }
        ]
    },
    {
        featureType: "transit",
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#1d2c4d"
            }
        ]
    },
    {
        featureType: "transit.line",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#283d6a"
            }
        ]
    },
    {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [
            {
                color: "#3a4762"
            }
        ]
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            {
                color: "#0e1626"
            }
        ]
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#4e6d70"
            }
        ]
    }
];
