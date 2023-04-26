<template>
    <button @click="handleBegin">开始穿越</button>
    <button @click="handleStop">停止穿越</button>
    <button @click="handleBegin2">开始穿越2</button>
    <button @click="handleStop2">停止穿越2</button>
    <div class='threedom' ref="threedom">

    </div>
</template>

<script >
import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
import * as THREE from 'three';
import { OrbitControls,MapControls } from 'three/addons/controls/OrbitControls.js';
import cizhuan from "@/assets/cizhuan.jpg"

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
        /**定义材料 */
        /**生成网格模型 */
        // 三维样条曲线
        const path = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-50, 20, 90),
            new THREE.Vector3(-10, 40, 40),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(60, -60, 0),
            new THREE.Vector3(90, -40, 60),
            new THREE.Vector3(120, 30, 30),
            new THREE.Vector3(100, 100, 100),
            new THREE.Vector3(-80, 40, 90),
            new THREE.Vector3(-70, 30, 90),
            new THREE.Vector3(-50, 20, 90),
        ]);
        // 样条曲线path作为TubeGeometry参数生成管道
        const geometry = new THREE.TubeGeometry(path, 200, 5, 30);
        const texLoader = new THREE.TextureLoader();
        //纹理贴图
        const texture = texLoader.load(cizhuan);
        //UV坐标U方向阵列模式
        texture.wrapS = THREE.RepeatWrapping;
        //纹理沿着管道方向阵列(UV坐标U方向)
        texture.repeat.x = 10;
        const material = new THREE.MeshLambertMaterial({
            map: texture,
            side: THREE.DoubleSide, //双面显示看到管道内壁
            transparent:true,
            opacity:0.6
        });
        const mesh = new THREE.Mesh(geometry, material);
        /************ */
        const sphere = new THREE.SphereGeometry(4, 50, 50)
        const materialSqhere=new THREE.MeshBasicMaterial({
            color:0xff0000
        }) 
        const meshsphere=new THREE.Mesh(sphere,materialSqhere);
        meshsphere.position.set(-50, 20, 90)
        scene.add(meshsphere)
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

        /**平行光源和平行光源观察辅助 */
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
        directionalLight.position.set(200, 200, 200);
        // 方向光指向对象网格模型mesh，可以不设置，默认的位置是0,0,0
        scene.add(directionalLight);
        const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5, 0xff0000);
        scene.add(dirLightHelper);
        /**相机控件 */
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', function () {
            renderer.render(scene, camera); //执行渲染操作
        });
        const handleBegin=()=>{
            rendersphere()
        }
        const handleStop=()=>{
            console.log(rafid.value)
            cancelAnimationFrame( rafid.value)
        }
        const handleBegin2=()=>{
            render()
        }
        const handleStop2=()=>{
            console.log(rafid.value)
            cancelAnimationFrame( rafid2.value)
        }
        onMounted(() => {
            
            // render()
            renderer.render(scene, camera);
            threedom.value.appendChild(renderer.domElement)
        })
         // 从曲线上等间距获取一定数量点坐标
         const pointsArr = path.getSpacedPoints(500);
        // 渲染循环
        let i = 0; //在渲染循环中累加变化
        let rafid=ref(0);
        let rafid2=ref(0);
        function render() {
            if (i < pointsArr.length - 1) {
                // 相机位置设置在当前点位置
                camera.position.copy(pointsArr[i]);
                // 曲线上当前点pointsArr[i]和下一个点pointsArr[i+1]近似模拟当前点曲线切线
                // 设置相机观察点为当前点的下一个点，相机视线和当前点曲线切线重合
                camera.lookAt(pointsArr[i + 1]);
                i += 1; //调节速度
            } else {
                i = 0;
                
            }
            renderer.render(scene, camera);
            rafid2.value=requestAnimationFrame(render);
        }
        let j=1
       function rendersphere(){
        if (j < pointsArr.length - 1) {
            
                meshsphere.position.copy(pointsArr[j]);
              
                j += 1; //调节速度
            } else {
                j = 0;
                
            }
             renderer.render(scene, camera);
             rafid.value= requestAnimationFrame(rendersphere);
       }
        return {

            /**变量 */
            threedom,
            /**函数 */
            handleBegin,handleStop,
            handleBegin2,handleStop2,

        }
    },
}
</script>

<style scoped lang='scss'></style>