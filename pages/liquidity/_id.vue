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
        <v-col v-if="currentBlock < startBlock" cols="12">
          <v-alert
            color="secondary darken-3"
            icon="mdi-timer-sand-empty"
            outlined
            border="top"
            prominent
          >
            <div class="title">Starting soon</div>
            <div>
              HONEY farming will begin at block height {{ startBlock }},
              approximately <strong>{{ timeUntilStart }}</strong> later.
            </div>
            <v-divider class="my-3 secondary darken-3" />
            <div>
              You may deposit now and start earning HONEY as soon as the farming
              begins.
            </div>
          </v-alert>
        </v-col>
        <v-col
          v-if="currentBlock >= startBlock && currentBlock < endBlock"
          cols="12"
        >
          <v-alert
            color="primary"
            icon="mdi-thumb-up-outline"
            outlined
            border="top"
            prominent
          >
            <div class="title">Join now</div>
            <div>
              Stake {{ liquidityTokenInfo.name }} tokens to earn your yummy
              HONEY!
            </div>
            <v-divider class="my-3 primary" />
            <div>
              Current HONEY farming stage will end at block height
              {{ endBlock }}, approximately
              <strong>{{ timeUntilEnd }}</strong> later.
            </div>
          </v-alert>
        </v-col>
        <v-col v-if="currentBlock > endBlock" cols="12">
          <v-alert
            color="deep-orange"
            icon="mdi-timer-outline"
            outlined
            border="top"
            prominent
          >
            <div class="title">Stage ended</div>
            <div>
              Current HONEY farming stage has ended at block height
              {{ endBlock }}.
            </div>
            <v-divider class="my-3 deep-orange" />
            <div>
              You can withdraw your staked {{ liquidityTokenInfo.name }} tokens
              along with your yummy HONEY harvest anytime!
            </div>
          </v-alert>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card>
            <v-toolbar color="secondary" dense flat>
              <v-avatar size="32" tile class="mr-4">
                <v-img src="/honey-logo.png" />
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
                :disabled="currentBlock >= endBlock"
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
        <v-col cols="12">
          <v-alert
            icon="mdi-lightbulb"
            color="secondary lighten-4"
            class="my-6"
          >
            Every time you deposit and withdraw
            {{ liquidityTokenInfo.name }} tokens, the contract will
            automatically collect HONEY rewards for you!
          </v-alert>
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
import SupportedLiquidityTokens from '@/lib/constants/SupportedLiquidityTokens'
import { mapState } from 'vuex'
import ERC20ContractWrapper from '@/lib/ERC20ContractWrapper'
import HoneycombContractWrapper from '@/lib/HoneycombContractWrapper'
import Addresses from '@/lib/constants/Addresses'
import Logger from '@/lib/Logger'
import AmountFormat from '@/lib/AmountFormat'
import ChainInfo from '@/lib/constants/ChainInfo'

