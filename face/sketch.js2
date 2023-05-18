//recerence:
//https://www.youtube.com/watch?v=exrH7tvt3f4
//https://github.com/stc/face-tracking-p5js
//https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection
//https://home.digipool.info/m/index.php/FaceTracking_with_clmtrackr_and_P5JS
//https://www.youtube.com/watch?v=Agpnp1G7zTM
let video;  
//livecapture
let livecapture = true;
let a =[];
let b;
let n1;
let n2;
let ln = [];
let num;
let d;
let count =0;
let l1;
let w;
let dia;
let c;


//face

 let model;  
let face;   
let v_face = [[21,54,103,67,109,10,338,297,332,284,251],[58,172,136,150,149,176,148,152,377,400,378,379,365,397,288],[165,39,73,41,81],[391,269,303,271,311],[165,167,164,393,391],[180,245,188,174,236,198,49,102,64,240,97,141,2,370,326,460,294,331,279,420,456,399,412,465,413],[247,130,25],[190,243,112],[247,30,29,27,28,56,190],[25,110,24,23,22,26,112],[29,160,144,24],[28,158,153,22],[414,463,341],[467,359,255],[414,286,258,257,259,260,467],[341,256,252,253,254,339,225],[258,385,380,252],[259,387,373,254]];
let in_v = [[21,54,103,67,109,10,338,297,332,284,251],[58,172,136,150,149,176,148,152,377,400,378,379,365,397,288],[165,39,73,41,81],[391,269,303,271,311],[165,167,164,393,391],[180,245,188,174,236,198,49,102,64,240,97,141,2,370,326,460,294,331,279,420,456,399,412,465,413],[247,130,25],[190,243,112],[247,30,29,27,28,56,190],[25,110,24,23,22,26,112],[29,160,144,24],[28,158,153,22],[414,463,341],[467,359,255],[414,286,258,257,259,260,467],[341,256,252,253,254,339,225],[258,385,380,252],[259,387,373,254]];
let lastx;
let lasty;
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
  background(0);
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
      l1 = scalePoint(face.boundingBox.topLeft);
      bottomRight = scalePoint(face.boundingBox.bottomRight);
      w = bottomRight.x - l1.x;
      dia = w / 5;
      
      noFill();
      noStroke();
      for(let j=0; j< v_face.length; j++){
      for(let i =0; i < v_face[j].length; i++){
        let ln = scalePoint(face.scaledMesh[v_face[j][i]]);
        lastx = ln.x;
        lasty = ln.y;
      }
      
      }
      //face silhouette
      fill(0);
      stroke(255,0,0);
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
  for(let g =0; g< a.length; g++){
    num = a[g];
    d = 5;
    for(let h=0; h<a[g].length-1;h++){
      for(let h=0; h<a[g].length-1;h++){
      n1 = num[h];
      n2 = num[h+1];
      b = new Circle(n1.x,n1.y,n2.x-n1.x,n2.y-n1.y);
      for(let i=0; i<3;i++){
  
        b.move();
        b.show();
      
      }
    }
    }
  }
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






