/*!
 * @infolks/labelmore-extras v1.2.0
 * (c) infolks
 * Released under the ISC License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var labelmoreDevkit = require('@infolks/labelmore-devkit');
var __vue_normalize__ = _interopDefault(require('vue-runtime-helpers/dist/normalize-component.js'));
var tslib_1 = require('tslib');

/**
 * remove extension from a file name
 * @param str string file name
 */
function removeExtension(str) {
    return str.split('.').slice(0, -1).join('.');
}

const IMAGE_DATA = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iMCAwIDU2IDU2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NiA1NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNFOUU5RTA7IiBkPSJNMzYuOTg1LDBINy45NjNDNy4xNTUsMCw2LjUsMC42NTUsNi41LDEuOTI2VjU1YzAsMC4zNDUsMC42NTUsMSwxLjQ2MywxaDQwLjA3NAoJCWMwLjgwOCwwLDEuNDYzLTAuNjU1LDEuNDYzLTFWMTIuOTc4YzAtMC42OTYtMC4wOTMtMC45Mi0wLjI1Ny0xLjA4NUwzNy42MDcsMC4yNTdDMzcuNDQyLDAuMDkzLDM3LjIxOCwwLDM2Ljk4NSwweiIvPgoJPHBvbHlnb24gc3R5bGU9ImZpbGw6I0Q5RDdDQTsiIHBvaW50cz0iMzcuNSwwLjE1MSAzNy41LDEyIDQ5LjM0OSwxMiAJIi8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojOTVBNUE1OyIgZD0iTTQ4LjAzNyw1Nkg3Ljk2M0M3LjE1NSw1Niw2LjUsNTUuMzQ1LDYuNSw1NC41MzdWMzloNDN2MTUuNTM3QzQ5LjUsNTUuMzQ1LDQ4Ljg0NSw1Niw0OC4wMzcsNTZ6Ii8+Cgk8Zz4KCQk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTIxLjg2Nyw0Mi45MjR2MS4xMjFoLTMuMDA4VjUzaC0xLjY1NHYtOC45NTVoLTMuMDA4di0xLjEyMUgyMS44Njd6Ii8+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0yOC40NDMsNDguMTA1TDMxLDUzaC0xLjlsLTEuNi0zLjgwMWgtMC4xMzdMMjUuNjQxLDUzaC0xLjlsMi41NTctNC44OTVsLTIuNzIxLTUuMTgyaDEuODczCgkJCWwxLjc3Nyw0LjEwMmgwLjEzN2wxLjkyOC00LjEwMmgxLjg3M0wyOC40NDMsNDguMTA1eiIvPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNNDAuNTI5LDQyLjkyNHYxLjEyMWgtMy4wMDhWNTNoLTEuNjU0di04Ljk1NWgtMy4wMDh2LTEuMTIxSDQwLjUyOXoiLz4KCTwvZz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNDOEJEQjg7IiBkPSJNMTguNSwxM2gtNmMtMC41NTMsMC0xLTAuNDQ4LTEtMXMwLjQ0Ny0xLDEtMWg2YzAuNTUzLDAsMSwwLjQ0OCwxLDFTMTkuMDUzLDEzLDE4LjUsMTN6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojQzhCREI4OyIgZD0iTTIxLjUsMThoLTljLTAuNTUzLDAtMS0wLjQ0OC0xLTFzMC40NDctMSwxLTFoOWMwLjU1MywwLDEsMC40NDgsMSwxUzIyLjA1MywxOCwyMS41LDE4eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0M4QkRCODsiIGQ9Ik0yNS41LDE4Yy0wLjI2LDAtMC41MjEtMC4xMS0wLjcxLTAuMjljLTAuMTgxLTAuMTktMC4yOS0wLjQ0LTAuMjktMC43MXMwLjEwOS0wLjUyLDAuMy0wLjcxCgkJYzAuMzYtMC4zNywxLjA0LTAuMzcsMS40MSwwYzAuMTgsMC4xOSwwLjI5LDAuNDUsMC4yOSwwLjcxYzAsMC4yNi0wLjExLDAuNTItMC4yOSwwLjcxQzI2LjAyLDE3Ljg5LDI1Ljc2LDE4LDI1LjUsMTh6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojQzhCREI4OyIgZD0iTTM3LjUsMThoLThjLTAuNTUzLDAtMS0wLjQ0OC0xLTFzMC40NDctMSwxLTFoOGMwLjU1MywwLDEsMC40NDgsMSwxUzM4LjA1MywxOCwzNy41LDE4eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0M4QkRCODsiIGQ9Ik0xMi41LDMzYy0wLjI2LDAtMC41MjEtMC4xMS0wLjcxLTAuMjljLTAuMTgxLTAuMTktMC4yOS0wLjQ1LTAuMjktMC43MQoJCWMwLTAuMjYsMC4xMDktMC41MiwwLjI5LTAuNzFjMC4zNy0wLjM3LDEuMDUtMC4zNywxLjQyLDAuMDFjMC4xOCwwLjE4LDAuMjksMC40NCwwLjI5LDAuN2MwLDAuMjYtMC4xMSwwLjUyLTAuMjksMC43MQoJCUMxMy4wMiwzMi44OSwxMi43NiwzMywxMi41LDMzeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0M4QkRCODsiIGQ9Ik0yNC41LDMzaC04Yy0wLjU1MywwLTEtMC40NDgtMS0xczAuNDQ3LTEsMS0xaDhjMC41NTMsMCwxLDAuNDQ4LDEsMVMyNS4wNTMsMzMsMjQuNSwzM3oiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNDOEJEQjg7IiBkPSJNNDMuNSwxOGgtMmMtMC41NTMsMC0xLTAuNDQ4LTEtMXMwLjQ0Ny0xLDEtMWgyYzAuNTUzLDAsMSwwLjQ0OCwxLDFTNDQuMDUzLDE4LDQzLjUsMTh6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojQzhCREI4OyIgZD0iTTM0LjUsMjNoLTIyYy0wLjU1MywwLTEtMC40NDgtMS0xczAuNDQ3LTEsMS0xaDIyYzAuNTUzLDAsMSwwLjQ0OCwxLDFTMzUuMDUzLDIzLDM0LjUsMjN6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojQzhCREI4OyIgZD0iTTQzLjUsMjNoLTZjLTAuNTUzLDAtMS0wLjQ0OC0xLTFzMC40NDctMSwxLTFoNmMwLjU1MywwLDEsMC40NDgsMSwxUzQ0LjA1MywyMyw0My41LDIzeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0M4QkRCODsiIGQ9Ik0xNi41LDI4aC00Yy0wLjU1MywwLTEtMC40NDgtMS0xczAuNDQ3LTEsMS0xaDRjMC41NTMsMCwxLDAuNDQ4LDEsMVMxNy4wNTMsMjgsMTYuNSwyOHoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNDOEJEQjg7IiBkPSJNMzAuNSwyOGgtMTBjLTAuNTUzLDAtMS0wLjQ0OC0xLTFzMC40NDctMSwxLTFoMTBjMC41NTMsMCwxLDAuNDQ4LDEsMVMzMS4wNTMsMjgsMzAuNSwyOHoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNDOEJEQjg7IiBkPSJNNDMuNSwyOGgtOWMtMC41NTMsMC0xLTAuNDQ4LTEtMXMwLjQ0Ny0xLDEtMWg5YzAuNTUzLDAsMSwwLjQ0OCwxLDFTNDQuMDUzLDI4LDQzLjUsMjh6Ii8+CjwvZz4KPC9zdmc+";
class GistEncoder extends labelmoreDevkit.Encoder {
    constructor() {
        super(...arguments);
        this.title = "GIST";
        this.icon = `<img src="data:image/svg+xml;base64,${IMAGE_DATA}"/>`;
        this.name = 'encoders.extras.gist';
    }
    /**
     * Encode a frame
     * @param frame frame to encode
     * @param project project of the frame
     */
    encode(frame, project) {
        // encode labels
        const labelDatas = frame.labels.map(label => this.encodeLabel(label, frame.name));
        // encode frame
        const frameData = labelDatas.join('\r\n');
        console.log(frameData);
        // return write info
        return [{
                name: `${removeExtension(frame.name)}.txt`,
                data: Buffer.from(frameData.trim()),
                subdirectory: labelmoreDevkit.Encoder.SUBFOLDERS.ANNOTATIONS
            }];
    }
    /**
     * Any final files to be created. (include decode informations here)
     * @param project project to finalize
     */
    finalize(project) {
        return [];
    }
    encodeLabel(label, frameName) {
        if (label.type == labelmoreDevkit.DEFAULT_LABEL_TYPES.boundbox) {
            // get props
            const { xmin, ymin, xmax, ymax } = label.props;
            // round props
            const labelProps = [xmin, ymin, xmax - xmin, ymax - ymin].map(p => Math.round(p));
            return [removeExtension(frameName), label.class_id, ...labelProps].join(',');
        }
        return null;
    }
}
var GistEncoder$1 = {
    install(Vue, opts) {
        Vue.mixin({
            beforeCreate() {
                if (this.$projects) {
                    const gist = new GistEncoder();
                    if (!this.$projects.hasEncoder(gist.name)) {
                        this.$projects.registerEncoder(gist.name, gist);
                    }
                }
            }
        });
    }
};

