/**
 * API per WebApp
 * 
 * @description json restituisce gli elementi (categorie e sottocategorie) per il menu di navigazione del client
 */

module.exports = {

    fn: async function(){

        var results = { success: 0 , items: [] };
        var parentCategories= [];

        // Recupera le categorie di primo livello
        try {

            parentCategories = await Category.find( { 
                where: { parent_id: null },
                sort: 'id ASC' 
            });

        }
        catch (err) {

            console.log(err.message);

        }

        // Per ogni categoria di primo livello recupera le eventuali sottocategorie
        if ( parentCategories.length > 0 ) {

            for (const element of parentCategories) {
                
                var childrenCategories = [];                

                try {

                    childrenCategories = await Category.find({
                        where: { parent_id: element.id },
                        sort: 'id ASC'
                    });

                }
                catch(err){
    
                    console.log(err.message);
                    return results;
    
                }

                /**
                 * Prepara elemento del menu da aggiungere a results['items']
                 * 
                 * hasSubmenu: se ha un sottomenu
                 * children: eventuali elementi del sottomenu
                 * label: nome della categoria
                 * id: ID categoria
                 * 
                 */
                var menuItem = { hasSubmenu: false , children: [] , label: element.name , id: element.id };

                if ( childrenCategories.length > 0 ) {

                    var children = [];

                    childrenCategories.forEach(child => {
                        
                        children.push({ label: child.name , id: child.id });

                    });

                    menuItem['hasSubmenu'] = true;
                    menuItem['children'] = children;

                }

                results['items'].push(menuItem);

            }            

        }

        if ( results['items'].length > 0 ) {

            results['success'] = 1;
            
        }

        return results;

    }

}