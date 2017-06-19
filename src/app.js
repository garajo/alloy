const scssFile = require('./styles/main.scss');
const jq = require('../dist/scripts/vendor.js');

$(document).ready(function ($) {
    $(document).foundation();
    $("#styleguide-switch").click(function () {
        $("body").toggleClass("light");
    });
});