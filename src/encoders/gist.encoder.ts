import { Encoder, Project, FileWriteInfo, Frame, Label, DEFAULT_LABEL_TYPES } from "@infolks/labelmore-devkit"
import { removeExtension } from "../helpers"

const IMAGE_DATA = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iMCAwIDU2IDU2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NiA1NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNFOUU5RTA7IiBkPSJNMzYuOTg1LDBINy45NjNDNy4xNTUsMCw2LjUsMC42NTUsNi41LDEuOTI2VjU1YzAsMC4zNDUsMC42NTUsMSwxLjQ2MywxaDQwLjA3NAoJCWMwLjgwOCwwLDEuNDYzLTAuNjU1LDEuNDYzLTFWMTIuOTc4YzAtMC42OTYtMC4wOTMtMC45Mi0wLjI1Ny0xLjA4NUwzNy42MDcsMC4yNTdDMzcuNDQyLDAuMDkzLDM3LjIxOCwwLDM2Ljk4NSwweiIvPgoJPHBvbHlnb24gc3R5bGU9ImZpbGw6I0Q5RDdDQTsiIHBvaW50cz0iMzcuNSwwLjE1MSAzNy41LDEyIDQ5LjM0OSwxMiAJIi8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojOTVBNUE1OyIgZD0iTTQ4LjAzNyw1Nkg3Ljk2M0M3LjE1NSw1Niw2LjUsNTUuMzQ1LDYuNSw1NC41MzdWMzloNDN2MTUuNTM3QzQ5LjUsNTUuMzQ1LDQ4Ljg0NSw1Niw0OC4wMzcsNTZ6Ii8+Cgk8Zz4KCQk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTIxLjg2Nyw0Mi45MjR2MS4xMjFoLTMuMDA4VjUzaC0xLjY1NHYtOC45NTVoLTMuMDA4di0xLjEyMUgyMS44Njd6Ii8+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0yOC40NDMsNDguMTA1TDMxLDUzaC0xLjlsLTEuNi0zLjgwMWgtMC4xMzdMMjUuNjQxLDUzaC0xLjlsMi41NTctNC44OTVsLTIuNzIxLTUuMTgyaDEuODczCgkJCWwxLjc3Nyw0LjEwMmgwLjEzN2wxLjkyOC00LjEwMmgxLjg3M0wyOC40NDMsNDguMTA1eiIvPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNNDAuNTI5LDQyLjkyNHYxLjEyMWgtMy4wMDhWNTNoLTEuNjU0di04Ljk1NWgtMy4wMDh2LTEuMTIxSDQwLjUyOXoiLz4KCTwvZz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNDOEJEQjg7IiBkPSJNMTguNSwxM2gtNmMtMC41NTMsMC0xLTAuNDQ4LTEtMXMwLjQ0Ny0xLDEtMWg2YzAuNTUzLDAsMSwwLjQ0OCwxLDFTMTkuMDUzLDEzLDE4LjUsMTN6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojQzhCREI4OyIgZD0iTTIxLjUsMThoLTljLTAuNTUzLDAtMS0wLjQ0OC0xLTFzMC40NDctMSwxLTFoOWMwLjU1MywwLDEsMC40NDgsMSwxUzIyLjA1MywxOCwyMS41LDE4eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0M4QkRCODsiIGQ9Ik0yNS41LDE4Yy0wLjI2LDAtMC41MjEtMC4xMS0wLjcxLTAuMjljLTAuMTgxLTAuMTktMC4yOS0wLjQ0LTAuMjktMC43MXMwLjEwOS0wLjUyLDAuMy0wLjcxCgkJYzAuMzYtMC4zNywxLjA0LTAuMzcsMS40MSwwYzAuMTgsMC4xOSwwLjI5LDAuNDUsMC4yOSwwLjcxYzAsMC4yNi0wLjExLDAuNTItMC4yOSwwLjcxQzI2LjAyLDE3Ljg5LDI1Ljc2LDE4LDI1LjUsMTh6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojQzhCREI4OyIgZD0iTTM3LjUsMThoLThjLTAuNTUzLDAtMS0wLjQ0OC0xLTFzMC40NDctMSwxLTFoOGMwLjU1MywwLDEsMC40NDgsMSwxUzM4LjA1MywxOCwzNy41LDE4eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0M4QkRCODsiIGQ9Ik0xMi41LDMzYy0wLjI2LDAtMC41MjEtMC4xMS0wLjcxLTAuMjljLTAuMTgxLTAuMTktMC4yOS0wLjQ1LTAuMjktMC43MQoJCWMwLTAuMjYsMC4xMDktMC41MiwwLjI5LTAuNzFjMC4zNy0wLjM3LDEuMDUtMC4zNywxLjQyLDAuMDFjMC4xOCwwLjE4LDAuMjksMC40NCwwLjI5LDAuN2MwLDAuMjYtMC4xMSwwLjUyLTAuMjksMC43MQoJCUMxMy4wMiwzMi44OSwxMi43NiwzMywxMi41LDMzeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0M4QkRCODsiIGQ9Ik0yNC41LDMzaC04Yy0wLjU1MywwLTEtMC40NDgtMS0xczAuNDQ3LTEsMS0xaDhjMC41NTMsMCwxLDAuNDQ4LDEsMVMyNS4wNTMsMzMsMjQuNSwzM3oiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNDOEJEQjg7IiBkPSJNNDMuNSwxOGgtMmMtMC41NTMsMC0xLTAuNDQ4LTEtMXMwLjQ0Ny0xLDEtMWgyYzAuNTUzLDAsMSwwLjQ0OCwxLDFTNDQuMDUzLDE4LDQzLjUsMTh6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojQzhCREI4OyIgZD0iTTM0LjUsMjNoLTIyYy0wLjU1MywwLTEtMC40NDgtMS0xczAuNDQ3LTEsMS0xaDIyYzAuNTUzLDAsMSwwLjQ0OCwxLDFTMzUuMDUzLDIzLDM0LjUsMjN6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojQzhCREI4OyIgZD0iTTQzLjUsMjNoLTZjLTAuNTUzLDAtMS0wLjQ0OC0xLTFzMC40NDctMSwxLTFoNmMwLjU1MywwLDEsMC40NDgsMSwxUzQ0LjA1MywyMyw0My41LDIzeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0M4QkRCODsiIGQ9Ik0xNi41LDI4aC00Yy0wLjU1MywwLTEtMC40NDgtMS0xczAuNDQ3LTEsMS0xaDRjMC41NTMsMCwxLDAuNDQ4LDEsMVMxNy4wNTMsMjgsMTYuNSwyOHoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNDOEJEQjg7IiBkPSJNMzAuNSwyOGgtMTBjLTAuNTUzLDAtMS0wLjQ0OC0xLTFzMC40NDctMSwxLTFoMTBjMC41NTMsMCwxLDAuNDQ4LDEsMVMzMS4wNTMsMjgsMzAuNSwyOHoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNDOEJEQjg7IiBkPSJNNDMuNSwyOGgtOWMtMC41NTMsMC0xLTAuNDQ4LTEtMXMwLjQ0Ny0xLDEtMWg5YzAuNTUzLDAsMSwwLjQ0OCwxLDFTNDQuMDUzLDI4LDQzLjUsMjh6Ii8+CjwvZz4KPC9zdmc+"

