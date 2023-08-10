import components from'./components'

export default {
    install: (app) => {
        app.component("k-validator", components.KriterionValidator);
        app.component("k-input", components.KriterionInput);
        app.component("k-password", components.KriterionPassword);
    }
}