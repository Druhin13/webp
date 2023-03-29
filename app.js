function convertImages() {
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
  
      reader.onload = function(event) {
        image.src = event.target.result;
        image.onload = function() {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
  
          // Set canvas dimensions to match the image
          canvas.width = image.width;
          canvas.height = image.height;
  
          // Draw the image onto the canvas
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  
          // Convert the canvas to a WebP image
          canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            const fileName = `${clientName}/${serviceName}-image${counter}.webp`;
  
            // Download the WebP image
            link.setAttribute("href", url);
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
  
            // Clean up
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }, "image/webp", 0.8);
  
          counter++;
        };
      };
  
      reader.readAsDataURL(file);
    }
  }
  