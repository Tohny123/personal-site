import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { Sky } from 'three/addons/objects/Sky.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
/**
 * This controls the 3D environment and lighting
 *
 */

// CAMERA SETTINGS
const fov = 75
const aspect = 2 // the canvas default
const near = 0.1
const far = 500000

let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let scene: THREE.Scene

function animate() {



  renderer?.render(scene, camera)
}


// water.material.uniforms['sunDirection'].value.copy(sun).normalize();

// if (renderTarget !== undefined) renderTarget.dispose();

// sceneEnv.add(sky);
// renderTarget = pmremGenerator.fromScene(sceneEnv);
// scene.add(sky);



// scene.environment = renderTarget.texture;

function makeRenderer(
  canvas: HTMLCanvasElement
): THREE.WebGLRenderer {
  const context: WebGL2RenderingContext | null = canvas.getContext('webgl2') // get the context, which is used in the scene setup
  if (context == null) throw new Error('BAD CONTEXT INIT FAIL')
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas,
    context,
    outputBufferType: THREE.HalfFloatType
  })

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setAnimationLoop(animate)

  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.04

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

  return renderer
}

function onWindowResize() {
  if (renderer == null) return
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
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

  const elevation = 90
  const azimuth = 180

  sun.setFromSphericalCoords(
    1,
    THREE.MathUtils.degToRad(90 - elevation),
    THREE.MathUtils.degToRad(azimuth)
  )

  skyUniforms.sunPosition.value.copy(sun)

  //rendering the environment so that it casts shadows properly using a prenem
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const sceneEnv = new THREE.Scene();
  let renderTarget: THREE.WebGLRenderTarget;
  function setEnvironment() {
    if (renderTarget !== undefined) renderTarget.dispose();

    sceneEnv.add(sky);
    renderTarget = pmremGenerator.fromScene(sceneEnv);
    scene.add(sky);

    scene.environment = renderTarget.texture;

  }
  setEnvironment()



  scene.add(sky)


}

function sceneSetup(canvas: HTMLCanvasElement) {
  renderer = makeRenderer(canvas)
  if (renderer == null) return

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  // camera.position.z = 2
  // camera.position.y = 0.5
  // camera.rotateX(-0.2)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  scene = new THREE.Scene()

  renderer.setAnimationLoop(animate)
}

export function environment(
  canvas: HTMLCanvasElement
) {
  sceneSetup(canvas)

  // load the city
  const gltfLoader = new GLTFLoader();
  const url = '/environment/city.glb';
  gltfLoader.load(url, (gltf) => {
    const root = gltf.scene;
    scene.add(root);

    const sceneCam : THREE.Camera = gltf.cameras['0']
    camera = sceneCam as THREE.PerspectiveCamera
    
  });
  

  skySetup()

  window.addEventListener('resize', onWindowResize)
}
