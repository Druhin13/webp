// const fileInput = document.getElementById("image-files");
// const label = document.getElementById("drag-text2")
// fileInput.addEventListener("change", function () {
//     if (this.files.length > 1) {
//         label.textContent = `${this.files.length} files selected`;
//     } else if (this.files.length === 1) {
//         label.textContent = this.files[0].name;
//     } else {
//         label.textContent = "Choose files";
//     }
// });




// const convertButton = document.getElementById("convert-button");
// convertButton.addEventListener("click", convertImages);

// function convertImages() {

//     //scroll down to the bottom
//     window.scrollTo(0, document.body.scrollHeight);


//     const clientName = document.getElementById("client-name").value;
//     const serviceName = document.getElementById("service-name").value;
//     const imageWidth = document.getElementById("image-width").value;
//     const imageFiles = document.getElementById("image-files").files;


//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");

//     const zip = new JSZip();
//     const reader = new FileReader();

//     let convertedSize = 0;
//     let originalSize = 0;
//     let index = 0;
//     let startTime = new Date();

//     setStatus("Conversion started");

//     function convertNextImage() {
//         if (index >= imageFiles.length) {
//             setStatus("Creating zip file");

//             zip.generateAsync({
//                 type: "blob"
//             }).then(function (content) {
//                 saveAs(content, `${clientName}_${serviceName}.zip`);
//                 let endTime = new Date();
//                 let elapsedSeconds = (endTime - startTime) / 1000;
//                 let elapsedMinutes = Math.floor(elapsedSeconds / 60);
//                 elapsedSeconds = elapsedSeconds % 60;

//                 let finalSize = content.size;
//                 let sizeDifference = ((originalSize - finalSize) / originalSize) * 100;
//                 let statusMessage = `Conversion completed`;

//                 if (elapsedMinutes > 0) {
//                     statusMessage += ` in ${elapsedMinutes} minute${elapsedMinutes > 1 ? "s" : ""}`;
//                     if (elapsedSeconds > 0) {
//                         statusMessage +=
//                             ` and ${elapsedSeconds.toFixed(2)} second${elapsedSeconds > 1 ? "s" : ""}`;
//                     }
//                 } else {
//                     statusMessage += ` in ${elapsedSeconds.toFixed(2)} seconds`;
//                 }

//                 statusMessage +=
//                     `. Original size was ${formatSize(originalSize)}, final size is ${formatSize(finalSize)}, a reduction of ${sizeDifference.toFixed(2)}%.`;

//                 setStatus(statusMessage);
//             });

//             return;
//         }

//         const imageFile = imageFiles[index];

//         setStatus(`Converting file ${index + 1}`);

//         reader.onload = function () {
//             const img = new Image();
//             img.src = reader.result;

//             img.onload = function () {
//                 const aspectRatio = img.width / img.height;
//                 const newHeight = imageWidth / aspectRatio;

//                 canvas.width = imageWidth;
//                 canvas.height = newHeight;

//                 ctx.drawImage(img, 0, 0, imageWidth, newHeight);

//                 canvas.toBlob(function (blob) {
//                     const fileName = `${clientName}_${serviceName}_${(index + 1).toString().padStart(4, '0')}.webp`;

//                     let options = { lossless: true };

//                     zip.file(fileName, blob);

//                     if (index === 0) {
//                         for (const imageFile of imageFiles) {
//                             originalSize += imageFile.size;
//                         }
//                     }

//                     convertedSize += blob.size;

//                     index++;
//                     convertNextImage();
//                 }, "image/webp");
//             };
//         };

//         reader.readAsDataURL(imageFile);
//     }

//     convertNextImage();
// }




// //set current button display none by default
// document.getElementById("convert-button").style.display = "none";

