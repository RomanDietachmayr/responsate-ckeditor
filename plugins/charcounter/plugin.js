CKEDITOR.plugins.add( 'charcounter', 
{
	lang: 'en,de',
	init: function( editor )
	{
		if (editor.config.maxCharCount != null) {
			
			editor.on('contentDom', function() {
				countCharacters(editor);
				
				var buttonIcon = 
					document.getElementsByClassName(editor.id)[0].getElementsByClassName('cke_button__charcounter_icon')[0];
				buttonIcon.style.display = 'none';
				
				var buttonLabel = 
					document.getElementsByClassName(editor.id)[0].getElementsByClassName('cke_button__charcounter_label')[0];
				buttonLabel.style.display = 'inline';
				buttonLabel.style['padding-left'] = '0px';
				
				if (editor.config.maxCharCount != 0) {
					buttonLabel.innerHtml = editor.config.maxCharCount;
				}
			});
			
			editor.on('change', function() {
				countCharacters(editor);
			});
			
			editor.ui.addButton('CharCounter',{
				label: editor.lang.charcounter.buttonLabel, 
				command:'charCount'
			});
		}
	}
});

function countCharacters(editor) {
	var buttonLabel = document.getElementsByClassName(editor.id)[0].getElementsByClassName('cke_button__charcounter_label')[0],
		html = editor.document.getBody().getText();
	
	if (editor.config.maxCharCount != null) {
		
		if (editor.config.maxCharCount == 0)
			buttonLabel.innerHTML = html.length;
		else {
			// chrome initially puts \n which counts as a character -> remove \n
			var count = editor.config.maxCharCount - html.split("\n").join("").length;
			buttonLabel.innerHTML = count;
			
			if (count >= 0) {
				buttonLabel.style.color = "#474747";
			} else {
				buttonLabel.style.color = "#DF0057";
			}
		}
	}
}