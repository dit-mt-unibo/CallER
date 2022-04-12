<!-- Layout barra strumenti con pulsante menu navigazione laterale, icona box ricerca, titolo pagina -->

<template>
    <div class="row toolbar">
        <div class="col-12 d-none d-lg-block d-xl-block">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="resp-menu-btn" @click="openSidebar">
                            <div class="resp-menu-bar"></div>
                            <div class="resp-menu-bar"></div>
                            <div class="resp-menu-bar"></div>
                        </div>
                        <i id="lens" class="fas fa-gamepad" @click="goTo2()"></i>
                        <i id="lens" class="fas fa-search" @click="openSearchBox"></i>
                        <div class="titolo card-text-truncate" @click="goTo(category_id)">{{title}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 d-block d-lg-none d-xl-none">
            <div class="resp-menu-btn" @click="openSidebar">
                <div class="resp-menu-bar"></div>
                <div class="resp-menu-bar"></div>
                <div class="resp-menu-bar"></div>
            </div>
            <i id="lens" class="fas fa-gamepad" @click="goTo2()"></i>
            <i id="lens" class="fas fa-search" @click="openSearchBox"></i>
            <div class="titolo card-text-truncate" @click="goTo(category_id)">{{title}}</div>
        </div>
    </div>
    <sidebar ref="sidebar"/>
    <search-box ref="searchbox"/>
</template>

<script>

import Sidebar from './sidebar.component.vue';
import SearchBox from './search-box.component.vue';

export default {

    name: "toolbar",

     // Utilizza variabile globale apiUrl
    inject: ['apiUrl'],

    props: ['title' , 'category_id'],

    data () {

        return {
            search: "",
        }

    },

    methods: {

        /**
         * Chiamata al metodo openSidebar del componente sidebar
         */
        openSidebar () {

            this.$refs.sidebar.openSidebar();

        },

        /**
         * Reindirizza alla pagina contenuti
         *
         * @param {int} category_id ID categoria di cui visualizzare i contenuti
         */
        goTo(category_id) {

            if ( this.$route.name != "categories" ) {

                this.$router.push("/contenuti/" + category_id);

            }

        },
        goTo2() {
                    let url = '/giochi/'
                    this.$router.push(url);

        },

        /**
         * Chiamata al metodo showHideSearchBox del component searchbox.
         */
        openSearchBox() {

            this.$refs.searchbox.showHideSearchBox();

        },

    },

    components: {
        Sidebar, SearchBox
    }

}
</script>
