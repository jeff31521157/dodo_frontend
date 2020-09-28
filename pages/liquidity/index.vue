<template>
  <v-container fluid>
    <h1>Liquidity Token Banks</h1>
    <v-row>
      <v-col cols="4">
        <v-card>
          <v-img
            :src="require('@/assets/images/honeycomb.jpg')"
            height="200px"
          />
          <v-avatar size="64" class="icon elevation-4">
            <v-img src="/token-icons/cos.png" />
          </v-avatar>
          <v-card-title>Honeycomb for COS</v-card-title>
          <v-card-subtitle>
            Deposit <strong>COS-ETH UNI-V2 LP</strong> to earn HONEY
          </v-card-subtitle>
          <v-divider />
          <v-card-actions>
            <v-alert
              icon="mdi-trending-up"
              class="my-0"
              dense
              color="secondary"
            >
              APY: 100%
            </v-alert>
            <v-spacer />
            <v-btn text color="primary" nuxt to="COS-ETH">Earn</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card>
          <v-img
            :src="require('@/assets/images/honeycomb-dark.jpg')"
            height="200px"
          />
          <v-avatar size="64" class="icon elevation-4">
            <v-img src="/token-icons/usdt.png" />
          </v-avatar>
          <v-card-title>Honeycomb for USDT</v-card-title>
          <v-card-subtitle>
            Deposit <strong>USDT-ETH UNI-V2 LP</strong> to earn HONEY
          </v-card-subtitle>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" disabled>Coming soon</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card>
          <v-img
            :src="require('@/assets/images/honeycomb.jpg')"
            height="200px"
          />
          <v-avatar size="64" class="icon elevation-4" color="primary">
            <span class="headline white--text">?</span>
          </v-avatar>
          <v-card-title>???</v-card-title>
          <v-card-subtitle>More to come</v-card-subtitle>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" disabled>Coming soon</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.icon {
  position: absolute;
  right: 16px;
  top: 168px;
  z-index: 99;
}
</style>
