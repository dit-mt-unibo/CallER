/**
 * Hook validation
 * 
 * @description collection of methods for data validation
 */

module.exports = function() {

    return {

        validateExtension: function(filename, allowedExts){

            if ( filename == "" || filename == null || typeof filename === "undefined") return true;

            var result = false;
            var extension = filename.split('.').slice(-1).toString().toLowerCase();

            allowedExts.forEach(elm => {
                
                if (extension == elm) {
            
                    result = true;
                    return;
                    
                }

            });

            return result;
        }

    }

}