class CsvEncoder extends labelmoreDevkit.Encoder {
    constructor() {
        super(...arguments);
        this.title = "CSV";
        this.icon = `<i class="fas fa-file-csv"></i>`;
        this.name = 'encoders.extras.csv';
    }
    encode(frame, project) {
        return [];
    }
    finalize(project) {
        const frameDatas = project.frames
            .map(frame => {
            const labelDatas = frame.labels.map(label => {
                const class_ = project.options.labelClasses.find(cl => cl.id === label.class_id);
                return this.encodeLabel(label, class_);
            });
            const json = `"${JSON.stringify(labelDatas).replace(/\"/g, `""`)}"`;
            return `${[frame.name, json].join(',')}`;
        })
            .join('\r\n');
        return [{
                name: `${project.title}.csv`,
                data: Buffer.from(frameDatas),
                subdirectory: labelmoreDevkit.Encoder.SUBFOLDERS.ANNOTATIONS
            }];
    }
    encodeLabel(label, class_) {
        if (label.type === labelmoreDevkit.DEFAULT_LABEL_TYPES.boundbox) {
            return this.encodeBoundbox(label, class_);
        }
    }
    encodeBoundbox(label, class_) {
        const left = Math.round(label.props.xmin);
        const top = Math.round(label.props.ymin);
        const width = Math.round(label.props.xmax - left);
        const height = Math.round(label.props.ymax - top);
        return {
            height,
            label: class_.name,
            left,
            top,
            width
        };
    }
}
var CsvEncoder$1 = {
    install(Vue, optns) {
        Vue.mixin({
            beforeCreate() {
                if (this.$projects) {
                    const csv = new CsvEncoder();
                    if (!this.$projects.hasEncoder(csv.name)) {
                        this.$projects.registerEncoder(csv.name, csv);
                    }
                }
            }
        });
    }
};

