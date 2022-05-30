/**
 * Model table glossary
 * 
 * Table fields: id, name, term, definition, image, imageUID, image_caption, audio, createdAt, updatedAt
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
        },

        image: {
            type: 'string',
            description: 'filename, allowed extensions png, jpg, jpeg',
            allowNull: true,
            custom: function(filename) {
                
                return sails.hooks.validation.validateExtension(filename, ['png' , 'jpg' , 'jpeg']);
                
            }
        },

        imageUID: {
            type: 'string',
            description: 'uuid of the image file',
            allowNull: true
        },

        image_caption: {
            type: 'string',
            allowNull: true
        },
        
        audio: {
            type: 'string',
            description: 'filename, allowed extension mp3',
            allowNull: true,
            custom: function(filename) {
                
                return sails.hooks.validation.validateExtension(filename, ['mp3']);
                
            }
        },

        audioUID: {
            type: 'string',
            description: 'uuid of the audio file',
            allowNull: true
        },
        
    }
};