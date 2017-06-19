$(document).ready(function ($) {
    $(document).foundation();
    $("#styleguide-switch").click(function () {
        $("body").toggleClass("light");
    });
});