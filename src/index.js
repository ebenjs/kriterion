import components from './components'
import { defaultOptions, setPluginOptions } from './helpers/options';

export default {
    install: (app, userOptions = {}) => {

        const mergedOptions = { ...defaultOptions, ...userOptions };
        setPluginOptions(mergedOptions);

        app.component("k-validator", components.KriterionValidator);
        app.component("k-input", components.KriterionInput);
        app.component("k-password", components.KriterionPassword);
    }
}