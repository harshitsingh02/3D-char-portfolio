import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>((resolve, reject) => {
      (async () => {
        try {
          const encryptedBlob = await decryptFile(
            "/models/character.enc",
            "Character3D#@"
          );
          const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

          // REVERTED: Restore local character variable
          let character: THREE.Object3D;

          loader.load(
            blobUrl,
            async (gltf) => {
              character = gltf.scene;
              await renderer.compileAsync(character, camera, scene);
              character.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                  child.castShadow = true;
                  child.receiveShadow = true;
                  (child as THREE.Mesh).frustumCulled = true;
                }
              });
              resolve(gltf);
              setCharTimeline(character, camera);
              setAllTimeline();

              // REVERTED: Original bone position logic
              character!.getObjectByName("footR")!.position.y = 3.36;
              character!.getObjectByName("footL")!.position.y = 3.36;
              
              dracoLoader.dispose();
            },
            undefined,
            (error) => {
              console.error("Error loading GLTF model:", error);
              reject(error);
            }
          );
        } catch (err) {
          reject(err);
          console.error(err);
        }
      })();
    });
  };

  return { loadCharacter };
};

export default setCharacter;