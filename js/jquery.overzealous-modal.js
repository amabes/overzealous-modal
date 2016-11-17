/*!
 * overzealous-modal v1 (https://github.com/amabes/overzealous-modal)
 * Author: Alan Mabry
 * Website: www.alanmabry.com/work
 * Contact: frontend@alanmabry.com
 *
 * Copyright 2015-2016 overzealous-modal
 * Licensed under MIT (https://github.com/amabes/overzealous-modal/blob/master/LICENSE)
 */

(function($) {

  $.fn.overzealous = function(options, callback) {

    var that = this;

    var opts = $.extend({}, $.fn.overzealous.defaults, options);

    var open = function() {

      var id = that.attr('id');

      // Update classes on blackout before opening new overlay
      $('#overzealous-blackout').removeClass().addClass(id);

      that.addClass('overzealous-modal');

      $('body').attr('overzealous-open', true);

      // Wrap, then open keeping existing bindings in place.
      that.wrap('<div id="overzealous-modal-background" class="overzealous-modal-background '+id+'" rel="' + window.location.pathname + '"></div>');

      // Setup buttons and bind actions
      if(opts.buttons){
        $.fn.overzealous.markup(opts);
      }

      that.parents('.overzealous-modal-background').show();
      that.show().addClass('rightCenter');

      $('.overzealous-modal').fadeIn('fast', function() {
        if ($.isFunction(callback)) callback();
      });

    }

    // Modal already open
    if ($('#overzealous-blackout').length > 0) {

      // replace modal content with new content
      $.fn.overzealous.close({
        close: false
      }, function() {
        open();
      });

    } else {

      $('body').prepend('<div id="overzealous-blackout" class="'+that.attr('id')+'"></div>');
      $('#overzealous-blackout').fadeIn('fast');
      open();

    }
  };

  $.fn.overzealous.defaults = {};

  $.fn.overzealous.markup = function(opts) {

    var markup = '<div id="overzealous-btns">';

    if (typeof(opts.buttons) !== 'undefined') {

      if (typeof(opts.buttons.primary) !== 'undefined') {

        var p_id = ' ';

        if (typeof(opts.buttons.primary.id) !== 'undefined') {

          p_id = ' id="' + opts.buttons.primary.id + '"';

        }

        markup += '<a' + p_id + 'primary class="overzealous-btn ' + opts.buttons.primary.classes + '" href="javascript:void(0);">' + opts.buttons.primary.text + '</a>';

      }

      if (typeof(opts.buttons.secondary) !== 'undefined') {

        var s_id = ' ';

        if (typeof(opts.buttons.secondary.id) !== 'undefined') {

          s_id = ' id="' + opts.buttons.secondary.id + '"';

        }

        markup += '<a' + s_id + 'secondary class="overzealous-btn ' + opts.buttons.secondary.classes + '" href="javascript:void(0);">' + opts.buttons.secondary.text + '</a>';

      }

    }

    markup += '</div>';

    $('.overzealous-modal').append(markup);

    $.fn.overzealous.click_events(opts.buttons);

  };

  $.fn.overzealous.click_events = function(buttons) {

    if (typeof(buttons.primary) !== 'undefined') {

      $('.overzealous-btn[primary]').unbind().click(function() {

        buttons.primary.action();

        $.fn.overzealous.close();

      });

    }

    if (typeof(buttons.secondary) !== 'undefined') {

      $('.overzealous-btn[secondary]').unbind().click(function() {

        buttons.secondary.action();

      });

    }
  };

  $.fn.overzealous.close = function(params, callback) {

    if (typeof params  === 'undefined') {
      params = {
        close: true
      }
    }

    if (params.close) {

      $('.overzealous-modal').hide().unwrap().removeClass('overzealous-modal');
      $('#overzealous-btns').remove();
      $('#overzealous-blackout').remove();
      $('body').removeAttr('overzealous-open');
      if ($.isFunction(callback)) callback();

    } else {

      $('.overzealous-modal:visible').addClass('centerLeft');
      setTimeout(function(){
        if ($.isFunction(callback)) callback();
      }, 250);

    }

  };

}(jQuery));
