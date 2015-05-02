(function()
{
    var stopCmd =
    {
        exec : function( editor )
        {
            return;
        }
    };
    var pluginName = 'stop';
    CKEDITOR.plugins.add( pluginName,
    {
        init : function( editor )
        {
            editor.addCommand( pluginName, stopCmd );
        }
    });
})();