var BaseScene = cc.Scene.extend({
    /**
     * example: "res/ui/Scene.json"
     * @param pathJson
     * @param deepChildren => do sau cua node de matching variable defined
     */
    ctor:function(pathJson,deepChildren){
        this._super();
        if(pathJson === undefined){
            Log.error("miss path json ui to load scene");
            return;
        }
        if(deepChildren === undefined){ deepChildren = 1}
        this._loadSceneFromFile(pathJson,deepChildren);
    },
    _loadSceneFromFile:function(file,deep){
        var sceneRes = ccs.load(file,"res/"); // "res/" is base path, because when cocosstudio publish resource need that to convert right path
        this.addChild(sceneRes.node);
        sceneRes.node.runAction(sceneRes.action);
        sceneRes.action.gotoFrameAndPlay(0, true);
        this._syncChildren(sceneRes.node,0,deep);

    },
    _syncChildren:function(node,curDeep,maxDeep){
        if(curDeep >= maxDeep) return;
        var childs = node.getChildren();
        for(var i in childs){
            var child = childs[i];
            this[child.getName()] = child;
            this._syncChildren(child,curDeep+1,maxDeep);
        }
    }
});