function convert() {
    const targetSize =
        parseInt(document.getElementById("targetSizeInput").value) * 1024;
    const nameConvention = document.getElementById("nameInput").value;
    const files = document.getElementById("fileInput").files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const img = new Image();

        img.onload = function () {
            const canvas = document.createElement("canvas");
            const scaleFactor = targetSize / (file.size || file.blob.size);
            const width = img.width * scaleFactor;
            const height = img.height * scaleFactor;
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(function (blob) {
                const fileName = `${nameConvention}_${i}.webp`;
                const url = URL.createObjectURL(blob);

                const link = document.createElement("a");
                link.download = fileName;
                link.href = url;
                link.setAttribute("directory", "converted-images");
                link.click();

                URL.revokeObjectURL(url);
            });
        };

        img.src = URL.createObjectURL(file);
    }
}