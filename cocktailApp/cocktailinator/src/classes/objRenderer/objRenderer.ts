import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import * as Three from "three";


export type MeshSource = {
    objectPath:string,
    texturePath:string,
    cameraDist:number
}


export enum Animation {
    STATIC,
    ORBITAL,
}

class ObjRenderer {

    private scene: any;
    private camera: any;
    private renderer: any;
    private width: number;
    private height: number;
    private ratio: number;

    private outElement: any;
    private renderCanvas: any;

    private objSource:MeshSource;

    private object: any;

    private animationType:Animation;
    

    constructor(width: number, height: number, objSource:MeshSource,animation:Animation, canvas: any) {
        this.height = height;
        this.width = width;
        this.objSource = objSource;
        this.animationType = animation;
        this.ratio = width / height;
        this.renderCanvas = canvas;
        this.scene = new Three.Scene();
        this.camera = new Three.PerspectiveCamera(75, this.ratio, 0.1, 1000);
        this.renderer = new Three.WebGLRenderer({ alpha: true, antialias: true });
        this.sceneSetup();
        this.addFileToScene(this.objSource);
        //this.addExampleCube();
        //this.addTestObj();

    }

    private sceneSetup() {
        this.renderer.setSize(this.width, this.height);
        this.outElement = this.renderer.domElement;

        // gBlack Background for debugging!
        // let context:any = this.renderCanvas.getContext("2d");
        // context.fillStyle = 'rgba(0,0,0,0.5)';
        // context.fillRect(0,0,window.innerWidth,window.innerHeight);

        // this.renderer.render(this.scene, this.camera);
    }

    private render() {
        this.renderer.render(this.scene, this.camera);
    }



    private async loadMesh(mesh: MeshSource): Promise<any> {

        const loader = new OBJLoader();
    
        
        return new Promise((resolve, reject) => {

            loader.load(mesh.objectPath, (obj: any) => { resolve(obj.children[0].geometry) });

        });

    }

    private async loadTextures(mesh :MeshSource):Promise<any>
    {
        const loader = new Three.TextureLoader();


        const material = new Three.MeshBasicMaterial({
            map: loader.load(mesh.texturePath)
        });

        return new Promise((resolve, reject) => {
            resolve(material);
        })
    }

    public async addFileToScene(mesh:MeshSource) {
        
       
        const geo = await this.loadMesh(mesh);
        
        const material = await this.loadTextures(mesh);

        this.object = new Three.Mesh(geo,material);
        this.object.position.y -= 0.1;
        this.scene.add(this.object);
        this.camera.position.z = mesh.cameraDist;
        this.renderCanvas.appendChild(this.outElement);
        console.log(this.renderCanvas);
        this.render();
        this.rotateObject();
    }

    
    private async rotateObject() {
        
        while (true) {
            this.object.rotation.y += 0.1;
            //this.object.rotation.x += 0.1;
            this.render();
            await this.sleep(75);
        }
    }

    private async sleep(time: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => { resolve(true) }, time)
        })
    }


    private animate()
    {
        requestAnimationFrame(this.animate)



        this.render();
    }



}



export default ObjRenderer;