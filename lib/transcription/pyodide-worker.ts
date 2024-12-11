import { PyodideInterface } from './types';

let pyodide: PyodideInterface | null = null;

async function initializePyodide() {
  if (!pyodide) {
    // @ts-ignore
    pyodide = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
    });
    
    // Load our transcriber module
    await pyodide.loadPackage(['numpy', 'micropip']);
    await pyodide.runPythonAsync(`
      import micropip
      await micropip.install('whisper')
      await micropip.install('python-docx')
    `);
    
    // Load our custom transcriber module
    await pyodide.runPythonAsync(`
      import transcriber
    `);
  }
  return pyodide;
}

self.onmessage = async (e) => {
  try {
    const { type, payload } = e.data;
    
    if (!pyodide) {
      await initializePyodide();
    }

    switch (type) {
      case 'TRANSCRIBE': {
        const result = await pyodide.runPythonAsync(`
          transcriber.transcribe_audio(${payload.audioData})
        `);
        self.postMessage({ type: 'TRANSCRIBE_RESULT', payload: result.toJs() });
        break;
      }
      
      case 'EXPORT': {
        const { format, transcription } = payload;
        let result;
        
        if (format === 'docx') {
          result = await pyodide.runPythonAsync(`
            transcriber.export_to_docx(${JSON.stringify(transcription)})
          `);
        } else {
          result = await pyodide.runPythonAsync(`
            transcriber.export_to_txt(${JSON.stringify(transcription)})
          `);
        }
        
        self.postMessage({ type: 'EXPORT_RESULT', payload: result.toJs() });
        break;
      }
    }
  } catch (error) {
    self.postMessage({ 
      type: 'ERROR', 
      payload: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};