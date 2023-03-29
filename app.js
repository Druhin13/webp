const convertBtn = document.getElementById("convertBtn");
convertBtn.addEventListener("click", () => {
    const clientName = document.getElementById("clientName").value;
    const serviceName = document.getElementById("serviceName").value;
    const targetSize = document.getElementById("targetSize").value * 1024; // convert to bytes
    const files = document.getElementById("imageFiles").files;

    if (files.length === 0) {
        alert("Please select at least one file to convert.");
        return;
    }

    const namingConvention = `${clientName}_${serviceName}/`;
    let counter = 1;
    for (const file of files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                canvas.toBlob((blob) => {
                    const newFileSize = blob.size;
                    let quality = 1;
                    while (newFileSize > targetSize) {
                        quality -= 0.05;
                        const webp = canvas.toDataURL("image/webp", quality);
                        blob = dataURLtoBlob(webp);
                        newFileSize = blob.size;
                    }
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${namingConvention}image-${counter}.webp`;
                    document.body.appendChild(a); // add link to page
                    a.click(); // simulate click to trigger download
                    document.body.removeChild(a); // remove link from page
                    URL.revokeObjectURL(url);
                    counter++;
                    if (counter > files.length) {
                        alert("All files converted and downloaded successfully.");
                    }
                }, "image/webp");
            }
        }
    }
});

function dataURLtoBlob(dataURL) {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type: mime
    });
}