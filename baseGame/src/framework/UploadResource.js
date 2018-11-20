var UploadResource = BaseScene.extend({
    curPercent:0,
    deltaTime:0,
    /**@type {ccui.LoadingBar}*/
    loadingBar:undefined,
    /**@type {ccui.Text}*/
    txtPercent:undefined,
    /**@type {ccui.ImageView}*/
    imgBg:undefined,

    ctor: function(){
        this._super(res.scene_loading_json, 1);
    },
    onEnter:function(){
        this._super();
        this.scheduleUpdate();
        this._loadImgOnline();
    },
    update:function(dt){
        this.deltaTime += dt;
        if(this.deltaTime >= 1){
            this.deltaTime -=1;
            this.curPercent ++;
            this.txtPercent.setString(this.curPercent);
            this.loadingBar.setPercent(this.curPercent);
            if(this.curPercent >= 100){
                Log.debug("load done");
                this.unscheduleUpdate();
            }
        }
    },

    _loadImgOnline:function(){
        this.imgBg.crossOrigin = "Anonymous";
        this.imgBg.src = "https://i.stack.imgur.com/p9bYj.jpg";
        var myUrl = 'http://www.cocos2d-x.org/s/upload/v35.jpg';
        cc.textureCache.addImageAsync(myUrl, this.imageLoaded, this);
        // this.imgBg.crossOrigin = "anonymous"; // ask for CORS permission
        // cc.loader.load('https://i.stack.imgur.com/p9bYj.jpg', function (err, tex) {
        //     Log.debug(JSON.stringify(tex));
        //     Log.debug("loadimg done");
        //     this.imgBg.spriteFrame = new cc.SpriteFrame(tex);
        //     this.imgBg.getSpriteFrame().setTexture(tex);
        //     this.testimg.spriteFrame.setTexture(tex);
        // });
    },
    imageLoaded:function(){
        var myUrl = 'http://www.cocos2d-x.org/s/upload/v35.jpg';

        var sprite = cc.Sprite.create(myUrl);
        this.addChild(sprite,3);

    }
});