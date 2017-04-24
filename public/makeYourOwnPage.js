function initializeMakeYourOwnPage() {
    readTextFile("ingredients.json", function (text) {
        var ingredients = JSON.parse(text);

        readTextFile("dishes.json", function (text) {
            var dishes = JSON.parse(text);

            var ingredientTotalPrice = [];

            for (var i = 0; i < ingredients.length; i++) {
                ingredientTotalPrice[i] = 0;
            }

            $('#emptyNameInputError').hide();
            $('#noIngredientsSelectedError').hide();


            for (var i = 0; i < ingredients.length; i++) {
                var stock = ingredients[i].availableQuantity;

                var checkboxIngredient = $('<input>').attr('type', 'checkbox').attr('id', 'checkboxIngredient' + i);
                var ingredientName = $('<span>').text(ingredients[i].name).attr('id', 'makeYourOwnIngredientName' + i);
                var makeYourOwnLabel = $('<span>').addClass('makeYourOwnLabel col-md-4').append(checkboxIngredient).append(ingredientName);

                var quantitySpan = $('<span>').text('Quantity');
                var quantityInput = $('<input>').attr('type', 'number').attr('id', 'quantityInput' + i).attr('disabled', 'disabled').attr('min', '0').attr('max', '99').attr('value', '1');
                var makeYourOwnQuantity = $('<span>').addClass('makeYourOwnQuantity col-md-4').append(quantitySpan).append(quantityInput);
                var stockErrorIngredient = $('<span>').attr('id', 'stockErrorIngredient' + i).addClass('stockErrorIngredient').text('The available stock is ' + stock).hide();

                $('#makeYourOwn').append($('<div>').addClass('makeYourOwnIngredient row').append(makeYourOwnLabel).append(makeYourOwnQuantity).append(stockErrorIngredient));
            }

            $('.makeYourOwnLabel :checkbox').change(function () {
                var checkboxIngredientChecked = $(this).attr("id");
                var selectedIngredientID = Number((checkboxIngredientChecked).substring(18)); // example: extract id of checkboxIngredient0        

                if (this.checked) {
                    $('#quantityInput' + selectedIngredientID).attr('disabled', false);
                    ingredientTotalPrice[selectedIngredientID] = ingredients[selectedIngredientID].price * $('#quantityInput' + selectedIngredientID).val();
                    calculateTotalPrice();
                } else {
                    $('#quantityInput' + selectedIngredientID).attr('disabled', true);
                    ingredientTotalPrice[selectedIngredientID] = 0;
                    calculateTotalPrice();
                }
            });

            $('.makeYourOwnQuantity :input').change(function () {
                var ingredientQuantity = $(this).attr('id');
                var selectedIngredientID = Number((ingredientQuantity).substring(13)); // example: extract id of quantityInput0
                var stock = ingredients[selectedIngredientID].availableQuantity;

                if (this.value > stock || this.value < 0) {
                    $('#stockErrorIngredient' + selectedIngredientID).show();
                    $(this).val(1);
                } else {
                    $('#stockErrorIngredient' + selectedIngredientID).hide();
                }

                ingredientTotalPrice[selectedIngredientID] = ingredients[selectedIngredientID].price * $('#quantityInput' + selectedIngredientID).val();
                calculateTotalPrice(selectedIngredientID);
            });

            function calculateTotalPrice() {
                var totalPrice = 0;

                for (var i = 0; i < ingredients.length; i++) {
                    totalPrice += ingredientTotalPrice[i];
                }

                $('#makeYourOwnTotalPrice :input').attr('type', 'number').attr('value', totalPrice);
            }

            $('#makeYourOwnSave').click(saveDish);
        });
    });
}

function saveDish() {
    readTextFile("ingredients.json", function (text) {
        var ingredients = JSON.parse(text);

        readTextFile("dishes.json", function (text) {
            var dishes = JSON.parse(text);

            if ($('#makeYourOwnName :input').val() === '') {
                $('#emptyNameInputError').show();
                return;
            } else {
                $('#emptyNameInputError').hide();
            }

            if ($('#makeYourOwnTotalPrice :input').val() === undefined || Number($('#makeYourOwnTotalPrice :input').val()) === 0) {
                $('#noIngredientsSelectedError').show();
                return;
            } else {
                $('#noIngredientsSelectedError').hide();
            }

            var dishIngredients = [];
            var dishQuantity = 0;

            for (var i = 0; i < ingredients.length; i++) {
                if ($('#checkboxIngredient' + i).is(':checked') && Number($('#quantityInput' + i).val()) != 0) {
                    dishQuantity += addDishIngredient(dishIngredients, i, ingredients);
                }
            }

            var newDish = {
                "name": $('#makeYourOwnName :input').val(),
                "ingredients": dishIngredients,
                "quantity": dishQuantity,
                "unit": "g",
                "price": Number($('#makeYourOwnTotalPrice :input').val()),
                "url": $('#makeYourOwnURL :input').val()
            }

            dishes.push(newDish);
            addDish(dishes);

            // ==================== Put the object into local storage ====================
            localStorage.setItem('dishes', JSON.stringify(dishes));

            // Retrieve the object from storage
            var retrievedObject = localStorage.getItem('dishes');

            console.log('retrievedObject: ', JSON.parse(retrievedObject));
            

            // ==================== Download dishes button, on the home page ====================
            var parts = [JSON.stringify(dishes)];

            // Construct a file
            var file = new File(parts, 'dishes.json', {});

            var fr = new FileReader();

            fr.onload = function (evt) {
                document.getElementById('homePage').innerHTML = "<br><a href=" + URL.createObjectURL(file) + " download=" + file.name + ">Download " + file.name;
            }

            fr.readAsText(file);
            
        });
    });
}


function addDishIngredient(dishIngredients, selectedIngredientIndex, ingredients) {
    var selectedIngredient = {
        "name": $('#makeYourOwnIngredientName' + selectedIngredientIndex).html(),
        "quantity": Number($('#quantityInput' + selectedIngredientIndex).val()),
        "unit": "g",
        "price": Number(ingredients[selectedIngredientIndex].price * $('#quantityInput' + selectedIngredientIndex).val()),
        "url": ingredients[selectedIngredientIndex].url
    }

    dishIngredients.push(selectedIngredient);
    ingredients[selectedIngredientIndex].availableQuantity -= Number($('#quantityInput' + selectedIngredientIndex).val());

    return selectedIngredient.quantity;
}

function addDish(dishes) {
    $('#dishesTable').find('tbody').append($('<tr>').append($('<td>').append($('<img>').addClass('dishImage').attr('src', dishes[dishes.length - 1].url))));
    $('#dishesTable tr:last').append($('<td>').addClass('dishText').text(dishes[dishes.length - 1].name));
    $('#dishesTable tr:last').append($('<td>').addClass('dishText').text(dishes[dishes.length - 1].price));
    $('#dishesTable tr:last').attr('data-placement', 'auto').attr('data-toggle', 'tooltip').attr('title', getDishIngredients(dishes[dishes.length - 1]));
}
