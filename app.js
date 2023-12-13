function handleFile() {
    const fileInput = document.getElementById('fileChoose');
    const outputTextarea = document.getElementById('textArea');

    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function(event) {
        try {
          const jsonData = JSON.parse(event.target.result);

          // Convert JSON to string and display in the textarea
          outputTextarea.value = JSON.stringify(jsonData, null, 2);

          
        } catch (error) {
          outputTextarea.value = 'Invalid JSON file. Please import a JSON file that has correct format.';
        }
      };

      reader.readAsText(file);
    } else {
      outputTextarea.value = 'Please select a JSON file.';
    }
  }

document.getElementById('fileChoose').addEventListener('change', handleFile);



function saveAsJSON() {
  const textAreaContent = document.getElementById('textArea').value;

  try {
    const jsonData = JSON.parse(textAreaContent);

    const jsonDataStr = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonDataStr], { type: 'application/json' });

    const a = document.createElement('a');
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    
    const textArea = document.getElementById('textArea');
    textArea.value = 'Does not contain any JSON Data.';

  }
}
