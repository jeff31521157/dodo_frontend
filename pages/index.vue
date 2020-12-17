<template>
  <v-container fluid>
    <PageHeader
      title="Honey Finance"
      subtitle="Beeees! Let's make some honey!"
    />
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-card nuxt to="/honeycomb/">
          <v-card-title class="text-h4">Honeycomb</v-card-title>
          <v-card-subtitle class="text-h6">
            Staking &amp; liquidity mining
          </v-card-subtitle>
          <v-img
            :src="require('@/assets/images/honeycomb.jpg')"
            height="200px"
          />
          <v-card-text>
            Honeycomb allows users to farm HONEY rewards with each new block
            produced by staking designated UNI-V2 LP tokens, hTokens or assets.
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" nuxt to="/honeycomb/">
              Earn HONEY
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card nuxt to="/honeyjar/">
          <v-card-title class="text-h4">Honey Jar</v-card-title>
          <v-card-subtitle class="text-h6">
            Vault - Yield farming
          </v-card-subtitle>
          <v-img
            :src="require('@/assets/images/honey-jar.jpg')"
            height="200px"
          />
          <v-card-text>
            Honey Jar empowers the wider community to safely and efficiently
            yield farm for returns by simply depositing their funds.
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" nuxt to="/honeyjar/">
              Grow my assets
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card href="https://forum.myhoney.finance" target="_blank">
          <v-sheet height="4" color="secondary" />
          <v-card-title class="text-h4">Honey Congress</v-card-title>
          <v-card-subtitle class="text-h6">
            Decentralized governance
          </v-card-subtitle>
          <v-img
            :src="require('@/assets/images/honey-bees.jpg')"
            height="200px"
          />
          <v-card-text>
            Honey Congress is governed by HONEY holders, who will challenge
            existing system, raise new views and voting for changes to benefit
            the wider Honey Community.
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn
              text
              color="primary"
              href="https://forum.myhoney.finance"
              target="_blank"
            >
              Participate
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  head: {
    title: 'Home',
  },
}
</script>
