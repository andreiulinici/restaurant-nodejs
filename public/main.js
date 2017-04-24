$(function () {
    $(document).ready(function () {
        $('li.menu').removeClass("active");
        $('#homePageHeader').addClass("active");
        $("#homePage").show();
        $("#ingredientsPage").hide();
        $("#dishesPage").hide();
        $("#makeYourOwnPage").hide();

        initializeIngredientsPage();
        initializeDishesPage();
        initializeMakeYourOwnPage();
    });


    $("#homePageHeader").click(function () {
        $('li.menu').removeClass("active");
        $('#homePageHeader').addClass("active");
        $("#homePage").show();
        $("#ingredientsPage").hide();
        $("#dishesPage").hide();
        $("#makeYourOwnPage").hide();
    });

    $("#ingredientsPageHeader").click(function () {
        $('li.menu').removeClass("active");
        $('#ingredientsPageHeader').addClass("active");
        $("#homePage").hide();
        $("#ingredientsPage").show();
        $("#dishesPage").hide();
        $("#makeYourOwnPage").hide();

    });

    $("#dishesPageHeader").click(function () {
        $('li.menu').removeClass("active");
        $('#dishesPageHeader').addClass("active");
        $("#homePage").hide();
        $("#ingredientsPage").hide();
        $("#dishesPage").show();
        $("#makeYourOwnPage").hide();
    });

    $("#makeYourOwnPageHeader").click(function () {
        $('li.menu').removeClass("active");
        $('#makeYourOwnPageHeader').addClass("active");
        $("#homePage").hide();
        $("#ingredientsPage").hide();
        $("#dishesPage").hide();
        $("#makeYourOwnPage").show();
    });

});

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
