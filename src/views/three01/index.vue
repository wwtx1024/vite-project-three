<template>
    <div id='three01'>
       
    </div>
</template>

<script >
import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
export default {
    name: '',
    props: {
    },
    components: {

    },
    setup(props, ctx) {
        /**定义物体形状 */
        const geometry = new THREE.BoxGeometry(100, 100, 100);
        var sphere = new THREE.SphereGeometry(20, 50, 50)
        /**定义材质 */
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            transparent: true,//开启透明
            opacity: 0.8,
        });
        /**生成模型 */
        const mesh = new THREE.Mesh(geometry, material);
        const mesh2 = new THREE.Mesh(sphere, material);
        mesh.position.set(0, 0, 0);
        mesh2.position.set(50, 40, 0);
        /**定义场景 */
        const scene = new THREE.Scene();
        const axesHelper = new THREE.AxesHelper(150);
        scene.add(axesHelper);
        scene.add(mesh);
        scene.add(mesh2);
        /**点光源和点光源观察辅助 */
        // const pointLight = new THREE.PointLight(0xffffff, 1.0);
        // pointLight.position.set(100, 100, 100);//点光源放在x轴上
        // scene.add(pointLight)
        // const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
        // scene.add(pointLightHelper);
        /**平行光源和平行光源观察辅助 */
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
        directionalLight.position.set(100, 100, 100);
        // 方向光指向对象网格模型mesh，可以不设置，默认的位置是0,0,0
        scene.add(directionalLight);
        const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5, 0xff0000);
        scene.add(dirLightHelper);
        /**环境光 */
        // //环境光:没有特定方向，整体改变场景的光照明暗
        // const ambient = new THREE.AmbientLight(0xffffff, 0.4);
        // scene.add(ambient);

        /**定义相机 */
        const camera = new THREE.PerspectiveCamera(60, 400 / 300, 1, 500);
        camera.position.set(200, 200, 200);
        camera.lookAt(mesh.position);
        /**定义渲染器 */
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(1000, 800);
        /**定义相机控件 */
        // 设置相机控件轨道控制器OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
        controls.addEventListener('change', function () {
            renderer.render(scene, camera); //执行渲染操作
        });//监听鼠标、键盘事件
        onMounted(() => {
            renderer.render(scene, camera)
            document.getElementById('three01').appendChild(renderer.domElement);
            render();
            //创建stats对象
          
            //stats.domElement:web页面上输出计算结果,一个div元素，
            document.body.appendChild(stats.domElement);

        })
        const clock = new THREE.Clock();
        let num = 1;
        const stats = new Stats();
        const render = () => {

            renderer.render(scene, camera); //执行渲染操作
            stats.update();
            // const spt = clock.getDelta() * 1000;//毫秒
            // console.log('两帧渲染时间间隔(毫秒)', spt);
            // console.log('帧率FPS', 1000 / spt);
            mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
            mesh.rotateX(0.01);//每次绕y轴旋转0.01弧度
            mesh.rotateZ(0.01);//每次绕y轴旋转0.01弧度
            let rafid = requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
            // 停止动画
            // console.log(rafid)
            // num++
            // if( num>=100){
            //     console.log(rafid)
            //     cancelAnimationFrame(rafid)
            // }
        }

        return {
            /**变量 */
            /**函数 */
        }
    },
}
</script>

<style >
#three01 {
    width: 100%;
    height: 100%
}
</style>