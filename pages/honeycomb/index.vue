<template>
  <v-container fluid>
    <PageHeader title="Honeycomb" subtitle="Staking &amp; liquidity mining" />
    <v-row>
      <v-col cols="12">
        <v-banner>
          <v-icon slot="icon" color="secondary" size="24">
            mdi-trending-up
          </v-icon>
          <h3 class="text-h6 text--secondary">Stage 3</h3>
        </v-banner>
      </v-col>
      <v-col
        v-for="(honeycomb, path) in honeycombsS3"
        :key="path"
        cols="12"
        sm="6"
        lg="4"
      >
        <v-card
          nuxt
          :to="`/honeycomb/${path}`"
          :elevation="honeycomb.highlight ? 12 : undefined"
        >
          <v-img
            :src="require('@/assets/images/honeycomb.jpg')"
            gradient="to top right, rgba(255, 255, 255, .2), rgba(255, 255, 255, .3)"
            height="96px"
          >
            <div class="text-center">
              <v-avatar size="72" class="ma-3 elevation-8">
                <v-img :src="`/token-icons/${honeycomb.icon}`" />
              </v-avatar>
            </div>
          </v-img>
          <v-card-title>
            {{ honeycomb.tokenName }}
          </v-card-title>
          <v-card-subtitle>
            Stake <strong>{{ honeycomb.tokenName }}</strong> to earn HONEY
          </v-card-subtitle>
          <v-card-text>
            <v-chip
              v-if="honeycomb.efficiency > 1"
              :color="getEfficiencyColor(honeycomb)"
              dark
            >
              Mining @
              <strong>{{ honeycomb.efficiency }}X</strong>
            </v-chip>
            <v-chip color="primary lighten-2">
              APY:&nbsp;
              <strong>{{ honeycomb.apy }}</strong>
            </v-chip>
            <v-chip v-if="honeycomb.isLPToken" color="pink" outlined>
              Uniswap LP
            </v-chip>
            <v-chip v-if="honeycomb.isHToken" color="orange" outlined>
              Honey Jar
            </v-chip>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" nuxt :to="`/honeycomb/${path}`">
              Earn
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-banner>
          <v-icon slot="icon" color="secondary" size="24">
            mdi-trending-up
          </v-icon>
          <h3 class="text-h6 text--secondary">Stage 2</h3>
        </v-banner>
      </v-col>
      <v-col
        v-for="(honeycomb, path) in honeycombsS2"
        :key="path"
        cols="12"
        sm="6"
        lg="4"
      >
        <v-card nuxt :to="`/honeycomb/${path}`">
          <v-img
            :src="require('@/assets/images/honeycomb.jpg')"
            gradient="to top right, rgba(255, 255, 255, .2), rgba(255, 255, 255, .3)"
            height="96px"
          >
            <div class="text-center">
              <v-avatar size="72" class="ma-3 elevation-8">
                <v-img :src="`/token-icons/${honeycomb.icon}`" />
              </v-avatar>
            </div>
          </v-img>
          <v-card-title>
            {{ honeycomb.tokenName }}
          </v-card-title>
          <v-card-subtitle>
            Stake <strong>{{ honeycomb.tokenName }}</strong> to earn HONEY
          </v-card-subtitle>
          <v-card-text>
            <v-chip
              v-if="honeycomb.efficiency > 1"
              :color="getEfficiencyColor(honeycomb)"
              dark
            >
              Mining @
              <strong>{{ honeycomb.efficiency }}X</strong>
            </v-chip>
            <v-chip color="primary lighten-2">
              APY:&nbsp;
              <strong>{{ honeycomb.apy }}</strong>
            </v-chip>
            <v-chip v-if="honeycomb.isLPToken" color="pink" outlined>
              Uniswap LP
            </v-chip>
            <v-chip v-if="honeycomb.isHToken" color="orange" outlined>
              Honey Jar
            </v-chip>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" nuxt :to="`/honeycomb/${path}`">
              Earn
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-banner>
          <v-icon slot="icon" color="secondary" size="24">
            mdi-trending-up
          </v-icon>
          <h3 class="text-h6 text--secondary">Stage 1</h3>
        </v-banner>
      </v-col>
      <v-col
        v-for="(honeycomb, path) in honeycombsS1"
        :key="path"
        cols="12"
        sm="6"
        lg="4"
      >
        <v-card nuxt :to="`/honeycomb/${path}`">
          <v-img
            :src="require('@/assets/images/honeycomb.jpg')"
            gradient="to top right, rgba(255, 255, 255, .2), rgba(255, 255, 255, .3)"
            height="96px"
          >
            <div class="text-center">
              <v-avatar size="72" class="ma-3 elevation-8">
                <v-img :src="`/token-icons/${honeycomb.icon}`" />
              </v-avatar>
            </div>
          </v-img>
          <v-card-title>
            {{ honeycomb.tokenName }}
          </v-card-title>
          <v-card-subtitle>
            Stake <strong>{{ honeycomb.tokenName }}</strong> to earn HONEY
          </v-card-subtitle>
          <v-card-text>
            <v-chip
              v-if="honeycomb.efficiency > 1"
              :color="getEfficiencyColor(honeycomb)"
              dark
            >
              Mining @
              <strong>{{ honeycomb.efficiency }}X</strong>
            </v-chip>
            <v-chip color="primary lighten-2">APY: N/A</v-chip>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" nuxt :to="`/honeycomb/${path}`">
              Check
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import HoneycombFactory from '@/lib/honeycomb/HoneycombFactory'
export default {
  data: () => ({
    honeycombsS1: {},
    honeycombsS2: {},
    honeycombsS3: {},
  }),
  created() {
    this.honeycombsS1 = HoneycombFactory.stage1(this.$web3)
    this.honeycombsS2 = HoneycombFactory.stage2(this.$web3)
    this.honeycombsS3 = HoneycombFactory.stage3(this.$web3)
  },
  methods: {
    getStage(honeycomb) {
      return honeycomb.ver
    },
    getEfficiencyColor(honeycomb) {
      switch (honeycomb.efficiency) {
        case 2:
          return 'lime darken-2'
        case 3:
          return 'orange'
        case 5:
          return 'pink'
      }
      return 'grey'
    },
  },
  head: {
    title: 'Honeycomb',
  },
}
</script>