var script = {
    name: 'app-label-properties',
    computed: {
        props() {
            if (this.$labeller.selected) {
                const props = this.$labeller.selected.props;
                return Object.keys(props)
                    .filter(key => key !== 'attributes')
                    .reduce((obj, key) => {
                    obj[key] = props[key];
                    return obj;
                }, {});
            }
            return null;
        }
    },
    filters: {
        limit(val) {
            switch (typeof val) {
                case "number": return Math.round(val * 100) / 100;
                case "string": return val.substr(0, 10);
                case "object": JSON.stringify(val).substr(0, 10);
                default: return val;
            }
        }
    }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"uk-padding-small"},[(_vm.props)?_c('div',{staticClass:"uk-grid-small uk-child-width-1-2",attrs:{"uk-grid":""}},_vm._l((_vm.props),function(value,prop){return _c('div',{key:prop},[_c('div',{staticClass:"uk-text-bold uk-text-small"},[_vm._v(_vm._s(prop)+":")]),_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm._f("limit")(value)))])])}),0):_c('div',{staticClass:"uk-placeholder uk-text-center"},[_vm._v("\n        No Label Selected\n    ")])])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = "data-v-05de8c49";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var LabelPropertiesComponent = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

class LabelPropertiesPanel extends labelmoreDevkit.Panel {
    constructor() {
        super(...arguments);
        this.name = "panels.extras.label.properties";
        this.title = 'Label Properties';
        this.icon = `<i class="fas fa-cubes"></i>`;
        this.component = 'app-panel-label-properties';
        this.options = {
            showTitle: true
        };
    }
}
var LabelPropertiesPanel$1 = {
    install(Vue, opts) {
        Vue.mixin({
            beforeCreate() {
                if (this.$workspace) {
                    const panel = new LabelPropertiesPanel();
                    if (!this.$workspace.hasPanel(panel.name)) {
                        this.$workspace.registerPanel(panel.name, panel);
                        Vue.component(panel.component, LabelPropertiesComponent);
                    }
                }
            }
        });
    }
};

