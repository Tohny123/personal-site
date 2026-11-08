import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function isMesh(object: THREE.Object3D): object is THREE.Mesh {
    return object.type === "Mesh";
}

export class Model {
    geometry: THREE.Group<THREE.Object3DEventMap> | null = null;
    camera: THREE.PerspectiveCamera | null = null;
    constructor(callback: (model: Model) => void) {
        const gltfLoader = new GLTFLoader();
        const url = "/environment/city.glb";
        gltfLoader.load(url,
            (gltf) => {

                this.geometry = gltf.scene;

                this.geometry.children.forEach((element) => {
                    if (isMesh(element)) {
                        const mesh = element as THREE.Mesh;
                        const material =
                            mesh.material as THREE.MeshStandardMaterial;
                        material.metalness = 0.9;
                        material.roughness = 0.1;
                    }
                });
                // camera = sceneCam as THREE.PerspectiveCamera
                this.camera = gltf.cameras["0"] as THREE.PerspectiveCamera;

                callback(this);
            });
    }

    animate(delta: number) {
    }
}
