<template>
    <div class="flex flex-col">
        <div ref="map" class="basemap-map bg-gray-600 flex-auto"></div>
    </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import VectorLayer from "ol/layer/Vector";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import { toLonLat, fromLonLat } from "ol/proj";
import { register } from "ol/proj/proj4";
import WMTSCapabilities from "ol/format/WMTSCapabilities";
import { DEVICE_PIXEL_RATIO } from "ol/has";
import WMTS, { optionsFromCapabilities } from "ol/source/WMTS";
import OSM from "ol/source/OSM";
import proj4 from "proj4";
import axios from 'axios'
import { Icon, Style, Fill } from 'ol/style'
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import FillStyle from 'ol/style/Fill'
import TextStyle from 'ol/style/Text'
import StrokeStyle from 'ol/style/Stroke'
import {defaults as defaultInteractions, Select, Translate} from 'ol/interaction';
import GeoJSON from 'ol/format/GeoJSON'
import isEmpty from 'lodash/isEmpty'
import {defaults as defaultControls, Attribution} from 'ol/control'

proj4.defs(
    "EPSG:31258",
    "+proj=tmerc +lat_0=0 +lon_0=13.33333333333333 +k=1 +x_0=450000 +y_0=-5000000 +ellps=bessel +towgs84=577.326,90.129,463.919,5.137,1.474,5.297,2.4232 +units=m +no_defs"
);

proj4.defs("EPSG:31255","+proj=tmerc +lat_0=0 +lon_0=13.33333333333333 +k=1 +x_0=0 +y_0=-5000000 +ellps=bessel +towgs84=577.326,90.129,463.919,5.137,1.474,5.297,2.4232 +units=m +no_defs");

register(proj4);

var capabilitiesUrl = "https://www.basemap.at/wmts/1.0.0/WMTSCapabilities.xml";

var hiDPI = DEVICE_PIXEL_RATIO > 1;
var tilePixelRatio = hiDPI ? 2 : 1;

const textFont = "'Arial', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"

function iconStyle({ text, color, size = 24, weight = 900, stroke = true, strokeWidth = 2, index = null }) {
    // Layer a number above the icon
    return [
        ...(index !== null ? [new Style({
            text: new TextStyle({
                text: `${index}`,
                textAlign: 'center',
                offsetY: -size * 0.625,
                font: `900 ${size * 0.4375}px ${textFont}`,
                fill: new FillStyle({
                    color: 'white',
                })
            }),
            zIndex: 2,
        })] : []),
        new Style({
            text: new TextStyle({
                text,
                font: `${weight} ${size}px "Font Awesome 5 Pro"`,
                textBaseline: 'bottom',
                textAlign: 'center',
                fill: new FillStyle({
                    color,
                }),
                stroke: stroke ? new StrokeStyle({
                    color: 'white',
                    width: strokeWidth,
                }) : null
            }),
            zIndex: 1,
        }),
    ]
}

const MapMarkerStyle = (feature) => {
    return iconStyle({
        text: '\uf041',     //  fa-map-marker-alt
        index: feature.getProperties().index + 1,
        color: '#DF0B15',
        size: 32,
    })
}

const MapMarkerSelectedStyle = (feature) => {
    return iconStyle({
        text: '\uf041',     //  fa-map-marker-alt
        index: feature.getProperties().index + 1,
        color: '#DF0B15',
        size: 40,
    })
}

const HomeMarkerStyle = () => {
    return iconStyle({
        text: '\uf015',     //  fa-home
        color: '#999',
        weight: 900,
        stroke: true,
    })
}

export default {
    props: {
        center: Array,
        layers: {
            type: Array,
            default: () => [],
        },
    },

    data() {
        return {
            map: null,
            selectedFeatures: [],
        }
    },

    methods: {
        returnToCenter() {
            this.map.getView().setCenter(this.center)
        },
        addPoint() {
            var feature = new Feature({
                geometry: new Point(this.center),
                name: 'Standortmarker',
            });

            this.vectorSource.addFeature(feature)
        },
        removeSelectedPoint() {
            this.selectedFeatures.forEach((feature) => this.vectorSource.removeFeature(feature))
            this.selectedFeatures = []
        },
        async addBasemapLayer(layerName, position = null) {
            const options = optionsFromCapabilities(this.capabilities, {
                layer: layerName,
                matrixSet: "google3857",
                style: "normal"
            })
            options.tilePixelRatio = tilePixelRatio

            const tileLayer = new TileLayer({
                source: new WMTS({
                    ...options,
                    attributions: 'Datenquelle: basemap.at'
                }),
            })

            // Insert basemap layer beneath all other layers
            this.map.getLayers().insertAt(position, tileLayer);
        },
    },

    async mounted() {
        const layers = []

        // const vectorLayer = new VectorLayer({
        //     source: this.vectorSource,
        //     style: MapMarkerStyle,
        // });

        // const homeFeature = new Feature({
        //     geometry: new Point(this.center),
        //     name: 'Ihr Objekt',
        //     isHome: true,
        // });

        // homeFeature.setStyle(HomeMarkerStyle);

        // layers.push(new VectorLayer({
        //     source: new VectorSource({
        //         features: [homeFeature]
        //     })
        // }))

        // layers.push(vectorLayer)

        const select = new Select({
            // style: MapMarkerSelectedStyle,
            filter(feature) {
                return !feature.getProperties().isHome
            },
            hitTolerance: 4,
        });
        select.on('select', (event) => {
            this.selectedFeatures = select.getFeatures().getArray()
        })

        const translate = new Translate({
            filter(feature) {
                return !feature.getProperties().isHome
            },
            hitTolerance: 4,
        })

        const attribution = new Attribution({
            collapsible: false,
            collapsed: false,
        })

        this.map = new Map({
            interactions: defaultInteractions().extend([select, translate]),
            layers,
            target: this.$refs.map,
            view: new View({
                projection: "EPSG:31258",
                center: this.center,
                zoom: 15,
                maxZoom: 20,
                minZoom: 7,
            }),
            controls: defaultControls({ attributionOptions: { collapsed: false } })
        })

        // Start fetching the basemap layer
        const response = await axios.get(capabilitiesUrl, {
            responseType: 'text',
        });

        this.capabilities = new WMTSCapabilities().read(response.data);

        this.addBasemapLayer(hiDPI ? "bmaphidpi" : "geolandbasemap", 0)
        // this.addBasemapLayer("bmaporthofoto30cm", 0)
        // this.addBasemapLayer("bmapoverlay", 1)

        for (const layer of this.layers) {
            this.map.addLayer(layer)
        }
    }
}
</script>

<style>
.basemap-map .ol-attribution * {
    color: theme('colors.black');
    font-size: theme('fontSize.xs')
}
</style>
