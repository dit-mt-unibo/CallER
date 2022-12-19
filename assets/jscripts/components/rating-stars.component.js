/**
 * <rating-stars>
 * 
 * Shows rating stars inside feedback element
 * 
 * @type {Component}
 */

 parasails.registerComponent('ratingStars' , {

    props: [
        'rate'
    ],

    template: `
    <span class="feedback-inline-stars">
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill" v-if="rate > 1"></i>
        <i class="bi bi-star-fill" v-if="rate > 2"></i>
        <i class="bi bi-star-fill" v-if="rate > 3"></i>
        <i class="bi bi-star-fill" v-if="rate > 4"></i>
    </span>       
    `,

})