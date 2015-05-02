CKEDITOR.plugins.add( 'modalLink',
{
	lang: 'en,de',
	icons: 'modalLink',
	init: function( editor )
	{
		editor.addCommand( 'modalLinkDialog', {
			exec: function(editor) {
				var dialog, onCancel, onClose, onInsert;
				
				onCancel = function(e) {
					dialog.find("#linkText").val('');
					dialog.find("#linkUrl").val('');
					
					dialog.modal('hide');
				};
				
				onClose = function(e) {
					dialog.find("#linkText").val('');
					dialog.find("#linkUrl").val('');
				};
				
				onInsert = function(e) {
					var text = dialog.find("#linkText"),
						url = dialog.find("#linkUrl");
					
					if (text.val() != '' && url.val() != '') {
						
						editor.insertHtml('<a href="' + url.val() + '">' + text.val() + '</a>');
						
						text.val('');
						url.val('');
						
						dialog.modal('hide');
					}
				};
				
				dialog = jQuery("#modalLinkDialog");
				
				dialog.modal({
					"keyboard": false,
					"show": true,
					"backdrop": "static"
				});
				
				dialog.on("click", ".onCancel", onCancel);
				dialog.on("click", ".onInsert", onInsert);
				dialog.on("click", ".close", onClose);
				
				dialog.on('hidden', function () {
					dialog.off("click", ".onCancel");
					dialog.off("click", ".onInsert");
					dialog.off("click", ".close");
				});
				
			},
			canUndo:false
		});
				
		editor.ui.addButton( 'ModalLink',
				{
					label: editor.lang.modalLink.buttonLabel,
					command: 'modalLinkDialog',
					icon: this.path + '../../../../resources/images/sprite.svg#link'
				});
		
	}
});