const scssFile = require('./styles/main.scss');

$(document).ready(function ($) {
    $(document).foundation();
    $("#styleguide-switch").click(function () {
        $("body").toggleClass("light");
    });
});