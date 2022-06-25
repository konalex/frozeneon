<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table
          disable-sort
          :headers="headers"
          :items="!loading ? results : []"
          :items-per-page="10"
          :loading="loading"
          :page.sync="page"
          hide-default-footer
          @click:row="showDetails"
        >
          <template v-slot:item.version="{ item }">
            <v-icon color="light-blue" class="mr-2">mdi-tag</v-icon>
            <span>{{ item.version }}</span>
          </template>
          <template v-slot:item.date="{ item }">
            <v-icon color="light-green" class="mr-2">mdi-clock-outline</v-icon>
            <span>{{ new Date(item.date).toDateString() }}</span>
          </template>
          <template v-slot:footer>
            <v-divider></v-divider>
            <v-pagination
              v-if="results.length"
              :value="page"
              :length="total"
              :total-visible="5"
              class="pt-5"
              @input="setPage"
            />
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ResultsTable',
  data: () => ({
    headers: [
      {
        text: 'Name',
        alight: 'start',
        value: 'name',
      },
      {
        text: 'Version',
        value: 'version',
      },
      {
        text: 'Created time',
        value: 'date',
      },
    ],
  }),
  methods: {
    showDetails(item) {
      this.$emit('details', item);
    },
    setPage(page) {
      this.$emit('page', page);
    },
  },
  computed: {
    loading() {
      return this.$store.getters.getLoading;
    },
    total() {
      return Math.ceil(this.$store.getters.getTotal / 10);
    },
    results() {
      return this.$store.getters.getSearchResults;
    },
    page() {
      return this.$store.getters.getPage;
    },
  },
};
</script>

<style lang="scss">
.v-data-table {
  .v-data-footer {
    padding-top: 1rem
    &__select {
      display: none
    }
    &__pagination {
      margin-left: auto
    }
  }
}
</style>
