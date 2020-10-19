<template>
  <v-container fluid>
    <PageHeader title="Honeycomb" subtitle="Liquidity mining" />
    <v-row>
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
            height="192px"
          >
            <div class="text-center">
              <v-avatar size="128" class="ma-8 elevation-8">
                <v-img :src="`/token-icons/${honeycomb.icon}`" />
              </v-avatar>
            </div>
          </v-img>
          <v-card-title>Honeycomb for {{ honeycomb.tokenName }}</v-card-title>
          <v-card-subtitle>
            Deposit <strong>{{ honeycomb.lpTokenName }}</strong> to earn HONEY
          </v-card-subtitle>
          <v-card-text>
            <v-chip :color="getStageColor(honeycomb)">
              Stage&nbsp;
              <strong>{{ getStage(honeycomb) }}</strong>
            </v-chip>
            <v-chip v-if="honeycomb.efficiency > 1" color="pink" dark>
              Mining @
              <strong>{{ honeycomb.efficiency }}X</strong>
            </v-chip>
            <v-chip color="primary lighten-2">
              APY:&nbsp;
              <strong>{{ honeycomb.apy }}</strong>
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
            height="192px"
          >
            <div class="text-center">
              <v-avatar size="128" class="ma-8 elevation-8">
                <v-img :src="`/token-icons/${honeycomb.icon}`" />
              </v-avatar>
            </div>
          </v-img>
          <v-card-title>Honeycomb for {{ honeycomb.tokenName }}</v-card-title>
          <v-card-subtitle>
            Deposit <strong>{{ honeycomb.lpTokenName }}</strong> to earn HONEY
          </v-card-subtitle>
          <v-card-text>
            <v-chip :color="getStageColor(honeycomb)">
              Stage&nbsp;
              <strong>{{ getStage(honeycomb) }}</strong>
            </v-chip>
            <v-chip v-if="honeycomb.efficiency > 1" color="pink" dark>
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
  }),
  created() {
    this.honeycombsS1 = HoneycombFactory.stage1(this.$web3)
    this.honeycombsS2 = HoneycombFactory.stage2(this.$web3)
  },
  methods: {
    getStage(honeycomb) {
      return honeycomb.isV1 ? 1 : honeycomb.batch + 2
    },
    getStageColor(honeycomb) {
      if (honeycomb.isV1) {
        return 'primary lighten-2'
      }
      if (honeycomb.batch === 0) {
        return 'secondary darken-2'
      }
      return ''
    },
  },
  head: {
    title: 'Honeycomb',
  },
}
</script>
<style scoped>
.icon {
  position: absolute;
  right: 16px;
  top: 168px;
}
</style>
