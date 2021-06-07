/**
 * Action video-update
 * 
 * @description updates the link to the youtube video
 */

 module.exports = {

    inputs: {

        id: {
            type: 'number',
        },
        video: {
            type: 'string',
        }
    },

    exits: {

        success: {
            statusCode: 200
        },
        saveFail: {
            description: 'when update query fails',
            statusCode: 409
        }   

    },

    fn: async function(inputs, exits) {
        
        if ( _.isEmpty(inputs.video) === false ) {

            inputs.video = youtubeEmbedUrl(inputs.video);

        }
        
        var result = await Place.updateOne( { id: inputs.id } ).set( { video: inputs.video } )
                        .intercept( (err) => {

                            return exits.saveFail();

                        });

        if (result) {
            
            return exits.success( { video: inputs.video} ); 

        }
        else {
            
            return exits.saveFail();

        }  

    }    

}

/**
 * Returns embed url for youtube video
 * @param url value sent by user
 * @returns string
 */
 function youtubeEmbedUrl(url) {

    //TODO: sposta in una funzione comune, duplicato del codice in save.js

    var embedUrl = "https://www.youtube.com/embed/";    
    var youTubeVideoId = "";
    
    const pattern1 = /^https:\/\/youtu.be\//;
    const match1 = url.match(pattern1);

    if ( _.isNull(match1) === false) {

        youTubeVideoId = url.split('/').slice(-1);

    }
    else {
        
        const pattern2 = /^https:\/\/www.youtube.com\/watch\?v=/;
        const match2 = url.match(pattern2);

        if ( _.isNull(match2) === false) {

            tmpArray = url.split('=');
            youTubeVideoId = tmpArray[1].split('&')[0];

        }

    }

    if ( _.isEmpty(youTubeVideoId) === false ) {

        return embedUrl  + youTubeVideoId;        

    }       

    return "";

}
