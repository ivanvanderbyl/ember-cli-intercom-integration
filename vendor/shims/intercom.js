(function() {
  function vendorModule() {
    'use strict';

    return { 'default': window.Intercom };
  }

  define('intercom', [], vendorModule);
})();
