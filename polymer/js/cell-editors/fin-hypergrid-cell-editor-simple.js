'use strict';
/**
 *
 * @module cell-editors\simple
 *
 */
(function() {

    Polymer({ /* jshint ignore:line */

        /**
         * @property {string} alias - my lookup alias
         * @instance
         */
        alias: 'simple',

        /**
         * @function
         * @instance
         * @description
         the function to override for initialization
         */
        readyInit: function() {
            var self = this;
            this.rectangles = document.createElement('fin-rectangle');
            this.editorPoint = this.rectangles.point.create(0, 0);
            this.input = this.shadowRoot.querySelector('#editor');
            this.input.addEventListener('keyup', function(e) {
                if (e && (e.keyCode === 13 || e.keyCode === 27)) {
                    e.preventDefault();
                    if (e.keyCode === 27) {
                        self.cancelEditing();
                    } else {
                        self.stopEditing();
                    }
                    self.getGrid().repaint();
                    self.getGrid().takeFocus();
                }
                self.getGrid().fireSyntheticEditorKeyUpEvent(self, e);
            });
            this.input.addEventListener('keydown', function(e) {
                self.getGrid().fireSyntheticEditorKeyDownEvent(self, e);
            });
            this.input.addEventListener('keypress', function(e) {
                self.getGrid().fireSyntheticEditorKeyPressEvent(self, e);
            });
            // this.input.addEventListener('focusout', function() {
            //     self.stopEditing();
            // });
            // this.input.addEventListener('blur', function() {
            //     self.stopEditing();
            // });
            this.input.style.position = 'absolute';
            this.input.style.display = 'none';
            this.input.style.border = 'solid 2px black';
            this.input.style.outline = 0;
            this.input.style.padding = 0;
            this.input.style.zIndex = 1000;
        },

        /**
        * @function
        * @instance
        * @description
        return the current editor's value
        * #### returns: Object
        */
        getEditorValue: function() {
            var value = this.input.value;
            return value;
        },

        /**
        * @function
        * @instance
        * @description
        save the new value into the behavior(model)
        */
        setEditorValue: function(value) {
            this.input.value = value + '';
        },

        cancelEditing: function() {
            if (!this.isEditing) {
                return;
            }
            this.input.value = null;
            this.isEditing = false;
            this.hideEditor();
        },

        /**
        * @function
        * @instance
        * @description
        display the editor
        */
        showEditor: function() {
            this.input.style.display = 'inline';
        },

        /**
        * @function
        * @instance
        * @description
        hide the editor
        */
        hideEditor: function() {
            this.input.style.display = 'none';
        },

        /**
        * @function
        * @instance
        * @description
        request focus for my input control
        */
        takeFocus: function() {
            var self = this;
            setTimeout(function() {
                self.input.focus();
                self.selectAll();
            }, 300);
        },

        /**
        * @function
        * @instance
        * @description
        select everything
        */
        selectAll: function() {

        },

        /**
        * @function
        * @instance
        * @description
        how much should I offset my bounds from 0,0
        */
        originOffset: function() {
            return [-2, -2];
        },

        /**
        * @function
        * @instance
        * @description
        set the bounds of my input control
        * @param {rectangle} rectangle - the bounds to move to
        */
        setBounds: function(cellBounds) {
            var originOffset = this.originOffset();
            var translation = 'translate(' + (cellBounds.x + originOffset[0]) + 'px,' + (cellBounds.y + originOffset[1]) + 'px)';

            this.input.style.webkitTransform = translation;
            this.input.style.MozTransform = translation;
            this.input.style.msTransform = translation;
            this.input.style.OTransform = translation;

            // this.input.style.left = cellBounds.x + originOffset[0] + 'px';
            // this.input.style.top = cellBounds.y + originOffset[1] + 'px';

            this.input.style.width = cellBounds.width - (2 * originOffset[0]) + 'px';
            this.input.style.height = cellBounds.height - (2 * originOffset[1]) + 'px';
        }

    });

})(); /* jshint ignore:line */
