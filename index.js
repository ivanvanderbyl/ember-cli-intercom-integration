/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-intercom-integration',

  included() {
    this.import('vendor/shims/intercom.js');
  },

  contentFor(type, config) {
    if (type === 'head-footer') {
      return `
<script type="application/javascript">(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/hb1idlx7';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()</script>
      `;
    }
  }
};
