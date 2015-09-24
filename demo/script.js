var open_overlay_one = function(){
	$('#ozm-1').overzealous({
	    buttons:{
	    	primary:{
	    		text:'Dashboard',
	    		classes:'btn xl black',
	    		action:function(){
	    			alert('primary action');
	    		}
	    	},
	    	secondary:{
	    		text:'Skip',
	    		classes:'btn xl ghost',
		    	action:function(){
		    		open_overlay_two();
		    	}
	    	}
	    }
	});
}

var open_overlay_two = function(){
	$('#ozm-2').overzealous({
		buttons:{
			secondary:{
	    		text:'Skip',
	    		classes:'btn xl ghost',
	    		action:function(){
	    			alert('secondary action');
	    			$.fn.overzealous.close();
	    		}
	    	}
    	}
	});
}

$(document).ready(function(){
	$('#open-overlay').click(function(){
		open_overlay_one();
	});
});
