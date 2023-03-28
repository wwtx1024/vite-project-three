<template>
    学习模型对象，添加移除子对象，显示隐藏
    <div class='three04' ref="three04">

    </div>
</template>

<script >
import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
export default {
    name: '',
    props: {
    },
    components: {

    },
    setup(props, ctx) {
        const three04 = ref(null)
        /**定义渲染器*/
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(1000, 800);
        /**定义场景 */
        const scene = new THREE.Scene()
        /**坐标系 */
        const axesHelper = new THREE.AxesHelper(800);
        scene.add(axesHelper)
        /**定义物体 */
        const geometry = new THREE.BoxGeometry(50, 50, 50)
        const sphere = new THREE.SphereGeometry(50)
        /**定义材料 */
        const material = new THREE.MeshBasicMaterial({
            color: 0xcccccc,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.5
        })
        /**生成网格模型 */
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(50, 0, 0)
        /**生成点模型 */
        // const points = new THREE.Points(geometry, material);
        // const mesh2=new THREE.Mesh(sphere,material)
         /** 坐标相对*/
        // const group = new THREE.Group();
        // group.add(mesh);
        // group.position.set(60, 0, 0)
        // const worldPosition = new THREE.Vector3();
        // mesh.getWorldPosition(worldPosition);
        // console.log('世界坐标', worldPosition);
        // console.log('本地坐标', mesh.position);
        // const meshAxesHelper = new THREE.AxesHelper(50);
        // group.add(meshAxesHelper)
        // group.add(mesh2)
        // group.translateY(100);
        // scene.add(group)
        scene.add(mesh)
        
        /**定义照相机 */
        const camera = new THREE.PerspectiveCamera(30, 1000 / 800, 1, 1000)
        camera.position.set(200, 200, 200);
        camera.lookAt(0, 0, 0);
        /**相机控件 */
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', function () {
            renderer.render(scene, camera); //执行渲染操作
        });
        console.log(scene.children)
        /**层级结构循环渲染 */
        // const group1 = new THREE.Group(); //所有高层楼的父对象
        // group1.name = "高层";
        // for (let i = 0; i < 5; i++) {
        //     const geometry = new THREE.BoxGeometry(20, 60, 10);
        //     const material = new THREE.MeshLambertMaterial({
        //         color: 0x00ffff
        //     });
        //     const mesh = new THREE.Mesh(geometry, material);
        //     mesh.position.x = i * 30; // 网格模型mesh沿着x轴方向阵列
        //     group1.add(mesh); //添加到组对象group1
        //     mesh.name = i + 1 + '号楼';
        //     // console.log('mesh.name',mesh.name);
        // }
        // group1.position.y = 30;


        // const group2 = new THREE.Group();
        // group2.name = "洋房";
        // // 批量创建多个长方体表示洋房
        // for (let i = 0; i < 5; i++) {
        //     const geometry = new THREE.BoxGeometry(20, 30, 10);
        //     const material = new THREE.MeshLambertMaterial({
        //         color: 0x00ffff
        //     });
        //     const mesh = new THREE.Mesh(geometry, material);
        //     mesh.position.x = i * 30;
        //     group2.add(mesh); //添加到组对象group2
        //     mesh.name = i + 6 + '号楼';
        // }
        // group2.position.z = 50;
        // group2.position.y = 15;

        // const model = new THREE.Group();
        // model.name = '小区房子';
        // model.add(group1, group2);
        // model.position.set(-50, 0, -25);
        // scene.add(model)
        // /**平行光源和平行光源观察辅助 */
        // const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        // // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
        // directionalLight.position.set(100, 100, 100);
        // // 方向光指向对象网格模型mesh，可以不设置，默认的位置是0,0,0
        // scene.add(directionalLight);
        // const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5, 0xff0000);
        // scene.add(dirLightHelper);
        // // model.traverse(function (obj) {
        // //     console.log('所有模型节点的名称', obj.name);
        // //     // obj.isMesh：if判断模型对象obj是不是网格模型'Mesh'
        // //     if (obj.isMesh) {//判断条件也可以是obj.type === 'Mesh'
        // //         obj.material.color.set(0xffff00);
        // //     }
        // // });
        // const nameNode = scene.getObjectByName("4号楼");
        // nameNode.material.color.set(0xff0000);
        geometry.translate(50/2,0,0,);
        function render() {
            geometry.rotateY(0.01);//旋转动画
            renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render();
        onMounted(() => {

            renderer.render(scene, camera);
            three04.value.appendChild(renderer.domElement)
        })


        return {

            /**变量 */
            three04,
            /**函数 */

        }
    },
}
</script>

<style scoped lang='scss'></style>