// function buttonshow() {
//     //check if all the input fields are filled
//     if (document.getElementById("client-name").value != "" && document.getElementById("service-name").value !=
//         "" && document.getElementById("image-width").value != "" && document.getElementById("image-files")
//         .value != "") {
//         //if all the input fields are filled then show the button
//         document.getElementById("convert-button").style.display = "block";
//     } else {
//         //if all the input fields are not filled then hide the button
//         document.getElementById("convert-button").style.display = "none";
//     }
// }
// //run the function continuously
// setInterval(buttonshow, 100);


// const imageWidthInput = document.getElementById('image-width');

// imageWidthInput.addEventListener('input', () => {
//     const value = imageWidthInput.value.replace(/[^0-9]/g, '');
//     imageWidthInput.value = value;
// });


// const h2Elements = document.querySelectorAll('.subtitle2');

// h2Elements.forEach((h2) => {
//     const text = h2.textContent.trim();
//     const lastChar = text.charAt(text.length - 1);
//     if (lastChar === '*') {
//         const span = document.createElement('span');
//         span.textContent = lastChar;
//         span.style.color = '#FF0000';
//         h2.textContent = text.slice(0, text.length - 1);
//         h2.appendChild(span);
//     }
// });





// function setStatus(statusText) {
//     const statusElement = document.getElementById("status");
//     statusElement.textContent = statusText;
// }

// function formatSize(sizeInBytes) {
//     const sizeInMb = sizeInBytes / (1024 * 1024);
//     if (sizeInMb < 1) {
//         const sizeInKb = sizeInBytes / 1024;
//         return `${sizeInKb.toFixed(2)} KB`;
//     } else {
//         const sizeInMbFixed = sizeInMb.toFixed(2);
//         if (sizeInMb < 1024) {
//             return `${sizeInMbFixed} MB`;
//         } else {
//             const sizeInGb = sizeInMb / 1024;
//             const sizeInGbFixed = sizeInGb.toFixed(2);
//             if (sizeInGb < 1024) {
//                 return `${sizeInGbFixed} GB`;
//             } else {
//                 const sizeInTb = sizeInGb / 1024;
//                 const sizeInTbFixed = sizeInTb.toFixed(2);
//                 return `${sizeInTbFixed} TB`;
//             }
//         }
//     }
// }










const fileInput = document.getElementById("image-files");
const label = document.getElementById("drag-text2")
fileInput.addEventListener("change", function () {
    if (this.files.length > 1) {
        label.textContent = `${this.files.length} files selected`;
    } else if (this.files.length === 1) {
        label.textContent = this.files[0].name;
    } else {
        label.textContent = "Choose files";
    }
});




const convertButton = document.getElementById("convert-button");
convertButton.addEventListener("click", convertImages);

