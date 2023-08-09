import components from'./components'

export default {
    install: (app, options) => {
        app.component("k-input", components.KriterionInput);
        app.component("k-validator", components.KriterionValidator);
    }
}