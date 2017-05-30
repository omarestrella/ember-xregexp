/* eslint-env node */
'use strict';

const path = require('path');
const mergeTrees = require('broccoli-merge-trees');
const funnel = require('broccoli-funnel');

module.exports = {
  name: 'xregexp',

  included(app) {
    this._super.included.apply(this, arguments);

    while (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    const vendor = this.treePaths.vendor;
    app.import(vendor + '/xregexp/xregexp.js');

    return app;
  },

  treeForVendor(tree) {
    const directory = path.dirname(require.resolve('xregexp'));
    const libTree = funnel(directory, {
      files: ['xregexp-all.js'],
      getDestinationPath(relativePath) {
        if (relativePath === 'xregexp-all.js') {
          return 'xregexp.js';
        }
        return relativePath;
      }
    });
    if (tree) {
      tree = mergeTrees([tree, libTree], {
        overwrite: true
      });
    } else {
      tree = libTree;
    }
    return this._super.treeForAddon.call(this, tree);
  }
};
