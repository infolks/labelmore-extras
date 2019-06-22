import { Panel, PanelOptions } from "@infolks/labelmore-devkit";
import LabelPropertiesComponent from './LabelPropertiesComponent.vue'

class LabelPropertiesPanel extends Panel {

    public readonly name = "panels.extras.label.properties"
    public readonly title = 'Label Properties'
    public readonly icon = `<i class="fas fa-cubes"></i>`
    public readonly component = 'app-panel-label-properties'

    public readonly options: PanelOptions = {
        showTitle: true
    }

}

export default {
    install(Vue: any, opts: any) {

        Vue.mixin({
    
            beforeCreate() {

                if (this.$workspace) {

                    const panel = new LabelPropertiesPanel()

                    if (!this.$workspace.hasPanel(panel.name)) {
                        this.$workspace.registerPanel(panel.name, panel)
                        Vue.component(panel.component, LabelPropertiesComponent)
                    }
                }
            }
        })
    
    }
}