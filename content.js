document.addEventListener("mouseover", function(event) {
  if (event.target.nodeName === "IMG") {
    const img = event.target;
    const imageUrl = img.src;

    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const sizeInBytes = blob.size;
        let size;

        if (sizeInBytes >= 1000000) {
          size = (sizeInBytes / 1000000).toFixed(2) + " MB";
        } else if (sizeInBytes >= 1000) {
          size = (sizeInBytes / 1000).toFixed(2) + " KB";
        } else {
          size = sizeInBytes + " Bytes";
        }

        const width = img.naturalWidth;
        const height = img.naturalHeight;
        const dimensions = `${width}x${height}`;

        const div = document.createElement("div");
        div.style.position = "fixed";
        div.style.top = "10px";
        div.style.right = "10px";
        div.style.padding = "5px";
        div.style.background = "#333";
        div.style.color = "#fff";
        div.style.border = "1px solid #555";
        div.style.borderRadius = "5px";
        div.style.fontFamily = "GB Museo Sans, Arial, sans-serif";
        div.style.fontSize = "11px";
        div.style.zIndex = "9999";
        div.style.textAlign = "center";
        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.justifyContent = "center";
        div.innerHTML = `<div>${dimensions}</div><div>${size}</div>`;

        document.body.appendChild(div);

        event.target.addEventListener("mouseout", function() {
          div.remove();
        });
      })
      .catch(error => console.error(error));
  }
});
