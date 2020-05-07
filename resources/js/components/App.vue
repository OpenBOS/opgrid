<template>
    <main>
        <!-- <div class="fixed h-16 bg-red-600 top-0 inset-x-0 flex items-center justify-center">
            <h1 class="p-4 font-bold w-56 text-white">
                Codename: OpGrid
            </h1>
            <div class="mx-8 bg-white flex items-center py-2 px-2 rounded-lg flex-auto">
                <i class="fas fa-search text-red-900"></i>
                <input type="text" placeholder="Suchen" class="bg-transparent ml-2 placeholder-red-900 flex-auto">
            </div>
        </div> -->

        <header class="fixed w-56 border-r border-gray-800 bg-gray-900 top-0 bottom-0 flex flex-col">
            <div class="flex items-center h-12 bg-brand-red">
                <h1 class="py-2 px-4 font-bold text-white uppercase">
                    Visor
                </h1>
            </div>

            <hr class="border-gray-800">

            <div class="p-4">
                <div class="bg-gray-800 flex items-center py-2 px-2 rounded-lg">
                    <i class="fas fa-search text-gray-400"></i>
                    <input type="text" placeholder="Suchen" class="bg-transparent ml-2 placeholder-gray-400 inline-block flex-auto w-full">
                </div>
            </div>

            <nav class="p-4 flex-auto">
                <ul class="flex flex-col">
                    <li class="mt-2">
                        <a href="" class=" p-2 bg-brand-red rounded-lg flex items-center">
                            <i class="fas fa-exclamation-triangle fa-fw fa-lg text-white"></i>
                            <span class="text-white font-medium ml-4">Einsätze</span>
                        </a>
                    </li>
                    <li class="mt-2">
                        <a href="" class="p-2 flex items-center rounded-lg hover:bg-gray-700">
                            <i class="fas fa-sitemap fa-fw fa-lg text-gray-500"></i>
                            <span class="text-gray-400 font-medium ml-4">Organisation</span>
                        </a>
                    </li>
                    <li class="mt-2">
                        <a href="" class="text-gray-800 p-2 rounded-lg flex items-center hover:bg-gray-700">
                            <i class="fas fa-cog fa-fw fa-lg text-gray-500"></i>
                            <span class="text-gray-400 font-medium ml-4">Einstellungen</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <hr class="border-gray-800">
            <nav class="p-4">
                <div class="flex items-center p-2">
                    <i class="fas fa-user-alt fa-lg fa-fw text-gray-500"></i>
                    <div class="ml-4">
                        <div class="font-medium">
                            FF Gaflenz
                        </div>
                        <div class="text-sm text-gray-500">
                            <a href="">Profil anzeigen</a>
                        </div>
                    </div>
                </div>
                <a href="" class="text-gray-800 p-2 rounded-lg flex items-center hover:bg-gray-700">
                    <i class="fas fa-sign-out-alt fa-fw fa-lg text-gray-500"></i>
                    <span class="text-gray-400 font-medium ml-4">Abmelden</span>
                </a>
            </nav>
        </header>

        <div class="pl-56">
            <div class="">
                <router-view></router-view>
            </div>
        </div>
    </main>
</template>
