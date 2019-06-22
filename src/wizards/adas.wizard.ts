import { WizardType, WizardOptions, Field, SelectField, Wizard, ProjectOptions, Project, FileManager } from "@infolks/labelmore-devkit";

class AdasWizard extends Wizard {

    public readonly name: string = "wizards.default.adas";
    public readonly title: string = "ADAS Project";
    public readonly icon: string = '<i class="fas fa-car"></i>';
    public readonly description: string = `Scene and Object Labeling for Autonomous Driving`;
    public readonly type: WizardType = 'creator';

    public options: Partial<WizardOptions> = {
        allowToolSelection: true,
        allowOutputSelection: true,
        allowPanelSelection: true,
        allowLabelClassCreation: true,
        allowKeypointCreation: false,
        allowClassAttributeCreation: true,
        allowSceneAttributeCreation: true,
    };

    constructor(protected fs: FileManager) {
        super()
    }

    async input(title: string, dir: string, files: string[], options: ProjectOptions): Promise<Project> {

        // avoid incompatible extensions
        files = files.filter(file => {
            return ['jpg', 'jpeg', 'png'].indexOf(file.split('.').pop().toLowerCase()) !== -1
        })

        // avoid directories
        const compatible = await Promise.all(
            files
            .map(async file => {
                return await this.fs.isFile(dir, file)
            })
        );

        files = files.filter((file, index) => compatible[index])

        return {
            type: this.name,
            title,
            files,
            options: options,
            frames: null
        }
    }

    async load(data: Buffer, options: any): Promise<Buffer> {
        
        return data;

    }

    fields(): Field[] {
        return [
            new SelectField(
                'channel',
                'Channel',
                [
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
                ],
                false,
                null
            )
        ]
    }
}


export default {
    install(Vue: any, opts: any) {

        Vue.mixin({
    
            beforeCreate() {

                if (this.$files && this.$projects) {

                    const adasWiz = new AdasWizard(this.$files);
    
                    if (!this.$projects.hasWizard(adasWiz.name)) {
                        this.$projects.registerWizard(adasWiz.name, adasWiz)
                    }

                } 
            }
        })
    
    }
}