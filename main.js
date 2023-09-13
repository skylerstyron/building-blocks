import './styles.scss'
import DOMPurify from 'dompurify';

const blockFiles = ['block1.html', 'block2.html', 'block3.html', 'block4.html'];

// Function to load and display a block
async function loadAndDisplayBlock(filename) {
  try {
    // Fetch the HTML content of the block file
    const response = await fetch(`/blocks/${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to load ${filename}`);
    }
    const htmlContent = await response.text();

    // Sanitize the HTML content using DOMPurify
    const sanitizedContent = DOMPurify.sanitize(htmlContent);

    // Create a div element to hold the sanitized block content
    const block = document.createElement('div');
    block.innerHTML = sanitizedContent;
    block.classList.add('building-block');

    // Create a button to copy the code
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy Code';
    copyButton.classList.add('copy-button', 'mb-3');

    // Add a click event listener to copy the code when the button is clicked
    copyButton.addEventListener('click', () => {
      copyCodeToClipboard(sanitizedContent);
    });

    // Append the copy button to the block
    block.appendChild(copyButton);

    // Append the block to the container
    container.appendChild(block);
  } catch (error) {
    console.error(error);
  }
}

// Function to copy the code to the clipboard
function copyCodeToClipboard(code) {
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = code;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextArea);
}

// Container element where you want to display the blocks
const container = document.getElementById('block-container');

// Load and display each block
blockFiles.forEach((filename) => {
  loadAndDisplayBlock(filename);
});
