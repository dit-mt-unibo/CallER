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
            required: true,
            maxLength: 65535            
        },

        full_text_plain:{
            type: 'string',
            allowNull: true,
            maxLength: 65535
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

        image_caption: {
            type: 'string',
            description: "image caption",
            allowNull: true
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
        
        extra_text: {
            type: 'string',
            description: 'additional text',
            allowNull: true
        },

        extra_text_block: {
            type: 'number',
            description: '0=unblocked, user can view extra text. 1=blocked, user can not view extra text',
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

        level:{
            type: 'number',
            defaultsTo: 0,
            min:0,
            max:2
        },
        
        category_id: {
            type: 'number',
            required: true
        },

        address: {
            type: 'string',
            allowNull: true,
            maxLength: 200
        },

        gmaps_place_id: {
            type: 'string',
            description: 'google maps place_id',
            allowNull: true,            
            maxLength: 300
        },

        // reference to the feedback model
        feedbacks: {
            collection: 'feedback',
            via: 'place_id'
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
