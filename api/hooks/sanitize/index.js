/**
 * Hook Sanitize
 * 
 * @description Hook for cleaning user input. 
 */

module.exports = function(){

    const sanitizeHtml = require('sanitize-html');
    const blackListWords = [];
    const blackListChars = ['"' , '\\' , '/' , '<' , '>' , '(' , ')' , '[' , ']' , '*' , '?' , '!' , '^' , '$' , '&' , '='];

    return {

        /**
         * Removes html tags from string
         * @param {string} text user input
         * @returns string
         */
        cleanHtml: function(text){

            return sanitizeHtml(text ,{
                allowedTags: [],
                allowedAttributes: {}
            });

        },

        /**
         * Removes blacklisted words from string
         * @param {string} text user input
         * @returns string
         */
        cleanWords: function(text){

            blackListWords.forEach(word => {
                
                let pattern = new RegExp(word , "g");
                text = text.replace(pattern , "");

            });

            return text;
        },

        /**
         * Removes unwanted chars from string
         * @param {string} text user input
         * @returns string
         */
        cleanChars: function(text){

            blackListChars.forEach(char => {

                let pattern = new RegExp("[" + char + "]", "g");
                text = text.replace(pattern , "");

            });

            return text;
        },

        /**
         * Removes html tags, unwanted chars and blacklisted words from string
         * @param {string} text user input
         * @returns string
         */
        deepClean: function(text){

            text = this.cleanHtml(text);
            text = this.cleanWords(text);
            text = this.cleanChars(text);

            return text;
        }
    }
}