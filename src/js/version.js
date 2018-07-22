(function (global) {
    function Version(versionName) {
        this.versionName = versionName || Date.now();
    }
    Version.prototype.link = function(links){
        var self = this;
        links.forEach(function (item) {
            var linkEl = document.createElement("link");
            linkEl.rel = "stylesheet";
            linkEl.href = item+"?v="+self.versionName;
            document.head.appendChild(linkEl);
        });
    };
    Version.prototype.script = function(scripts){
        var self = this;
        setTimeout(function () {
            var i = 0;
            scripts.forEach(function (item) {
                var scriptEl = document.createElement("script");
                scriptEl.src = item+"?v="+self.versionName;
                scriptEl.onload = function () {
                    i++;
                    if(scripts.length === i){
                        if(self.readyCallback){
                            self.readyCallback.call(global);
                        }
                    }
                };
                document.body.appendChild(scriptEl);
            });
        });
    };
    Version.prototype.ready = function(fn){
        this.readyCallback = fn;
    };
    global.Version = Version;

}(window));