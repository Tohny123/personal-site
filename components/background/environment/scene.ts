import * as THREE from "three";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { TAARenderPass } from "three/addons/postprocessing/TAARenderPass.js";
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { World } from "./world";
import { Model } from "./model";


/**
 * TODO:
 * - Add actual loading screen instead of just blue 
 * - Move scene initialization to own thread maybe?? 
 * - Compress textures more on model
 * - Fix animation pop in (water hitches when loading in)
 * - Improve lighting of the world, it's too flat atm (maybe make the clouds nicer to look at as well)
 * - Add camera movement (add window.eventlistener to listen into the mosue move, move like 5cm in world space depending on distance to edges of screen)
 * - Zoom further out a little bit and add more buildings to the right of the model 
 * - Fix reflectiveness of the windows for the smaller buildings (and the glass buildings too)
 * - add cars and planes to the model (have animations loop for them in blender, export them to gltf)
 * - page scroll should change time of day (have exposure change as well)
 * - zoom affects resolution of bg for some reason, should not do that 
 * - cap fps to either 30 or 60, we don't need high fps (saves weaker hardware too {maybe uncap on desktop})
 */



export class Scene {
    //3d rendering globals
    camera!: THREE.PerspectiveCamera; // add exclaimation mark bc it will be initialized when the model loads
    renderer: THREE.WebGLRenderer;
    worldScene: THREE.Scene;
    timer: THREE.Timer; //animation timer

    world: World;
    model: Model;
    composer: EffectComposer;

    constructor(canvas: HTMLCanvasElement, callback: () => void) {

        //MAKE RENDERER
        const context: WebGL2RenderingContext | null = canvas.getContext("webgl2"); // get the context, which is used in the scene setup
        if (context === null) throw new Error("BAD CONTEXT INIT FAIL"); //TODO: this comparison probably shouldn't be done with a === to a null ngl
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            context,
            outputBufferType: THREE.HalfFloatType,
        });

        this.timer = new THREE.Timer();
        this.worldScene = new THREE.Scene();
        this.worldScene.fog = new THREE.Fog(0xcccccc, 4, 300);
        this.world = new World(this.renderer, this.worldScene);

        this.composer = new EffectComposer(this.renderer);

        const resizeWindow = () => {
            //this basically handles the aspect ratio of the rendered scene if you change the window
            if (this.renderer === null) return;
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.composer.setSize(window.innerWidth, window.innerHeight);

        }

        window.addEventListener('resize', resizeWindow)

        this.model = new Model((model) => {
            if (model.camera && model.geometry) {
                this.camera = model.camera;
                this.worldScene.add(model.geometry)

                resizeWindow(); // call this to inttialize the camera aspect ratio

                //Post processing passes happen here, since the model contains the reference to the camera
                this.postProcessingSetup();


                if (callback) {
                    callback();
                }
            }
        });

        //ANIMATION 
        const animate = () => {
            //TODO: this conditional might not be needed, not sure though
            if (typeof this.timer === 'undefined'
                || typeof this.camera === 'undefined'
                || typeof this.worldScene === 'undefined'
                || typeof this.composer === 'undefined') return;
            const delta = this.timer.getDelta();

            this.world.animate(delta);
            this.model.animate(delta);

            this.timer.update();

            // requestAnimationFrame(animate);
            this.composer?.render();

        }

        this.renderer.setAnimationLoop(animate);
    }


    private postProcessingSetup() {
        const renderPass = new RenderPass(this.worldScene, this.camera);
        this.composer.addPass(renderPass);

        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 0.03;
        const taaRenderPass = new TAARenderPass(this.worldScene, this.camera);
        taaRenderPass.sampleLevel = 3;
        taaRenderPass.unbiased = false;
        this.composer.addPass(taaRenderPass);

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.5,
            0.4,
            0.85
        );
        bloomPass.threshold = 0.1;
        bloomPass.strength = 0.1;
        bloomPass.radius = 1;
        this.composer.addPass(bloomPass);

        this.renderer.setClearColor(0xff00ff, 1);
        this.renderer.debug.onShaderError = (gl, program, vs, fs) => {
            console.log("SHADER ERROR");
            console.log(gl.getShaderInfoLog(vs));
            console.log(gl.getShaderInfoLog(fs));
            console.log(gl.getProgramInfoLog(program));
        };
    }
}

