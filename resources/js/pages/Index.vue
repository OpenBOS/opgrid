<template>
    <div class="h-screen flex flex-col">
        <header class="py-2 px-8 flex items-center h-12">
            <h1 class="font-bold flex-auto">
                Einsätze
            </h1>

            <a href="" class="bg-blue-600 px-3 py-1 rounded-lg text-sm">
                <i class="fas fa-plus"></i>
                Neuer Einsatz
            </a>
        </header>

        <hr class="border-gray-700">

        <div class="grid grid-cols-3 flex-auto">
            <div class="col-span-2 overflow-y-auto">
                <div class="p-4 px-8">
                    Filter
                </div>
                <hr class="border-gray-700">
                <div class="p-4 px-8">
                    Einsätze und Status
                </div>
            </div>
            <div class="flex flex-col">
                <basemap-map
                    v-if="operationsLayer"
                    :center="[553674.27, 307199.11]"
                    :layers="[operationsLayer]"
                    :fit="operationsLayer.getSource().getExtent()"
                    class="flex-auto"
                >
                </basemap-map>
            </div>
        </div>
    </div>
</template>

<script>
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import FillStyle from 'ol/style/Fill'
import TextStyle from 'ol/style/Text'
import StrokeStyle from 'ol/style/Stroke'
import { Style } from 'ol/style'

const geoJSON = new GeoJSON()

export default {
    data() {
        return {
            operationsLayer: null,
        }
    },
    mounted() {
        this.operationsLayer = new VectorLayer({
            source: new VectorSource({
                features: geoJSON.readFeatures({
                    type: "FeatureCollection",
                    features: [
                        {
                            type: "Feature",
                            geometry: {
                                type: "Point",
                                coordinates: [553674.27, 307199.11]
                            }
                        },
                        {
                            type: "Feature",
                            geometry: {
                                type: "Point",
                                coordinates: [553552.21, 306317.52]
                            }
                        },
                        {
                            type: "Feature",
                            geometry: {
                                type: "Point",
                                coordinates: [554035.4843341362, 305632.32060921524]
                            }
                        },
                        {
                            type: "Feature",
                            geometry: {
                                type: "Point",
                                coordinates: [551730.1056511226, 308209.86060235533]
                            }
                        },
                    ]
                })
            }),
            style: (feature) => {
                return new Style({
                    text: new TextStyle({
                        text: '\uf041',     //  fa-map-marker-alt
                        font: `700 32px "Font Awesome 5 Pro"`,
                        textBaseline: 'bottom',
                        textAlign: 'center',
                        fill: new FillStyle({
                            color: 'rgb(207, 65, 40)',
                        }),
                        stroke: new StrokeStyle({
                            color: 'white',
                            width: 2,
                        })
                    }),
                    zIndex: 1,
                })
            }
        })

        this.operationsLayer.getSource().on('changefeature', ({ feature }) => {
            console.log(feature.getGeometry().getCoordinates())
        })
    }
}
</script>
