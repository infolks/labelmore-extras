import GistEncoder from "./encoders/gist.encoder"
import CsvEncoder from "./encoders/csv.encoder"

export default {
    install(Vue: any, opts: any) {

        // encoders
        Vue.use(GistEncoder)
        Vue.use(CsvEncoder)
    }
}