class AudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.bufferSize = 16384; // Adjust based on needs
    this.buffer = new Float32Array(this.bufferSize);
    this.bufferIndex = 0;
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    if (!input || !input[0]) return true;

    const inputData = input[0];
    
    // Add incoming data to buffer
    for (let i = 0; i < inputData.length; i++) {
      this.buffer[this.bufferIndex++] = inputData[i];
      
      // When buffer is full, send it for processing
      if (this.bufferIndex >= this.bufferSize) {
        this.port.postMessage({
          audioData: this.buffer.slice(0)
        });
        this.bufferIndex = 0;
      }
    }

    return true;
  }
}

registerProcessor('audio-processor', AudioProcessor);