<template>
  <v-container fluid>
    <v-overlay v-if="!account" absolute>
      <v-alert color="info" icon="mdi-wallet" border="left" prominent>
        <div class="title">Account required</div>
        <div>Please connect your wallet to begin</div>
      </v-alert>
    </v-overlay>
    <div v-else-if="honeycomb">
      <PageHeader title="Honeycomb" :subtitle="honeycomb.tokenName" />
      <div class="text-center">
        <v-chip outlined class="mx-1" color="primary">
          Stage&nbsp;
          <strong>{{ honeycomb.ver + honeycomb.batch }}</strong>
        </v-chip>
        <v-chip
          class="mx-1"
          :x-large="honeycomb.efficiency > 1"
          :outlined="honeycomb.efficiency === 1"
          :color="honeycomb.efficiency > 1 ? 'pink' : 'primary'"
          :dark="honeycomb.efficiency > 1"
        >
          Mining @<strong>{{ honeycomb.efficiency }}X</strong>
        </v-chip>
        <v-chip
          v-if="currentBlock < honeycomb.endBlock + 6400"
          outlined
          class="mx-1"
          color="primary"
        >
          APY:&nbsp;
          <strong>{{ honeycomb.apy }}</strong>
        </v-chip>
      </div>
      <v-row>
        <v-col v-if="currentBlock < honeycomb.startBlock" cols="12">
          <v-alert
            color="secondary darken-3"
            icon="mdi-timer-sand-empty"
            outlined
            border="top"
            prominent
          >
            <div class="title">Starting soon</div>
            <div>
              HONEY farming will begin at block height
              {{ honeycomb.startBlock }}, approximately
              <strong>{{ timeUntilStart }}</strong> later.
            </div>
            <v-divider class="my-3 secondary darken-3" />
            <div>
              You may deposit now and start earning HONEY as soon as the farming
              begins.
            </div>
          </v-alert>
        </v-col>
        <v-col
          v-if="
            currentBlock >= honeycomb.startBlock &&
            currentBlock < honeycomb.endBlock
          "
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
              Stake {{ honeycomb.tokenName }} tokens to earn your yummy HONEY!
            </div>
            <v-divider class="my-3 primary" />
            <div>
              Current HONEY farming stage will end at block height
              {{ honeycomb.endBlock }}, approximately
              <strong>{{ timeUntilEnd }}</strong> later.
            </div>
          </v-alert>
        </v-col>
        <v-col v-if="currentBlock >= honeycomb.endBlock" cols="12">
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
              {{ honeycomb.endBlock }}.
            </div>
            <v-divider class="my-3 deep-orange" />
            <div>
              You can withdraw your staked
              {{ honeycomb.tokenName }} tokens along with your yummy HONEY
              harvest anytime!
            </div>
          </v-alert>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card v-if="honeycomb.ver === 3">
            <v-toolbar color="secondary" dense flat>
              <v-avatar size="32" tile class="mr-4">
                <v-img src="/honey-logo.png" />
              </v-avatar>
              <v-toolbar-title class="primary--text">
                My HONEY Reward
              </v-toolbar-title>
            </v-toolbar>
            <v-card-subtitle class="pb-0">
              <v-icon color="secondary">mdi-water</v-icon>
              Mined HONEY
            </v-card-subtitle>
            <v-card-title class="text-h3">
              {{ formattedMinedHoney }}
            </v-card-title>
            <v-card-text class="pb-0">
              <strong>Unlock</strong> needs 72 hours of processing. Requesting
              <strong>Instant-Unlock</strong> will result in 40% of farmed HONEY
              being destroyed.
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="primary"
                large
                :disabled="!honeycomb.userApproved"
                @click="unlockHoney"
              >
                Unlock
              </v-btn>
              <v-btn
                text
                color="deep-orange"
                large
                :disabled="!honeycomb.userApproved"
                @click="instantUnlockHoney"
              >
                Instant-Unlock (-40%)
              </v-btn>
            </v-card-actions>
            <v-divider />

            <v-card-subtitle class="pb-0">
              <v-icon color="secondary">mdi-progress-clock</v-icon>
              HONEY in unlocking process
            </v-card-subtitle>
            <v-card-title class="text-h3">
              {{ formattedUnlockingHoney }}
            </v-card-title>
            <v-divider />

            <v-card-subtitle class="pb-0">
              <v-icon color="secondary">mdi-water-check</v-icon>
              Unlocked HONEY
            </v-card-subtitle>
            <v-card-title class="text-h3 pb-0">
              {{ formattedUnlockedHoney }}
            </v-card-title>
            <v-card-actions>
              <v-btn
                text
                color="primary"
                large
                :disabled="!honeycomb.userApproved"
                @click="collectHoneyV3"
              >
                Collect
              </v-btn>
            </v-card-actions>
            <v-divider />

            <v-card-subtitle class="pb-0">
              <v-icon color="secondary">mdi-water-outline</v-icon>
              Collected HONEY
            </v-card-subtitle>
            <v-card-title class="text-h3">
              {{ formattedCollectedHoney }}
            </v-card-title>
          </v-card>

          <v-card v-else>
            <v-toolbar color="secondary" dense flat>
              <v-avatar size="32" tile class="mr-4">
                <v-img src="/honey-logo.png" />
              </v-avatar>
              <v-toolbar-title class="primary--text">
                My HONEY Reward
              </v-toolbar-title>
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
              <v-btn
                text
                color="primary"
                large
                :disabled="!honeycomb.userApproved"
                @click="collectHoney"
              >
                Collect
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card>
            <v-toolbar
              :color="honeycomb.themeColor"
              dense
              flat
              dark
              style="position: relative"
            >
              <v-avatar size="32" class="mr-4" color="white">
                <v-img :src="`/token-icons/${honeycomb.icon}`" />
              </v-avatar>
              <v-avatar v-if="honeycomb.subicon" size="14" class="sub-icon">
                <v-img :src="`/token-icons/${honeycomb.subicon}`" />
              </v-avatar>
              <v-toolbar-title>My {{ honeycomb.tokenName }}</v-toolbar-title>
            </v-toolbar>
            <v-card-subtitle class="pb-0">Staked</v-card-subtitle>
            <v-card-title class="text-h3">
              {{ formattedStakedBalance }}
            </v-card-title>
            <v-divider />
            <v-card-subtitle class="pb-0">Account balance</v-card-subtitle>
            <v-card-title class="text-h3">
              {{ honeycomb.userApproved ? formattedTokenBalance : 'N/A' }}
            </v-card-title>
            <v-divider />
            <v-card-actions>
              <v-spacer />
              <v-btn
                v-if="!honeycomb.userApproved"
                text
                color="primary"
                large
                @click="getApproval"
              >
                Approve
              </v-btn>
              <v-btn
                v-if="honeycomb.userApproved"
                :disabled="currentBlock >= honeycomb.endBlock"
                text
                color="primary"
                large
                @click="showStakeDialog"
              >
                Stake
              </v-btn>
              <v-btn
                v-if="honeycomb.userApproved"
                text
                color="primary"
                large
                @click="showUnstakeDialog"
              >
                Unstake
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col v-if="!honeycomb.userApproved" cols="12">
          <v-alert icon="mdi-flash" color="secondary lighten-4">
            Please approve the Honeycomb contract to access your
            {{ honeycomb.tokenName }} tokens
          </v-alert>
        </v-col>
        <v-col v-else-if="honeycomb.ver < 3" cols="12">
          <v-alert icon="mdi-lightbulb" color="secondary lighten-4">
            Every time you deposit and withdraw
            {{ honeycomb.tokenName }} tokens, the Honeycomb contract will
            automatically collect HONEY rewards for you!
          </v-alert>
        </v-col>

        <v-col
          v-if="honeycomb.isLPToken && honeycomb.uniswapUrl"
          cols="12"
          class="my-0 py-0"
        >
          <v-alert color="pink" outlined border="left">
            <v-row align="center">
              <v-col class="grow py-0">
                You can get more {{ honeycomb.tokenName }} tokens by providing
                liquidity at Uniswap
              </v-col>
              <v-col class="shrink py-0">
                <v-btn
                  text
                  color="primary"
                  :href="honeycomb.uniswapUrl"
                  target="_blank"
                >
                  Go to Uniswap
                </v-btn>
              </v-col>
            </v-row>
          </v-alert>
        </v-col>

        <v-col
          v-if="honeycomb.isHToken && honeycomb.honeyJarUrl"
          cols="12"
          class="my-0 py-0"
        >
          <v-alert color="secondary darken-3" outlined border="left">
            <v-row align="center">
              <v-col class="grow py-0">
                You can get more {{ honeycomb.tokenName }} tokens by depositing
                in Honey Jar
              </v-col>
              <v-col class="shrink py-0">
                <v-btn
                  text
                  color="primary"
                  nuxt
                  :to="honeycomb.honeyJarUrl"
                  target="_blank"
                >
                  Go to Honey Jar
                </v-btn>
              </v-col>
            </v-row>
          </v-alert>
        </v-col>

        <v-col cols="12" class="my-0 py-0">
          <v-alert color="primary" outlined border="left">
            You may need to input <strong>HONEY</strong> token contract address
            <strong>
              <a
                href="https://etherscan.io/token/0x37C9EB4CeF7571f27136145C82c37a01F2a8Aa16"
                target="_blank"
              >
                0x37C9EB4CeF7571f27136145C82c37a01F2a8Aa16
              </a>
            </strong>
            to reveal the asset in your wallet
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
              :suffix="honeycomb.tokenName"
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
import HoneycombFactory from '@/lib/honeycomb/HoneycombFactory'
import { mapState } from 'vuex'
import AmountFormat from '@/lib/AmountFormat'
import ChainInfo from '@/lib/constants/ChainInfo'

