<template>
  <v-container>
    <v-row class="align-center">
      <v-col cols="12" md="6">
        <div class="rare-text-section">
          <h2 class="pinktext">'About Bandyland'</h2>
          <p>
            Established in 1991, Bandyland is the imagination of Bandy, and an
            unlimited source of creativity.
          </p>
          <p>
            It is also the home of original characters, Rarie the Panther,
            <span class="pinktext">Saki Love Blossom</span> and our growing
            community of Rare Panthers; which might include YOU! On the
            blockchain, Bandyland is the hub that houses the 100 1/1 Rare
            Panthers Genesis Project and 10,000 Rarie NFTs on the Ethereum
            blockchain.
          </p>
          <p>
            With your Rarie comes utility, community and creative opportunities
            for you to grow within our space. Hop into
            <span class="pinktext"> BandyLand!</span>
          </p>
        </div>
      </v-col>
      <v-col md="6" cols="12">
        <div class="d-flex flex-wrap justify-md-end justify-center">
          <div class="small-icons">
            <img src="~/assets/images/nft1.jpg" />
          </div>
          <div class="small-icons">
            <img src="~/assets/images/nft2.jpg" />
          </div>
          <div class="small-icons">
            <img src="~/assets/images/nft3.jpg" />
          </div>
          <div class="small-icons">
            <img src="~/assets/images/nft4.jpg" />
          </div>
          <div class="small-icons">
            <img src="~/assets/images/nft5.jpg" />
          </div>
          <div class="small-icons">
            <img src="~/assets/images/nft6.jpg" />
          </div>
          <div class="small-icons">
            <img src="~/assets/images/nft7.jpg" />
          </div>
          <div class="small-icons">
            <img src="~/assets/images/nft8.jpg" />
          </div>
          <div class="small-icons">
            <img src="~/assets/images/nft9.jpg" />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
.small-icons {
  width: 30%;
  margin: 0px 1% 2%;
  &:nth-child(3n + 3) {
    margin-right: 0;
  }
  img {
    border-radius: 20px;
    transition: all 1s cubic-bezier(0.08, 0.82, 0.24, 0.99) 0s;
  }
  &:hover {
    transition: all 0.3s cubic-bezier(0.08, 0.82, 0.24, 0.99) 0s;
    transform: scale(1.05) rotate(2deg);
  }
}
</style>
