$(function(){
    $('#codeImageCover1').tabs();
    $('#codeImageCover2').tabs();
    $('#codeImageCover3').tabs();
    $('#codeImageCover4').tabs();
    $('#codeImageCover5').tabs();
    $('#codeImageCover6').tabs();
});

$(document).ready(function(){
    showImageCanvas();
});

function showImageCanvas(){
    var fileArray = ['http://wada811.github.com/sample/imageCover/img/kazoo-background.png', 'http://wada811.github.com/sample/assets/img/marunichigaiya_512_trans.png'];
    var xywh = [{x: 0, y: 0, w: 512, h: 512}, {x: 256, y: 256, w: 256, h: 256}];
    var numFiles = fileArray.length;
    var loadedCount = 0;
    var imageObjectArray = [];
    var canvas = document.getElementById('jsImageCoverCanvas');

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

function replaceCanvasWithImage(){
    var canvas = document.getElementById('jsImageCoverCanvas');
    var dataURL = canvas.toDataURL('image/png');
    var imgTag = '<img src="' + dataURL + '" width="' + canvas.width + '" height="' + canvas.height + '" alt="kazoo氏背景合成画像">';
    $('#jsImageCoverCanvas').after(imgTag).remove();
}
