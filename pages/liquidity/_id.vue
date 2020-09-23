<template>
  <v-container fluid>
    <v-alert
      v-if="isInvalidParam"
      color="error"
      dark
      icon="mdi-alert-circle"
      border="left"
    >
      Invalid URL
    </v-alert>

    <v-alert
      v-else-if="!account"
      color="info"
      dark
      icon="mdi-wallet"
      border="left"
    >
      Please connect your wallet to begin
    </v-alert>

    <div v-else-if="account">
      <h1>Liquidity Token Bank: {{ $route.params.id }}</h1>
      <v-row>
        <v-col cols="12" sm="6">
          <v-card>
            <v-toolbar color="secondary" dense flat>
              <v-avatar size="32" tile class="mr-4">
                <v-img :src="require('@/assets/images/honey-logo.png')" />
              </v-avatar>
              <v-toolbar-title class="primary--text">My HONEY</v-toolbar-title>
            </v-toolbar>
            <v-card-subtitle class="pb-0"> Earned HONEY </v-card-subtitle>
            <v-card-title class="text-h3">168.888</v-card-title>
            <v-divider />
            <v-card-subtitle class="pb-0"> Earned HONEY </v-card-subtitle>
            <v-card-title class="text-h3">168.888</v-card-title>
            <v-divider />
            <v-card-actions>
              <v-spacer />
              <v-btn text color="primary" large>Collect</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card>
            <v-toolbar :color="liquidityTokenInfo.color" dense flat dark>
              <v-avatar size="32" tile class="mr-4">
                <v-img :src="require('@/assets/images/cos-icon.png')" />
              </v-avatar>
              <v-toolbar-title> My COS-ETH UNI-V2 LP Tokens </v-toolbar-title>
            </v-toolbar>
            <v-card-subtitle class="pb-0"> Staked </v-card-subtitle>
            <v-card-title class="text-h3">168.888</v-card-title>
            <v-divider />
            <v-card-subtitle class="pb-0"> Account balance </v-card-subtitle>
            <v-card-title class="text-h3">
              {{ approved ? tokenBalance : 'N/A' }}
            </v-card-title>
            <v-divider />
            <v-card-actions>
              <v-spacer />
              <v-btn
                v-if="!approved"
                text
                color="primary"
                large
                @click="getApproval"
              >
                Approve
              </v-btn>
              <v-btn
                v-if="approved"
                text
                color="primary"
                large
                @click="collectHoney"
              >
                Deposit
              </v-btn>
              <v-btn
                v-if="approved"
                text
                color="primary"
                large
                @click="collectHoney"
              >
                Withdraw
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
import { supportedLiquidityTokens } from '@/assets/constants/liquidity'
import { contractAddress } from '@/assets/constants/honeycomb'
import { mapState } from 'vuex'
import { getAllowance, getBalance, approve } from '@/utils/erc20'
import { formatBalance } from '@/utils/balance'

export default {
  data: () => ({
    isInvalidParam: false,
    liquidityTokenInfo: null,
    approved: false,
    tokenBalance: 0,
  }),
  computed: {
    ...mapState('account', { account: (state) => state.address }),
  },
  watch: {
    account(newVal) {
      this.syncAllowance()
    },
    approved(newVal) {
      this.syncTokenBalance()
    },
  },
  async mounted() {
    this.liquidityTokenInfo = supportedLiquidityTokens[this.$route.params.id]
    if (this.liquidityTokenInfo === undefined) {
      this.isInvalidParam = true
      return
    }

    await this.syncAllowance()
  },
  methods: {
    async syncAllowance() {
      if (!this.account || !this.liquidityTokenInfo) {
        this.approved = false
        return
      }

      const params = {
        web3: this.$web3,
        userAddress: this.account,
        tokenAddress: this.liquidityTokenInfo.tokenAddress,
        contractAddress,
      }
      const allowance = await getAllowance(params)
      this.approved = allowance > 0
    },
    async syncTokenBalance() {
      if (!this.account || !this.liquidityTokenInfo) {
        this.tokenBalance = 0
        return
      }

      const params = {
        web3: this.$web3,
        userAddress: this.account,
        tokenAddress: this.liquidityTokenInfo.tokenAddress,
      }
      const balance = await getBalance(params)
      this.tokenBalance = formatBalance(balance)
    },
    async getApproval() {
      if (!this.account || !this.liquidityTokenInfo) {
        this.tokenBalance = 0
        return
      }

      const params = {
        web3: this.$web3,
        userAddress: this.account,
        tokenAddress: this.liquidityTokenInfo.tokenAddress,
        contractAddress,
      }
      const tx = await approve(params)
      console.log(tx)
      this.syncAllowance()
    },
    async collectHoney() {
      const params = {
        web3: this.$web3,
        userAddress: this.$store.state.account.address,
        tokenAddress: '0xE6f8f44cAD76a29B6f26c817706526281F6b3356',
        contractAddress: '0x97d37d2ceA1647C70aD23311b49B77ACfdBdFd21',
      }
      console.log(params)
      const allowance = await getAllowance(params)
      console.log(allowance)
      const balance = await getBalance(params)
      console.log(balance.toString())
    },
  },
}
</script>
