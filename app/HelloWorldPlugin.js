function HelloWorldPlugin(option) {
    // Setup the plugin instance with options...
    console.log(option);
}

HelloWorldPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    console.log('Hello World!'); 
  });
};

module.exports = HelloWorldPlugin;