<template>
  
    <div class='threedom' ref="threedom">

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
        const threedom = ref(null)
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

        /**定义材料 */
        const material = new THREE.MeshBasicMaterial({
            color: 0xff00ff,
            side: THREE.DoubleSide
        })
       
        /**生成网格模型 */
        const mesh = new THREE.Mesh(geometry, material)
        /**生成点模型 */
        const points = new THREE.Points(geometry, material);
        /**生成线模型 */
        // const line = new THREE.Line(geometry, material);
        // 闭合线条
        // const line = new THREE.LineLoop(geometry, material);
        //非连续的线条
        // const line = new THREE.LineSegments(geometry, material);
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

        onMounted(() => {
            // render()
            renderer.render(scene, camera);
            threedom.value.appendChild(renderer.domElement)
        })
        
        return {

            /**变量 */
            threedom,
            /**函数 */
          
        }
    },
}
</script>

<style scoped lang='scss'></style>