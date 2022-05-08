<template>
  <v-container>
    <v-row>
      <v-col cols="6" sm="3" md="3" v-for="box in boxes" :key="box.name">
        <v-card
          elevation="2"
          :style="{ 'background-color': box.color + '!important' }"
        >
          <span>{{ box.name }}</span>
          <span>{{ box.Amount }}</span>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      boxes: [
        {
          name: 'SUPPLY',
          Amount: '10000 ',
          color: '#0081dd',
        },
        {
          name: 'TRAITS',
          Amount: '200+',
          color: '#c3161a',
        },
        {
          name: 'Different',
          Amount: 'Rarities',
          color: '#f78282',
        },
        {
          name: 'PRICE',
          Amount: '0.05 eth',
          color: '#000000',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
$general-font: 'Acme', sans-serif;
.v-card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: var(--chakra-colors-blue-300);
  border-radius: 15px;
  font-family: $general-font;
  height: 98px;
  font-size: 30px;
  line-height: normal;
  margin-top: 20px;
  @media (max-width: 960px) {
    margin-top: 0;
    font-size: 18px;
  }
  @media (max-width: 575px) {
    margin-top: 0;
    font-size: 16px;
  }
}
</style>