class AdasWizard extends labelmoreDevkit.Wizard {
    constructor(fs) {
        super();
        this.fs = fs;
        this.name = "wizards.default.adas";
        this.title = "ADAS Project";
        this.icon = '<i class="fas fa-car"></i>';
        this.description = `Scene and Object Labeling for Autonomous Driving`;
        this.type = 'creator';
        this.options = {
            allowToolSelection: true,
            allowOutputSelection: true,
            allowPanelSelection: true,
            allowLabelClassCreation: true,
            allowKeypointCreation: false,
            allowClassAttributeCreation: true,
            allowSceneAttributeCreation: true,
        };
    }
    input(title, dir, files, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // avoid incompatible extensions
            files = files.filter(file => {
                return ['jpg', 'jpeg', 'png'].indexOf(file.split('.').pop().toLowerCase()) !== -1;
            });
            // avoid directories
            const compatible = yield Promise.all(files
                .map((file) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                return yield this.fs.isFile(dir, file);
            })));
            files = files.filter((file, index) => compatible[index]);
            return {
                type: this.name,
                title,
                files,
                options: options,
                frames: null
            };
        });
    }
    load(data, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return data;
        });
    }
    fields() {
        return [
            new labelmoreDevkit.SelectField('channel', 'Channel', [
                {
                    label: 'High',
                    value: 'high'
                },
                {
                    label: 'Medium',
                    value: 'medium'
                },
                {
                    label: 'Low',
                    value: 'low'
                }
            ], false, null)
        ];
    }
}
var AdasWizard$1 = {
    install(Vue, opts) {
        Vue.mixin({
            beforeCreate() {
                if (this.$files && this.$projects) {
                    const adasWiz = new AdasWizard(this.$files);
                    if (!this.$projects.hasWizard(adasWiz.name)) {
                        this.$projects.registerWizard(adasWiz.name, adasWiz);
                    }
                }
            }
        });
    }
};

// encoders
var index = {
    install(Vue, opts) {
        // encoders
        Vue.use(GistEncoder$1);
        Vue.use(CsvEncoder$1);
        // panels
        Vue.use(LabelPropertiesPanel$1);
        // wizards
        Vue.use(AdasWizard$1);
    }
};

module.exports = index;
