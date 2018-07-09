window.onload = function () {
    var moveElement;
    var uncheckedTable = document.getElementById("uncheckedtable");
    var approveTable = document.getElementById("approvetable");
    var rejectTable = document.getElementById("rejecttable");
    var rejectButtons = document.getElementsByClassName("reject");
    document.body.onclick = function (e) {
        var event = e || window.event;
        var target = event.target || event.srcElement;
        if (target.nodeName.toLowerCase() === "input" && target.type.toLowerCase() === "button") {
            var status = target.value;
            if (target.value.toLowerCase() ==="approve") {
                moveElement = target.parentNode.parentNode;
                var imageId = moveElement.children[0].innerHTML;
                ajaxPost(imageId, status);
            }
            if (target.value.toLowerCase() ==="submit") {
                moveElement = target.parentNode.parentNode.parentNode;
                var imageId = moveElement.children[0].innerHTML;
                var comment = target.previousElementSibling.children[0].value;
                ajaxPost(imageId, status, comment);
            }
        }
    }
    function ajaxPost(imageId, status, feedback) {
        if (arguments[2] !== undefined) {
            var uploadString = "iid=" + imageId + "&status=" + status + "&feedback=" + feedback;
        } else {
            var uploadString = "iid=" + imageId + "&status=" + status;
        }
        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onreadystatechange = function () {
            if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
                removeAndRepaint(moveElement);
                var lastEle = moveElement.children[moveElement.children.length - 1];
                moveElement.removeChild(lastEle);
                if (status === "approve") {
                    moveElement.children[1].innerHTML = parseInt(approveTable.getElementsByTagName("tbody")[0].lastElementChild.children[1].innerHTML) + 1;
                    approveTable.getElementsByTagName("tbody")[0].appendChild(moveElement);
                } else if (status === "submit") {
                    moveElement.children[1].innerHTML = parseInt(rejectTable.getElementsByTagName("tbody")[0].lastElementChild.children[1].innerHTML) + 1;
                    rejectTable.getElementsByTagName("tbody")[0].appendChild(moveElement);
                }
            }
        }
        xmlHttpRequest.open("post", "/Business/Officerajax", true);
        xmlHttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttpRequest.send(uploadString);
    }
    function removeAndRepaint(ele) {
        var parentEle = ele.parentNode;
        parentEle.removeChild(ele);
        var childEle = parentEle.children;
        var eleCount = ele.children[1].innerHTML;
        for (var i = 1; i < childEle.length; i++) {
            if (i + 1 > eleCount) {
                parentEle.children[i].children[1].innerHTML = parentEle.children[i].children[1].innerHTML - 1;
            } 
        }
       
    }
    for (var i = 0; i < rejectButtons.length; i++) {
        
        rejectButtons[i].onmouseover = function () {
            //var event = e || window.event;
           // var target = event.target || event.srcElement;
            //event.stopPropagation();
                this.children[0].type= "hidden";
                this.children[1].style.display = "block";
                this.children[2].type = "button";
            }
            rejectButtons[i].onmouseout = function () {
                this.children[0].type = "button";
                this.children[1].style.display = "none";
                this.children[2].type = "hidden";
            }
    }
}