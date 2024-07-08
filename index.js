var gamePatern=[];
var userClickedPattern=[];
var randomColors=["red","blue" ,"green", "yellow"];
var level=1;
function nextsequence(){
    var randomno=Math.floor(Math.random()*4);
    var randomChosenColor=randomColors[randomno];
    gamePatern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    $("h1").text("Level "+level);
    level++;
}

$(".btn").click(function(){
    if(gamePatern.length!=0){
        var userChosenColor=$(this).attr("id");
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        if(checkAnswer()){
            if(userClickedPattern.length==gamePatern.length){
                userClickedPattern=[];
                setTimeout(function(){
                    nextsequence();
                },1000);
            }
        }
        else{
            $("h1").text("Game Over, Press Any Key to Restart");
            $("body").addClass("game-over");
            // alert("wrong");
            playSound("wrong");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },100);
            gamePatern=[];
            userClickedPattern=[];
            level=1;
        }
    }
    
})

$(document).on("keydown",function(){
    if(userClickedPattern.length==0){
        nextsequence();
    }
})

function playSound(name){
    var audio=new Audio('./sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(name){
    $("#"+name).addClass("pressed");
    setTimeout(function(){
        $("#"+name).removeClass("pressed");
    },100);
}

function checkAnswer(){
    var n=userClickedPattern.length;
    for(var i=0;i<n;i++){
        if(userClickedPattern[i]!=gamePatern[i]){
            return false;
        }
    }
    return true;
}
