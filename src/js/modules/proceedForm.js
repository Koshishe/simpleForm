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
  parent: '.gateway-element',

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
    const { error, parent } = self;
    elem.siblings(error).text('');
    elem.closest(parent).removeClass('_error');

    if (!val.match(/^(?=.*[A-Fa-f0-9])[A-Fa-f0-9]{16,}$/g)) {
      elem.siblings(error).text('Поле должно содержать 16 символов');
      elem.closest(parent).addClass('_error');
    } else {
      elem.siblings(error).text('');
      elem.closest(parent).removeClass('_error');
    }
  },

  validatePort(val, elem) {
    const self = this;
    const { error, parent } = self;
    elem.siblings(error).text('');
    elem.closest(parent).removeClass('_error');

    if (val < 0 || val > 65535) {
      elem.siblings(error).text('Значение должно быть не более 65535');
      elem.closest(parent).addClass('_error');
    } else {
      elem.siblings(error).text('');
      elem.closest(parent).removeClass('_error');
    }
  },

  handleSubmit() {
    const self = this;
    const { error, parent } = self;
    console.log($(parent));
    $(error).text('');
    $(parent).each((index, value) => {
      $(value).removeClass('_error');
    });

    if (self.validation() > 0) {
      //
    }
  },

  validation() {
    const self = this;
    const { el, error, parent } = self;
    let errors = 0;

    if (!el.select.value) {
      errors += 1;
      el.select.siblings(error).text('Выберите значение');
      el.select.closest(parent).addClass('_error');
    }

    if (!el.gateway.value) {
      errors += 1;
      el.gateway.siblings(error).text('Поле обязательно к заполнению');
      el.gateway.closest(parent).addClass('_error');
    }

    if (!el.gateway.value?.match(/^(?=.*[A-Fa-f0-9])[A-Fa-f0-9]{16,}$/g)) {
      console.log(el.gateway.value?.match(/^(?=.*[A-Fa-f0-9])[A-Fa-f0-9]{16,}$/g));
      errors += 1;
      el.gateway.siblings(error).text('Поле должно содержать 16 символов');
      el.gateway.closest(parent).addClass('_error');
    }

    if (!el.serverAddr.value) {
      errors += 1;
      el.serverAddr.siblings(error).text('Поле обязательно к заполнению');
      el.serverAddr.closest(parent).addClass('_error');
    }

    if (!el.portUP.value) {
      errors += 1;
      el.portUP.siblings(error).text('Поле обязательно к заполнению');
      el.portUP.closest(parent).addClass('_error');
    }

    if (el.portUP.value || el.portDOWN.value) {
      errors += 1;
      el.portUP.siblings(error).text('Значение должно быть не более 65535');
      el.portUP.closest(parent).addClass('_error');
    }

    if (!el.portDOWN.value) {
      errors += 1;
      el.portDOWN.siblings(error).text('Поле обязательно к заполнению');
      el.portDOWN.closest(parent).addClass('_error');
    }

    if (el.portDOWN.value || el.portDOWN.value) {
      errors += 1;
      el.portDOWN.siblings(error).text('Значение должно быть не более 65535');
      el.portDOWN.closest(parent).addClass('_error');
    }

    return errors;
  },
};
