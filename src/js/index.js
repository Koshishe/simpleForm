import documentReady from './utils/documentReady';
import documentLoaded from './utils/documentLoaded';
import form from './modules/proceedForm';

documentReady(() => {
  form.init();
});

documentLoaded(() => {

});
