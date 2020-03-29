import React from 'react';
import ReactDOM from 'react-dom';

const mapStyles = {
    map: {
        // position: 'absolute',
        width: '100%',
        height: '75vh',
    }
};

export class CurrentLocation extends React.Component {
    constructor(props) {
        super(props);

        const { lat, lng } = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            }
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
    }

    recenterMap() {
        const map = this.map;
        const current = this.state.currentLocation;

        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(current.lat, current.lng);
            map.panTo(center);
        }
    }

    componentDidMount() {
        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    const coords = pos.coords;
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    });
                });
            }
        }
        this.loadMap();
    }

    loadMap() {
        if (this.props && this.props.google) {
            // checks if google is available
            const { google } = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;

            // reference to the actual DOM element
            const node = ReactDOM.findDOMNode(mapRef);

            let { zoom } = this.props;
            const { lat, lng } = this.state.currentLocation;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign(
                {},
                {
                    center: center,
                    zoom: zoom,
                    styles: [
                        {
                            featureType: "water",
                            stylers: [
                                { saturation: 43 },
                                { lightness: -11 },
                                { hue: "#0088ff" }
                            ]
                        },
                        {
                            featureType: "road",
                            elementType: "geometry.fill",
                            stylers: [
                                { hue: "#ff0000" },
                                { saturation: -100 },
                                { lightness: 99 }
                            ]
                        },
                        {
                            featureType: "road",
                            elementType: "geometry.stroke",
                            stylers: [{ color: "#808080" }, { lightness: 54 }]
                        },
                        {
                            featureType: "landscape.man_made",
                            elementType: "geometry.fill",
                            stylers: [{ color: "#ece2d9" }]
                        },
                        {
                            featureType: "poi.park",
                            elementType: "geometry.fill",
                            stylers: [{ color: "#ccdca1" }]
                        },
                        {
                            featureType: "road",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#767676" }]
                        },
                        {
                            featureType: "road",
                            elementType: "labels.text.stroke",
                            stylers: [{ color: "#ffffff" }]
                        },
                        { featureType: "poi", stylers: [{ visibility: "off" }] },
                        {
                            featureType: "landscape.natural",
                            elementType: "geometry.fill",
                            stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
                        },
                        { featureType: "poi.park", stylers: [{ visibility: "on" }] },
                        {
                            featureType: "poi.sports_complex",
                            stylers: [{ visibility: "on" }]
                        },
                        { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
                        {
                            featureType: "poi.business",
                            stylers: [{ visibility: "simplified" }]
                        }
                    ]
                }
            );

            // maps.Map() is constructor that instantiates the map
            this.map = new maps.Map(node, mapConfig);
        }
    }

    renderChildren() {
        const { children } = this.props;

        if (!children) return;

        return React.Children.map(children, c => {
            if (!c) return;
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation
            });
        });
    }

    render() {
        const style = Object.assign({}, mapStyles.map);
        return (
            <div>
                <div style={style} ref="map">
                    Loading map...
                </div>
                {this.renderChildren()}
            </div>
        );
    }
}
export default CurrentLocation;

CurrentLocation.defaultProps = {
    zoom: 15,
    initialCenter: {
        lat: 4.679011,
        lng: -74.058465
    },
    centerAroundCurrentLocation: false,
    visible: true
};