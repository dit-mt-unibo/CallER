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
        },

        validateEmail: function(email) {

            if ( email == "" || email == null || typeof email === "undefined") return false;

            const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            const regExp = new RegExp(pattern);

            return regExp.test(email);

        }

    }

}