export default {
  data: () => ({
    lpTokenWrapper: null,
    honeycombWrapper: null,
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
    startBlock: null,
    endBlock: null,
    honeyPerBlock: null,
  }),
  computed: {
    ...mapState('account', { account: (state) => state.address }),
    urlParam() {
      return this.$route.params.id
    },
    formattedEarnedHoney() {
      return AmountFormat.toDisplay(this.earnedHoney)
    },
    formattedPendingHoney() {
      return AmountFormat.toDisplay(this.pendingHoney)
    },
    formattedStakedBalance() {
      return AmountFormat.toDisplay(this.stakedBalance)
    },
    formattedTokenBalance() {
      return AmountFormat.toDisplay(this.tokenBalance)
    },
    formattedDialogMaxValue() {
      return AmountFormat.toDisplay(this.dialogMaxValue)
    },
    currentBlock() {
      return this.$web3.currentBlockHeight
    },
    timeUntilStart() {
      const diff =
        (this.startBlock - this.currentBlock) * ChainInfo.SecondsPerBlock
      return this.timeDiffToString(diff)
    },
    timeUntilEnd() {
      const diff =
        (this.endBlock - this.currentBlock) * ChainInfo.SecondsPerBlock
      return this.timeDiffToString(diff)
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
    this.liquidityTokenInfo = SupportedLiquidityTokens[this.urlParam]
    if (this.liquidityTokenInfo === undefined) {
      this.isInvalidParam = true
      return
    }
    this.lpTokenWrapper = new ERC20ContractWrapper(
      this.$web3,
      this.liquidityTokenInfo.tokenAddress
    )
    this.honeycombWrapper = new HoneycombContractWrapper(this.$web3)
    await this.syncAllowance()
  },
  async mounted() {
    this.$web3.addBlockProducedListener(this.syncAll)
    this.startBlock = await this.honeycombWrapper.getStartBlock()
    this.endBlock = await this.honeycombWrapper.getEndBlock()
    this.honeyPerBlock = await this.honeycombWrapper.getHoneyPerBlock()
  },
  unmounted() {
    this.$web3.removeBlockProducedListener(this.syncAll)
  },
  methods: {
    async syncAllowance() {
      if (!this.account || !this.liquidityTokenInfo) {
        this.approved = false
        return
      }

      const allowance = await this.lpTokenWrapper.getAllowance(
        Addresses.honeycomb
      )
      this.approved = allowance > 0
    },
    async syncTokenBalance() {
      if (!this.account || !this.liquidityTokenInfo) {
        return
      }

      const amount = await this.lpTokenWrapper.getBalance()
      this.tokenBalance = amount
    },
    async syncStakedAmount() {
      if (!this.account || !this.liquidityTokenInfo) {
        return
      }

      const amount = await this.honeycombWrapper.getStakedAmount(
        this.liquidityTokenInfo.pid
      )
      this.stakedBalance = amount
    },
    async syncEarnedHoney() {
      if (!this.account || !this.liquidityTokenInfo) {
        return
      }

      const amount = await this.honeycombWrapper.getEarnedHoney(
        this.liquidityTokenInfo.pid
      )
      this.earnedHoney = amount
    },
    async syncPendingHoney() {
      if (!this.account || !this.liquidityTokenInfo) {
        return
      }

      const amount = await this.honeycombWrapper.getPendingHoney(
        this.liquidityTokenInfo.pid
      )
      this.pendingHoney = amount
    },
    async syncAll() {
      await this.syncEarnedHoney()
      await this.syncPendingHoney()
      await this.syncStakedAmount()
      await this.syncTokenBalance()
    },
    async getApproval() {
      if (!this.account || !this.liquidityTokenInfo) {
        this.tokenBalance = 0
        return
      }

      const tx = await this.lpTokenWrapper.approve(Addresses.honeycomb)
      Logger.log(tx)
      this.syncAllowance()
    },
    showDepositDialog() {
      this.dialogTitle = 'Deposit'
      this.dialogAction = 'Deposit'
      this.dialogMaxValue = this.tokenBalance
      this.onDialogAction = async () => {
        this.dialogProcessing = true
        const tx = await this.honeycombWrapper.deposit(
          this.liquidityTokenInfo.pid,
          this.dialogValue
        )
        Logger.log(tx)
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
        const tx = await this.honeycombWrapper.withdraw(
          this.liquidityTokenInfo.pid,
          this.dialogValue
        )
        Logger.log(tx)
        this.syncAll()
        this.dialogProcessing = false
        this.dialog = false
      }
      this.setDialogValue(1)
      this.dialog = true
    },
    setDialogValue(multiplier) {
      this.dialogValue = new BigNumber(multiplier).times(this.dialogMaxValue)
    },
    async collectHoney() {
      const tx = await this.honeycombWrapper.withdraw(
        this.liquidityTokenInfo.pid,
        0
      )
      Logger.log(tx)
      this.syncAll()
    },
    timeDiffToString(diff) {
      const minutes = Math.floor(diff / 60) % 60
      const hours = Math.floor(diff / 3600) % 24
      const days = Math.floor(diff / 86400)
      let result = ''
      if (minutes === 1) {
        result = '1 minute'
      } else if (minutes > 1) {
        result = `${minutes} minutes`
      }

      const minuteString = result.length > 0 ? ` and ${result}` : ''
      if (hours === 1) {
        result = `1 hour ${minuteString}`
      } else if (hours > 1) {
        result = `${hours} hours ${minuteString}`
      }

      const hourString =
        result.length === 0
          ? ''
          : result.includes('and')
          ? `, ${result}`
          : ` and ${result}`
      if (days === 1) {
        result = `1 day ${hourString}`
      } else if (days > 1) {
        result = `${days} days ${hourString}`
      }

      if (result.length === 0) {
        result = 'a few seconds'
      }

      return result
    },
  },
}
</script>
