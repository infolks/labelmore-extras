import GistEncoder from "./encoders/gist.encoder"

export default {
    install(Vue: any, opts: any) {

        // encoders
        Vue.use(GistEncoder)
    }
}