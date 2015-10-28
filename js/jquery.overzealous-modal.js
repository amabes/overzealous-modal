/*!
 * overzealous-modal v1 (https://github.com/amabes/overzealous-modal)
 * Author: Alan Mabry
 * Website: www.alanmabry.com/work
 * Contact: frontend@alanmabry.com
 *
 * Copyright 2015 overzealous-modal
 * Licensed under MIT (https://github.com/amabes/overzealous-modal/blob/master/LICENSE)
 */
 
(function ($) {
 
    $.fn.overzealous = function(options) {

    	var that = this;
    	
    	var opts = $.extend( {}, $.fn.overzealous.defaults, options );
    	
    	var markup = '<div id="overzealous-modal-background"></div>';
    	
    	var open = function(){

    		that.wrap('<div id="overzealous-modal-wrapper"></div>').addClass('overzealous-modal').appendTo('#overzealous-modal-background');
        
	        $.fn.overzealous.markup(opts);

	        $('#overzealous-modal-background').fadeIn(function(){
	        	
	        	$('.overzealous-modal').delay(250).fadeIn();

	        });
    	}
    	// Modal already open
    	if($('#overzealous-modal-background').length!=0){
    		
    		// replace modal content with new content
    		$.fn.overzealous.close({close:false});

    		open();

    	}else{

    		$('body').append(markup);
    		
    		open();
    	}
    };
   	
	$.fn.overzealous.defaults = {};

	$.fn.overzealous.markup = function(opts) {

		var markup = '<div id="overzealous-btns">';
		
		if(typeof(opts.buttons) != 'undefined'){

			if(typeof(opts.buttons.primary) != 'undefined'){

				var p_id = ' ';

				if(typeof(opts.buttons.primary.id) != 'undefined'){

					p_id = ' id="'+opts.buttons.primary.id+'"';

				}

				markup+='<a'+p_id+'primary class="overzealous-btn '+opts.buttons.primary.classes+'" href="javascript:void(0);">'+opts.buttons.primary.text+'</a>';

			}
			
			if(typeof(opts.buttons.secondary) != 'undefined'){

				var s_id = ' ';

				if(typeof(opts.buttons.secondary.id) != 'undefined'){

					s_id = ' id="'+opts.buttons.secondary.id+'"';

				}

				markup+='<a'+s_id+'secondary class="overzealous-btn '+opts.buttons.secondary.classes+'" href="javascript:void(0);">'+opts.buttons.secondary.text+'</a>';

			}

		}

		markup+='</div>';
				
	    $('.overzealous-modal').append(markup);
	    
	    if(typeof(opts.buttons) != 'undefined'){

	    	$.fn.overzealous.click_events(opts.buttons);

		}

	};

	$.fn.overzealous.click_events = function(buttons) {
	    
	    if(typeof(buttons.primary) != 'undefined'){

		    $('.overzealous-btn[primary]').unbind().click(function(){

	        	buttons.primary.action();

	        	$.fn.overzealous.close();

	        });

		}
        
        if(typeof(buttons.secondary) != 'undefined'){

	    	$('.overzealous-btn[secondary]').unbind().click(function(){

				buttons.secondary.action();

	        });

    	}
	};

	$.fn.overzealous.close = function(params,callback){

		if(typeof(params)=='undefined') params = {}

		if(typeof(params.close)=='undefined') params.close = true;

	    $('#overzealous-btns').remove();

	    if($('#overzealous-modal-wrapper').length!=0){

	    	$('.overzealous-modal').hide().appendTo('#overzealous-modal-wrapper').unwrap().removeClass('overzealous-modal');

		}

	    if(params.close){

		    $('#overzealous-modal-background').fadeOut(function(){
		    	
		    	$(this).remove();

		    	if($.isFunction(callback)) callback();

		    });
		}
	};
 
}( jQuery ));