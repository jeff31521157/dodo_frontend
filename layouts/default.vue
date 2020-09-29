<template>
  <v-app>
    <v-app-bar fixed app class="primary" dark>
      <v-avatar size="32" tile class="ma-2">
        <v-img src="/honey-logo.png" />
      </v-avatar>
      <v-toolbar-title>Honey Finance</v-toolbar-title>
      <v-spacer />
      <div v-if="isWeb3Supported">
        <v-chip v-if="connected" outlined color="secondary">
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
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }} Honey Protocol </span>
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
    ...mapState('account', ['address']),
    connected() {
      return this.address != null
    },
    formattedAddress() {
      return formatAddress(this.address)
    },
    isWeb3Supported() {
      return this.$web3.isSupported
    },
  },
  mounted() {
    if (!this.isWeb3Supported) {
      return
    }

    this.$web3.addAccountChangedListener(this.handleAccountChanged)
  },
  unmounted() {
    if (!this.isWeb3Supported) {
      return
    }

    this.$web3.removeAccountChangedListener(this.handleAccountChanged)
  },
  methods: {
    async connectWallet() {
      await this.$web3.connect()
    },
    handleAccountChanged(account) {
      if (!account) {
        this.$store.commit('account/unset')
        return
      }

      this.$store.commit('account/set', account)
    },
  },
}
</script>
