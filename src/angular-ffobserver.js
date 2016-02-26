/**
 * @ngdoc directives
 * @name angular-ffobserver:ffobserver
 * @restrict A
 *
 * @param {array} ffobserverFonts - Array of fonts in the following structure:
 * [["roboto", {"weight": 200}],...,["roboto-light", {"weight": 200}]].
 * @param {string} ffobserverClass - This class will be added if all of the
 * fonts resolved (default setting: 'fonts-loaded').
 * @param {string} ffobserverCookieKey - Under this key will be add the cookie
 * if all of the fonts resolved (default setting: 'fonts-loaded').
 * @param {string} ffobserverCookieValue - This value will be stored in the
 * cookie if all of the fonts resolved (default setting: 'fonts-loaded').
 *
 * @description
 * Fonts are loaded through @font-face rules in the CSS whenever an element
 * references them. FontFaceObserver creates a referencing element to trigger
 * the font request, and listen for font load events. When all passed fonts
 * resolved, we enable them by adding a class to the html element,
 * also store a cookie.
 *
 * @example
 * ```html
 * <body data-ffobserver=""
 *       data-ffobserver-fonts='[["roboto", {"weight": 200}],
 *       ["roboto-light", {"weight": 200}]]'
 *       data-ffobserver-class="font-loaded--roboto"
 *       data-ffobserver-cookie-key="font-loaded"
 *       data-ffobserver-cookie-value="roboto"></body>
 * ```
 */

(function(w) {
  'use strict';

  angular
    .module('angular-ffobserver', ['ngCookies'])
    .constant('FontFaceObserver', w.FontFaceObserver)
    .directive('ffobserver', ffobserver);
})(window);

ffobserver.$inject = ['$q', 'FontFaceObserver', '$cookies'];

function ffobserver($q, FontFaceObserver, $cookies) {
  'use strict';

  function ffobserverLink($scope, $element, attrs) {
    if (!attrs.ffobserverFonts) {
      return console.log('ERROR: Fonts declaration missing');
    }

    var fonts = JSON.parse(attrs.ffobserverFonts);
    var fontsLoadedClass = attrs.ffobserverClass || 'fonts-loaded';
    var fontsCookieKey = attrs.ffobserverCookieKey || 'fonts-loaded';
    var fontsCookieValue = attrs.ffobserverCookieValue || 'fonts-loaded';
    var fontsPromises = [];

    if ($element[0].classList.contains(fontsLoadedClass) ||
      $element[0].className.indexOf(fontsLoadedClass) > -1) {
      return;
    }

    if ($cookies.get(fontsCookieKey) === undefined) {
      fonts.forEach(function(element) {
        fontsPromises.push(
          new FontFaceObserver(element[0], element[1]).check()
        );
      });

      $q.all(fontsPromises).then(
        function() {
          if ($element[0].classList) {
            $element[0].classList.add(fontsLoadedClass);
          } else {
            $element[0].className += ' ' + fontsLoadedClass;
          }

          $cookies.put(fontsCookieKey, fontsCookieValue);
        },

        function(error) {
          console.log('ERROR: FontFaceObserver promise rejected:', error);
        });
    } else {
      if ($element[0].classList) {
        $element[0].classList.add(fontsLoadedClass);
      } else {
        $element[0].className += ' ' + fontsLoadedClass;
      }
    }
  }

  var directive = {
    link: ffobserverLink,
    restrict: 'A',
  };

  return directive;
}
