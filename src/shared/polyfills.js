"use strict";
require('core-js/es6');
require('core-js/es7/reflect');
// import '../node_modules/zone.js/dist/zone.js';
require('zone.js/dist/zone');
if (process.env.ENV === 'production') {
}
else {
    // Development
    Error['stackTraceLimit'] = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}
//# sourceMappingURL=polyfills.js.map