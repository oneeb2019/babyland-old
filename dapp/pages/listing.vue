<template>
  <v-container>
    <v-row>
      <v-col md="4" cols="12" sm="4" class="d-flex justify-center">
        <v-card class="mx-auto" max-width="320">
          <img src="~/assets/images/nft13.jpg" />

          <v-card-title> Bandy </v-card-title>

          <v-card-subtitle>
            Artist and Creative Lead<br />
            <a href="https://twitter.com/RAREBANDY" target="_blank"
              >@RAREBANDY</a
            ></v-card-subtitle
          >
          <p>
            Anderson Miller, Jr., known professionally as Bandy is an Artist,
            Designer and Active-Duty Service Member in the United States Navy.
            Although a creative his entire life, his career dates back to 2010
            where he began his first street wear brand and began hosting art
            shows in Detroit, MI. He created Rare Panthers NFT to try and even
            the playing field for those who may have missed out on popular blue
            chip NFTs, and to build and give back to the community.
          </p>
        </v-card>
      </v-col>
      <v-col md="4" cols="12" sm="4" class="d-flex justify-center">
        <v-card class="mx-auto" max-width="320">
          <img src="~/assets/images/Calvin.jpg" />

          <v-card-title> Calvin </v-card-title>

          <v-card-subtitle>
            Metaverse and 3D Designer<br />
            <a href="https://twitter.com/HardArchitects" target="_blank"
              >@HardArchitects</a
            ></v-card-subtitle
          >
          <p>
            Calvin Ha is a digital architect that specializes in creating
            innovative virtual spaces within the metaverse. He’s currently
            collaborating on projects with Spatial, MoNA Gallery, Woodies and
            more.Along with collaborating on the RarePanthers Genesis and
            Generative projects, Calvin will oversee the creation of BandyLand
            metaverse! As a Co-Founder and the metaverse architect for
            BandyLand, Calvin sees this project and future RARE projects pushing
            the boundaries in not only in the digital space but the physical
            space as well.
          </p>
        </v-card>
      </v-col>
      <v-col md="4" cols="12" sm="4" class="d-flex justify-center">
        <v-card class="mx-auto" max-width="320">
          <img src="~/assets/images/Ash.jpg" />

          <v-card-title> Asher </v-card-title>

          <v-card-subtitle>
            BandyLand Project Manager<br />
            <a href="#"> @CryptoAsh_eth</a></v-card-subtitle
          >
          <p>
            Asher Koreman is an artist, technology, and brand marketing
            professional. He joined BandyLand as the main NFT advisor. With over
            8 years’ experience in the blockchain space and over 2 years in NFTs
            Asher offers a unique and experienced insight into the NFT market,
            landscape, and branding opportunities. He hopes to one day make
            BandyLand a household name along the likes of Lego and Disney.
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {}
</script>

<style lang="scss" scoped>
$pink: #f78282;
$red: #c3161a;
$black: #000000;
$blue: #0081dd;
$white: #ffffff;
$general-font: 'Acme', sans-serif;
.v-card {
  color: $black;
  text-align: center;
  font-family: $general-font;
  p {
    font-size: 13px;
    padding: 0px 15px;
    font-weight: normal;
  }
}
.image-box {
  transition: all 1s cubic-bezier(0.08, 0.82, 0.24, 0.99) 0s;
  border-radius: 5px;
  display: inline-flex;

  &:hover {
    transition: all 0.3s cubic-bezier(0.08, 0.82, 0.24, 0.99) 0s;
    transform: scale(1.05) rotate(2deg);
  }
}
.v-card__title,
.v-card__subtitle {
  color: $black !important;
  justify-content: center;
  text-align: center;
  font-family: $general-font;
  justify-content: center;
}
</style>
