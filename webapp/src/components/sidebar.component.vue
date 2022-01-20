<!-- Layout menu di navigazione -->

<template>
    <div id="mySidebar" class="sidebar" data-aria="">
        <ul class="list-group">
            <li class="list-group-item " v-for="entry in this.entries" :key="entry.id">
                <div style="float:left" @click="goTo(entry.id)">{{ entry.label }}</div>
                <div v-if="entry.hasSubmenu" :id="entry.id" style="float:right; font-weight:600;" @click="openSubMenu">+</div>
                <div style="clear:both"></div>
                <div v-if="entry.hasSubmenu" :id="'sub-' + entry.id" class="submenu submenu-collapsed">
                    <div v-for="child in entry.children" class="submenu-child" :key="child.id">
                        <div @click="goTo(child.id)">{{ child.label }}</div>
                    </div>
                </div>
            </li>
        </ul>        
    </div>
</template>

<script>
import axios from 'axios';

export default {
    
    name: "sidebar",

    // Utilizza variabile globale apiUrl
    inject: ['apiUrl'],

    data() {
        
        return {
            entries: [],
        }

    },
    
    created: async function(){

        this.entries = await this.getEntries();        

    }, 

    methods: {

        /**
         * Recupera gli elementi del menu di navigazione
         */
        async getEntries() {

            const response = await axios.get(this.apiUrl + "/api/get-navigation-menu");
            return response.data.items;

        },
        
        /**
         * Apre il menu di navigazione laterale
         */
        openSidebar() {
            
            const attr = document.getElementById("mySidebar").getAttribute("data-aria");

            if ( attr == "" ) {

                document.getElementById("mySidebar").style.width = "100%";
                document.getElementById("mySidebar").setAttribute("data-aria" , "open");

            }
            else {

                this.closeSidebar();

            }            
        },

        /**
         * Chiude il menu di navigazione laterale
         */
        closeSidebar() {

            document.getElementById("mySidebar").style.width = "0";
            document.getElementById("mySidebar").setAttribute("data-aria" , "");

        },

        /**
         * Apre/chiude il sottomenu
         * 
         * @param {Event} e oggeto Event
         */
        openSubMenu(e) {

            const itemId = e.target.getAttribute("id");
            const submenuItem = document.getElementById("sub-" + itemId);

            if ( submenuItem.classList.contains("submenu-collapsed") ) {

                submenuItem.classList.remove("submenu-collapsed");

            }
            else {

                submenuItem.classList.add("submenu-collapsed");

            }                      

        },

        /**
         * Reindirizza alla categoria selezionata e chiude il menu di navigazione
         */
        goTo(category_id) {

            let url = (category_id == 1) ? '/' : '/categorie/' + category_id;
            this.$router.push(url);
            
            this.closeSidebar();

        }

    }

}

</script>
