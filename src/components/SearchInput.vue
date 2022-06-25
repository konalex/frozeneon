<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="query"
            append-icon="mdi-magnify"
            color="blue"
            label="search package"
            @change="search"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'SearchInput',
  data: () => ({
    query: '',
  }),
  methods: {
    search() {
      this.$emit('search', this.query);
    },
  },
};
</script>
