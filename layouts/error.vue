<template>
  <v-overlay>
    <v-alert icon="mdi-alert-decagram" border="left" prominent>
      <div class="title">Oops!</div>
      <div>
        Honey, you are not supposed to see this. Try refresh the page and
        everything should be back to normal.
      </div>
    </v-alert>
  </v-overlay>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>
