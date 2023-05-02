let canvas2;
let video;  
let model;  
let face;   
let v_face = [[21,54,103,67,109,10,338,297,332,284,251],[58,172,136,150,149,176,148,152,377,400,378,379,365,397,288],[165,39,73,41,81],[391,269,303,271,311],[165,167,164,393,391],[180,245,188,174,236,198,49,102,64,240,97,141,2,370,326,460,294,331,279,420,456,399,412,465,413],[247,130,25],[190,243,112],[247,30,29,27,28,56,190],[25,110,24,23,22,26,112],[29,160,144,24],[28,158,153,22],[414,463,341],[467,359,255],[414,286,258,257,259,260,467],[341,256,252,253,254,339,225],[258,385,380,252],[259,387,373,254]]
   
let in_v = [[21,54,103,67,109,10,338,297,332,284,251],[58,172,136,150,149,176,148,152,377,400,378,379,365,397,288],[165,39,73,41,81],[391,269,303,271,311],[165,167,164,393,391],[180,245,188,174,236,198,49,102,64,240,97,141,2,370,326,460,294,331,279,420,456,399,412,465,413],[247,130,25],[190,243,112],[247,30,29,27,28,56,190],[25,110,24,23,22,26,112],[29,160,144,24],[28,158,153,22],[414,463,341],[467,359,255],[414,286,258,257,259,260,467],[341,256,252,253,254,339,225],[258,385,380,252],[259,387,373,254]]
   
let lastx;
let lasty;
let center;
let center_l;
let center_r;
let center_up;
let center_down;
let d_up;
let d_down;
let d_l;
let d_r;



var livecapture = false;
var livecapture2 = true;
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


let firstFace = true;[]


function setup() {
  
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  
  loadFaceModel();
}

async function loadFaceModel() {
  model = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh);
}


function draw() {
   

  if (video.loadedmetadata && model !== undefined) {
    getFace();
  }
 
  if (face !== undefined) {
   
    if (firstFace) {
      console.log(face);
      firstFace = false;
    }
    

    if(livecapture2)
      { 
     
      topLeft = scalePoint(face.boundingBox.topLeft);
      bottomRight = scalePoint(face.boundingBox.bottomRight);
      w = bottomRight.x - topLeft.x;
      dia = w / 5;
      for(let col = -2*dia; col<width; col+=dia){
        for(let row =-2*dia; row<height;row +=dia){
          fill(0);
          noStroke();
         
        }
      }

        


   
      center = scalePoint(face.scaledMesh[1]);
      center_l = scalePoint(face.scaledMesh[93]);
      center_r = scalePoint(face.scaledMesh[323]);
      center_up = scalePoint(face.scaledMesh[10]);
      center_down= scalePoint(face.scaledMesh[152]);
      d_l = dist(center_l.x,center_l.y,center.x,center.y);
      d_r = dist(center_r.x,center_r.y,center.x,center.y);
      d_up = dist(center_up.x,center_up.y,center.x,center.y);
      d_down = dist(center_down.x,center_down.y,center.x,center.y);
     
      stroke(255);
      for(let j=0; j< v_face.length; j++){
      for(let i =0; i < v_face[j].length; i++){
        let ln = scalePoint(face.scaledMesh[v_face[j][i]]);
        lastx = ln.x;
        lasty = ln.y;
      }
      
      }
      
      fill(0);
      noStroke();
      beginShape();
      for (pt of face.annotations.silhouette) {
        pt = scalePoint(pt);
        vertex(pt.x, pt.y);
      }
      endShape(CLOSE);
     
      }
    
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

function begin(){

 livecapture2 = false;
  for (pt of face.annotations.silhouette) {
        pt = scalePoint(pt);
        silhouette.push(pt);
      }
  console.log(silhouette);
  for(let l = 0; l<v_face.length; l++){
    for(let m=0; m<v_face[l].length;m++){
      ln.push(scalePoint(face.scaledMesh[v_face[l][m]]));
    }
    allln.push(ln);
    ln=[];
  }
  c = scalePoint(face.scaledMesh[1]);
  dia_stop = dia;
  console.log(allln);
  
  video.stop();
  getline();
  livecapture = true;

}

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


function continuecapture(){
  livecapture = false;
  video.play();
  pressed2 = true;
  video = createCapture(VIDEO);
  video.hide();
  loadFaceModel();
  
}


function scalePoint(pt) {
  let x = map(pt[0], 0,video.width, 0,width);
  let y = map(pt[1], 0,video.height, 0,height);
  return createVector(x, y);
}



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



