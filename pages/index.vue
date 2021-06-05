<template>
  <v-container fluid>
    <PageHeader
      title="Do Do NFT"
      subtitle="Let's make draw some NFT!"
    />
    <ul>
      <li>
        <nuxt-link to="/">Home</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/owner">owner</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/buyTicket">buyTicket</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/buyToken">buyToken</nuxt-link>
      </li>
    </ul>
    
  </v-container>
</template>
<script>
export default {
  head: {
    title: 'Home',
  },
}
</script>
