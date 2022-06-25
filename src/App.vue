<template>
  <v-app>
    <v-main>
      <SearchInput @search="search" />
      <ResultsTable @details="openDetails" @page="updatePage" />
      <InfoDialog
        v-if="show"
        :active="show"
        :content="details"
        @close="closeDetails"
      />
    </v-main>
  </v-app>
</template>

<script>
import InfoDialog from './components/InfoDialog.vue';
import ResultsTable from './components/ResultsTable.vue';
import SearchInput from './components/SearchInput.vue';

export default {
  name: 'App',
  components: {
    SearchInput,
    ResultsTable,
    InfoDialog,
  },
  data: () => ({
    details: {},
    show: false,
    total: 0,
    results: [],
  }),
  methods: {
    openDetails({ name }) {
      this.show = true;
      this.$store.dispatch('get', name);
    },
    closeDetails() {
      this.$store.dispatch('clearDetails');
      this.show = false;
    },
    search(query) {
      if (query) this.$store.dispatch('search', query);
      else this.$store.dispatch('clear');
    },
    updatePage(page) {
      this.$store.dispatch('setPage', page);
    },
  },
};
</script>
