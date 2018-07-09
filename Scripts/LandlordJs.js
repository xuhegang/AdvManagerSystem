window.onload = function () {
    var inputFile = document.getElementById("inputfile");
    var viewUploadImageArea = document.getElementById("viewupload");
    var description = document.getElementsByTagName("textarea")[0];
    var form = document.getElementsByClassName("uploadform")[0];
    var table = document.getElementById("adv");
    var maxSize = 1024 * 1024 * 5;
    inputFile.onchange = function () {
        if (window.FileReader) { // html5 method  
            var fileReader = new FileReader();
            var currentFile = this.files[0];
            fileReader.readAsDataURL(currentFile);
            fileReader.onload = function (event) {
                var event = event || window.event;
                var target = event.target || event.srcElement;
                var src = event.target.result;
                if (!/image\/\w+/.test(currentFile.type)) {
                    alert("Please select an image");
                    inputFile.value = "";
                    return false;
                } else if (currentFile.size > maxSize) {
                    alert("Please upload an image less than 5mb");
                    inputFile.value = "";
                    return false;
                } else {
                    var img = document.createElement("img");
                    img.src = src;
                    viewUploadImageArea.appendChild(img);
                }
            }
        }
    }
    form.onsubmit = function (e) {
        var event = e || window.event;
        var target = event.target || event.srcElement;
        if (inputFile.value === "" || description.value.trim().split(" ").length < 11) {
            if (inputFile.value === "") {
                alert("please select an image");
            }
            if (description.value.trim().split(" ").length < 11) {
                alert("please leave description more than 10 words");
            }
            event.preventDefault();
        } else {
            alert("upload successful");
        }
    }
    table.onclick = function(e){
        var event = e || window.event;
        var target = event.target || event.srcElement;
        if (target.nodeName.toLowerCase() === "a") {
            var imageId = target.parentNode.previousElementSibling.previousElementSibling.innerHTML;
            var url = "showRejectReason?imageId=" + imageId;
            window.location.href = url;
        }
        
    }

}