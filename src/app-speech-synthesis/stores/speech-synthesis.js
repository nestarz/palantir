import axios from 'axios';

const name = 'SpeechSynthesis';

const SPEECH_SYNTHESIS_API_URL = '/api/speech-synthesis';

const store = {
  namespaced: true,
  state: {
    id: null,
    text: null,
    speech: null,
  },
  mutations: {
    updateSpeech: (state, payload) => {
      state.id = payload.id || null;
      state.text = payload.text || null;
      state.speech = payload.speech || null;
    },
  },
  actions: {
    async start({ commit }, task) {
      const text = task.__slackParameters || task.text;
      const queryParams = { text };

      const query = Object
        .keys(queryParams)
        .map(key => `${key}=${queryParams[key]}`)
        .join('&');
      
      const { data } = await axios.get(`${SPEECH_SYNTHESIS_API_URL}?${query}`);

      if (data.error) {
        // eslint-disable-next-line no-console
        console.error(data.error);

        return;
      }

      commit('updateSpeech', {
        id: task.id,
        text,
        speech: data.audioContent,
      });
    },
  },
};

export default { name, store };
