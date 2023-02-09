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
        const audioUrl = res.data.urlAudio;
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
