<template>
    <button @click="handleScale">放大</button>
    <button @click="handleTranslate">平移</button>
    <button @click="handleRotateX">x旋转</button>
    <button @click="handleRotateY">y旋转</button>
    <button @click="handleRotateZ">z旋转</button>
    <div class='three03' ref="three03">

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
        const three03 = ref(null)
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
        const camera = new THREE.PerspectiveCamera(30, 1000 / 800, 1, 1000)
        camera.position.set(200, 200, 200);
        camera.lookAt(0, 0, 0);
        /**相机控件 */
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', function () {
            renderer.render(scene, camera); //执行渲染操作
        });

        // //类型化数组创建顶点数据
        // const vertices = new Float32Array([
        //     0, 0, 0,
        //     0, 0, 50,
        //     50, 0, 0,
        //     0, 50, 0,

        // ]);
        // const indexes = new Uint16Array([
        //     // 下面索引值对应顶点位置数据中的顶点坐标
        //     0, 1, 2, 0, 2, 3, 0, 1, 3
        // ])
        // // 创建属性缓冲区对象
        // //3个为一组，表示一个顶点的xyz坐标
        // const attribue = new THREE.BufferAttribute(vertices, 3);
        // geometry.index = new THREE.BufferAttribute(indexes, 1); //1个为一组
        // geometry.attributes.position = attribue;
        // // 矩形平面，有索引，两个三角形，有2个顶点重合，有4个顶点
        // // 每个顶点的法线数据和顶点位置数据一一对应
        // const normals = new Float32Array([
        //     0, 0, 1, //顶点1法线( 法向量 )
        //     0, 0, 1, //顶点2法线
        //     0, 0, 1, //顶点3法线
        //     0, 0, 1, //顶点4法线
        // ]);
        // // 设置几何体的顶点法线属性.attributes.normal
        // geometry.attributes.normal = new THREE.BufferAttribute(normals, 3);

        const handleScale = () => {
            geometry.scale(2, 2, 2);
            renderer.render(scene, camera); //执行渲染操作
        }
        const handleTranslate = () => {
            geometry.translate(10, 10, 10);
            renderer.render(scene, camera); //执行渲染操作
        }
        const handleRotateX = () => {
            geometry.rotateX(Math.PI / 4);
            renderer.render(scene, camera); //执行渲染操作
        }
        const handleRotateY = () => {
            geometry.rotateY(Math.PI / 4);
            renderer.render(scene, camera); //执行渲染操作
        }
        const handleRotateZ = () => {
            geometry.rotateZ(Math.PI / 4);
            renderer.render(scene, camera); //执行渲染操作
        }
        onMounted(() => {
            // render()
            renderer.render(scene, camera);
            three03.value.appendChild(renderer.domElement)
        })
        const axis = new THREE.Vector3(1, 0, 0);//向量axis
     
        function render() {
            renderer.render(scene, camera); //执行渲染操作
            // mesh.rotation.y += 1;
            // mesh.rotation.x += 2;
            // mesh.rotation.z += 3;
            mesh.rotateOnAxis(axis, Math.PI / 8);//绕axis轴旋转π/8
           

            requestAnimationFrame(render);
        }
        return {

            /**变量 */
            three03,
            /**函数 */
            handleScale, handleTranslate, handleRotateX, handleRotateY, handleRotateZ
        }
    },
}
</script>

<style scoped lang='scss'></style>