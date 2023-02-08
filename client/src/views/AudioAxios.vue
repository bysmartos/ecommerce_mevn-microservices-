<template>
  <div>
    <audio ref="audioPlayer" controls >
      <source :src="audioBlobUrl" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script lang="ts">
import { example } from "../services/audio.service";
import { defineComponent } from "vue";

export default defineComponent({
  name: "audio-list",
  data() {
    return {
      audioBlobUrl: "",
    };
  },
  methods: {
    async getBlob() {
      try {
        const res = await example();
        console.log({ hola: res.data.urlAudio });
        const audioUrl = 'https://ucb15314064c2a8adf478007f96a.dl.dropboxusercontent.com/cd/0/get/B2Kx6lc_wHLum9VX0v0TelbhIkwMszUXBlGARwnGE9Yfx61sjU4-rE_EkFCnHTHkKc42O-YeXiaHKvWMRFDVarT21mrAXe_Ev0ca5aM5-0ztCtvWuhRd40gBddabdcRYf1G7mmvtlTdXA2DXgoFh3fKU5H5V8h3Ha9bjivMff572rUAtXgaeDMj_o7Eje6AO5rs/file';
        console.log(audioUrl);

        

        const response = await fetch(audioUrl);
    const audioData = await response.arrayBuffer();
    const audioBlob = new Blob([audioData], { type: 'audio/mpeg' });
    this.audioBlobUrl = URL.createObjectURL(audioBlob);
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.getBlob();
  },
  watch: {
    audioBlobUrl(newUrl) {
      if (newUrl) {
        
        (this.$refs.audioPlayer as HTMLAudioElement).load();
        console.log(this.audioBlobUrl)
        const test= (this.$refs.audioPlayer as HTMLAudioElement).play();
        console.log({ 'test':test})
        
      }
    },
  },
});
</script>
