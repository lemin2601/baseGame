var Log = {
    enable: true,
    debug: function(){
        if(this.enable){
            cc.log.apply(cc.log, arguments);
        }
    },
    error: function(){
        if(this.enable){
            cc.error.apply(cc.error, arguments);
        }
    },
    getKey:function(obj,key){
        for(var i in obj){
            if(obj[i] === key){
                return i;
            }
        }
        return "";
    }
}