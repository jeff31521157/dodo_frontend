<template>
  <v-container fluid>
    <v-overlay v-if="!account" absolute>
      <v-alert color="info" icon="mdi-wallet" border="left" prominent>
        <div class="title">Account required</div>
        <div>Please connect your wallet to begin</div>
      </v-alert>
    </v-overlay>
    <div v-else-if="jar">
      <PageHeader
        title="Honey Jar"
        :subtitle="`Vault for ${jar.tokenName} (${jar.tokenSymbol})`"
      />
      <div class="text-center">
        <v-chip outlined class="mx-1" color="primary">
          Strategy:&nbsp;
          <strong>{{ jar.strategyName }}</strong>
        </v-chip>
        <v-chip outlined class="mx-1" color="primary">
          Strategy APY:&nbsp;
          <strong>{{ jar.strategyAPY.toFixed(2).toLocaleString() }}%</strong>
        </v-chip>
        <v-chip class="mx-1" color="pink" dark>
          Honeycomb APY:&nbsp;
          <strong>{{
            jar.honeycombAPY > 10000
              ? '10000%+'
              : jar.honeycombAPY.toFixed(2).toLocaleString()
          }}</strong>
        </v-chip>
      </div>

      <v-row class="mt-6">
        <v-col cols="12" sm="6" md="6">
          <v-card>
            <v-toolbar :color="jar.themeColor" dense flat dark>
              <v-avatar size="32" class="mr-4">
                <v-img :src="`/token-icons/${jar.icon}`" />
              </v-avatar>
              <v-toolbar-title>My Assets</v-toolbar-title>
            </v-toolbar>
            <v-card-title> {{ jar.tokenSymbol }} balance </v-card-title>
            <v-card-subtitle>
              Deposit to farm more {{ jar.tokenSymbol }}
            </v-card-subtitle>
            <v-card-title class="text-h3 pt-0">
              {{ formattedTokenBalance }}
            </v-card-title>
            <v-divider />
            <v-card-actions>
              <v-spacer />
              <v-btn
                v-if="!jar.userApproved"
                text
                color="primary"
                large
                @click="getApproval"
              >
                Approve
              </v-btn>
              <v-btn
                v-if="jar.userApproved"
                color="primary"
                large
                @click="showDepositDialog"
              >
                Deposit
              </v-btn>
              <v-btn
                v-if="jar.userApproved"
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

        <v-col cols="12" sm="6" md="6">
          <v-card>
            <v-toolbar color="primary" dense flat dark>
              <v-avatar size="32" class="mr-4">
                <v-img src="/honey-logo.png" />
              </v-avatar>
              <v-toolbar-title>My Investment</v-toolbar-title>
            </v-toolbar>
            <v-card-title> {{ jar.hTokenSymbol }} balance </v-card-title>
            <v-card-subtitle>
              Enjoy the automated yield farming which makes the
              {{ jar.hTokenSymbol }} worthy of more {{ jar.tokenSymbol }}
            </v-card-subtitle>
            <v-card-title class="text-h3 pt-0">
              {{ formattedHTokenBalance }}
            </v-card-title>
            <v-card-subtitle>
              Est. value: {{ formattedHTokenBalanceEstValue }}
              {{ jar.tokenSymbol }}
            </v-card-subtitle>
            <v-divider />
            <v-card-title>
              Staked {{ jar.hTokenSymbol }} in Honeycomb
              <small class="text--secondary">
                (Stage {{ jar.latestHoneycombStage }})
              </small>
            </v-card-title>
            <v-card-subtitle>
              Stake {{ jar.hTokenSymbol }} to farm HONEY in Honeycomb. You may
              unstake and withdraw at any time.
            </v-card-subtitle>
            <v-card-title class="text-h3 pt-0">
              {{ formattedStakedHTokenBalance }}
            </v-card-title>
            <v-card-subtitle>
              Est. value: {{ formattedStakedHTokenBalanceEstValue }}
              {{ jar.tokenSymbol }}
            </v-card-subtitle>
            <v-divider />
            <v-card-actions>
              <v-spacer />
              <v-btn
                text
                color="primary"
                large
                nuxt
                :to="`/honeycomb/${jar.latestHoneycombStage}-${jar.hTokenSymbol}`"
              >
                Go to Honeycomb
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col v-if="!jar.userApproved" cols="12">
          <v-alert icon="mdi-flash" color="secondary lighten-4" class="mt-6">
            Please approve the Honey Jar contract to access your tokens
          </v-alert>
        </v-col>

        <v-col v-else cols="12">
          <v-alert
            icon="mdi-lightbulb"
            color="secondary lighten-4"
            class="mt-6"
          >
            The amount of <strong>{{ jar.hTokenSymbol }}</strong> denotes the
            portion you own within the overall deposited funds. When revenue is
            generated, the <strong>{{ jar.hTokenSymbol }}</strong> token holders
            will share the great harvest.
          </v-alert>
        </v-col>

        <v-col cols="12" class="my-0 py-0">
          <v-alert color="primary" outlined border="left">
            You may need to input <strong>{{ jar.hTokenSymbol }}</strong> token
            contract address
            <strong>
              <a
                :href="`https://etherscan.io/token/${jar.hTokenAddress}`"
                target="_blank"
              >
                {{ jar.hTokenAddress }}
              </a>
            </strong>
            to reveal the asset in your wallet
          </v-alert>
        </v-col>

        <v-col cols="12">
          <v-alert color="pink" outlined border="left" prominent>
            <div class="title">Honeycomb for {{ jar.hTokenSymbol }}</div>
            <div>
              <v-btn
                v-for="i in jar.honeycombStages"
                :key="i"
                text
                color="primary"
                nuxt
                :to="`/honeycomb/${i}-${jar.hTokenSymbol}`"
              >
                Stage {{ i }}
              </v-btn>
            </div>
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
              :suffix="dialogTokenSymbol"
              :hint="`Available: ${formattedDialogMaxValue} ${dialogHintExtra}`"
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
            <v-btn
              color="primary"
              text
              :disabled="dialogProcessing"
              @click="dialog = false"
              >Close</v-btn
            >
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
      <v-snackbar v-model="waiting" timeout="-1">
        <v-progress-circular indeterminate size="20" class="mr-2" />
        Waiting for the transaction to be confirmed...
      </v-snackbar>
    </div>
  </v-container>
