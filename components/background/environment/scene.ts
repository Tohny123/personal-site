import * as THREE from "three";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { TAARenderPass } from "three/addons/postprocessing/TAARenderPass.js";
import { World } from "./world";
import { Model } from "./model";




export class Scene {
    //3d rendering globals
    camera!: THREE.PerspectiveCamera; // add exclaimation mark bc it will be initialized when the model loads
    renderer: THREE.WebGLRenderer;
    worldScene: THREE.Scene;
    timer: THREE.Timer; //animation timer

    world: World;
    model: Model;

    constructor(canvas: HTMLCanvasElement, callback: () => void) {

        //MAKE RENDERER
        const context: WebGL2RenderingContext | null = canvas.getContext("webgl2"); // get the context, which is used in the scene setup
        if (context === null) throw new Error("BAD CONTEXT INIT FAIL"); //TODO: this comparison probably shouldn't be done with a === to a null ngl
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas,
            context,
            outputBufferType: THREE.HalfFloatType,
        });

        this.timer = new THREE.Timer();
        this.worldScene = new THREE.Scene();
        this.worldScene.fog = new THREE.Fog(0xcccccc, 10, 300);
        this.world = new World(this.renderer, this.worldScene);

        //POST PROCESSING SETUP
        this.renderer.setPixelRatio(window.devicePixelRatio * 1.5);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 0.03;
        const taaRenderPass = new TAARenderPass(this.worldScene, this.camera);
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
        this.renderer.setEffects([bloomPass]);
        this.renderer.setClearColor(0xff00ff, 1);
        this.renderer.debug.onShaderError = (gl, program, vs, fs) => {
            console.log("SHADER ERROR");
            console.log(gl.getShaderInfoLog(vs));
            console.log(gl.getShaderInfoLog(fs));
            console.log(gl.getProgramInfoLog(program));
        };


        const animate = () => {
            //TODO: animation logic here
            if (this.timer) {
                const delta = this.timer.getDelta();
                this.world.animate(delta);
                this.model.animate(delta);
                this.timer.update();
            }
            if (this.camera && this.worldScene) {
                this.renderer?.render(this.worldScene, this.camera);
            }
        }

        this.renderer.setAnimationLoop(animate);

        const resizeWindow = () => {
            //this basically handles the aspect ratio of the rendered scene if you change the window
            if (this.renderer === null) return;
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }

        window.addEventListener('resize', resizeWindow)

        this.model = new Model((model) => {
            if (model.camera && model.geometry) {
                this.camera = model.camera;
                this.worldScene.add(model.geometry)
                resizeWindow(); // call this to inttialize the camera aspects ratio

                if (callback) {
                    callback();
                }
            }
        });
    }

}

