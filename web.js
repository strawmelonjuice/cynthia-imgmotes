{function LoadImgMote(currimgmote) {
    function retrieve(url, cb) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                cb(xmlHttp.responseText);
        }
        xmlHttp.open("GET", url, true); // true for asynchronous 
        xmlHttp.send(null);
    }
    let name = (currimgmote.innerHTML).replace(":", "_");
    retrieve(`/es/imgmotes/i/${name}`, (response) => {
        var newimgmote = document.createElement("img");
        newimgmote.setAttribute("style", "max-width: 16px; max-height: 16px");
        newimgmote.setAttribute("loading", "lazy");
        newimgmote.setAttribute("alt", ":" + name + ":-imgmote.");
        newimgmote.classList.add("imgmote");
        if (response == "Not Found") {
            console.warn(`IMGMOTES: Could not find the imgmote '${name}'!`)
        }
        newimgmote.src = response;
        currimgmote.parentNode.replaceChild(newimgmote, currimgmote);
    });
}
    

imgmotes = document.getElementsByTagName("imgmote");
for (var i = imgmotes.length - 1; i >= 0; i--) {
    LoadImgMote(imgmotes.item(i));

}}