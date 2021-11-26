/**
 * <list-rating-stars>
 * 
 * Shows rating stars in a list
 * 
 * @type {Component}
 */

parasails.registerComponent('listRatingStars' , {

    props: [        
        'rate' , 'count' , 'id'
    ],

    data: function() {

        return{       
            // Bootstrap class for star-icon
            'class_star_2': 'bi-star',
            'class_star_3': 'bi-star',
            'class_star_4': 'bi-star',
            'class_star_5': 'bi-star',
        }

    },

    // Applies bi-star-fill class to the icon, it depends on the prop rate
    beforeMount: function(){

        if ( this.rate > 1) {
            
            this.class_star_2 = "bi-star-fill";

        }
        
        if ( this.rate > 2) {
            
            this.class_star_3 = "bi-star-fill";

        }

        if ( this.rate > 3) {
            
            this.class_star_4 = "bi-star-fill";

        }
        if ( this.rate > 4) {
            
            this.class_star_5 = "bi-star-fill";

        }

    },

    template: `
    <li :id="id" class="list-group-item d-flex justify-content-between align-items-center" @click="filter(id)">
        <i class="bi bi-star-fill"></i>
        <i class="bi" :class="class_star_2"></i>
        <i class="bi" :class="class_star_3"></i>
        <i class="bi" :class="class_star_4"></i>
        <i class="bi" :class="class_star_5"></i>
        <span class="badge badge-primary badge-pill">{{ count }}</span>
    </li>       
    `,

    methods: {

        /**
         * Listener for the click event triggered by tag li.
         * Highlights the list item.
         * Emits the event click for the parent component.
         *  
         * @param {string} id tag li ID 
         */
        filter(id) {
            
            starsIds = ['star-1' , 'star-2' , 'star-3' , 'star-4' , 'star-5'];
            const obj = document.getElementById(id);

            if ( obj.classList.contains("feedback-list-stars-selected") ) {

                obj.classList.remove("feedback-list-stars-selected");

            }
            else {

                starsIds.forEach(sid => {
                
                    const elm = document.getElementById(sid);
                    elm.classList.remove("feedback-list-stars-selected");
    
                });
    
                
                obj.classList.add("feedback-list-stars-selected");

            }            
            
            this.$emit('click');

        }

    },

})