class GistEncoder extends Encoder {
    
    public readonly title = "GIST"
    public readonly icon = `<img src="data:image/svg+xml;base64,${IMAGE_DATA}"/>`
    public readonly name = 'encoders.extras.gist'

    /**
     * Encode a frame
     * @param frame frame to encode
     * @param project project of the frame
     */
    encode(frame: Frame, project: Project): FileWriteInfo[] {

        // encode labels
        const labelDatas = frame.labels.map(label => this.encodeLabel(label, frame.name))

        // encode frame
        const frameData = labelDatas.join('\r\n')

        console.log(frameData)

        // return write info
        return [{
            name: `${removeExtension(frame.name)}.txt`,
            data: Buffer.from(frameData.trim()),
            subdirectory: Encoder.SUBFOLDERS.ANNOTATIONS
        }]
    }

    /**
     * Any final files to be created. (include decode informations here)
     * @param project project to finalize
     */
    finalize(project: Project): FileWriteInfo[] {
        return []
    }

    private encodeLabel(label: Label, frameName: string): string {

        if (label.type == DEFAULT_LABEL_TYPES.boundbox) {

            // get props
            const {xmin, ymin, xmax, ymax} = label.props

            // round props
            const labelProps = [xmin, ymin, xmax - xmin, ymax - ymin].map(p => Math.round(p))

            return [removeExtension(frameName), label.class_id, ...labelProps].join(',')
        }

        return null;

    }
}

export default {
    install(Vue: any, opts: any) {

        Vue.mixin({
            beforeCreate() {

                if (this.$projects) {

                    const gist = new GistEncoder()

                    if (!this.$projects.hasEncoder(gist.name)) {

                        this.$projects.registerEncoder(gist.name, gist)
                    }
                }
            }
        })
    }
}