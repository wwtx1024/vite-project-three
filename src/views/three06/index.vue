<template>
    <div class='three06' ref="three06">

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
        const three06 = ref(null)
        /**定义渲染器*/
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(1000, 800);
        /**定义场景 */
        const scene = new THREE.Scene()
        /**坐标系 */
        const axesHelper = new THREE.AxesHelper(800);
        scene.add(axesHelper)
        /**定义物体 */
        const geometry = new THREE.BufferGeometry(); //创建一个几何体对象
        // const R = 100; //圆弧半径
        // const N = 50; //分段数量
        // const sp = 2 * Math.PI / N;//两个相邻点间隔弧度
        // // 批量生成圆弧上的顶点数据
        // const arr = [];
        // for (let i = 0; i < N; i++) {
        //     const angle = sp * i;//当前点弧度
        //     // 以坐标原点为中心，在XOY平面上生成圆弧上的顶点数据
        //     const x = R * Math.cos(angle);
        //     const y = R * Math.sin(angle);
        //     arr.push(0, 0, 0);
        //     arr.push(x, y, 0);
        // }
        // //类型数组创建顶点数据
        // const vertices = new Float32Array(arr);

        /**定义材料 */
        // 创建属性缓冲区对象
        //3个为一组，表示一个顶点的xyz坐标
        // const attribue = new THREE.BufferAttribute(vertices, 3);
        // // 设置几何体attributes属性的位置属性
        // geometry.attributes.position = attribue;

        // 线材质
        const material = new THREE.LineBasicMaterial({
            color: 0xff0000 //线条颜色
        });
        /**曲线 */
        // const arc = new THREE.EllipseCurve(0, 0, 100, 50);
        // const pointsArr = arc.getPoints(50); //分段数50，返回51个顶点
        // const pointsArr = arc.getSpacedPoints(50); //分段数50，返回51个顶点
        /**三维样条曲线 */

        // const arr1 = [
        //     new THREE.Vector3(-50, 20, 90),
        //     new THREE.Vector3(-10, 40, 40),
        //     new THREE.Vector3(0, 0, 0),
        //     new THREE.Vector3(60, -60, 0),
        //     new THREE.Vector3(70, 0, 80),
        //     new THREE.Vector3(100, 100, 100),
        // ]
        // // 三维样条曲线
        // const curve = new THREE.CatmullRomCurve3(arr1);
        // const pointsArr = curve.getPoints(50);

        // geometry.setFromPoints(pointsArr);
        /**二维样条曲线*/
        // 二维向量Vector2创建一组顶点坐标
        // const arr2 = [
        //     new THREE.Vector2(-100, 100),
        //     new THREE.Vector2(0, 30),
        //     new THREE.Vector2(100, -100),
        // ];
        // // 二维样条曲线
        // const curve2 = new THREE.SplineCurve(arr2);
        // const pointsArr = curve2.getPoints(50);

        // geometry.setFromPoints(pointsArr);
        /**二维二次贝塞尔曲线 */
        // const p1 = new THREE.Vector2(80, 10);
        // const p2 = new THREE.Vector2(-100, 0);
        // const p3 = new THREE.Vector2(10, 80);
        // const curve = new THREE.QuadraticBezierCurve(p1, p2, p3);
        /**三维二次贝塞尔曲线 */
        // const p1 = new THREE.Vector3(-80, 0, 0);
        // const p2 = new THREE.Vector3(20, 100, 10);
        // const p3 = new THREE.Vector3(80, 0, 100);
        // const curve = new THREE.QuadraticBezierCurve3(p1, p2, p3);
        // const pointsArr = curve.getPoints(100);
        // geometry.setFromPoints(pointsArr)
        /**二维三次贝塞尔曲线 */
        // p1、p2、p3、p4表示4个点坐标
        // p1、p4是曲线起始点，p2、p3是曲线的控制点
        // const p1 = new THREE.Vector2(-80, 0);
        // const p2 = new THREE.Vector2(-40, 50);
        // const p3 = new THREE.Vector2(50, 50);
        // const p4 = new THREE.Vector2(80, 0);
        // 二维三次贝赛尔曲线
        // const curve = new THREE.CubicBezierCurve(p1, p2, p3, p4);
        // const pointsArr = curve.getPoints(100);
        // geometry.setFromPoints(pointsArr)
        /**三维三次贝塞尔曲线 */
        // const p1 = new THREE.Vector3(-80, 0, 0);
        // const p2 = new THREE.Vector3(-40, 50, 0);
        // const p3 = new THREE.Vector3(50, 50, 0);
        // const p4 = new THREE.Vector3(80, 0, 100);
        // const curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);
        // const pointsArr = curve.getPoints(100);
        // geometry.setFromPoints(pointsArr)
        /**二维直线*/
        // const z1 = new THREE.Vector2(-10, 20);
        // const z2 = new THREE.Vector2(10, 80);
        // const line1 = new THREE.LineCurve(z1, z2);
        // const pointsArr = line1.getPoints(100);
        // geometry.setFromPoints(pointsArr)
        /**三维直线 */
        // const z1 = new THREE.Vector3(-10, 20,50);
        // const z2 = new THREE.Vector3(10, 80,-10);

        // const line1 = new THREE.LineCurve3(z1, z2);
        // const pointsArr = line1.getPoints(100);
        // geometry.setFromPoints(pointsArr)
        /**组合线条 */
        const R = 80;//圆弧半径
        const H = 200;//直线部分高度
        // 直线1
        const line1 = new THREE.LineCurve(new THREE.Vector2(R, H), new THREE.Vector2(R, 0));
        // 圆弧
        const arc = new THREE.ArcCurve(0, 0, R, 0, Math.PI, true);
        // 直线2
        const line2 = new THREE.LineCurve(new THREE.Vector2(-R, 0), new THREE.Vector2(-R, H));

        // CurvePath创建一个组合曲线对象
        const CurvePath = new THREE.CurvePath();
        //line1, arc, line2拼接出来一个U型轮廓曲线，注意顺序
        CurvePath.curves.push(line1, arc, line2);
        const pointsArr = CurvePath.getPoints(16);
        geometry.setFromPoints(pointsArr)
        /**点模型 */
        const geometry2 = new THREE.BufferGeometry();
        geometry2.setFromPoints(pointsArr);
        const material2 = new THREE.PointsMaterial({
            color: 0xff00ff,
            size: 10,
        });
        // 点模型对象
        const points = new THREE.Points(geometry2, material2);
        scene.add(points)
        /**生成线模型进行验证 */
        // const geometry3 = new THREE.BufferGeometry();
        // geometry3.setFromPoints([p1, p2, p3]);
        // const material3 = new THREE.PointsMaterial({
        //     color: 0xff00ff,
        //     size: 10,
        // });
        // //点模型对象
        // const points2 = new THREE.Points(geometry3, material3);
        // // 三个点构成的线条
        // const line2 = new THREE.Line(geometry2, new THREE.LineBasicMaterial())
        // scene.add(line2)
        /** 创建线模型对象   构造函数：Line、LineLoop、LineSegments*/   //lineloop第一个点和最后一个点会相连，line不会相连
        // const line = new THREE.Line(geometry, material); 
        const line = new THREE.Line(geometry, material);//线条模型对象
        // const line = new THREE.LineSegments(geometry, material);//线条模型对象
        scene.add(line)
        /**生成网格模型 */
        // const mesh = new THREE.Mesh(geometry, material)

        // scene.add(mesh)
        /**定义照相机 */
        const camera = new THREE.PerspectiveCamera(30, 1000 / 800, 1, 1000)
        camera.position.set(500, 500, 500);
        camera.lookAt(0, 0, 0);
        /**相机控件 */
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', function () {
            renderer.render(scene, camera); //执行渲染操作
        });

        onMounted(() => {
            // render()
            renderer.render(scene, camera);
            three06.value.appendChild(renderer.domElement)
        })

        return {

            /**变量 */
            three06,
            /**函数 */

        }
    },
}
</script>

<style scoped lang='scss'></style>