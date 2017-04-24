function initializeDishesPage() {
    readTextFile("dishes.json", function (text) {
        var dishes = JSON.parse(text);

        for (var i = 0; i < dishes.length; i++) {
            $('#dishesTable').find('tbody').append($('<tr>').append($('<td>').append($('<img>').addClass('dishImage').attr('src', dishes[i].url))));
            $('#dishesTable tr:last').append($('<td>').addClass('dishText').text(dishes[i].name));
            $('#dishesTable tr:last').append($('<td>').addClass('dishText').text(dishes[i].price));
            $('#dishesTable tr:last').attr('data-placement', 'auto').attr('data-toggle', 'tooltip').attr('title', getDishIngredients(dishes[i]));
        }
    });

}

function getDishIngredients(dish) {

    if (dish.ingredients.length === 0) {
        return 'no ingredients';
    } else {
        var dishIngredients = '';
        for (var j = 0; j < dish.ingredients.length; j++) {
            dishIngredients += dish.ingredients[j].name;
            if (j < (dish.ingredients.length - 1)) {
                dishIngredients += ', ';
            }
        }
        return dishIngredients;
    }

}
