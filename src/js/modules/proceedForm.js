import $ from 'jquery';
import 'select2/dist/js/select2.min';
import Inputmask from 'inputmask';

export default {
  el: {
    form: $('.js-form'),
    select: $('.js-region'),
    gateway: $('.js-gatewayID'),
    serverAddr: $('.js-serverAddr'),
    portUP: $('.js-portUP'),
    portDOWN: $('.js-portDOWN'),
  },
  error: '.js-error',

  init() {
    const self = this;
    const { el } = self;

    el.select.select2();
    Inputmask({ regex: '[A-Fa-f0-9]{16}', placeholder: '' }).mask(el.gateway);
    Inputmask({ mask: '999.999.9.9', placeholder: '0' }).mask(el.serverAddr);

    el.gateway.on('input', (e) => self.validateGateway(e.target.value, el.gateway));
    el.portUP.on('input', (e) => self.validatePort(e.target.value, el.portUP));
    el.portDOWN.on('input', (e) => self.validatePort(e.target.value, el.portDOWN));

    el.form.on('submit', (e) => {
      e.preventDefault();
      self.handleSubmit();
    });
  },

  validateGateway(val, elem) {
    const self = this;
    const { el } = self;

    if (!val.match(/^(?=.*[A-Fa-f0-9])[A-Fa-f0-9]{16,}$/g)) {
      elem.siblings(el.error).text('Поле должно содержать 16 символов');
    } else elem.siblings(el.error).text('');
  },

  validatePort(val, elem) {
    const self = this;
    const { error } = self;

    if (val < 0 || val > 65535) {
      elem.siblings(error).text('Значение должно быть не более 65535');
    } else elem.siblings(error).text('');
  },

  handleSubmit() {
    const self = this;
    const { el } = self;

    console.log(el.form.serialize());
  },

  validation() {
    const self = this;
    const { el, error } = self;
    let errors = 0;

    if (!el.select.value) {
      errors += 1;
      el.select.siblings(error).text('Выберите значение');
    }

    if (!el.gateway.value) {
      errors += 1;
      el.select.siblings(error).text('Выберите значение');
    }

    return errors;
  },
};
