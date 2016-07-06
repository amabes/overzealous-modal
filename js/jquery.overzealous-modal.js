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

    var markup = '<div id="overzealous-modal-background" rel="' + window.location.pathname + '"></div>';

    var open = function() {

      that.addClass('overzealous-modal');

      $('body').addClass('overzealous-open').attr('overzealous-open', true); // TODO - deprecate .overzealous-open class

      // Preserve actions
      if (typeof(opts.preserve) != 'undefined') {

        $('body').addClass('overzealous-preserve-options').attr('overzealous-preserve-options', true); // TODO - deprecate .overzealous-preserve-options class

        // Wrap, then open keeping existing bindings in place.
        that.wrap('<div id="overzealous-modal-background" rel="' + window.location.pathname + '"></div>');

      } else {

        // Create a placeholder via wrapping the div before we move it
        that.wrap('<div id="overzealous-modal-wrapper" rel="' + window.location.pathname + '"></div>');

        // Move the div to the bottom of body to ensure overlay is over everything.
        that.appendTo('#overzealous-modal-background');

      }

      $.fn.overzealous.markup(opts);

      $('#overzealous-modal-background').fadeIn('fast', function() {

        $('.overzealous-modal').fadeIn('fast', function() {

          if ($.isFunction(callback)) callback();

        });

      });
    }

    // Modal already open
    if ($('#overzealous-modal-background').length != 0) {

      // replace modal content with new content
      $.fn.overzealous.close({
        close: false
      }, function() {

        open();

      });



    } else {

      $('body').append(markup);

      open();
    }
  };

  $.fn.overzealous.defaults = {};

  $.fn.overzealous.markup = function(opts) {

    var markup = '<div id="overzealous-btns">';

    if (typeof(opts.buttons) != 'undefined') {

      if (typeof(opts.buttons.primary) != 'undefined') {

        var p_id = ' ';

        if (typeof(opts.buttons.primary.id) != 'undefined') {

          p_id = ' id="' + opts.buttons.primary.id + '"';

        }

        markup += '<a' + p_id + 'primary class="overzealous-btn ' + opts.buttons.primary.classes + '" href="javascript:void(0);">' + opts.buttons.primary.text + '</a>';

      }

      if (typeof(opts.buttons.secondary) != 'undefined') {

        var s_id = ' ';

        if (typeof(opts.buttons.secondary.id) != 'undefined') {

          s_id = ' id="' + opts.buttons.secondary.id + '"';

        }

        markup += '<a' + s_id + 'secondary class="overzealous-btn ' + opts.buttons.secondary.classes + '" href="javascript:void(0);">' + opts.buttons.secondary.text + '</a>';

      }

    }

    markup += '</div>';

    $('.overzealous-modal').append(markup);

    if (typeof(opts.buttons) != 'undefined') {

      $.fn.overzealous.click_events(opts.buttons);

    }

  };

  $.fn.overzealous.click_events = function(buttons) {

    if (typeof(buttons.primary) != 'undefined') {

      $('.overzealous-btn[primary]').unbind().click(function() {

        buttons.primary.action();

        $.fn.overzealous.close();

      });

    }

    if (typeof(buttons.secondary) != 'undefined') {

      $('.overzealous-btn[secondary]').unbind().click(function() {

        buttons.secondary.action();

      });

    }
  };

  $.fn.overzealous.close = function(params, callback) {

    if (typeof(params) == 'undefined') params = {}

    $('body').removeClass('overzealous-open').removeAttr('overzealous-open'); // TODO - deprecate .overzealous-open class

    $('body').removeClass('overzealous-preserve-options').removeAttr('overzealous-preserve-options');  // TODO - deprecate .overzealous-preserve-options class

    if (typeof(params.close) == 'undefined') params.close = true;

    $('#overzealous-btns').remove();

    if ($('#overzealous-modal-wrapper').length == 0) {

      // Preserve actions
      $('.overzealous-modal').hide().unwrap().removeClass('overzealous-modal');

    } else {

      $('.overzealous-modal').hide().appendTo('#overzealous-modal-wrapper').unwrap().removeClass('overzealous-modal');

    }

    if (params.close) {

      $('#overzealous-modal-background').remove();

    }

    if ($.isFunction(callback)) callback();

  };

}(jQuery));
