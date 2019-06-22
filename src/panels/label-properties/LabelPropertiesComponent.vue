<template>
    <div class="uk-padding-small">
        <div class="uk-grid-small uk-child-width-1-2" uk-grid v-if="props">
            <div v-for="(value, prop) in props" :key="prop">
                <div class="uk-text-bold uk-text-small">{{prop}}:</div>
                <div>{{value | limit}}</div>
            </div>
        </div>
        <div class="uk-placeholder uk-text-center" v-else>
            No Label Selected
        </div>
    </div>
</template>

<script lang="ts">

    export default {
        name: 'app-label-properties',
        computed: {
            props() {

                if (this.$labeller.selected) {
                    const props = this.$labeller.selected.props

                    return Object.keys(props)
                        .filter(key => key !== 'attributes')
                        .reduce((obj, key) => {
                            obj[key] = props[key]
                            return obj
                        }, {});
                }

                return null
            }
        },
        filters: {
            limit(val) {

                switch(typeof val) {

                    case "number": return Math.round(val*100)/100
                    case "string": return val.substr(0,10)
                    case "object": JSON.stringify(val).substr(0,10)
                    default: return val
                }
            }
        }
    }
</script>

<style scoped>

</style>