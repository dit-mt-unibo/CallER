/**
 * Model table category
 *  
 * Table fields: id, name, description, published, parent_id, createdAt, updatedAt
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
            maxLength: 150
        },
        
        description: {
            type: 'string',
            required: true
        },
        
        published: {
            type: 'number',
            defaultsTo: 1,
            min: 0,
            max: 1
        },
        
        parent_id: {
            type: 'number',
            allowNull: true           
        }
        
    }
    
 };