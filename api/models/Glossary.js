/**
 * Model table glossary
 * 
 * Table fields: id, name, term, definition, createdAt, updatedAt
 * 
 */

module.exports = {

    /**
     * Attributes id, createdAt, updatedAt are included by default see config/model.js
     */

    attributes: {

        name: {
            type: 'string',
            unique: true,
            required: true,
            maxLength: 100
        },

        term: {
            type: 'string',
            required: true,
            maxLength: 200,
        },

        definition: {
            type: 'string',
            required: true
        }
        
    }
};