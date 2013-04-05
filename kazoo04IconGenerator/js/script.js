$(document).ready(function(){
    showImageCanvas();
    addDropListener();
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

function addDropListener(){
    var jsUploadedImage = docment.getElementById('jsUploadedImage');
    jsUploadedImage.addEventListener('drop', function(e){
        // イベントを親要素に伝えない
        e.stopPropagation();
        // 画像ビューアとして開かないようにする
        e.preventDefault();
        // ドロップされたファイルを取得
        var file = e.dataTransfer.files[0];
        if(file.type !== 'image/png'){
            alert('PNG画像のみを受け付けています。');
            return;
        }
        // HTML5 File API を利用する
        var fileReader = new FileReader();
        // ファイルを Data URI Scheme として読み込む
        fileReader.readAsDataURL(file);
        // ファイル読み込み失敗時
        fileReader.onerror = function(e){
            alert('画像の読み込みに失敗しました。');
        };
        // ファイル読み込み完了時
        fileReader.onload = function(e){
            $('#jsUploadedImage').attr('src', 'data:' + file.type + ';base64,' + e.target.result);
        };
    }, true);
}



function upload(fileName){
    $('#jsUploadedImage').attr('src', fileName)
    // $('#jsKazoo04Icon').after(imgTag);
}

function generateKazoo04Icon(){
    var canvas = document.getElementById('jsKazoo04Icon');
    var ctx = canvas.getContext('2d');

    var dataURL = canvas.toDataURL('image/png');
    var imgTag = '<img src="' + dataURL + '" width="' + canvas.width + '" height="' + canvas.height + '" alt="かずー氏背景合成画像">';
    $('#jsKazoo04Icon').after(imgTag).remove();
    $('#jsButtonEnableToSavaeImage').addClass('disabled');
}
