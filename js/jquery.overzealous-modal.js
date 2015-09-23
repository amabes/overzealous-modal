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
	    color: "#556b2f",
	    backgroundColor: "white",
	    buttons:{
	    	primary:{
	    		text:'Primary',
	    		classes:'',
	    		action:function(){
		    		console.log('primary');
		    	}
	    	},
	    	secondary:{
	    		text:'Secondary',
	    		classes:'',
	    		action:function(){
		    		console.log('secondary');
		    	}
		    }
	    }
	};

	$.fn.overzealous.markup = function(opts) {
		var markup = 
        	'<div id="overzealous-btns">'+
				'<a class="overzealous-btn '+opts.buttons.primary.classes+'" href="javascript:void(0);">'+opts.buttons.primary.text+'</a>'+
				'<a class="overzealous-btn '+opts.buttons.secondary.classes+'" href="javascript:void(0);">'+opts.buttons.secondary.text+'</a>'+
			'</div>';
	    $('.overzealous-modal').append(markup);

	    $.fn.overzealous.click_events(opts.buttons);
	};

	$.fn.overzealous.click_events = function(buttons) {
	    $('.overzealous-btn').first().unbind().click(function(){
        	buttons.primary.action();
        	$.fn.overzealous.close();
        });

        $('.overzealous-btn').last().unbind().click(function(){
			buttons.secondary.action();
        });
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