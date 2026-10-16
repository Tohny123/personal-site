import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

let model: THREE.Group<THREE.Object3DEventMap>

export function modelSetup() {
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

        // scene.add(model) //TODO: refactor me so this either returns the model or uses the scene as a function parameter 

        // const sceneCam: THREE.Camera = gltf.cameras['0']
        // camera = sceneCam as THREE.PerspectiveCamera
s
    })
}

function isMesh(object: THREE.Object3D): object is THREE.Mesh {
    return object.type === "Mesh";
}
