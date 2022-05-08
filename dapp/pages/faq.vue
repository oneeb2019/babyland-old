<template>
  <v-container class="mt-5">
    <v-row justify="center">
      <v-col lg="8">
        <v-expansion-panels accordion>
          <v-expansion-panel>
            <v-expansion-panel-header
              >When is Rare Panthers Mint Date?</v-expansion-panel-header
            >
            <v-expansion-panel-content
              >Presale Begins 12/26 and Ends 12/29. Public sale open 12/29.
              Reveal 1/1/22
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header
              >How much does it cost to mint a Rare
              Panther?</v-expansion-panel-header
            >
            <v-expansion-panel-content>
              Mint price will be 0.05 Eth plus gas per a Rare Panther. If you
              own a Genesis Rare Panther you will be airdropped 2 for free!
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header
              >How do I get on the Presale List for Rare
              Panthers?</v-expansion-panel-header
            >
            <v-expansion-panel-content>
              From 12/1 to our mint day we will be giving away chances to win
              presale spots! You could also purchase a Genesis Rare Panther to
              guarantee yourself some free Panthers.
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header
              >Where can I get a Gensis Rare Panther?</v-expansion-panel-header
            >
            <v-expansion-panel-content>
              Genesis Rare Panthers are available on OpenSea at the link
              <a
                href="https://opensea.io/collection/rarepanthers"
                target="_blank"
                >here</a
              >. There are 100 total Genesis Rare Panthers but the remaining few
              are reserved for giveaways to our community.
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
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
<style lang="scss">
$pink: #f78282;
$white: #ffffff;
$general-font: 'Acme', sans-serif;
.v-expansion-panel--active > .v-expansion-panel-header {
  min-height: 1px;
}
.v-expansion-panel::before {
  box-shadow: none;
}
.v-expansion-panel-header {
  background-color: $pink;
  border-radius: 12px;
  min-height: 55px;
  font-size: 1.5rem;
  @media (max-width: 959px) {
    font-size: 1rem;
  }
}
.v-expansion-panel {
  background-color: transparent !important;
  border: none;
  margin-bottom: 20px;
  font-family: $general-font;
}
.v-expansion-panel-content {
  color: #000;
}
.v-expansion-panel-content__wrap {
  padding: 10px 24px 16px;
  font-size: 16px;
  font-weight: normal;
  @media (max-width: 959px) {
    font-size: 16px;
  }
}
.theme--dark.v-expansion-panels
  .v-expansion-panel-header
  .v-expansion-panel-header__icon
  .v-icon {
  color: $white !important;
}
</style>
