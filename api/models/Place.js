/**
 * Model table place
 *
 * Table fields: id, name, intro_text, full_text, image, imageUID, video, video_block audio, audio_block,
 *              photo_gallery, photo_gallery_block, tags, lat, long, published, category_id, createdAt, updatedAt
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

        imageUID: {
            type: 'string',
            description: 'uuid of the image file, which has been uploaded under assets/images/contenuti',
        },

        video: {
            type: 'string',
            description: 'url of a youtube video',
            allowNull: true,
            isURL: true
        },

        video_block: {
            type: 'number',
            description: '0=unblocked, user can play the video. 1=blocked, user can not play the video',
            defaultsTo: 0,
            min: 0,
            max: 1
        },
        
        audio: {
            type: 'string',
            description: 'url of an audio file, or just track name from soundcloud',
            allowNull: true,
            isURL: true
        },

        audio_block: {
            type: 'number',
            description: '0=unblocked, user can play the audio. 1=blocked, user can not play the audio',
            defaultsTo: 0,
            min: 0,
            max: 1
        },
        
        photo_gallery: {
            type: 'string',
            description: 'folder name. The folder contains images for a photo gallery',
            allowNull: true
        },

        photo_gallery_block: {
            type: 'number',
            description: '0=unblocked, user can open the gallery. 1=blocked, user can not open the gallery',
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
            allowNull: true,
            description: 'latitudine'            
        },

        long: {
          type: 'number',
          allowNull: true,
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

  if (filename == '') return true;

    var result = false;
    var extension = filename.split('.').slice(-1).toString().toLowerCase();
    
    allowedExts.forEach(elm => {
        
        if (extension == elm) {
            
            result = true;
            return;
            
        }
        
    });    
    
    return result
    
}
