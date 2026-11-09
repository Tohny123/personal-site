import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { Sky } from 'three/addons/objects/Sky.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { Water } from 'three/addons/objects/Water.js';
import { EffectComposer } from 'three/examples/jsm/Addons.js'
			import { TAARenderPass } from 'three/addons/postprocessing/TAARenderPass.js';
/**
 * Controls the 3D Rendered background, might refactor so its inside of its own folder, bc this file is ALREADY kinda bulky
 *
 */

//TODO LIST:
/**
 * - Clean up the setups into different files, makes it more managable
 * - make it so that we aren't initializing the camera twice for no reason
 * - make the comparisons better (No more comparing to null anymore eww)
 * - fix anti aliasing
 * - make loading into a promise, so the background has a loading animation while it loads in
 * 
 *
 */

/**
 * organization plan
 * scene (contains renderer, post processing, and scaling)
 * world (sky and water)
 * model (self expalntory)
 */



//3d rendering globals
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let scene: THREE.Scene
let timer: THREE.Timer //animation timer

let water: Water

let model: THREE.Group<THREE.Object3DEventMap> // Collection of models in the 3d environment


// CAMERA SETTINGS
const fov = 75
const aspect = 2 // the canvas default
const near = 0.1
const far = 500000

export function environment(canvas: HTMLCanvasElement) {
  sceneSetup(canvas)
  modelSetup()
  waterSetup()
  skySetup()
  window.addEventListener('resize', resizeWindow)
}

function sceneSetup(canvas: HTMLCanvasElement) {
  renderer = makeRenderer(canvas)
  if (renderer === null) return

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far) //maybe set up model before hand since that has the camera we need

  timer = new THREE.Timer();

  resizeWindow() // call this to inttialize the camera aspects ratio
  scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0xcccccc, 10, 300);

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

  renderer.setPixelRatio(window.devicePixelRatio * 1.5)
  renderer.setSize(window.innerWidth, window.innerHeight)

  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.03

	// const composer = new EffectComposer( renderer );

	const taaRenderPass = new TAARenderPass( scene, camera );
  taaRenderPass.unbiased = false;
  // composer.addPass( taaRenderPass );



  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
  )
  bloomPass.threshold = 0
  bloomPass.strength = 0.1
  bloomPass.radius = 1

  // composer.addPass( bloomPass );

  renderer.setEffects([bloomPass])
  renderer.setClearColor(0xff00ff, 1) //Purple for bugs

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

function resizeWindow() {
  //this basically handles the aspect ratio of the rendered scene if you change the window
  if (renderer === null) return
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  //TODO: animation logic here
  const time = performance.now() * 0.001;
  const delta = timer.getDelta();

  timer.update();

  if (water) {
    water.material.uniforms['time'].value += delta;
  }

  renderer?.render(scene, camera)
}


function skySetup() {
  const sky = new Sky()
  sky.scale.setScalar(450000)

  // Initialize the sky, this is CRITICAL
  const skyUniforms = sky.material.uniforms
  skyUniforms.turbidity.value = 5
  skyUniforms.rayleigh.value = 1.5
  skyUniforms.mieCoefficient.value = 0.0025
  skyUniforms.mieDirectionalG.value = 0.8
  skyUniforms.cloudCoverage.value = 0.4
  skyUniforms.cloudDensity.value = 0.6
  skyUniforms.cloudElevation.value = 0.5

  const sun = new THREE.Vector3()

  const elevation = 15
  const azimuth = 190

  sun.setFromSphericalCoords(
    1,
    THREE.MathUtils.degToRad(90 - elevation),
    THREE.MathUtils.degToRad(azimuth)
  )
  skyUniforms.sunPosition.value.copy(sun)

  //rendering the environment so that it casts shadows properly using a prenem
  const pmremGenerator = new THREE.PMREMGenerator(renderer)
  const sceneEnv = new THREE.Scene()
  let renderTarget: THREE.WebGLRenderTarget
  function setEnvironment() {
    if (renderTarget !== undefined) renderTarget.dispose()

    sceneEnv.add(sky)
    renderTarget = pmremGenerator.fromScene(sceneEnv)
    scene.add(sky)

    scene.environment = renderTarget.texture

  }
  setEnvironment()
  scene.add(sky)
}

function waterSetup() {

  const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

  water = new Water(
    waterGeometry,
    {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load("/environment/texture/waternormals.jpg", function (texture) {

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

      }),
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: scene.fog !== undefined
    }
  );
  water.material.uniforms.size.value = 50;

  water.rotation.x = - Math.PI / 2;


  scene.add(water);
}

function isMesh (object: THREE.Object3D): object is THREE.Mesh {
  return object.type === "Mesh";
}


//TODO: maybe move this into its own file, since there is more stuff that I wanna do with this
// Also i gotta typecheck the material
function modelSetup() {
  const gltfLoader = new GLTFLoader()
  const url = '/environment/city.glb'
  gltfLoader.load(url, (gltf) => {
    model = gltf.scene

    model.children.forEach(element => {

      if (isMesh(element)) {
        const mesh = element as THREE.Mesh
        const material = mesh.material as THREE.MeshStandardMaterial
        material.metalness = 0.9
        material.roughness = 0.1
      }

      console.log(element)

    }
  );

    scene.add(model)

    const sceneCam: THREE.Camera = gltf.cameras['0']
    camera = sceneCam as THREE.PerspectiveCamera

  })

}
