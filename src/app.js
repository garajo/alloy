const scssFile = require('./styles/main.scss');

$(document).ready(function ($) {
    $("#styleguide-switch").click(function () {
        $("body").toggleClass("light");
        document.getElementsByTagName("body").classList.forEach(function (element) {
        }, this);
    });
});