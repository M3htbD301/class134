//this is an empty string variable
img="";
//this is an empty string variable
modelStatus="";
//this is an empty array
objects=[];


function preload() {
    img=loadImage("dog_cat.jpg");
}

function setup() {
    canvas=createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    //the below line is for initializing cocossd
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
}

function draw() {
    image(video, 0, 0, 380, 380);
    if(modelStatus !="") {
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResult);
        for (i=0; i < objects.length; i++) {
            document.getElementById("modelStatus").innerHTML="Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML="Number Of Objects Detected Are : "+objects.length;
            fill(r,g,b);
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label+" " +percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x-25,objects[i].y-25,objects[i].width,objects[i].height);
        }
    }

}

function modelLoaded() {
    console.log("model loaded");
    modelStatus=true;
    objectDetector.detect(video,gotResult);
}
function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}