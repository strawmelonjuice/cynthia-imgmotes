{function LoadImgMote(currimgmote) {
    function retrieve(url, cb) {
        $.get(url, (data) => {
            cb(data);
        });
    }
    let name = (currimgmote.innerHTML).replace(":", "_");
    retrieve(`/es/imgmotes/i/${name}`, (response) => {
        let newimgmote = document.createElement("img");
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
    
    setInterval(() => {
        let imgmotes = (document.getElementsByTagName("imgmote"))
        ;
        for (let i = 0; i < imgmotes.length; i++) {
            LoadImgMote(imgmotes.item(i));
        }
    }, 100);
}