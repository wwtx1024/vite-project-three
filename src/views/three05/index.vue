<template>
    <div class='three05' ref="three05">

    </div>
</template>

<script >
import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import test01 from '@/assets/test01.png'
import diqiu from '@/assets/diqiu.jpeg'
import earth from "@/assets/earth1.jpg"
import cizhuan from "@/assets/cizhuan.jpg"
import cjl from "@/assets/cjl.webp"
import maker from "@/assets/maker.png"

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
export default {
    name: '',
    props: {
    },
    components: {

    },
    setup(props, ctx) {
        const three05 = ref(null)
        /**定义渲染器*/
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(1000, 800);
        /**定义场景 */
        const scene = new THREE.Scene()
        /**坐标系 */
        const axesHelper = new THREE.AxesHelper(800);
        scene.add(axesHelper)
        /**定义物体 */
        // const geometry = new THREE.PlaneGeometry(100, 200);
        // const geometry = new THREE.CircleGeometry(100, 200);
        const geometry = new THREE.BoxGeometry(50, 50,50);
        // const geometry=new THREE.SphereGeometry(50)
        /**纹理坐标0~1之间随意定义*/
        // const uvs = new Float32Array([
        //     0.5, 1, //图片左上角
        //     1, 1, //图片右上角
        //     0.5, 0.5, //图片左下角
        //     1, 0.5, //图片右下角


        // ]);
        // // 设置几何体attributes属性的位置normal属性
        // geometry.attributes.uv = new THREE.BufferAttribute(uvs, 2); //2个为一组,表示一个顶点的纹理坐标

        /**贴图加载器 */
        //纹理贴图加载器TextureLoader
        const texLoader = new THREE.TextureLoader();
        // .load()方法加载图像，返回一个纹理对象Texture

        // const texture = texLoader.load(test01);
        const texture = texLoader.load(maker);

        /**定义材料 */
        const material = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            // side: THREE.DoubleSide,
            // map: texture,
            // transparent: true,//开启透明
            metalness: 0,//金属度属性
            roughness: 1,//粗糙都
           
        })

        // // 设置阵列模式
        // texture.wrapS = THREE.RepeatWrapping;
        // texture.wrapT = THREE.RepeatWrapping;
        // // uv两个方向纹理重复数量
        // texture.repeat.set(12, 6);//注意选择合适的阵列数量
        // 点渲染模式
        // const material = new THREE.PointsMaterial({
        //     color: 0xffff00,
        //     size: 10.0 //点对象像素尺寸
        // });
        // 线材质对象
        // const material = new THREE.LineBasicMaterial({
        //     color: 0xff00ff //线条颜色
        // });

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
        const camera = new THREE.PerspectiveCamera(60, 1000 / 800, 1, 10000)
        camera.position.set(200, 200, 200);
        camera.lookAt(0, 0, 0);
        /**相机控件 */
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', function () {
            renderer.render(scene, camera); //执行渲染操作
        });

        /**平行光源和平行光源观察辅助 */
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
        directionalLight.position.set(200, 200, 200);
        // 方向光指向对象网格模型mesh，可以不设置，默认的位置是0,0,0
        scene.add(directionalLight);
        const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5, 0xff0000);
        scene.add(dirLightHelper);
        const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
        scene.add(gridHelper)
        // 渲染循环

        // function render() {
        //     texture.offset.x += 0.001;//设置纹理动画：偏移量根据纹理和动画需要，设置合适的值
        //     renderer.render(scene, camera);
        //     requestAnimationFrame(render);
        // }
        // render();
        onMounted(() => {

            renderer.render(scene, camera);
            three05.value.appendChild(renderer.domElement);

        })
        /**加载外部模型 */
        // let gltfLoader = new GLTFLoader();
        // gltfLoader.load("./assets/Blender.gltf", (gltf) => {
        //     console.log(123123)
        //     scene.add(gltf.scene);
        //     renderer.render(scene, camera);
        // })
        return {

            /**变量 */
            three05,
            /**函数 */

        }
    },
}
</script>

<style scoped lang='scss'></style>