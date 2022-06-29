/**
@license
Copyright 2022 meta4d.me Authors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */
//引擎的接口列表
namespace m4m.framework {
    export interface IEnabled {
        /** 是否启用 */
        enabled: boolean;
    }
    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 组件实例接口
     * @version m4m 1.0
     */
    export interface INodeComponent {
        onPlay();
        start();
        update(delta: number);
        gameObject: gameObject;
        remove();
        clone();
        // jsonToAttribute(json: any, assetmgr: assetMgr);
    }

    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 2d组件的接口
     * @version m4m 1.0
     */
    export interface I2DComponent {
        onPlay();
        start();
        update(delta: number);
        transform: transform2D;
        remove();
    }

    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 2d碰撞器接口
     * @version m4m 1.0
     */
    export interface ICollider2d {
        transform: transform2D;
        getBound(): obb2d;
        intersectsTransform(tran: transform2D): boolean;
    }

    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 2D渲染组件的接口
     * @version m4m 1.0
     */
    export interface IRectRenderer extends I2DComponent {
        render(canvas: canvas);
        //刷新顶点信息
        updateTran();
        //获取渲染材质
        getMaterial(): material;
        //获取渲染边界(合并渲染深度排序会使用到)
        getDrawBounds(): m4m.math.rect;
    }

    /**
     * @public
     * @language zh_CN
     * @classdesc
     * 渲染器接口 继承自组件接口
     * @version m4m 1.0
     */
    export interface IRenderer extends INodeComponent {
        layer: RenderLayerEnum;
        renderLayer: number;  //后期发现 和 gameObject.layer 概念冲突 ，实现时 对接处理
        queue: number;

        render(context: renderContext, assetmgr: assetMgr, camera: camera);
    }

    /**
     * 
     */
    export interface IRendererGpuIns extends IRenderer{
        // /**
        //  * 执行GPU Instancing 绘制
        //  * @param context 
        //  * @param assetmgr 
        //  * @param camera 
        //  */
        // GpuInstancingRender(context: renderContext, assetmgr: assetMgr, camera: m4m.framework.camera);
        /** 是否开启 GPU Instancing 绘制 */
        isGpuInstancing () : boolean;
    }
}