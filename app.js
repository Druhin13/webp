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
                    statusMessage += ` and ${elapsedSeconds.toFixed(2)} second${elapsedSeconds > 1 ? "s" : ""}`;
                }
            } else {
                statusMessage += ` in ${elapsedSeconds.toFixed(2)} seconds`;
            }

            statusMessage += `. Original size was ${formatSize(originalSize)}, final size is ${formatSize(finalSize)}, a reduction of ${sizeDifference.toFixed(2)}%.`;

            setStatus(statusMessage);
        });

        return;
    }

    const imageFile = imageFiles[index];

    setStatus(`Converting file ${index + 1}`);

    const img = new Image();
    img.src = URL.createObjectURL(imageFile);

    img.onload = function () {
        const aspectRatio = img.width / img.height;
        const newHeight = imageWidth / aspectRatio;

        canvas.width = imageWidth;
        canvas.height = newHeight;

        ctx.drawImage(img, 0, 0, imageWidth, newHeight);

        canvas.toBlob(function (blob) {
            const fileName = `${clientName}_${serviceName}-${index + 1}.webp`;

            createImageBitmap(blob).then(function (imgBitmap) {
                canvas.width = imgBitmap.width;
                canvas.height = imgBitmap.height;

                ctx.drawImage(imgBitmap, 0, 0);

                canvas.toBlob(function (convertedBlob) {
                    zip.file(fileName, convertedBlob);

                    convertedSize += convertedBlob.size;

                    if (index === 0) {
                        for (const imageFile of imageFiles) {
                            originalSize += imageFile.size;
                        }
                    }

                    index++;
                    convertNextImage();
                }, "image/webp", quality);
            });
        }, "image/png");
    };
}
