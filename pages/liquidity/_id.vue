<template>
  <v-container fluid>
    <v-alert
      v-if="isInvalidParam"
      color="error"
      dark
      icon="mdi-alert-circle"
      border="left"
      class="ma-10"
      outlined
    >
      Invalid URL
    </v-alert>

    <v-alert
      v-else-if="!account"
      color="info"
      dark
      icon="mdi-wallet"
      border="left"
      class="ma-10"
      outlined
    >
      Please connect your wallet to begin
    </v-alert>

    <div v-else-if="account">
      <h1>Liquidity Token Bank: {{ liquidityTokenInfo.name }}</h1>
      <v-row>
        <v-col cols="12" sm="6">
          <v-card>
            <v-toolbar color="secondary" dense flat>
              <v-avatar size="32" tile class="mr-4">
                <v-img :src="require('@/assets/images/honey-logo.png')" />
              </v-avatar>
              <v-toolbar-title class="primary--text">My HONEY</v-toolbar-title>
            </v-toolbar>
            <v-card-subtitle class="pb-0">Earned HONEY</v-card-subtitle>
            <v-card-title class="text-h3">
              {{ formattedEarnedHoney }}
            </v-card-title>
            <v-divider />
            <v-card-subtitle class="pb-0">
              HONEY to be collected
            </v-card-subtitle>
            <v-card-title class="text-h3">
              {{ formattedPendingHoney }}
            </v-card-title>
            <v-divider />
            <v-card-actions>
              <v-spacer />
              <v-btn text color="primary" large @click="collectHoney">
                Collect
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card>
            <v-toolbar :color="liquidityTokenInfo.color" dense flat dark>
              <v-avatar size="32" tile class="mr-4">
                <v-img :src="`/token-icons/${liquidityTokenInfo.icon}`" />
              </v-avatar>
              <v-toolbar-title>
                My {{ liquidityTokenInfo.name }}
              </v-toolbar-title>
            </v-toolbar>
            <v-card-subtitle class="pb-0">Staked</v-card-subtitle>
            <v-card-title class="text-h3">
              {{ formattedStakedBalance }}
            </v-card-title>
            <v-divider />
            <v-card-subtitle class="pb-0">Account balance</v-card-subtitle>
            <v-card-title class="text-h3">
              {{ approved ? formattedTokenBalance : 'N/A' }}
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
                @click="showDepositDialog"
              >
                Deposit
              </v-btn>
              <v-btn
                v-if="approved"
                text
                color="primary"
                large
                @click="showWithdrawDialog"
              >
                Withdraw
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" persistent max-width="480px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ dialogTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="dialogValue"
              type="number"
              label="Amount"
              :suffix="liquidityTokenInfo.name"
              :hint="`Available: ${formattedDialogMaxValue}`"
              persistent-hint
              required
            />
            <v-row class="py-0">
              <v-col class="text-center">
                <v-btn
                  text
                  color="secondary darken-2"
                  @click="setDialogValue(0.25)"
                  >25%</v-btn
                >
              </v-col>
              <v-col class="text-center">
                <v-btn
                  text
                  color="secondary darken-2"
                  @click="setDialogValue(0.5)"
                  >50%</v-btn
                >
              </v-col>
              <v-col class="text-center">
                <v-btn
                  text
                  color="secondary darken-2"
                  @click="setDialogValue(0.75)"
                  >75%</v-btn
                >
              </v-col>
              <v-col class="text-center">
                <v-btn
                  text
                  color="secondary darken-2"
                  @click="setDialogValue(1)"
                  >100%</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">Close</v-btn>
            <v-btn
              color="primary"
              :loading="dialogProcessing"
              @click="onDialogAction"
            >
              {{ dialogAction }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>
<script>
import BigNumber from 'bignumber.js'
import { supportedLiquidityTokens } from '@/assets/constants/liquidity'
import { contractAddress } from '@/assets/constants/honeycomb'
import { mapState } from 'vuex'
import { getAllowance, getBalance, approve } from '@/utils/erc20'
import {
  deposit,
  withdraw,
  getStakedBalance,
  getEarnedHoney,
  getPendingHoney,
} from '@/utils/honeycomb'
import { formatBalance } from '@/utils/balance'

export default {
  data: () => ({
    isInvalidParam: false,
    liquidityTokenInfo: null,
    approved: false,
    earnedHoney: 0,
    pendingHoney: 0,
    stakedBalance: 0,
    tokenBalance: 0,
    dialog: false,
    dialogTitle: null,
    dialogAction: null,
    dialogMaxValue: 0,
    onDialogAction: null,
    dialogValue: null,
    dialogProcessing: false,
  }),
  computed: {
    ...mapState('account', { account: (state) => state.address }),
    urlParam() {
      return this.$route.params.id
    },
    formattedEarnedHoney() {
      return formatBalance(this.earnedHoney)
    },
    formattedPendingHoney() {
      return formatBalance(this.pendingHoney)
    },
    formattedStakedBalance() {
      return formatBalance(this.stakedBalance)
    },
    formattedTokenBalance() {
      return formatBalance(this.tokenBalance)
    },
    formattedDialogMaxValue() {
      return formatBalance(this.dialogMaxValue)
    },
  },
  watch: {
    account(newVal) {
      this.syncAllowance()
    },
    approved(newVal) {
      this.syncAll()
    },
  },
  async created() {
    this.liquidityTokenInfo = supportedLiquidityTokens[this.urlParam]
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
        return
      }

      const params = {
        web3: this.$web3,
        userAddress: this.account,
        tokenAddress: this.liquidityTokenInfo.tokenAddress,
      }
      const amount = await getBalance(params)
      this.tokenBalance = amount
    },
    async syncStakedAmount() {
      if (!this.account || !this.liquidityTokenInfo) {
        return
      }

      const params = {
        web3: this.$web3,
        userAddress: this.account,
        pid: this.liquidityTokenInfo.pid,
      }
      const amount = await getStakedBalance(params)
      this.stakedBalance = amount
    },
    async syncEarnedHoney() {
      if (!this.account || !this.liquidityTokenInfo) {
        return
      }

      const params = {
        web3: this.$web3,
        userAddress: this.account,
        pid: this.liquidityTokenInfo.pid,
      }
      const amount = await getEarnedHoney(params)
      this.earnedHoney = amount
    },
    async syncPendingHoney() {
      if (!this.account || !this.liquidityTokenInfo) {
        return
      }

      const params = {
        web3: this.$web3,
        userAddress: this.account,
        pid: this.liquidityTokenInfo.pid,
      }
      const amount = await getPendingHoney(params)
      this.pendingHoney = amount
    },
    syncAll() {
      this.syncEarnedHoney()
      this.syncPendingHoney()
      this.syncStakedAmount()
      this.syncTokenBalance()
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
    showDepositDialog() {
      this.dialogTitle = 'Deposit'
      this.dialogAction = 'Deposit'
      this.dialogMaxValue = this.tokenBalance
      this.onDialogAction = async () => {
        this.dialogProcessing = true
        const params = {
          web3: this.$web3,
          pid: this.liquidityTokenInfo.pid,
          amount: this.dialogValue,
          userAddress: this.account,
        }
        const tx = await deposit(params)
        console.log(tx)
        this.syncAll()
        this.dialogProcessing = false
        this.dialog = false
      }
      this.setDialogValue(1)
      this.dialog = true
    },
    showWithdrawDialog() {
      this.dialogTitle = 'Withdraw'
      this.dialogAction = 'Withdraw'
      this.dialogMaxValue = this.stakedBalance
      this.onDialogAction = async () => {
        this.dialogProcessing = true
        const params = {
          web3: this.$web3,
          pid: this.liquidityTokenInfo.pid,
          amount: this.dialogValue,
          userAddress: this.account,
        }
        const tx = await withdraw(params)
        console.log(tx)
        this.syncAll()
        this.dialogProcessing = false
        this.dialog = false
      }
      this.setDialogValue(1)
      this.dialog = true
    },
    setDialogValue(multiplier) {
      this.dialogValue = new BigNumber(multiplier)
        .multipliedBy(this.dialogMaxValue)
        .dividedBy(new BigNumber(10).pow(18))
        .toFixed()
    },
    async collectHoney() {
      const params = {
        web3: this.$web3,
        pid: this.liquidityTokenInfo.pid,
        amount: 0,
        userAddress: this.account,
      }
      const tx = await withdraw(params)
      console.log(tx)
      this.syncAll()
    },
  },
}
</script>
