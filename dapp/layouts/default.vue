<template>
  <v-app>
    <v-app-bar
      class="app-nav"
      color="transparent"
      clipped-left
      app
      elevation="0"
    >
      <v-toolbar-title>
        <nuxt-link style="text-decoration: none" to="/">
          <img src="/images/logo.png" style="max-height: 80px" alt="logo png" />
        </nuxt-link>
      </v-toolbar-title>

      <div class="social-btns">
        <v-btn
          href="https://twitter.com/RAREBANDY"
          target="_blank"
          fab
          text
          redtext
        >
          <v-icon>mdi-twitter</v-icon>
        </v-btn>

        <v-btn
          href="https://discord.gg/aRhmBMugnw"
          target="_blank"
          fab
          text
          redtext
        >
          <v-icon>mdi-discord</v-icon>
        </v-btn>

        <v-btn
          large
          class="ma-3 black--text metamask-btn"
          text
          @click="metamaskButtonClicked()"
        >
          {{ walletBtnText }}
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <!-- <banner /> -->
      <nuxt />
    </v-main>

    <!-- <img
      src="/images/banner.png"
      style="
        width: 500px;
        margin: 15px;
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
      "
      alt="rad logo"
      class="logo-img"
    /> -->

    <v-footer v-if="showNonMainnetWarning" color="transparent" app>
      <v-card class="flex" flat>
        <v-card-text class="red white--text text-center">
          <strong>Warning!!</strong> Not connected to Ethereum Mainnet
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script>
import { ethers } from 'ethers'
import { RPC_PROVIDER, NETWORK_ID, CONTRACT_ADDR } from '../constants'

// import banner from '../pages/banner.vue'
export default {
  //components: { banner },
  auth: false,
  data() {
    return {
      contractAddress: CONTRACT_ADDR,
      walletBtnText: 'CONNECT WALLET',
      ethers: null,
      provider: null,
      showNonMainnetWarning: false,
    }
  },
  mounted() {
    //this.rpcProviderInit()
  },
  methods: {
    goToUrl(url) {
      this.$router.push(url)
    },
    goToExternalUrl(url) {
      window.open(url, '_blank')
    },
    async metamaskButtonClicked() {
      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
      await provider.send('eth_requestAccounts', [])
      this.signer = provider.getSigner()
      this.provider = 'web3'
      this.ethers = new ethers.providers.Web3Provider(window.ethereum, 'any')
      this.ethers.on('network', (newNetwork, oldNetwork) => {
        if (oldNetwork) {
          window.location.reload()
        }
      })
      this.signer = this.ethers.getSigner()
      this.account = await this.signer.getAddress()
      this.balance = await this.signer.getBalance()
      this.ethBalance = await ethers.utils.formatEther(this.balance)
      this.signer = this.ethers.getSigner()
      const addr = await this.signer.getAddress()
      this.walletBtnText =
        addr.substr(0, 7) + '...' + addr.substr(addr.length - 5, addr.length)
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length < 1) return
        this.walletBtnText =
          accounts[0].substr(0, 7) +
          '...' +
          accounts[0].substr(accounts[0].length - 5, accounts[0].length)
      })
      localStorage.setItem('wallet_text', this.walletBtnText)
      const { chainId } = await this.ethers.getNetwork()
      if (chainId !== 1) {
        this.showNonMainnetWarning = true
      }
    },
  },
}
</script>
<style scoped>
#styled-input {
  height: 48px;
  width: 48px;
}
.styled-input label[for] {
  height: 48px;
}
.v-navigation-drawer > .list:not(.list--dense) .list__tile {
  font-size: 17px;
}
.avatar {
  max-width: 75px;
}
/* .list__tile--active.list__tile.list__tile--link {
} */
a.nuxt-link-exact-active.list__tile--active.list__tile.list__tile--link {
  font-weight: 900 !important;
}
.v-list-item {
  border-left: 10px solid transparent;
}
.v-list-item--active {
  color: #333;
  border-left: 10px solid #ff5122;
}
.glow {
  -webkit-text-stroke: 1px #97adc5;
  text-shadow: 0 0 15px rgb(137 246 143 / 77%), 0 0 10px transparent;
  -webkit-text-fill-color: transparent;
}
h1 {
  letter-spacing: 0.5px;
}

.v-main {
  padding-top: 25px !important;
}

.social-btns {
  display: flex;
}

::v-deep .social-btns a {
  width: 72px;
  height: 72px;
}

::v-deep .social-btns i {
  font-size: 42px !important;
  color: #fff !important;
}

.logo-img {
  width: 100%;
  max-height: 820px;
  position: absolute;
  bottom: 0;
  z-index: 0;
}
.metamask-btn {
  background-color: #fff;
  color: #000 !important;
  font-family: 'Acme', sans-serif;
}
</style>
