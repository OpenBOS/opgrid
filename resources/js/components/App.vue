<template>
    <main class="h-screen flex flex-col">
        <!-- <div class="fixed h-16 bg-red-600 top-0 inset-x-0 flex items-center justify-center">
            <h1 class="p-4 font-bold w-56 text-white">
                Codename: OpGrid
            </h1>
            <div class="mx-8 bg-white flex items-center py-2 px-2 rounded-lg flex-auto">
                <i class="fas fa-search text-red-900"></i>
                <input type="text" placeholder="Suchen" class="bg-transparent ml-2 placeholder-red-900 flex-auto">
            </div>
        </div> -->

        <header class="z-50 border-r border-gray-800 bg-gray-900 flex flex-row items-center">
            <div class="flex items-center h-16 bg-brand-red">
                <h1 class="py-2 px-8 font-medium text-white uppercase flex items-center">
                    <i class="fas fa-user-astronaut mr-4 fa-lg"></i>
                    <span class="tracking-widest">Visor</span>
                </h1>
            </div>

            <nav class="flex-auto ml-4 flex self-stretch">
                <ul class="flex flex-row space-x-2 items-stretch">
                    <li class="border-b-4 border-brand-red flex px-2">
                        <router-link to="/" class="p-2 rounded-lg my-auto flex items-center hover:bg-gray-700">
                            <i class="fas fa-exclamation-triangle fa-fw fa-lg text-white"></i>
                            <span class="text-white font-medium ml-4">Einsätze</span>
                        </router-link>
                    </li>
                    <li class="flex border-b-4 border-transparent px-2">
                        <a href="" class="p-2 my-auto flex items-center rounded-lg hover:bg-gray-700">
                            <i class="fas fa-sitemap fa-fw fa-lg text-gray-500"></i>
                            <span class="text-gray-400 font-medium ml-4">Organisation</span>
                        </a>
                    </li>
                </ul>
            </nav>

            <div class="bg-gray-800 flex items-center py-2 px-2 rounded-lg">
                <i class="fas fa-search text-gray-400"></i>
                <input type="text" placeholder="Suchen" class="bg-transparent ml-2 placeholder-gray-400 inline-block flex-auto w-full">
            </div>

            <div class="flex-auto"></div>

            <nav class="flex flex-row space-x-2 pr-4">
                <div class="flex items-center p-2">
                    <i class="fas fa-user-alt fa-lg fa-fw text-gray-500"></i>
                    <span class="ml-4 font-medium text-gray-400">FF Gaflenz</span>
                </div>
                <a href="" class="text-gray-800 p-2 rounded-lg flex items-center hover:bg-gray-700">
                    <i class="fas fa-cog fa-fw fa-lg text-gray-500"></i>
                    <span class="text-gray-400 font-medium ml-2 sr-only">Einstellungen</span>
                </a>
                <a href="" class="text-gray-800 p-2 rounded-lg flex items-center hover:bg-gray-700">
                    <i class="fas fa-sign-out-alt fa-fw fa-lg text-gray-500"></i>
                    <span class="text-gray-400 font-medium ml-2">Abmelden</span>
                </a>
            </nav>
        </header>

        <div class="flex-auto grid">
            <router-view></router-view>
        </div>
    </main>
</template>
