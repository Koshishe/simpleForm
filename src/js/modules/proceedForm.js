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
    change: $('.js-change'),
    save: $('.js-save'),
    packet: $('.js-packet'),
    config: $('.js-config'),
    info: $('.js-info'),
    message: $('.js-result'),
  },
  error: '.js-error',
  parent: '.gateway-element',

  async init() {
    const self = this;
    const { el } = self;

    self.setFormData();

    el.select.select2({
      dropdownParent: $('.gateway-select'),
    });

    Inputmask({ regex: '[A-Fa-f0-9]{16}', placeholder: '' }).mask(el.gateway);
    Inputmask({ mask: '999.999.9.9', placeholder: '0' }).mask(el.serverAddr);

    el.gateway.on('input', (e) => self.validateGateway(e.target.value, el.gateway));
    el.portUP.on('input', (e) => self.validatePort(e.target.value, el.portUP));
    el.portDOWN.on('input', (e) => self.validatePort(e.target.value, el.portDOWN));

    el.change.on('click', () => {
      el.form.find('.gateway-element').removeClass('_disabled');
      el.change.addClass('_hidden');
      el.save.removeClass('_hidden');
    });

    el.form.on('submit', (e) => {
      const data = {
        region: el.select.prop('value'),
        gatewayID: el.gateway.prop('value').toUpperCase(),
        serverAddr: el.serverAddr.prop('value'),
        portUp: el.portUP.prop('value'),
        portDown: el.portDOWN.prop('value'),
      };

      e.preventDefault();
      self.handleSubmit(data);
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

  async handleSubmit(data) {
    const self = this;
    const { error, parent, el } = self;
    $(error).text('');
    $(parent).each((index, value) => {
      $(value).removeClass('_error');
    });

    if (self.validation() < 1) {
      await $.ajax({
        type: 'GET',
        url: '/api/v1/settings',
        data,
        success: () => {
          el.message.text('Изменения успешно сохранены.');
          el.form.find('.gateway-element').addClass('_disabled');
          el.save.addClass('_hidden');
          el.change.removeClass('_hidden');

          setTimeout(() => {
            el.message.text('');
          }, 1200);
        },
        error: () => {
          el.message.text('Что-то пошло не так. Попробуйте ещё раз.');
          setTimeout(() => {
            el.message.text('');
          }, 1200);
        },
      });
    }
  },

  async handleGetFormData() {
    let result;
    await $.ajax({
      type: 'GET',
      url: '/api/v1/settings',
      success: (res) => {
        result = res;
      },
      error: () => {
        result = null;
      },
    });
    return result;
  },

  async handleGetInfoData() {
    let result;
    await $.ajax({
      type: 'GET',
      url: '/api/v1/versions',
      success: (res) => {
        result = res;
      },
      error: () => {
        result = null;
      },
    });
    return result;
  },

  fillForm(data) {
    const self = this;
    const { el } = self;

    el.select.prop('value', data.region);
    el.gateway.prop('value', data.gatewayID);
    el.serverAddr.prop('value', data.serverAddr);
    el.portUP.prop('value', data.portUp);
    el.portDOWN.prop('value', data.portDown);

    el.form.find('.gateway-element').addClass('_disabled');
  },

  async setFormData() {
    const self = this;
    const { el } = self;
    const formData = await self.handleGetFormData();
    const infoData = await self.handleGetInfoData();

    if (formData) {
      self.fillForm(formData);
      el.change.removeClass('_hidden');
      el.save.addClass('_hidden');
    }

    if (infoData) {
      el.info.removeAttr('hidden');
      el.packet.text(infoData.packetForwarder);
      el.config.text(infoData.gatewayConfig);
    }

    el.select.select2({
      dropdownParent: $('.gateway-select'),
    });
  },

  validation() {
    const self = this;
    const { el, error, parent } = self;
    let errors = 0;

    if (!el.select.prop('value')) {
      errors += 1;
      el.select.siblings(error).text('Выберите значение');
      el.select.closest(parent).addClass('_error');
    }

    if (!el.gateway.prop('value')) {
      errors += 1;
      el.gateway.siblings(error).text('Поле обязательно к заполнению');
      el.gateway.closest(parent).addClass('_error');
    }

    if (!el.gateway.prop('value').match(/^(?=.*[A-Fa-f0-9])[A-Fa-f0-9]{16,}$/g)) {
      errors += 1;
      el.gateway.siblings(error).text('Поле должно содержать 16 символов');
      el.gateway.closest(parent).addClass('_error');
    }

    if (!el.serverAddr.prop('value')) {
      errors += 1;
      el.serverAddr.siblings(error).text('Поле обязательно к заполнению');
      el.serverAddr.closest(parent).addClass('_error');
    }

    if (!el.portUP.prop('value')) {
      errors += 1;
      el.portUP.siblings(error).text('Поле обязательно к заполнению');
      el.portUP.closest(parent).addClass('_error');
    }

    if (el.portUP.prop('value') < 0 || el.portUP.prop('value') > 65535) {
      errors += 1;
      el.portUP.siblings(error).text('Значение должно быть не более 65535');
      el.portUP.closest(parent).addClass('_error');
    }

    if (!el.portDOWN.prop('value')) {
      errors += 1;
      el.portDOWN.siblings(error).text('Поле обязательно к заполнению');
      el.portDOWN.closest(parent).addClass('_error');
    }

    if (el.portDOWN.prop('value') < 0 || el.portDOWN.prop('value') > 65535) {
      errors += 1;
      el.portDOWN.siblings(error).text('Значение должно быть не более 65535');
      el.portDOWN.closest(parent).addClass('_error');
    }

    return errors;
  },
};
