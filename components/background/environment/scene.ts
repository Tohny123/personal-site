import * as THREE from "three";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { TAARenderPass } from "three/addons/postprocessing/TAARenderPass.js";
import { World } from "./world";
import { Model } from "./model";

//3d rendering globals
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let worldScene: THREE.Scene;
let timer: THREE.Timer; //animation timer

let world: World;
let model: Model;

//TODO: make this either async, or react with the effect
export async function scene(canvas: HTMLCanvasElement, callback?: () => void) {
    renderer = makeRenderer(canvas);
    timer = new THREE.Timer();

    if (renderer === null) return;

    worldScene = new THREE.Scene();
    worldScene.fog = new THREE.Fog(0xcccccc, 10, 300);
    world = new World(renderer, worldScene);

    window.addEventListener('resize', resizeWindow)

    model = new Model((model) => {
        if (model.camera && model.geometry) {
            camera = model.camera;
            worldScene.add(model.geometry)
            resizeWindow(); // call this to inttialize the camera aspects ratio

            if (callback) {
                callback();
            }
        }
    });

}

function makeRenderer(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
    const context: WebGL2RenderingContext | null = canvas.getContext("webgl2"); // get the context, which is used in the scene setup
    if (context === null) throw new Error("BAD CONTEXT INIT FAIL"); //TODO: this comparison probably shouldn't be done with a === to a null ngl
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas,
        context,
        outputBufferType: THREE.HalfFloatType,
    });

    //POST PROCESSING SETUP
    postProcessingSetup(renderer); //Purple for bugs
    renderer.debug.onShaderError = (gl, program, vs, fs) => {
        console.log("SHADER ERROR");
        console.log(gl.getShaderInfoLog(vs));
        console.log(gl.getShaderInfoLog(fs));
        console.log(gl.getProgramInfoLog(program));
    };
    renderer.setAnimationLoop(animate);
    return renderer;
}

function postProcessingSetup(renderer: THREE.WebGLRenderer) {
    renderer.setPixelRatio(window.devicePixelRatio * 1.5);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.03;
    const taaRenderPass = new TAARenderPass(worldScene, camera);
    taaRenderPass.unbiased = false;

    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.5,
        0.4,
        0.85,
    );
    bloomPass.threshold = 0;
    bloomPass.strength = 0.1;
    bloomPass.radius = 1;
    renderer.setEffects([bloomPass]);
    renderer.setClearColor(0xff00ff, 1);
}

function resizeWindow() {
    //this basically handles the aspect ratio of the rendered scene if you change the window
    if (renderer === null) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


function animate() {
    //TODO: animation logic here
    const delta = timer.getDelta();

    world.animate(delta);
    model.animate(delta);

    timer.update();
    if (camera && worldScene) {
        renderer?.render(worldScene, camera);
    }
}
