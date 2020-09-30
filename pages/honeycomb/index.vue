<template>
  <v-container fluid>
    <PageHeader title="Honeycomb" subtitle="Liquidity mining" />
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-card nuxt to="/honeycomb/COS-ETH">
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
              FRESH
            </v-alert>
            <v-spacer />
            <v-btn text color="primary" nuxt to="/honeycomb/COS-ETH">
              Earn
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card disabled>
          <v-img
            :src="require('@/assets/images/honeycomb-dark.jpg')"
            gradient="to top right, rgba(255, 255, 255, .66), rgba(255, 255, 255, 1)"
            height="200px"
          />
          <v-avatar size="64" class="icon elevation-4" color="white">
            <v-img
              src="/honey-logo.png"
              aspect-ratio="1"
              max-width="40"
              contain
            />
          </v-avatar>
          <v-card-title>Honeycomb for HONEY</v-card-title>
          <v-card-subtitle>
            Deposit <strong>HONEY-ETH UNI-V2 LP</strong> to earn HONEY
          </v-card-subtitle>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" disabled>Coming soon</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card disabled>
          <v-img
            :src="require('@/assets/images/honeycomb.jpg')"
            gradient="to top right, rgba(255, 255, 255, .66), rgba(255, 255, 255, 1)"
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
}
</style>
