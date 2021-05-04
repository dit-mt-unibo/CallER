/**
 * Model table user
 *
 * Table fields: id, name, surname, username, password, createdAt, updatedAt 
 *
 */
 
module.exports = {

    /**
     * Attributes id, createdAt, updatedAt are included by default see config/models.js
     */

    attributes: {
        
        name: {
            type: 'string',
            required: true,
            maxLength: 200
        },
        
        surname: {
            type: 'string',
            required: true,
            maxLength: 255
        },
        
        username: {
            type: 'string',
            required: true,
            unique: true,
            maxLength: 100
        },
        
        password: {
            type: 'string',
            required: true,
            protect: true
        }
        
    }
  
};