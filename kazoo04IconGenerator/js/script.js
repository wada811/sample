$(document).ready(function(){
    showImageCanvas();
    addDropListener('jsKazoo04Icon');
});

function showImageCanvas(){
    var fileArray = [location.href.replace('index.html', 'img/kazoo04-background.png')];
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

function addDropListener(id){
    var jsDropBox = document.getElementById(id);
    jsDropBox.addEventListener('dragover', dragOverHandler, false);
    jsDropBox.addEventListener('drop', dropListener, false);
}

function dragOverHandler(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
}

function dropListener(event){
    // 画像ビューアとして開かないようにする
    event.stopPropagation();
    event.preventDefault();
    // ドロップされたファイルを取得
    var file = event.dataTransfer.files[0];
    if(file.type !== 'image/png'){
        alert('PNG画像のみを受け付けています。');
        return;
    }
    handleFile(file);
}


function upload(fileName){
    var files = document.getElementById('jsUpload').files;
    var file = files[0];
    handleFile(file);
}

function handleFile(file){
    var fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    // ファイル読み込み失敗時
    fileReader.onerror = function(e){
        alert('画像の読み込みに失敗しました。');
    };
    // ファイル読み込み完了時
    fileReader.onload = function(event){
        var image = new Image();
        image.src = event.target.result;
        image.onload = function(){
            var canvas = document.getElementById('jsKazoo04Icon');
            var ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0);
            $('#jsButtonEnableToSavaeImage').removeClass('disabled');
        };
    };
}

function generateKazoo04Icon(){
    var canvas = document.getElementById('jsKazoo04Icon');
    var ctx = canvas.getContext('2d');

    var dataURL = canvas.toDataURL('image/png');
    var imgTag = '<img src="' + dataURL + '" width="' + canvas.width + '" height="' + canvas.height + '" alt="かずー氏背景合成画像">';
    $('#jsKazoo04Icon').after(imgTag).remove();
    $('#jsButtonEnableToSavaeImage').addClass('disabled');

    var blob = Base64toBlob(dataURL);
    window.URL = window.URL || window.webkitURL;
    $('#jsDownload').attr("href", window.URL.createObjectURL(blob));
    $('#jsDownload').removeClass('disabled');
    // saveBlob(blob,"kazoo04.png");
}


function Base64toBlob(_base64){
    var i;
    var tmp = _base64.split(',');
    var data = atob(tmp[1]);
    var mime = tmp[0].split(':')[1].split(';')[0];

    //var buff = new ArrayBuffer(data.length);
    //var arr = new Uint8Array(buff);
    var arr = new Uint8Array(data.length);
    for (i = 0; i < data.length; i++) {arr[i] = data.charCodeAt(i);}
    var blob = new Blob([arr], { type: mime });
    return blob;
}


function ArraytoBlob(_mime, _array){
    // ArrayBufferやUint8Arrayなら入れなおす工数がなくなります
    var arr = new Uint8Array(_array.length);
    for (var i = 0; i < _array.length; i++) {arr[i] = _array[i];}

    var blob = new Blob([arr], { type: _mime });
    return blob;
}


function saveBlob(_blob, _file){
    if(window.navigator.msSaveBlob){ // IEの場合
        window.navigator.msSaveBlob(_blob, _file);
    }else{
        var url = (window.URL || window.webkitURL);
        var data = url.createObjectURL(_blob);
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
        a.href = data;
        a.download = _file;
        a.dispatchEvent(e);
    }
}

function downloaded(){
    $('#jsDownload').addClass('disabled');
}