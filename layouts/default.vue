<template>
  <v-app>
    <v-app-bar fixed app class="primary" dark>
      <v-avatar size="32" tile class="ma-2">
        <v-img src="/honey-logo.png" />
      </v-avatar>
      <v-toolbar-title>Honey Finance</v-toolbar-title>
      <v-spacer />
      <v-chip v-if="account" outlined color="secondary">
        <v-icon left>mdi-wallet</v-icon>
        {{ formattedAddress }}
      </v-chip>
      <v-btn
        v-else
        class="ma-2"
        outlined
        rounded
        color="secondary"
        @click="connectWallet"
      >
        <v-icon left>mdi-wallet</v-icon> Connect Wallet
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import { formatAddress } from '@/utils/address'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('account', { account: (state) => state.address }),
    formattedAddress() {
      return formatAddress(this.account)
    },
  },
  methods: {
    async connectWallet() {
      const accounts = await this.$web3.eth.requestAccounts()
      if (!accounts || accounts.length === 0) {
        this.$store.commit('account/unset')
        return
      }

      this.$store.commit('account/set', accounts[0])
    },
  },
}
</script>
