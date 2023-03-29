async function convertImages() {
    const clientName = document.getElementById("clientName").value;
    const serviceName = document.getElementById("serviceName").value;
    const targetSize = document.getElementById("targetSize").value * 1024; // Convert to bytes

    const fileInput = document.getElementById("fileInput");
    const files = fileInput.files;

    if (files.length === 0) {
        alert("Please select at least one file to convert.");
        return;
    }

    let counter = 1;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const image = new Image();
        const reader = new FileReader();

        reader.onload = function (event) {
            image.src = event.target.result;
            image.onload = async function () {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                // Set canvas dimensions to match the image
                canvas.width = image.width / 2;
                canvas.height = image.height / 2;

                // Draw the image onto the canvas
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

                let quality = 0.9; // Starting quality value
                let done = false;
                let dataURL, blob, webPBlob;

                // Iterate until target size is reached or max quality is reached
                while (!done && quality > 0) {
                    // Convert the canvas to a data URL with the current quality
                    dataURL = canvas.toDataURL("image/jpeg", quality);

                    // Convert the data URL to a Blob
                    blob = await dataURLtoBlob(dataURL);

                    // Convert the Blob to a WebP image
                    webPBlob = await blobToWebP(blob);

                    // Check the size of the WebP image
                    const size = webPBlob.size;

                    if (size <= targetSize) {
                        done = true;
                    } else {
                        // Decrease the quality value and try again
                        quality -= 0.1;
                    }
                }

                const url = URL.createObjectURL(webPBlob);
                const link = document.createElement("a");
                const fileName = `${clientName}/${serviceName}-image${i + 1}.webp`;

                // Download the WebP image
                link.setAttribute("href", url);
                link.setAttribute("download", fileName);
                document.body.appendChild(link);
                link.click();

                // Clean up
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            };
        };

        reader.readAsDataURL(file);
    }
}


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

function blobToWebP(blob) {
    return new Promise((resolve) => {
        const img = new Image();

        img.onload = function () {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            canvas.toBlob(function (webPBlob) {
                resolve(webPBlob);
            }, "image/webp", 0.5);
        };

        img.src = URL.createObjectURL(blob);
    });
}