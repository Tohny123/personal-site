import * as THREE from 'three'
import { Sky } from 'three/addons/objects/Sky.js'
import { Water } from 'three/addons/objects/Water.js';

let water: Water
let sky: Sky

export function worldSetup() {
    skySetup()
    waterSetup()
}


function skySetup() {
    sky = new Sky()
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
