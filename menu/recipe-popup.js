$(document).ready(function() {
    // Attach a click event handler to elements with data-item-name attribute
    $('[data-item-name]').click(function() {
        var nume_reteta = $(this).data('item-name');
        // Fetch the recipe data from the JavaScript variable
        var recipe = recipeData.find(item => item.nume_reteta === nume_reteta);

        // Display a pop-up with the recipe information
        if (recipe) {
            var popupContent = `
                <div>
                    <h2>${recipe.nume_reteta}</h2>
                    <p>Categorie: ${recipe.categorie}</p>
                    <p>Dificultate: ${recipe.dificultate}</p>
                    <p>Descriere: ${recipe.descriere}</p>
                    <p>Ingrediente: ${recipe.ingrediente}</p>
                    <p>Mod de Preparare: ${recipe.mod_de_preparare}</p>
                </div>
            `;
            alert(popupContent); // You can replace this with your preferred pop-up method.
        }
    });
});
