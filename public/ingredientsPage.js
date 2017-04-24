function initializeIngredientsPage() {
    readTextFile("ingredients.json", function (text) {
        var ingredients = JSON.parse(text);

        for (var i = 0; i < ingredients.length; i++) {
            $('#ingredientsTable').find('tbody').append($('<tr>').append($('<td>').append($('<img>').addClass('ingredientImage').attr('src', ingredients[i].url))));
            $('#ingredientsTable tr:last').append($('<td>').addClass('ingredientText').text(ingredients[i].name));
            $('#ingredientsTable tr:last').append($('<td>').addClass('ingredientText').text(ingredients[i].price));
            $('#ingredientsTable tr:last').append($('<td>').addClass('ingredientText').text(ingredients[i].availableQuantity));
        }
    });

}
