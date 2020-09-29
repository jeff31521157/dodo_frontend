<template>
  <div>
    <h1 class="text-h3 text-sm-h1 text-center text--primary my-sm-6">
      {{ title }}
    </h1>
    <h2 class="text-h5 text-sm-h4 text-center text--secondary my-sm-4">
      {{ subtitle }}
    </h2>
  </div>
</template>
<script>
export default {
  props: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
  },
}
</script>