export default {
  data: () => ({
    honeycomb: null,
    dialog: false,
    dialogTitle: null,
    dialogAction: null,
    dialogMaxValue: 0,
    onDialogAction: null,
    dialogValue: null,
    dialogProcessing: false,
    waiting: false,
  }),
  middleware({ route, redirect }) {
    if (!HoneycombFactory.isPathValid(route.params.id)) {
      return redirect('/honeycomb')
    }
  },
  computed: {
    ...mapState('account', { account: (state) => state.address }),
    formattedMinedHoney() {
      return AmountFormat.toDisplay(
        this.honeycomb ? this.honeycomb.minedHoney : 0
      )
    },
    formattedUnlockingHoney() {
      return AmountFormat.toDisplay(
        this.honeycomb ? this.honeycomb.unlockingHoney : 0
      )
    },
    formattedUnlockedHoney() {
      return AmountFormat.toDisplay(
        this.honeycomb ? this.honeycomb.unlockedHoney : 0
      )
    },
    formattedCollectedHoney() {
      return AmountFormat.toDisplay(
        this.honeycomb ? this.honeycomb.collectedHoney : 0
      )
    },
    formattedEarnedHoney() {
      return AmountFormat.toDisplay(
        this.honeycomb ? this.honeycomb.earnedHoney : 0
      )
    },
    formattedPendingHoney() {
      return AmountFormat.toDisplay(
        this.honeycomb ? this.honeycomb.pendingHoney : 0
      )
    },
    formattedStakedBalance() {
      return AmountFormat.toDisplay(
        this.honeycomb ? this.honeycomb.stakedBalance : 0
      )
    },
    formattedTokenBalance() {
      return AmountFormat.toDisplay(
        this.honeycomb ? this.honeycomb.tokenBalance : 0
      )
    },
    formattedDialogMaxValue() {
      return AmountFormat.toDisplay(this.dialogMaxValue)
    },
    currentBlock() {
      return this.$web3.currentBlockHeight
    },
    timeUntilStart() {
      const diff = this.honeycomb
        ? (this.honeycomb.startBlock - this.currentBlock) *
          ChainInfo.SecondsPerBlock
        : 0
      return this.timeDiffToString(diff)
    },
    timeUntilEnd() {
      const diff = this.honeycomb
        ? (this.honeycomb.endBlock - this.currentBlock) *
          ChainInfo.SecondsPerBlock
        : 0
      return this.timeDiffToString(diff)
    },
  },
  watch: {
    async account(newVal) {
      if (this.honeycomb) {
        await this.honeycomb.syncAll()
      }
    },
  },
  async created() {
    this.honeycomb = HoneycombFactory.create(this.$route.params.id, this.$web3)
    await this.honeycomb.syncBatchInfo()
    await this.honeycomb.syncAll()
    if (
      this.honeycomb.ver >= 3 &&
      this.currentBlock < this.honeycomb.endBlock + 6400
    ) {
      await this.honeycomb.calculateAPY()
    }
  },
  mounted() {
    this.$web3.addBlockProducedListener(this.syncData)
  },
  unmounted() {
    this.$web3.removeBlockProducedListener(this.syncData)
  },
  methods: {
    async syncData() {
      if (this.honeycomb) {
        await this.honeycomb.syncAll()
      }
    },
    async getApproval() {
      this.waiting = true
      await this.honeycomb.getApproval()
      this.waiting = false
    },
    showStakeDialog() {
      this.dialogTitle = 'Stake'
      this.dialogAction = 'Stake'
      this.dialogMaxValue = this.honeycomb.tokenBalance
      this.onDialogAction = async () => {
        this.dialogProcessing = true
        this.waiting = true
        await this.honeycomb.deposit(this.dialogValue)
        this.dialogProcessing = false
        this.waiting = false
        this.dialog = false
      }
      this.setDialogValue(1)
      this.dialog = true
    },
    showUnstakeDialog() {
      this.dialogTitle = 'Unstake'
      this.dialogAction = 'Unstake'
      this.dialogMaxValue = this.honeycomb.stakedBalance
      this.onDialogAction = async () => {
        this.dialogProcessing = true
        this.waiting = true
        await this.honeycomb.withdraw(this.dialogValue)
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
    async collectHoney() {
      this.waiting = true
      await this.honeycomb.withdraw(0)
      this.waiting = false
    },
    async unlockHoney() {
      this.waiting = true
      await this.honeycomb.unlock()
      this.waiting = false
    },
    async instantUnlockHoney() {
      this.waiting = true
      await this.honeycomb.instantUnlock()
      this.waiting = false
    },
    async collectHoneyV3() {
      this.waiting = true
      await this.honeycomb.collect()
      this.waiting = false
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
  head() {
    return {
      title: `Honeycomb (${this.honeycomb.tokenName})`,
    }
  },
}
</script>
<style scoped>
.sub-icon {
  position: absolute;
  left: 36px;
  bottom: 6px;
}
</style>
