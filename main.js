track1="";
track2="";
leftWristX="";
leftWristY="";
rightWristX="";
rightWristY="";
leftWristScore="";
rightWristScore="";
song1Status="";
song2Status="";

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotResult);
}

function preload(){
    track1=loadSound("music.mp3");
    track2=loadSound("music2.mp3");
}

function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("red");

    song1Status = track1.isPlaying();
    song2Status = track2.isPlaying();

    if(leftWristScore>0.2){
        circle(leftWristX, leftWristY, 20);
        track2.stop();
        if(song1Status == false){
            track1.play();
            document.getElementById("song-name").innerHTML="Harry Potter"
        }
    }
    if(rightWristScore>0.2){
        circle(rightWristX, rightWristY, 20);
        track1.stop();
        if(song2Status == false){
            track2.play();
            document.getElementById("song-name").innerHTML="Peter Pan"
        }
    }
    

    
}

function modelLoaded(){
    console.log("poseNet is initialized");
}


function gotResult(results){

    if(results.length>0){
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("left wrist x="+leftWristX+" left wrist y="+leftWristY);
        console.log("right wrist x="+rightWristX+" right wrist y="+rightWristY);

        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore = results[0].pose.keypoints[10].score;
        
        console.log("left wrist score="+leftWristScore+" right wrist score="+rightWristScore);
    }
}

function play(){
    track1.play();
    track2.play();
    track1.setVolume(1);
    track1.rate(1);
    track2.setVolume(1);
    track2.rate(1);
}
