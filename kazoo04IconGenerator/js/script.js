$(document).ready(function(){
    showImageCanvas();
});

function showImageCanvas(){
    var fileArray = ['http://wada811.github.com/sample/kazoo04IconGenerator/img/kazoo04-background.png'];
    var xywh = [{x: 0, y: 0, w: 512, h: 512}];
    var numFiles = fileArray.length;
    var loadedCount = 0;
    var imageObjectArray = [];
    var canvas = document.getElementById('jsKazoo04Icon');

    var ctx = canvas.getContext('2d');

    function loadImages(){
        var imgObj = new Image();
        imgObj.addEventListener('load',
            function(){
                loadedCount++;
                imageObjectArray.push(imgObj);
                if(numFiles === loadedCount){
                    drawImage();
                }else{
                    loadImages();
                }
            },
            false
        );
        imgObj.src = fileArray[imageObjectArray.length];
    }
    function drawImage(){
        canvas.width = 512;
        canvas.height = 512;
        for(var i in imageObjectArray){
            ctx.drawImage(imageObjectArray[i], xywh[i]['x'], xywh[i]['y'], xywh[i]['w'], xywh[i]['h']);
            imageObjectArray[i] = null;
        }
    }
    loadImages();
}