</template>
<script>
import BigNumber from 'bignumber.js'
import HoneyJarFactory from '@/lib/honeyjar/HoneyJarFactory'
import { mapState } from 'vuex'
import AmountFormat from '@/lib/AmountFormat'

export default {
  data: () => ({
    jar: {},
    dialog: false,
    dialogTitle: null,
    dialogAction: null,
    dialogMaxValue: 0,
    dialogTokenSymbol: null,
    dialogHintExtra: '',
    onDialogAction: null,
    dialogValue: null,
    dialogProcessing: false,
    waiting: false,
  }),
  middleware({ route, redirect }) {
    if (!HoneyJarFactory.isPathValid(route.params.id)) {
      return redirect('/honeyjar/')
    }
  },
  computed: {
    ...mapState('account', { account: (state) => state.address }),
    formattedTokenBalance() {
      return AmountFormat.toDisplay(this.jar.tokenBalance)
    },
    formattedHTokenBalance() {
      return AmountFormat.toDisplay(this.jar.hTokenBalance)
    },
    formattedStakedHTokenBalance() {
      return AmountFormat.toDisplay(this.jar.stakedHTokenBalance)
    },
    formattedHTokenBalanceEstValue() {
      return AmountFormat.toDisplay(
        this.jar.hTokenBalance * this.jar.hTokenRate
      )
    },
    formattedStakedHTokenBalanceEstValue() {
      return AmountFormat.toDisplay(
        this.jar.stakedHTokenBalance * this.jar.hTokenRate
      )
    },
    formattedDialogMaxValue() {
      return AmountFormat.toDisplay(this.dialogMaxValue)
    },
    currentBlock() {
      return this.$web3.currentBlockHeight
    },
  },
  watch: {
    async account(newVal) {
      if (this.jar) {
        await this.jar.syncAll()
      }
    },
  },
  async created() {
    this.jar = HoneyJarFactory.create(
      this.$route.params.id,
      this.$web3,
      this.$axios
    )
    await this.jar.syncAll()
    await this.jar.calculateAPY()
  },
  mounted() {
    this.$web3.addBlockProducedListener(this.syncData)
  },
  unmounted() {
    this.$web3.removeBlockProducedListener(this.syncData)
  },
  methods: {
    async syncData() {
      if (this.jar) {
        await this.jar.syncAll()
      }
    },
    async getApproval() {
      this.waiting = true
      await this.jar.getApproval()
      this.waiting = false
    },
    showDepositDialog() {
      this.dialogTitle = 'Deposit'
      this.dialogAction = 'Deposit'
      this.dialogTokenSymbol = this.jar.tokenSymbol
      this.dialogMaxValue = this.jar.tokenBalance
      this.onDialogAction = async () => {
        this.dialogProcessing = true
        this.waiting = true
        await this.jar.deposit(this.dialogValue)
        this.dialogProcessing = false
        this.waiting = false
        this.dialog = false
      }
      this.setDialogValue(1)
      this.dialog = true
    },
    showWithdrawDialog() {
      this.dialogTitle = 'Withdraw'
      this.dialogAction = 'Withdraw'
      this.dialogTokenSymbol = this.jar.hTokenSymbol
      this.dialogMaxValue = this.jar.hTokenBalance
      this.dialogHintExtra = `(Est. value: ${this.formattedHTokenBalanceEstValue} ${this.jar.tokenSymbol})`
      this.onDialogAction = async () => {
        this.dialogProcessing = true
        this.waiting = true
        await this.jar.withdraw(this.dialogValue)
        this.dialogProcessing = false
        this.waiting = false
        this.dialog = false
      }
      this.setDialogValue(1)
      this.dialog = true
    },
    showStakeDialog() {
      this.dialogTitle = 'Stake to Honeycomb'
      this.dialogAction = 'Stake'
      this.dialogTokenSymbol = this.jar.hTokenSymbol
      this.dialogMaxValue = this.jar.hTokenBalance
      this.dialogHintExtra = `(Est. value: ${this.formattedHTokenBalanceEstValue} ${this.jar.tokenSymbol})`
      this.onDialogAction = () => {
        this.dialogProcessing = true
        this.waiting = true
        // await this.honeycomb.withdraw(this.dialogValue)
        this.dialogProcessing = false
        this.waiting = false
        this.dialog = false
      }
      this.setDialogValue(1)
      this.dialog = true
    },
    setDialogValue(multiplier) {
      this.dialogValue = new BigNumber(multiplier).times(this.dialogMaxValue)
    },
  },
  head() {
    return {
      title: `Honey Jar for ${this.jar.tokenSymbol}`,
    }
  },
}
</script>
