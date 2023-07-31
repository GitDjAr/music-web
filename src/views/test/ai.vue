<template>
  <div>
    {{ format }}
    <a-button @click="ff">Speak Text</a-button>
    <a-button @click="format = 'wav'">Save WAV</a-button>
    <a-button @click="format = 'mp3'">Save MP3</a-button>
  </div>
</template>

<script setup>
import { ref } from "vue"; // Importing create file method from package
import { createAudioFile } from "simple-tts-mp3";

// Creates an "output.mp3" audio file with default English text
function ff() {
  createAudioFile("Hi, How are you?", "output");
}

const format = ref("mp3");
const text = ref(
  "“嘿嘿……” “嘿嘿嘿嘿……” 一阵极其奇怪的笑声传开。 教室的所有人都看向了后排，一脸的怪异模样。 一名男生正将头趴在桌子上，不断发出奇怪的笑声，更是伴随着身躯的颤动，显得极为兴奋。",
);

function speak() {
  // Speech synthesis init
  const utterance = new SpeechSynthesisUtterance(text.value);
  utterance.lang = "zh-CN";

  utterance.onend = function (event) {
    // Save audio file part
    let audioData = new Uint8Array(this.audioBuffer);
    let blob = new Blob([audioData], { type: "audio/wav" });

    if (format.value === "mp3") {
      // Convert WAV to MP3
      const encoder = new Lame.Encoder({
        channels: 1,
        bitDepth: 16,
        sampleRate: 44100,
        bitRate: 128,
        outSampleRate: 44100,
        mode: Lame.MONO,
      });

      const wavData = new DataView(audioData.buffer);
      const samples = new Int16Array(audioData.buffer.slice(44));

      let mp3Data = [];
      let remaining = samples.length;
      let i = 0;

      while (remaining >= 0) {
        const left = samples.subarray(i, i + 1152);
        const mp3buf = encoder.encodeBuffer(left);
        mp3Data.push(mp3buf);
        remaining -= 1152;
        i += 1152;
      }

      mp3Data.push(encoder.flush());

      blob = new Blob(mp3Data, { type: "audio/mp3" });
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `speech.${format.value}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const audioCtx = new AudioContext();
  utterance.audioBuffer = new ArrayBuffer(0);
  utterance.onaudioprocess = function (event) {
    const channelData = event.inputBuffer.getChannelData(0);
    const buffer = new Int16Array(channelData.length);

    for (let i = 0; i < channelData.length; i++) {
      buffer[i] = channelData[i] * 0x7fff;
    }

    const newBuffer = new Uint8Array(buffer.buffer);
    const audioData = new Uint8Array(
      this.audioBuffer.byteLength + newBuffer.byteLength,
    );
    audioData.set(new Uint8Array(this.audioBuffer), 0);
    audioData.set(newBuffer, this.audioBuffer.byteLength);
    this.audioBuffer = audioData.buffer;
  };

  speechSynthesis.speak(utterance);
}
</script>
