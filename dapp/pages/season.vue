<template>
  <div class="">
    <v-container>
      <v-row class="align-center">
        <v-col md="12" cols="12" sm="12" class="order-1 order-md-2">
          <div class="rare-text-section">
            <h2 class="mb-5 blue-bg pa-5">Roadmap Plans</h2>

            <div class="red-bg road-map-box">
              <h3 class="white--text">10% (1,000)</h3>
              <p>
                Mint and Giveaway 5 Rare Panthers, Give Away 10 Rare Panthers
                Mystery Boxes
              </p>
            </div>

            <div class="red-bg road-map-box">
              <h3 class="white--text">25% (2500)</h3>
              <p>
                Mint and Giveaway 10 Rare Panthers, Donate 10 ETH to Community
                Wallet
              </p>
            </div>
            <div class="red-bg road-map-box">
              <h3 class="white--text">50% (5000)</h3>
              <p>
                Mint and Giveaway 10 Rare Panthers to holders. Donate 8 Eth to
                Panthera to help protect our IRL panther friends out in the
                wild. Donate 20 Eth to the community wallet
              </p>
            </div>
            <div class="red-bg road-map-box">
              <h2 class="white--text">75% (7500)</h2>

              <p>
                Donate 8 ETH to Navy Marine Corps Relief Society. Donate 20 Eth
                to the Community Wallet. 5 Eth holder giveaways (1 eth to 5
                lucky holders chosen at random)
              </p>
            </div>
            <div class="red-bg road-map-box">
              <h2 class="white--text">100% (10,000)</h2>

              <p>
                Donate 20 Eth to community wallet. Organize Rare Panther Party
                Community Event, Members Only Merch through Website, Rarity
                Tools Ranking, Companion whitelist, Bandyland Metaverse, and
                more to come!
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
$white: #fff;
.road-map-box {
  width: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  color: $white;
  margin-bottom: 20px;
}
.rare-text-section {
  padding: 0px 120px;
  @media (max-width: 1100px) {
    font-size: 20px;
    padding: 0px 30px;
  }
  @media (max-width: 959px) {
    padding: 0px 0px;
    font-size: 14px;
  }
  h2 {
    border-radius: 20px;
    color: $white;
  }
}
</style>
