<template>
  <v-app>
    <v-app-bar fixed app class="primary" dark>
      <v-avatar size="32" tile class="ma-2">
        <v-img src="/honey-logo.png" />
      </v-avatar>
      <v-toolbar-title><strong>Honey Finance</strong></v-toolbar-title>
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
      <v-banner color="warning" single-line>
        This project is in beta. Use at your own risk.
      </v-banner>
      <v-container>
        <nuxt v-if="isWeb3Supported" />
        <v-overlay v-else>
          <v-alert icon="mdi-close" border="left" prominent>
            <div class="title">Not supported</div>
            <div>
              This website runs on Ethereum blockchain. Please install
              <a href="https://metamask.io/">MetaMask Chrome extention</a> to
              continue.
            </div>
          </v-alert>
        </v-overlay>
      </v-container>
    </v-main>
    <v-footer color="primary lighten-1" padless>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link.name"
          color="white"
          text
          rounded
          class="my-2"
          :nuxt="link.to !== undefined"
          :to="link.to"
          :href="link.href"
          :target="link.href ? '_blank' : ''"
        >
          {{ link.name }}
        </v-btn>
        <v-col class="primary lighten-2 py-3 text-center white--text" cols="12">
          &copy; {{ new Date().getFullYear() }} <strong>Honey Finance</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import { formatAddress } from '@/utils/address'
export default {
  data: () => ({
    links: [
      { name: 'Home', to: '/' },
      { name: 'Twitter', href: 'https://twitter.com/myHoneyFinance' },
      { name: 'Discord', href: 'https://discord.gg/ABSTBw3' },
      { name: 'Medium', href: 'https://medium.com/@myHoneyFinance' },
      { name: 'News', href: 'https://myhoney.finance/blog/' },
      { name: 'GitHub', href: 'https://github.com/HoneyFinance' },
      {
        name: 'Etherscan',
        href:
          'https://etherscan.io/token/0x37C9EB4CeF7571f27136145C82c37a01F2a8Aa16',
      },
    ],
  }),
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
