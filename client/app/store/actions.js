import Vue from 'vue';
import Resource from 'vue-resource';

Vue.use(Resource);

export function loadItems({commit}, filter) {
  commit('SET_LOADING', true);
  Vue.http.get(`${config.api}/items/${filter}`).then(value => {
    const {data, next_page_url} = value.data;

    commit('SET_ITEMS', data);
    commit('SET_PAGINATOR', next_page_url);

    setTimeout(() => {
      commit('SET_LOADING', false);
    }, 500);
  }, error => {
    if(error.status == 404) {
      window.location.href = config.url;
    }
  });
}

export function loadMoreItems({commit}, next_page_url) {
  commit('SET_CLICKED_LOADING', true);
  Vue.http.get(next_page_url).then(value => {
    const {data, next_page_url} = value.data;

    commit('SET_PAGINATOR', next_page_url);

    setTimeout(() => {
      commit('PUSH_TO_ITEMS', data);
      commit('SET_CLICKED_LOADING', false);
    }, 500);
  });
}

export function setSearchTitle({commit}, title) {
  commit('SET_SEARCH_TITLE', title);
}

export function setColorScheme({commit}, color) {
  localStorage.setItem('color', color);
  commit('SET_COLOR_SCHEME', color);
}