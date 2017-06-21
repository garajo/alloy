/* eslint-env jquery */

$(document).ready($ => {
  $(document).foundation();
  $('#styleguide-switch').click(() => {
    $('body').toggleClass('light');
  });
});
