function convert() {
    const targetSize = parseInt(document.getElementById('targetSizeInput').value) * 1024; // convert to bytes
    const namingConvention = document.getElementById('nameInput').value;
    const files = document.getElementById('fileInput').files;
    const outputDir = "output"; // name of output directory

    // create output directory if it doesn't exist
    if (!window.File) {
        window.alert('Your browser does not support the File API!');
        return;
    }

    // create output directory if it doesn't exist
    if (!window.File.prototype.slice) {
        Object.defineProperty(window.File.prototype, 'slice', {
            value: window.File.prototype.webkitSlice || window.File.prototype.mozSlice
        });
    }

    if (!window.FileReader) {
        window.alert('Your browser does not support the FileReader API!');
        return;
    }

    if (!window.Blob) {
        window.alert('Your browser does not support the Blob API!');
        return;
    }

    if (!document.createElement('canvas').getContext) {
        window.alert('Your browser does not support canvas!');
        return;
    }

    if (!document.createElement('canvas').toBlob) {
        window.alert('Your browser does not support toBlob()!');
        return;
    }

    if (!document.createElement('a').download) {
        window.alert('Your browser does not support the download attribute!');
        return;
    }

    if (!document.createElement('a').click) {
        window.alert('Your browser does not support the click() method on anchors!');
        return;
    }

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const img = new Image();

        img.onload = function () {
            const canvas = document.createElement('canvas');
            const maxSize = Math.sqrt(targetSize * Math.pow(img.width / img.height, 2));
            const width = img.width > img.height ? maxSize : targetSize / maxSize;
            const height = img.width > img.height ? targetSize / maxSize : maxSize;

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(function (blob) {
                const reader = new FileReader();


                // reader.onload = function () {
                //     const buffer = Buffer.from(reader.result);
                //     const fileName = namingConvention.replace('{name}', file.name).replace('{width}', width).replace('{height}', height);
                //     fs.writeFileSync(path.join(outputDir, fileName), buffer);
                // };

                // reader.onload = function () {
                //     const buffer = Buffer.from(reader.result);
                //     const fileName = namingConvention.replace('{name}', file.name).replace('{width}', width).replace('{height}', height);

                //     // Create temporary anchor element
                //     const link = document.createElement('a');
                //     link.href = URL.createObjectURL(new Blob([buffer]));
                //     link.download = fileName;

                //     // Click the anchor to trigger download
                //     document.body.appendChild(link);
                //     link.click();
                //     document.body.removeChild(link);
                // };

                reader.onload = function () {
                    const buffer = Buffer.from(reader.result);
                    const fileName = namingConvention.replace('{name}', file.name).replace('{width}', width).replace('{height}', height);
                
                    // Create temporary link element
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(new Blob([buffer]));
                    link.download = fileName;
                
                    // Click the link to trigger download
                    link.click();
                };
                

                reader.readAsArrayBuffer(blob);


            });
        };
        img.src = URL.createObjectURL(file);
    }
}