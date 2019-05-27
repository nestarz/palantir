<template>
  <section class="app-speech-synthesis">
    <div class="speech" v-show="!paused">
      <div class="text">{{ text }}</div>
      <audio autoplay v-if="speech" :src="speech" ref="speech" @playing="updatePaused" @pause="updatePaused">
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import store from '@/services/store';

export default {
  name: 'app-speech-synthesis',
  store,
  data() {
    return {
      paused: true,
    }
  },
  computed: {
    ...mapState('SpeechSynthesis', ['id', 'text']),
    ...mapState('SpeechSynthesis', {
      speech: state => {
        return state.speech && `data:audio/mpeg;base64,${btoa(
          String.fromCharCode(...new Uint8Array(state.speech.data)))}`;
      },
    })
  },
  methods: {
    updatePaused(event) {
      this.paused = event.target.paused;
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/ui/assets/variables.scss';
.app-speech-synthesis {
  .speech {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10000;
    background: rgba($colorBg, 0.9);

    .text {
      font-size: 45px;
      font-weight: 500;
    }
  }
}
</style>
