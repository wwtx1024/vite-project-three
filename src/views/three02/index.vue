<template>
    <div id='three02'>

    </div>
</template>

<script >
import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
export default {
    name: '',
    props: {
    },
    components: {

    },
    setup(props, ctx) {
        /**定义相机 */
        const camera = new THREE.PerspectiveCamera(30, 1000 / 800, 1, 3000);
        camera.position.set(800, 800, 800);
        camera.lookAt(0, 0, 0);
        /**定义渲染器 */
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        renderer.setSize(1000, 800);
        /**定义场景 */
        const scene = new THREE.Scene();
        const axesHelper = new THREE.AxesHelper(150);
        scene.add(axesHelper);
        /**定义相机控件 */
        // 设置相机控件轨道控制器OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
        controls.addEventListener('change', function () {
            renderer.render(scene, camera); //执行渲染操作
        });//监听鼠标、键盘事件

        const handleCreateOneScene = () => {
            const geometry = new THREE.BoxGeometry(100, 100, 100);
            //材质对象Material
            const material = new THREE.MeshBasicMaterial({
                color: 0x00ffff, //设置材质颜色
                transparent: true,//开启透明
                opacity: 0.5,//设置透明度
            });
            for (let i = 0; i < 10; i++) {
                const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
                // 沿着x轴分布
                mesh.position.set(i * 200, 0, 0);
                scene.add(mesh); //网格模型添加到场景中
            }
        }
        const handleCreateTwoScene = () => {
            //创建一个长方体几何对象Geometry
            const geometry = new THREE.BoxGeometry(100, 100, 100);
            //材质对象Material
            const material = new THREE.MeshLambertMaterial({
                color: 0x00ffff, //设置材质颜色
                transparent: true,//开启透明
                opacity: 0.5,//设置透明度
                side: THREE.DoubleSide, //两面可见
            });
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
                    // 在XOZ平面上分布
                    mesh.position.set(i * 200, 0, j * 200);
                    scene.add(mesh); //网格模型添加到场景中  
                }
            }
        }
        const handleCreateThreeScene = () => {
            //创建一个长方体几何对象Geometry
            const geometry = new THREE.BoxGeometry(100, 100, 100);
            //材质对象Material
            const material = new THREE.MeshBasicMaterial({
                color: 0x00ffff, //设置材质颜色
                transparent: true,//开启透明
                opacity: 0.5,//设置透明度
            });
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                    for (let x = 0; x < 10; x++) {
                        const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
                        // 在XOZ平面上分布
                        mesh.position.set(i * 200, x * 200, j * 200);
                        scene.add(mesh); //网格模型添加到场景中  
                    }

                }
            }
        }
        // const handelAllGeometry = () => {
        //BoxGeometry：长方体
        const geometry = new THREE.BoxGeometry(100, 100, 100);
        // // SphereGeometry：球体
        // const geometry = new THREE.SphereGeometry(50);
        // // CylinderGeometry：圆柱
        // const geometry = new THREE.CylinderGeometry(50, 50, 100);
        // // PlaneGeometry：矩形平面
        // const geometry = new THREE.PlaneGeometry(100, 50);
        // // CircleGeometry：圆形平面
        // const geometry = new THREE.CircleGeometry(50);
        //材质对象Material
        const material = new THREE.MeshPhongMaterial({
            color: 0xff0000, //设置材质颜色
            // side: THREE.DoubleSide, //两面可见
            // shininess: 30, //高光部分的亮度，默认30
            // specular: 0x444444, //高光部分的颜色
        });
        const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        // 在XOZ平面上分布
        mesh.position.set(0, 0, 0);
        scene.add(mesh); //网格模型添加到场景中  
        // }
        /**点光源和点光源观察辅助 */
        // const pointLight = new THREE.PointLight(0xffffff, 1.0);
        // pointLight.position.set(800, 800, 800);//点光源放在x轴上
        // scene.add(pointLight)
        // const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
        // scene.add(pointLightHelper);
        // // 设置渲染器像素比
        // renderer.setPixelRatio(window.devicePixelRatio);
        /**环境光 */
        //环境光:没有特定方向，整体改变场景的光照明暗
        const ambient = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambient);

        // 设置渲染器背景颜色
        // renderer.setClearColor(0xffffff, 1); //设置背景颜色

        /**GUI*/
        const gui = new GUI();
        gui.domElement.style.right = '0px';
        gui.domElement.style.width = '300px';
        //创建一个对象，对象属性的值可以被GUI库创建的交互界面改变
        const obj = {
            x: 30,
        };
        gui.add(ambient, 'intensity', 0, 2.0).name('环境光强度').step(0.1).onChange((value) => {
            renderer.render(scene, camera)
        })
        // gui增加交互界面，用来改变obj对应属性
        gui.add(obj, 'x', [1, 5, 10, 15, 20, 30]);
        gui.add(obj, 'x', { a: 10, b: 20 });
        let testb = {
            flag: true
        }
        gui.add(testb, 'flag', true);
        // 改变物体位置
        gui.add(mesh.position, 'x', 0, 180);
        gui.add(mesh.position, 'y', 0, 180);
        gui.add(mesh.position, 'z', 0, 180);
        const objColor = {
            color: 0x00ffff,
        };
        // .addColor()生成颜色值改变的交互界面
        gui.addColor(objColor, 'color').onChange(function (value) {
            mesh.material.color.set(value);
        });

        // 创建材质子菜单
        const matFolder = gui.addFolder('材质');

        // 材质颜色color
        matFolder.addColor(objColor, 'color').onChange(function (value) {

        });
       
        onMounted(() => {

            // handelAllGeometry()
            // handleCreateTwoScene()
            renderer.render(scene, camera)
            document.getElementById('three02').appendChild(renderer.domElement);


        })

        return {
            /**变量 */
            /**函数 */
        }
    },
}
</script>

<style >
#three02 {
    width: 100%;
    height: 100%
}
</style>