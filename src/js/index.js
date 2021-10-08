import './vendor/polyfills';
import './modules/sitePreloader';
import documentReady from './utils/documentReady';
import documentLoaded from './utils/documentLoaded';
import cssVars from './modules/cssVars';
import form from './modules/proceedForm';

documentReady(() => {
  cssVars.init();
  form.init();
});

documentLoaded(() => {

});
