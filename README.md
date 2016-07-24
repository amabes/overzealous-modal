# Overzealous Modal
Large modal for user feedback

http://amabes.github.io/overzealous-modal

<img src="screenshot.png" style="width:100%;" />

<br>
##GETTING STARTED
Install via bower
```
bower install overzealous-modal
```
###EMBER
Add the following lines to ember-cli-build.js above "return app.toTree();"
```
app.import('bower_components/overzealous-modal/dist/jquery.overzealous-modal.min.css');
app.import('bower_components/overzealous-modal/dist/jquery.overzealous-modal.min.js');
```

#####HTML
```
<div id="ozm-1" style="display:none">
	<h1>Title (1) goes here <span class="icon-ok"></span></h1>
	<p>
		Lorem ipsum something something <span class="highlight">visit the dashboard</span> and more goes here and here and here.
	</p>
</div>
```
#####JS
```
$('#ozm-1').overzealous({
	buttons:{ // (optional)
    	primary:{ // (optional)
    		text:'Dashboard',
    		classes:'custom css classes',
    		action:function(){
    			alert('primary action');
    			// the modal will close after executing this fn
    		}
    	},
    	secondary:{ (optional)
    		text:'Skip',
    		classes:'custom css classes',
	    	action:function(){
	    		alert('secondary action');
	    		// if you would like to close the modal in the secondary action
	    		// simply add the following fn
	    		// $.fn.overzealous.close({close:true});
	    	}
    	}
    }
},function(){
		// optional callback executed after overlay opens.
});
```