function convertImages() {

    //scroll down to the bottom
    window.scrollTo(0, document.body.scrollHeight);


    const clientName = document.getElementById("client-name").value;
    const serviceName = document.getElementById("service-name").value;
    const imageWidth = document.getElementById("image-width").value;
    const quality = parseInt(document.getElementById("quality").value);
    const imageFiles = document.getElementById("image-files").files;


    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const zip = new JSZip();
    const reader = new FileReader();

    let convertedSize = 0;
    let originalSize = 0;
    let index = 0;
    let startTime = new Date();

    setStatus("Conversion started");

    function convertNextImage() {
        if (index >= imageFiles.length) {
            setStatus("Creating zip file");

            zip.generateAsync({
                type: "blob"
            }).then(function (content) {
                saveAs(content, `${clientName}_${serviceName}.zip`);
                let endTime = new Date();
                let elapsedSeconds = (endTime - startTime) / 1000;
                let elapsedMinutes = Math.floor(elapsedSeconds / 60);
                elapsedSeconds = elapsedSeconds % 60;

                let finalSize = content.size;
                let sizeDifference = ((originalSize - finalSize) / originalSize) * 100;
                let statusMessage = `Conversion completed`;

                if (elapsedMinutes > 0) {
                    statusMessage += ` in ${elapsedMinutes} minute${elapsedMinutes > 1 ? "s" : ""}`;
                    if (elapsedSeconds > 0) {
                        statusMessage +=
                            ` and ${elapsedSeconds.toFixed(2)} second${elapsedSeconds > 1 ? "s" : ""}`;
                    }
                } else {
                    statusMessage += ` in ${elapsedSeconds.toFixed(2)} seconds`;
                }

                statusMessage +=
                    `. Original size was ${formatSize(originalSize)}, final size is ${formatSize(finalSize)}, a reduction of ${sizeDifference.toFixed(2)}%.`;

                setStatus(statusMessage);
            });

            return;
        }

        const imageFile = imageFiles[index];

        setStatus(`Converting file ${index + 1}`);

        reader.onload = function () {
            const img = new Image();
            img.src = reader.result;

            img.onload = function () {
                const aspectRatio = img.width / img.height;
                const newHeight = imageWidth / aspectRatio;

                canvas.width = imageWidth;
                canvas.height = newHeight;

                ctx.drawImage(img, 0, 0, imageWidth, newHeight);

                canvas.toBlob(function (blob) {
                    const fileName = `${clientName}_${serviceName}_${(index + 1).toString().padStart(4, '0')}.webp`;

                    let options = {
                        lossless: false
                    };

                    if (quality === 100) {
                        options.lossless = true;
                    }

                    zip.file(fileName, blob);

                    if (index === 0) {
                        for (const imageFile of imageFiles) {
                            originalSize += imageFile.size;
                        }
                    }

                    convertedSize += blob.size;

                    index++;
                    convertNextImage();
                }, "image/webp", quality / 100);
            };
        };

        reader.readAsDataURL(imageFile);
    }

    convertNextImage();
}



//set current button display none by default
document.getElementById("convert-button").style.display = "none";

function buttonshow() {
    //check if all the input fields are filled
    if (document.getElementById("client-name").value != "" && document.getElementById("service-name").value !=
        "" && document.getElementById("image-width").value != "" && document.getElementById("image-files")
        .value != "") {
        //if all the input fields are filled then show the button
        document.getElementById("convert-button").style.display = "block";
    } else {
        //if all the input fields are not filled then hide the button
        document.getElementById("convert-button").style.display = "none";
    }
}
//run the function continuously
setInterval(buttonshow, 100);


const imageWidthInput = document.getElementById('image-width');

imageWidthInput.addEventListener('input', () => {
    const value = imageWidthInput.value.replace(/[^0-9]/g, '');
    imageWidthInput.value = value;
});


const h2Elements = document.querySelectorAll('.subtitle2');

h2Elements.forEach((h2) => {
    const text = h2.textContent.trim();
    const lastChar = text.charAt(text.length - 1);
    if (lastChar === '*') {
        const span = document.createElement('span');
        span.textContent = lastChar;
        span.style.color = '#FF0000';
        h2.textContent = text.slice(0, text.length - 1);
        h2.appendChild(span);
    }
});





function setStatus(statusText) {
    const statusElement = document.getElementById("status");
    statusElement.textContent = statusText;
}

function formatSize(sizeInBytes) {
    const sizeInMb = sizeInBytes / (1024 * 1024);
    if (sizeInMb < 1) {
        const sizeInKb = sizeInBytes / 1024;
        return `${sizeInKb.toFixed(2)} KB`;
    } else {
        const sizeInMbFixed = sizeInMb.toFixed(2);
        if (sizeInMb < 1024) {
            return `${sizeInMbFixed} MB`;
        } else {
            const sizeInGb = sizeInMb / 1024;
            const sizeInGbFixed = sizeInGb.toFixed(2);
            if (sizeInGb < 1024) {
                return `${sizeInGbFixed} GB`;
            } else {
                const sizeInTb = sizeInGb / 1024;
                const sizeInTbFixed = sizeInTb.toFixed(2);
                return `${sizeInTbFixed} TB`;
            }
        }
    }
}