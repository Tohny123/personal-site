import * as THREE from "three";
import { Sky } from "three/addons/objects/Sky.js";
import { Water } from "three/addons/objects/Water.js";

/**
 * 
 * This controls aspects of the world that isn't controlled by the 3d model
 * Things like:
 * - The Sky
 * - The Water
 */

export class World {
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    water: Water;
    sky: Sky;

    constructor(renderer: THREE.WebGLRenderer, scene: THREE.Scene) {
        this.renderer = renderer;
        this.scene = scene;
        this.water = this.waterSetup();
        this.sky = this.skySetup();
    }

    private skySetup() {
        const sky = new Sky();
        sky.scale.setScalar(450000);

        // Initialize the sky, this is CRITICAL
        const skyUniforms = sky.material.uniforms;
        skyUniforms.turbidity.value = 5;
        skyUniforms.rayleigh.value = 1.5;
        skyUniforms.mieCoefficient.value = 0.0025;
        skyUniforms.mieDirectionalG.value = 0.8;
        skyUniforms.cloudCoverage.value = 0.4;
        skyUniforms.cloudDensity.value = 0.6;
        skyUniforms.cloudElevation.value = 0.5;

        const sun = new THREE.Vector3();

        const elevation = 50;
        const azimuth = 200;

        sun.setFromSphericalCoords(
            1,
            THREE.MathUtils.degToRad(90 - elevation),
            THREE.MathUtils.degToRad(azimuth),
        );
        skyUniforms.sunPosition.value.copy(sun);

        //rendering the environment so that it casts shadows properly using a prenem
        const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        const sceneEnv = new THREE.Scene();
        let renderTarget: THREE.WebGLRenderTarget;
        const setEnvironment = () => {
            if (renderTarget !== undefined) renderTarget.dispose();

            sceneEnv.add(sky);
            renderTarget = pmremGenerator.fromScene(sceneEnv);
            this.scene.add(sky);

            this.scene.environment = renderTarget.texture;
        };
        setEnvironment();
        this.scene.add(sky);
        return sky;
    }

    private waterSetup(): Water {
        const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

        const water = new Water(waterGeometry, {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load(
                "/environment/texture/waternormals.jpg",
                function (texture) {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                },
            ),
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: this.scene.fog !== undefined,
        });
        water.material.uniforms.size.value = 50;
        water.rotation.x = -Math.PI / 2;
        this.scene.add(water);
        return water;
    }

    animate(delta: number) {
        if (this.water) {
            this.water.material.uniforms["time"].value += delta;
        }
    }
}
