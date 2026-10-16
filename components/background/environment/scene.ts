import * as THREE from 'three'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { TAARenderPass } from 'three/addons/postprocessing/TAARenderPass.js';

//TODO: animation functions should be contained within each "child" file, put into an array, and passed into the "animate" function
//TODO: all other setups (world, model) should be async and with promises


//3d rendering globals
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let worldScene: THREE.Scene
let timer: THREE.Timer //animation timer

// CAMERA SETTINGS, might be overwritten in the model, so keep in mind
const fov = 75
const aspect = 2 // the canvas default
const near = 0.1
const far = 500000

//TODO: make this either async, or react with the effect 
export function scene(canvas: HTMLCanvasElement) {
    renderer = makeRenderer(canvas)
    if (renderer === null) return

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far) //maybe set up model before hand since that has the camera we need
    timer = new THREE.Timer();

    resizeWindow() // call this to inttialize the camera aspects ratio
    worldScene = new THREE.Scene()
    worldScene.fog = new THREE.Fog(0xcccccc, 10, 300);
}
function makeRenderer(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
    const context: WebGL2RenderingContext | null = canvas.getContext('webgl2') // get the context, which is used in the scene setup
    if (context === null) throw new Error('BAD CONTEXT INIT FAIL') //TODO: this comparison probably shouldn't be done with a === to a null ngl
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas,
        context,
        outputBufferType: THREE.HalfFloatType
    })

    //POST PROCESSING SETUP
    postProcessingSetup(renderer) //Purple for bugs
    renderer.debug.onShaderError = (
        gl,
        program,
        vs,
        fs
    ) => {
        console.log('SHADER ERROR')
        console.log(gl.getShaderInfoLog(vs))
        console.log(gl.getShaderInfoLog(fs))
        console.log(gl.getProgramInfoLog(program))
    }
    renderer.setAnimationLoop(animate)
    return renderer
}

function postProcessingSetup(renderer: THREE.WebGLRenderer) {
    renderer.setPixelRatio(window.devicePixelRatio * 1.5)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.03
    const taaRenderPass = new TAARenderPass(worldScene, camera)
    taaRenderPass.unbiased = false

    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.5,
        0.4,
        0.85
    )
    bloomPass.threshold = 0
    bloomPass.strength = 0.1
    bloomPass.radius = 1
    renderer.setEffects([bloomPass])
    renderer.setClearColor(0xff00ff, 1)
}

function resizeWindow() {
    //this basically handles the aspect ratio of the rendered scene if you change the window
    if (renderer === null) return
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}


//TODO: pass an array of all the children's "animate" function into here to call it's animate function here
function animate() {
    //TODO: animation logic here
    const time = performance.now() * 0.001;
    const delta = timer.getDelta();

    timer.update();
    renderer?.render(worldScene, camera)
}