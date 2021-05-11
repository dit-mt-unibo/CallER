/**
 * Model table place
 *
 * Table fields: id, name, intro_text, full_text, image, video, audio, photo_gallery, blocked, tags, gps, 
 *              published, category_id, createdAt, updatedAt
 *
 */
 
module.exports = {

    /**
     * Attributes id, createdAt, updatedAt are included by default see config/models.js
     */

    attributes : {
        
        name: {
            type: 'string',
            required: true,
            maxLength: 150
        },
        
        intro_text: {
            type: 'string',
            allowNull: true,
            maxLength: 150
        },
        
        full_text: {
            type: 'string',
            required: true            
        },
                
        image: {
            type: 'string',
            description: 'filename. Allowed file extensions png, jpg, jpeg',
            required: true,
            custom: function(filename) {
                
                return validateExtension(filename, ['png' , 'jpg' , 'jpeg']);
                
            }
        },
        
        video: {
            type: 'string',
            description: 'url of a youtube video',
            allowNull: true,
            isURL: true
        },
        
        audio: {
            type: 'string',
            description: 'filename. Allowed file extensions mp3',
            allowNull: true,
            custom: function(filename) {
                
                return validateExtension(filename, ['mp3']);                
                
            }
        },
        
        photo_gallery: {
            type: 'string',
            description: 'folder name. The folder contains images for a photo gallery',
            allowNull: true
        },
        
        blocked: {
            type: 'number',
            description: '0=unblocked, user can access the content. 1=blocked, user can not access the content',
            defaultsTo: 0,
            min: 0,
            max: 1
        },
        
        tags: {
            type: 'json',
            description: 'json array [tagA, tagB, tagC]'            
        },
        
        lat: {
            type: 'number',
            description: 'latitudine'            
        },

        long: {
          type: 'number',
          description: 'longitudine'
        },
        
        published: {
            type: 'number',
            defaultsTo: 1,
            min: 0,
            max: 1
        },
        
        category_id: {
            type: 'number',
            required: true
        }
        
    }
  
};

/**
 * Validates file extension
 * 
 * @param filename: string filename
 * @param allowedExts: array allowed file extensions
 * @return bool
 */
function validateExtension(filename, allowedExts) {
    
    var result = false;
    var extension = filename.split('.').slice(-1);
    
    allowedExts.forEach(elm => {
        
        if (extension == elm) {
            
            result = true;
            return;
            
        }
        
    });    
    
    return result
    
}
