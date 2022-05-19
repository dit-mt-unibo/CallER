/**
 * Modulo per la gestione dei cookies
 */

export default {

    /**
     * Imposta valore di un cookie
     * 
     * @param {string} cname nome cookie
     * @param {string} cvalue valore cookie
     * @param {int} exdays giorni per calcolo scadenza
     */
    setCookie(cname, cvalue, exdays) {

        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
        
    },
    
    /**
     * Restituisce il valore di un cookie.
     * Restituisce "0" se il cookie non è presente
     * 
     * @param {string} cname nome cookie
     * @returns string 
     */
    getCookie(cname) {
        
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                    c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
            }
            
        }
        
        return "0";
        
    },
    
    /**
     * Elimina un cookie
     * 
     * @param {string} cname nome cookie
     */
    deleteCookie(cname) {
        
        document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        
    },

    /**
     * Imposta cookie con scadenza alle 23:59:59 del giorno corrente
     * 
     * @param {string} cname nome cookie
     * @param {string} cvalue valore cookie
     */
    setDailyCookie(cname , cvalue){
        
        var expDate = new Date();        
        expDate.setUTCHours(23);
        expDate.setUTCMinutes(59);
        expDate.setUTCSeconds(59);
        var expires = "expires="+expDate.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";

    }

}