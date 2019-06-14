"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const labelmore_devkit_1 = require("@infolks/labelmore-devkit");
class CsvEncoder extends labelmore_devkit_1.Encoder {
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
                subdirectory: labelmore_devkit_1.Encoder.SUBFOLDERS.ANNOTATIONS
            }];
    }
    encodeLabel(label, class_) {
        if (label.type === labelmore_devkit_1.DEFAULT_LABEL_TYPES.boundbox) {
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
exports.default = {
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
//# sourceMappingURL=csv.encoder.js.map