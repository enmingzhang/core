'use strict';

var Simple = require('./Simple');
var Map = require('../lib/Mappy');

/**
 * @constructor
 */
var Choice = Simple.extend('Choice', {

    /**
     * the list of items to pick from
     * @type {Array}
     * @memberOf Choice.prototype
     */
    items: ['a', 'b', 'c'],

    template: function() {
        /*
                <select id="editor">
                    {{#items}}
                        <option value="{{.}}">{{.}}</option>
                    {{/items}}
                </select>
            */
    },

    autopopulate: function() {
        var behavior = this.grid.behavior;
        var point = this.getEditorPoint();
        var colProps = this.grid.getColumnProperties(point.x);
        if (!colProps.autopopulateEditor) {
            return;
        }
        var headerCount = this.grid.getHeaderRowCount();
        var rowCount = this.grid.getUnfilteredRowCount() - headerCount;
        var column = point.x;
        var map = new Map();
        for (var r = 0; r < rowCount; r++) {
            var each = behavior.getUnfilteredValue(column, r);
            map.set(each, each);
        }
        var values = map.values;
        values.sort();

        if (values.length > 0 && values[0].length > 0) {
            values.unshift('');
        }

        this.setItems(values);
    },

    //no events are fired while the dropdown is open
    //see http://jsfiddle.net/m4tndtu4/6/

    /**
     * @memberOf Choice.prototype
     */
    showEditor: function() {
        var self = this;
        this.input.style.display = 'inline';
        setTimeout(function() {
            self.showDropdown();
        }, 50);
    },

    preShowEditorNotification: function() {
        this.autopopulate();
        this.setEditorValue(this.initialValue);
    },

    /**
     * @memberOf Choice.prototype
     * @param items
     */
    setItems: function(items) {
        this.items = items;
        this.updateView();
    },

    /**
     * @memberOf Choice.prototype
     * @param input
     */
    initialize: function() {
        var self = this;
        this.el.onchange = function() { self.stopEditing(); };
    }

});

module.exports = Choice;