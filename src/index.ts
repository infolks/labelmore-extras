// encoders
import GistEncoder from "./encoders/gist.encoder"
import CsvEncoder from "./encoders/csv.encoder"

// panels
import LabelPropertiesPanel from "./panels/label-properties"

// wizards
import AdasWizard from "./wizards/adas.wizard"

export default {
    install(Vue: any, opts: any) {

        // encoders
        Vue.use(GistEncoder)
        Vue.use(CsvEncoder)

        // panels
        Vue.use(LabelPropertiesPanel)

        // wizards
        Vue.use(AdasWizard)
    }
}