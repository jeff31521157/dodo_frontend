<template>
  <v-container fluid>
    <PageHeader title="Honeycomb" subtitle="Staking &amp; liquidity mining" />
    <div class="text-center">
      <v-btn
        v-for="stage in stages"
        :key="stage.stage"
        :color="!stage.ended ? 'secondary' : 'grey'"
        rounded
        text
        outlined
        class="my-2 mx-1"
        @click="$vuetify.goTo(`#stage${stage.stage}`)"
      >
        Stage {{ stage.stage }}
      </v-btn>
    </div>
    <v-row
      v-for="stage in stages"
      :id="`stage${stage.stage}`"
      :key="stage.stage"
    >
      <v-col cols="12">
        <v-banner>
          <v-icon v-if="!stage.ended" slot="icon" color="secondary" size="24">
            mdi-trending-up
          </v-icon>
          <v-icon v-else slot="icon" color="grey" size="24">mdi-check</v-icon>
          <h3 class="text-h6 text--secondary">
            Stage {{ stage.stage }}
            <small>({{ stage.reward.toLocaleString() }} HONEY)</small>
          </h3>
        </v-banner>
      </v-col>
      <v-col
        v-for="(honeycomb, path) in stage.data"
        :key="path"
        cols="12"
        sm="6"
        lg="4"
      >
        <v-card
          nuxt
          :to="`/honeycomb/${path}`"
          :elevation="!stage.ended && honeycomb.highlight ? 12 : undefined"
          :disabled="stage.comingSoon"
        >
          <v-sheet v-if="stage.ended" height="4" color="grey" />
          <v-img
            v-if="!stage.ended"
            :src="require('@/assets/images/honeycomb.jpg')"
            gradient="to top right, rgba(255, 255, 255, .2), rgba(255, 255, 255, .3)"
            height="96px"
          >
            <div class="text-center">
              <div class="ma-3 icon-container">
                <v-avatar size="72" class="elevation-8" color="white">
                  <v-img :src="`/token-icons/${honeycomb.icon}`" />
                </v-avatar>
                <v-avatar v-if="honeycomb.subicon" size="28" class="sub-icon">
                  <v-img :src="`/token-icons/${honeycomb.subicon}`" />
                </v-avatar>
              </div>
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
            <v-chip v-if="stage.showAPY" color="primary lighten-2">
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
              {{ getButtonText(stage) }}
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
    stages: [],
  }),
  created() {
    this.stages.push({
      stage: 10,
      showAPY: true,
      comingSoon: false,
      ended: false,
      data: HoneycombFactory.stage10(this.$web3),
      reward: 7200,
    })
    this.stages.push({
      stage: 9,
      showAPY: false,
      comingSoon: false,
      ended: true,
      data: HoneycombFactory.stage9(this.$web3),
      reward: 7200,
    })
    this.stages.push({
      stage: 8,
      showAPY: false,
      comingSoon: false,
      ended: true,
      data: HoneycombFactory.stage8(this.$web3),
      reward: 7200,
    })
    this.stages.push({
      stage: 7,
      showAPY: false,
      comingSoon: false,
      ended: true,
      data: HoneycombFactory.stage7(this.$web3),
      reward: 3600,
    })
    this.stages.push({
      stage: 6,
      showAPY: false,
      comingSoon: false,
      ended: true,
      data: HoneycombFactory.stage6(this.$web3),
      reward: 3600,
    })
    this.stages.push({
      stage: 5,
      showAPY: false,
      comingSoon: false,
      ended: true,
      data: HoneycombFactory.stage5(this.$web3),
      reward: 3600,
    })
    this.stages.push({
      stage: 4,
      showAPY: false,
      comingSoon: false,
      ended: true,
      data: HoneycombFactory.stage4(this.$web3),
      reward: 3600,
    })
    this.stages.push({
      stage: 3,
      showAPY: false,
      comingSoon: false,
      ended: true,
      data: HoneycombFactory.stage3(this.$web3),
      reward: 3400,
    })
    this.stages.push({
      stage: 2,
      showAPY: false,
      comingSoon: false,
      ended: true,
      data: HoneycombFactory.stage2(this.$web3),
      reward: 600,
    })
    this.stages.push({
      stage: 1,
      showAPY: false,
      comingSoon: false,
      ended: true,
      data: HoneycombFactory.stage1(this.$web3),
      reward: 1000,
    })
  },
  methods: {
    getButtonText(stage) {
      if (stage.comingSoon) {
        return 'Coming soon'
      } else if (stage.ended) {
        return 'Check'
      } else {
        return 'Earn'
      }
    },
    getEfficiencyColor(honeycomb) {
      switch (honeycomb.efficiency) {
        case 2:
          return 'lime darken-2'
        case 3:
          return 'orange'
        case 4:
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
<style scoped>
.icon-container {
  position: relative;
}
.sub-icon {
  position: absolute;
  left: 52%;
  bottom: 0;
}
</style>
