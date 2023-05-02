
let video;  
let model;  
let face;   
let v_face = [[73,41,81,178,179,180],[303,271,311,402,403,404],[73,72,11,302,303],[180,85,16,315,404]]  
  
let in_v = [[73,41,81,178,179,180],[303,271,311,402,403,404],[73,72,11,302,303],[180,85,16,315,404]] 
let lastx;
let lasty;

//livecapture
var livecapture = true;
let n1;
let n2;
let c1;
let allln =[];
let ln = [];
let num;
let d;
let pts = [];
let count =0;
let topLeft;

let w;
let dia;
let c;
let end;
let dia_stop;
let silhouette=[];


let Faceliving = true;[]


function setup() {
  
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  
  loadFaceModel();
}

//face model
//reference:https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection
async function loadFaceModel() {
  model = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh);
}

 
function draw() {
   background(0,0,0);
//when the video turn on, and faceliving prepared,get face
  if (video.loadedmetadata && model !== undefined) {
    getFace();
  }
 //Faceliving 
  if (face !== undefined) {
   
    if (Faceliving) {
      console.log(face);
      Faceliving = false;
    }
    

    if(livecapture)
      { 
     
      topLeft = scalePoint(face.boundingBox.topLeft);
      bottomRight = scalePoint(face.boundingBox.bottomRight);
      w = bottomRight.x - topLeft.x;
      dia = w / 5;
      for(let col = -2*dia; col<width; col+=dia){
        for(let row =-2*dia; row<height;row +=dia){
         
         
        }
      }

        
    background(0);

      stroke(255);
      for(let j=0; j< v_face.length; j++){
      for(let i =0; i < v_face[j].length; i++){
        let ln = scalePoint(face.scaledMesh[v_face[j][i]]);
        lastx = ln.x;
        lasty = ln.y;
      }
      
      }
       //face silhouette
      fill(0);
      noStroke();
      beginShape();
      for (pt of face.annotations.silhouette) {
        pt = scalePoint(pt);
        vertex(pt.x, pt.y);
      }
      endShape(CLOSE);
     
      }
    //outer line 
      noFill();
      stroke(255);
      strokeWeight(2);
      for(let j=0; j< v_face.length; j++){
        beginShape();
        for(let i =0; i < v_face[j].length; i++){
          let ln = scalePoint(face.scaledMesh[v_face[j][i]]);
          curveVertex(ln.x,ln.y);
        }
        endShape();
      }
    
      //inner lines
      for(let j=0; j< in_v.length; j++){
        beginShape();
        for(let i =0; i < in_v[j].length; i++){
          let ln = scalePoint(face.scaledMesh[in_v[j][i]]);
          curveVertex(ln.x,ln.y);
        }
        endShape();  
      }
      }
    
}

//draw points on the face using all lines
function getline(){
  for(let g =0; g< allln.length; g++){
    num = allln[g];
    d = 5;
    for(let h=0; h<allln[g].length-1;h++){
      for(let h=0; h<allln[g].length-1;h++){
      //console.log('another line');
      n1 = num[h];
      n2 = num[h+1];
      c1 = new Circle(n1.x,n1.y,n2.x-n1.x,n2.y-n1.y);
      for(let i=0; i<3;i++){
  
        c1.move();
        c1.show();
      
      }
    }
    }
  }
  
  
}

//resume capturing
function continuecapture(){
  livecapture = false;
  video.play();
  pressed2 = true;
  video = createCapture(VIDEO);
  video.hide();
  loadFaceModel();
  
}

//Converting points in video coordinates to points on the canvas
function scalePoint(pt) {
  let x = map(pt[0], 0,video.width, 0,width);
  let y = map(pt[1], 0,video.height, 0,height);
  return createVector(x, y);
}


//gets face points from video input
async function getFace() {
  const predictions = await model.estimateFaces({
    input: document.querySelector('video')
  }); 
  if (predictions.length === 0) {
    face = undefined;
  }
  else {
    face = predictions[0];
  }
}



