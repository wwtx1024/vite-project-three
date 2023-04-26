<template>
    <div class='threedom' ref="threedom">

    </div>
</template>

<script >
import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
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
        /**管道成型 */
        // 三维样条曲线
        // const path = new THREE.CatmullRomCurve3([
        //     new THREE.Vector3(-50, 20, 90),
        //     new THREE.Vector3(-10, 40, 40),
        //     new THREE.Vector3(0, 0, 0),
        //     new THREE.Vector3(60, -60, 0),
        //     new THREE.Vector3(70, 0, 80)
        // ]);
        // const path = new THREE.LineCurve3(new THREE.Vector3(0, 100, 0), new THREE.Vector3(0, 0, 0));
        // // 创建多段线条的顶点数据
        // const p1 = new THREE.Vector3(0, 0, 100)
        // const p2 = new THREE.Vector3(0, 0, 30);
        // const p3 = new THREE.Vector3(0, 0, 0);
        // const p4 = new THREE.Vector3(30, 0, 0);
        // const p5 = new THREE.Vector3(100, 0, 0);
        // // 1. 3D直线线段
        // const line1 = new THREE.LineCurve3(p1, p2);
        // // 2. 三维二次贝塞尔曲线
        // const curve = new THREE.QuadraticBezierCurve3(p2, p3, p4);
        // // 3. 3D直线线段
        // const line2 = new THREE.LineCurve3(p4, p5);

        // const CurvePath = new THREE.CurvePath();
        // // 三条线拼接为一条曲线
        // CurvePath.curves.push(line1, curve, line2)
        // // path:路径   40：沿着轨迹细分数  2：管道半径   25：管道截面圆细分数
        // const geometry = new THREE.TubeGeometry(CurvePath, 40, 2, 25);
        /**旋转成型*/
        // Vector2表示的三个点坐标，三个点构成的轮廓相当于两端直线相连接
        // const pointsArr = [
        //     new THREE.Vector2(50, 60),
        //     new THREE.Vector2(25, 0),
        //     new THREE.Vector2(100, 0),
        //     new THREE.Vector2(50, -60),

        // ];
        // // LatheGeometry：pointsArr轮廓绕y轴旋转生成几何体曲面
        // // pointsArr：旋转几何体的旋转轮廓形状
        // const geometry = new THREE.LatheGeometry(pointsArr,100,0,Math.PI);
        // 通过三个点定义一个二维样条曲线
        // const curve = new THREE.SplineCurve([
        //     new THREE.Vector2(50, 60),
        //     new THREE.Vector2(25, 0),
        //     new THREE.Vector2(50, -60)
        // ]);
        // //曲线上获取点,作为旋转几何体的旋转轮廓
        // const pointsArr = curve.getPoints(50);
        // console.log('旋转轮廓数据', pointsArr);
        // // LatheGeometry：pointsArr轮廓绕y轴旋转生成几何体曲面
        // const geometry = new THREE.LatheGeometry(pointsArr, 30);

        /**轮廓填充几何体 */
        // 一组二维向量表示一个多边形轮廓坐标
        // const pointsArr = [
        //     new THREE.Vector2(-50, -50),
        //     new THREE.Vector2(-60, 0),
        //     new THREE.Vector2(0, 50),
        //     new THREE.Vector2(60, 0),
        //     new THREE.Vector2(50, -50),
        // ]


        // // Shape表示一个平面多边形轮廓,参数是二维向量构成的数组pointsArr
        // const shape = new THREE.Shape(pointsArr);
        // const geometry = new THREE.ShapeGeometry(shape);

        /**拉伸几何体 */
        // const pointsArr = [
        //     new THREE.Vector2(0, 0), //多边形起点
        //     new THREE.Vector2(0, 10),
        //     new THREE.Vector2(10, 10),
        //     new THREE.Vector2(10, 0),

        // ]

        // const curve = new THREE.CatmullRomCurve3([
        //     new THREE.Vector3(-10, -50, -50),
        //     new THREE.Vector3(10, 10, 0),

        //     new THREE.Vector3(8, 50, 50),
        //     new THREE.Vector3(-5, 0, 100)
        // ]);
        // const pointsArr2 = curve.getPoints(10)
        // Shape表示一个平面多边形轮廓,参数是二维向量构成的数组pointsArr
        // const shape = new THREE.Shape(pointsArr);
        // 下面代码绘制了一个矩形+扇形的轮廓，圆心在(100, 0),半径50。
        // const shape = new THREE.Shape();
        // shape.lineTo(100+50, 0); //.currentPoint变为(100+50,0)
        // // 圆弧.arc参数的圆心0,0坐标是相对当前.currentPoint而言，而不是坐标原点
        // shape.arc(-50,0,50,0,Math.PI/2); //.currentPoint变为圆弧线结束点坐标
        // console.log('currentPoint',shape.currentPoint);
        // // 绘制直线，直线起点：圆弧绘制结束的点  直线结束点：(0, 0)
        // shape.lineTo(0, 50);
        // / 下面代码绘制了一个矩形+扇形的轮廓，圆心在(100, 0),半径50。
        // const shape = new THREE.Shape();
        // shape.lineTo(100, 0); //.currentPoint变为(100,0)
        // // 圆弧.arc参数的圆心0,0坐标是相对当前.currentPoint而言，而不是坐标原点
        // shape.arc(0,0,50,0,Math.PI/2); //.currentPoint变为圆弧线结束点坐标
        // console.log('currentPoint',shape.currentPoint);
        // // 绘制直线，直线起点：圆弧绘制结束的点  直线结束点：(0, 0)
        // shape.lineTo(0, 50);
        // const shape = new THREE.Shape();
        // shape.lineTo(100, 0); //.currentPoint变为(100,0)
        // // absarc圆心坐标不受到.currentPoint影响，以坐标原点作为参考
        // shape.absarc(100,0,50,0,Math.PI/2); //.currentPoint变为圆弧线结束点坐标
        // console.log('currentPoint',shape.currentPoint);
        // shape.lineTo(0, 50);
        // Shape内孔轮廓
        // const shape = new THREE.Shape();
        // // .lineTo(100, 0)绘制直线线段，线段起点：.currentPoint，线段结束点：(100,0)
        // shape.lineTo(100, 0);
        // shape.lineTo(100, 100);
        // shape.lineTo(0, 100);
        // const path1 = new THREE.Path();// 圆孔1
        // path1.absarc(20, 20, 10);
        // const path2 = new THREE.Path();// 圆孔2
        // path2.absarc(80, 20, 10);
        // const path3 = new THREE.Path();// 方形孔
        // path3.moveTo(50, 50);
        // path3.lineTo(80, 50);
        // path3.lineTo(80, 80);
        // path3.lineTo(50, 80);
        // //三个内孔轮廓分别插入到holes属性中
        // shape.holes.push(path1,path2,path3);
        // const shape = new THREE.Shape();
        // shape.lineTo(100+50, 0); //.currentPoint变为(100+50,0)
        // // absarc圆心坐标不受到.currentPoint影响，以坐标原点作为参考
        // shape.absarc(100,0,50,0,Math.PI/2); //.currentPoint变为圆弧线结束点坐标
        // console.log('currentPoint',shape.currentPoint);
        // shape.lineTo(0, 50);
        //     const geometry = new THREE.ExtrudeGeometry(shape,{
        //         depth:20,//拉伸长度
        // bevelEnabled:false,//禁止倒角
        // curveSegments:50,
        //     });
        // const linegeometry = new THREE.BufferGeometry(); //创建一个几何体对象
        // linegeometry.setFromPoints(pointsArr)
        // const geometry = new THREE.BoxGeometry(50, 50, 50);
        // const geometry = new THREE.CylinderGeometry(60, 60, 100, 30);
        // const material = new THREE.MeshLambertMaterial({
        //     color: 0x004444,
        //     transparent: true,
        //     opacity: 0.5,
        // });


        // // 长方体作为EdgesGeometry参数创建一个新的几何体
        // const edges = new THREE.EdgesGeometry(geometry);
        // const edgesMaterial = new THREE.LineBasicMaterial({
        //     color: 0x00ffff,
        // })
        // const line = new THREE.LineSegments(edges, edgesMaterial);
        const model = new THREE.Group();
        const loader = new GLTFLoader();
        loader.load("./assets/gltf/Wolf-Blender-2.82a.gltf", function (gltf) {
            // 递归遍历设置每个模型的材质，同时设置每个模型的边线
            gltf.scene.traverse(function (obj) {
                if (obj.isMesh) {
                    // 模型材质重新设置
                    obj.material = new THREE.MeshLambertMaterial({
                        color: 0x004444,
                        transparent: true,
                        opacity: 0.5,
                    });
                    // 模型边线设置
                    const edges = new THREE.EdgesGeometry(obj.geometry);
                    const edgesMaterial = new THREE.LineBasicMaterial({
                        color: 0x00ffff,
                    })
                    const line = new THREE.LineSegments(edges, edgesMaterial);
                    obj.add(line);
                }
            });
            model.add(gltf.scene);
        })
        scene.add(model)
        /**点模型 */
        // const geometry2 = new THREE.BufferGeometry();
        // geometry2.setFromPoints([new THREE.Vector2(100, 0)]);
        // const material2 = new THREE.PointsMaterial({
        //     color: 0xff00ff,
        //     size: 10,
        // });
        // // 点模型对象
        // const points = new THREE.Points(geometry2, material2);
        // scene.add(points)

        /**定义材料 */
        // const material = new THREE.MeshBasicMaterial({
        //     side: THREE.DoubleSide,//双面显示看到管道内壁
        //     // color: 0x0000cc,

        //     // wireframe:true,
        // });
        const linematerial = new THREE.LineBasicMaterial({
            // side: THREE.DoubleSide,//双面显示看到管道内壁
            color: 0xff0000
        });
        /**生成网格模型 */
        // const mesh = new THREE.Mesh(geometry, material)
        // mesh.add(line);
        /**生成线模型 */
        // const line = new THREE.Line(linegeometry, linematerial);

        // 闭合线条
        // const line = new THREE.LineLoop(linegeometry, linematerial);
        // scene.add(line)
        //非连续的线条
        // const line = new THREE.LineSegments(geometry, material);
        // scene.add(mesh)
        /**定义照相机 */
        const camera = new THREE.PerspectiveCamera(30, 1000 / 800, 1, 100)
        camera.position.set(2,2,2);
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