<template>
  <v-container>
    <v-dialog
      :value="active"
      :fullscreen="$vuetify.breakpoint.mobile"
      width="500"
      @click:outside="close"
    >
      <v-card>
        <template v-if="Object.keys(content).length">
          <v-toolbar class="text-h5 grey lighten-5">
            <v-toolbar-title>
              <v-row>
                <v-col col="12">
                  <span>
                    {{ content.name }}
                  </span>
                </v-col>
              </v-row>
            </v-toolbar-title>
            <v-btn
              v-if="content.homepage"
              :href="content.homepage"
              icon
              class="ml-2"
            >
              <v-icon>mdi-home</v-icon>
            </v-btn>
            <v-spacer />
            <v-btn icon @click="close">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text class="mt-4">
            <v-row align-content="center">

              <v-col cols="2" align-self="center">
                <div class="d-inline-flex">
                  <v-icon color="light-blue">mdi-tag</v-icon>
                  <span class="ml-2 mr-4">{{ version }}</span>
                </div>
              </v-col>

              <v-col v-if="content.license" cols="3" align-self="center">
                <div class="d-inline-flex">
                  <v-icon color="blue darken-2">mdi-license</v-icon>
                  <span class="ml-2 mr-4">{{ content.license }}</span>
                </div>
              </v-col>

              <v-col cols="5" align-self="center">
                <div class="d-inline-flex">
                  <v-icon color="yellow darken-2">mdi-clock</v-icon>
                  <span class="ml-2">{{ new Date(content.time.created).toDateString() }}</span>
                </div>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text class="mt-4">
            {{ content.description }}
          </v-card-text>

          <v-card-text v-if="content.keywords">
            <v-chip
              v-for="(chip, index) in content.keywords"
              :key="index"
              small
              class="mr-2 mb-2"
              color="teal accent-1"
            >
              {{ chip }}
            </v-chip>
          </v-card-text>

          <v-divider />
          <v-card-text v-if="author" class="my-0 py-3 d-flex">
            <v-chip link :href="author.url">
              <v-icon color="light-green">mdi-account</v-icon>
              {{ author.name }}
            </v-chip>
            <v-spacer />
          </v-card-text>
        </template>
        <v-card-text v-else class="py-4">
          <v-progress-linear
            indeterminate
            color="blue"
            class="m-4"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'InfoDialog',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    content() {
      return this.$store.getters.getPackage;
    },
    author() {
      return this.content.author || null;
    },
    version() {
      const versions = this.content.versions ? Object.values(this.content.versions) : [];
      return versions[versions.length - 1]?.version;
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>
