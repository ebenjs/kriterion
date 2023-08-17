import components from './components'
import { defaultOptions, setPluginOptions } from './helpers/options';
import { errors } from '@/shared-state/errors.js';

export { errors }

export default {
    install: (app, userOptions = {}) => {

        const mergedOptions = { ...defaultOptions, ...userOptions };
        setPluginOptions(mergedOptions);

        app.component("k-validator", components.KriterionValidator);
        app.component("k-input", components.KriterionInput);
        app.component("k-password", components.KriterionPassword);
    }
}