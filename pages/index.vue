<template>
  <v-container fluid>
    <h1 class="text-h3 text-sm-h1 text-center text--primary my-sm-6">
      Honey Finance
    </h1>
    <h2 class="text-h5 text-sm-h4 text-center text--secondary my-sm-4">
      Beeees! Let's make some honey!
    </h2>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-card nuxt to="/honeycomb/">
          <v-sheet height="4" color="secondary" />
          <v-card-title class="text-h4">Honeycomb</v-card-title>
          <v-card-subtitle class="text-h6">Liquidity mining</v-card-subtitle>
          <v-img
            :src="require('@/assets/images/honeycomb.jpg')"
            height="200px"
          />
          <v-card-text>
            Et harum quidem rerum facilis est et expedita distinctio. Nam libero
            tempore, cum soluta nobis est eligendi optio cumque nihil impedit
            quo minus id quod maxime placeat facere possimus, omnis voluptas
            assumenda est, omnis dolor repellendus. Temporibus autem quibusdam
            et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et
            voluptates repudiandae sint et molestiae non recusandae. Itaque
            earum rerum hic tenetur.
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" nuxt to="/honeycomb/">
              Start earning
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card disabled>
          <v-card-title class="text-h4">Honey Jar</v-card-title>
          <v-card-subtitle class="text-h6">Yield farming</v-card-subtitle>
          <v-img
            :src="require('@/assets/images/honey-jar.jpg')"
            gradient="to top right, rgba(255, 255, 255, .66), rgba(255, 255, 255, 1)"
            height="200px"
          />
          <v-card-text>
            Et harum quidem rerum facilis est et expedita distinctio. Nam libero
            tempore, cum soluta nobis est eligendi optio cumque nihil impedit
            quo minus id quod maxime placeat facere possimus, omnis voluptas
            assumenda est, omnis dolor repellendus. Temporibus autem quibusdam
            et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et
            voluptates repudiandae sint et molestiae non recusandae. Itaque
            earum rerum hic tenetur.
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" disabled>Coming soon</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card disabled>
          <v-card-title class="text-h4">Honey Congress</v-card-title>
          <v-card-subtitle class="text-h6">
            Decentralized governance
          </v-card-subtitle>
          <v-img
            :src="require('@/assets/images/honey-bees.jpg')"
            gradient="to top right, rgba(255, 255, 255, .66), rgba(255, 255, 255, 1)"
            height="200px"
          />
          <v-card-text>
            Et harum quidem rerum facilis est et expedita distinctio. Nam libero
            tempore, cum soluta nobis est eligendi optio cumque nihil impedit
            quo minus id quod maxime placeat facere possimus, omnis voluptas
            assumenda est, omnis dolor repellendus. Temporibus autem quibusdam
            et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et
            voluptates repudiandae sint et molestiae non recusandae. Itaque
            earum rerum hic tenetur.
          </v-card-text>
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
