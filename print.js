document.getElementById("place-order").addEventListener("click", function () {
  // Capture the receipt container element
  const receiptContainer = document.getElementById("cart");
  // Use dom-to-image to convert the receipt container to an image
  domtoimage.toBlob(receiptContainer).then(function (blob) {
    // Save the image as a file using FileSaver.js
    saveAs(blob, "shopping.png");
  });
});
