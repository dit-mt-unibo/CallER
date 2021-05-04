/**
 * Model Quiz
 *
 * Table fields: id, type, question, choices, answer, place_id, createdAt, updatedAt
 *
 */
 
module.exports = {

    /**
     * Attributes id, createdAt, updatedAt are included by default see config/models.js
     */
    
    attributes : {
        
        type: {
            type: 'string',
            description: 'can be 0 = multiple choice quiz , 1 = fill in the blank quiz, 2 = word order quiz ',
            required: true
        },
        
        question: {
            type: 'string',
            required: true
        },
        
        choices: {
            type: 'json',
            description: 'json array contains the choices in a multiple choice quiz'            
        },
        
        answer: {
            type: 'string',
            required: true
        },
        
        place_id: {
            type: 'number',
            required: true
        }
        
    }
  
};