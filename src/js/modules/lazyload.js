import 'core-js/features/object/assign';
import 'intersection-observer';
import lozad from 'lozad';

export default {
  init() {
    const options = {
      rootMargin: `${document.documentElement.clientHeight}px 0px`,
    };

    const pictureObserver = lozad('.js-lazy-img', options);
    const backgroundObserver = lozad('.js-lazy-bg', options);

    pictureObserver.observe();
    backgroundObserver.observe();
  },
};
