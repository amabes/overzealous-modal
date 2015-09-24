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

    	var opts = $.extend( {}, $.fn.overzealous.defaults, options );
    	var markup = '<div id="overzealous-modal-background"></div>';
    	
    	// Modal already open
    	if($('#overzealous-modal-background').length==1){
    		
    		// replace modal content with new content
    		$.fn.overzealous.close({close:false});
    	}

    	$('body').append(markup);

		this.wrap('<div id="overzealous-modal-wrapper"></div>').addClass('overzealous-modal').appendTo('#overzealous-modal-background');
        
        $.fn.overzealous.markup(opts);

        $('#overzealous-modal-background').fadeIn(function(){
        	$('.overzealous-modal').delay(250).fadeIn();
        });

    };
   	
	$.fn.overzealous.defaults = {
	    // buttons:{
	    // 	primary:{
	    // 		text:'Primary',
	    // 		classes:'',
	    // 		action:function(){
		   //  		console.log('primary');
		   //  	}
	    // 	},
	    // 	secondary:{
	    // 		text:'Secondary',
	    // 		classes:'',
	    // 		action:function(){
		   //  		console.log('secondary');
		   //  	}
		   //  }
	    // }
	};

	$.fn.overzealous.markup = function(opts) {
		var markup = '<div id="overzealous-btns">';

		console.log(opts);
		
		if(typeof(opts.buttons) != 'undefined'){

			if(typeof(opts.buttons.primary) != 'undefined'){
				markup+='<a primary class="overzealous-btn '+opts.buttons.primary.classes+'" href="javascript:void(0);">'+opts.buttons.primary.text+'</a>';
			}
			
			if(typeof(opts.buttons.secondary) != 'undefined'){
				markup+='<a secondary class="overzealous-btn '+opts.buttons.secondary.classes+'" href="javascript:void(0);">'+opts.buttons.secondary.text+'</a>';
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

	$.fn.overzealous.close = function(params){
		if(typeof(params)=='undefined') params = {}

		if(typeof(params.close)=='undefined') params.close = true;

	    $('#overzealous-btns').remove();

	    $('.overzealous-modal').hide().appendTo('#overzealous-modal-wrapper').unwrap().removeClass('overzealous-modal');
	    
	    if(params.close){
		    $('#overzealous-modal-background').fadeOut(function(){
		    	$(this).remove();
		    });
		}
	};
 
}( jQuery ));