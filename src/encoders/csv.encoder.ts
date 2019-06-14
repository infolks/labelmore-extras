import { Encoder, Project, FileWriteInfo, Frame, Label, DEFAULT_LABEL_TYPES, LabelClass, BoundboxLabel } from "@infolks/labelmore-devkit"

class CsvEncoder extends Encoder {

    public readonly title = "CSV"
    public readonly icon = `<i class="fas fa-file-csv"></i>`
    public readonly name = 'encoders.extras.csv'

    encode(frame: Frame, project: Project): FileWriteInfo[] {
        return []
    }
    
    finalize(project: Project): FileWriteInfo[] {
        
        const frameDatas = project.frames
            .map(
                frame => {

                    const labelDatas = frame.labels.map(label => {

                        const class_ = project.options.labelClasses.find(cl => cl.id === label.class_id)

                        return this.encodeLabel(label, class_)
                    })

                    const json = `"${JSON.stringify(labelDatas).replace(/\"/g, `""`)}"`

                    return `${[frame.name, json].join(',')}`
                }
            )
            .join('\r\n')
        
        return [{
           name: `${project.title}.csv`,
           data: Buffer.from(frameDatas),
           subdirectory: Encoder.SUBFOLDERS.ANNOTATIONS
        }]
    }

    private encodeLabel(label: Label, class_:LabelClass) {

        if (label.type === DEFAULT_LABEL_TYPES.boundbox) {
            return this.encodeBoundbox(label, class_)
        }
    }

    private encodeBoundbox(label: BoundboxLabel, class_: LabelClass) {

        const left = Math.round(label.props.xmin)

        const top = Math.round(label.props.ymin)

        const width = Math.round(label.props.xmax - left)

        const height = Math.round(label.props.ymax - top)

        return {
            height,
            label: class_.name,
            left,
            top,
            width
        }
    }
}

export default {

    install(Vue: any, optns: any) {

        Vue.mixin({
            beforeCreate() {

                if (this.$projects) {

                    const csv = new CsvEncoder()

                    if (!this.$projects.hasEncoder(csv.name)) {

                        this.$projects.registerEncoder(csv.name, csv)
                    }
                }
            }
        })
    }
}