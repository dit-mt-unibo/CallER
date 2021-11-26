/**
 * Model Feedback
 */

module.exports = {

    /**
     * Attributes id, createdAt, updatedAt are included by default see config/models.js
     */

    attributes : {

        rate: {
            type: 'number',
            required: true,            
            min: 1,
            max: 5
        },

        comment:{
            type: 'string',
            allowNull: true,
            maxLength: 255
        },

        ip:{
            type: 'string',
            required: true
        },

        // reference to the place model
        place_id: {
            model: 'place'
        }

    }
}