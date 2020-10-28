<template>
  <v-container fluid>
    <PageHeader title="Honey Jar" subtitle="Vault - Yield farming" />
    <v-row>
      <v-col v-for="(jar, key) in jars" :key="key" cols="12" sm="6" lg="4">
        <v-card nuxt :to="`/honeyjar/${key}`">
          <v-img
            :src="require('@/assets/images/honey-jar.jpg')"
            gradient="to top right, rgba(255, 255, 255, .2), rgba(255, 255, 255, .3)"
            height="192px"
          >
            <div class="text-center">
              <v-avatar size="128" class="ma-8 elevation-8">
                <v-img :src="`/token-icons/${jar.icon}`" />
              </v-avatar>
            </div>
          </v-img>
          <v-card-title>
            {{ jar.tokenName }}
          </v-card-title>
          <v-card-subtitle>
            Invest and grow your
            <strong>{{ jar.tokenSymbol }}</strong> hassle-free
          </v-card-subtitle>
          <v-divider />
          <v-list>
            <v-list-item>
              <v-list-item-subtitle>Strategy</v-list-item-subtitle>
              <v-list-item-title>{{ jar.strategyName }}</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-subtitle>Yearly growth</v-list-item-subtitle>
              <v-list-item-title>
                {{
                  (jar.strategyAPY + jar.honeycombAPY)
                    .toFixed(2)
                    .toLocaleString()
                }}%
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      color="secondary"
                      small
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      mdi-information
                    </v-icon>
                  </template>
                  <span>
                    Strategy APY:
                    {{ jar.strategyAPY.toFixed(2).toLocaleString() }}% +
                    Honeycomb APY:
                    {{ jar.honeycombAPY.toFixed(2).toLocaleString() }}%
                  </span>
                </v-tooltip>
              </v-list-item-title>
            </v-list-item>
          </v-list>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" nuxt :to="`/honeyjar/${key}`">
              Invest
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    jars: {
      USDT: {
        tokenSymbol: 'USDT',
        tokenName: 'Tether USD',
        icon: 'usdt.png',
        strategyName: 'DForceUSDT',
        strategyAPY: 3.33,
        honeycombAPY: 30.33,
      },
      USDC: {
        tokenSymbol: 'USDC',
        tokenName: 'USD Coin',
        icon: 'usdc.png',
        strategyName: 'DForceUSDC',
        strategyAPY: 2.22,
        honeycombAPY: 240.15,
      },
      DAI: {
        tokenSymbol: 'DAI',
        tokenName: 'Dai Stablecoin',
        icon: 'dai.png',
        strategyName: 'DAICurve',
        strategyAPY: 6.83,
        honeycombAPY: 301.82,
      },
    },
  }),
  methods: {},
  head: {
    title: 'Honey Jar',
  },
}
</script>
