<template>
    <div class="grid operations-show">
        <nav class="bg-gray-900 p-4 space-y-2">
            <router-link
                v-for="({ text, active, icon, to }, i) in nav"
                :key="i"
                :to="to || ''"
                class="p-2 rounded-lg my-auto flex items-center hover:bg-gray-700"
                :class="{
                    'text-white bg-gray-800': active,
                    'text-gray-300': !active,
                }"
            >
                <i class="fas fa-fw fa-lg" :class="icon"></i>
                <span class="font-medium ml-4">{{ text }}</span>
            </router-link>
        </nav>

        <div class="flex flex-col">
            <nav class="flex space-x-2 justify-end px-2 border-b border-gray-700">
                <button class="bg-transparent p-1" @click="showMap = !showMap">
                    <i class="fas fa-map text-gray-400 hover:text-white"></i>
                    <span class="sr-only">Karte einblenden</span>
                </button>
            </nav>

            <section class="grid grid-flow-col divide-x-4 divide-gray-700 flex-auto grid-cols-12">
                <div class="col-span-6">
                    <router-view></router-view>
                </div>

                <div class="flex flex-col col-span-6" v-if="showMap">
                    <div class="flex justify-between py-1 px-2 items-center">
                        <span>Karte</span>
                        <button class="bg-transparent p-1" @click="showMap = false">
                            <i class="fas fa-times text-gray-400 hover:text-white"></i>
                            <span class="sr-only">Karte einblenden</span>
                        </button>
                    </div>
                    <basemap-map
                        :center="[553674.27, 307199.11]"
                        class="flex-auto"
                    ></basemap-map>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showMap: true,
        }
    },
    computed: {
        nav() {
            return [
                {
                    text: 'Grid',
                    active: true,
                    icon: 'fa-grip-horizontal'
                },
                {
                    text: 'Einheiten',
                    active: false,
                    icon: 'fa-users'
                },
                {
                    text: 'Verbindung',
                    active: false,
                    icon: 'fa-broadcast-tower'
                },
                {
                    text: 'Versorgung',
                    active: false,
                    icon: 'fa-dolly'
                },
                {
                    text: 'Karte',
                    active: false,
                    icon: 'fa-map'
                },
            ]
        }
    }
}
</script>

<style>
.operations-show {
    grid-auto-flow: column;
    grid-template-columns: theme('width.56') 1fr;
    grid-template-rows: auto;
}
</style>
