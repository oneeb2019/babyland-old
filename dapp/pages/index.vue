<template>
  <div>
    <div class="banner-main">
      <v-container class="relative">
        <v-row class="justify-center align-item-center">
          <v-col md="4" lg="4" sm="6">
            <img src="~/assets/images/loop.gif" />
            <p>Minted {{ totalMinted }} /1000</p>
            <v-progress-linear v-model="value" height="10" striped>
              <template v-slot:default="{ value }">
                <strong class="d-none">{{ value }}</strong>
              </template></v-progress-linear
            >

            <p></p>
          </v-col>
          <v-col md="4" lg="4" sm="6">
            <div class="main-block">
              <p
                v-if="totalMinted && totalMinted > 9900"
                class="display-1 ma-5 subtitle text-xs-center justify-center"
                style="text-align: center; font-weight: bold"
              >
                <br /><br />
                <span class="display-3 glow" style="font-weight: bold"
                  >SOLD OUT!
                </span>
                <br />
                <br />
                Thank you for participating!<br /><br />
              </p>

              <v-card
                style="text-align: center; width: 100%"
                class="pa-5 ma-5 text-xs-center justify-center newform"
                v-if="
                  1 &&
                  totalMinted < 9900 &&
                  !isLoading &&
                  !txHash &&
                  (presaleStartTime != 9999999999 ||
                    saleStartTime != 9999999999)
                "
                elevation="0"
              >
                <div class="search-form__row text-xs-center justify-center">
                  <v-form lazy-validation>
                    <div>
                      <div class="sel-btn">
                        <p>Quantity</p>
                        <v-select
                          :items="Array.from({ length: 3 }, (_, i) => i + 1)"
                          class="quantity-input text-center"
                          label="Qty"
                          v-model="amount"
                          solo
                          required
                        >
                          <template slot="selection" slot-scope="{ item }">
                            <span class="mx-auto qty-amount">
                              {{ item }}
                            </span>
                          </template>
                        </v-select>
                      </div>

                      <v-btn
                        solo
                        class="mint-btn black--text metamask-btn v-btn v-btn--text v-size--large"
                        @click="
                          errorText = ''
                          mintBtnPressed()
                        "
                      >
                        MINT A PANTHER
                      </v-btn>
                    </div>
                  </v-form>
                </div>

                <p class="caption ma-5">
                  {{ pricePerNFTWei / 1000000000000000000 }} ETH / RARE PANTHER
                </p>
              </v-card>

              <v-card
                style="text-align: center"
                class="pa-5 ma-5 text-xs-center justify-center card-full"
                v-if="isLoading"
                elevation="0"
              >
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
                <p class="ma-3 caption white--text">{{ loadingText }}</p>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <boxes />
    <rare />
    <season />
    <!-- <club /> -->
    <seasontwo />
    <seasonthree />
    <faq />
    <listing />
    <NewFooter />

    <!-- <v-card
      style="text-align: center"
      class="pa-5 ma-5 text-xs-center justify-center"
      color="#333"
    >
      <p class="ma-5">
        <a
          style="color: warning"
          :href="`https://etherscan.com/address/${contractAddress}#code`"
          target="_blank"
          >official smart contract</a
        >
      </p>
    </v-card>

    <v-card
      v-if="txHash"
      style="text-align: center"
      class="pa-5 ma-5 text-xs-center justify-center"
      color="#333"
    >
      <p style="text-align: center" class="title ma-5">
        Transaction hash
        <span style="font-weight: bold"
          ><a target="_blank" :href="`https://etherscan.io/tx/${txHash}`"
            >here</a
          ></span
        >
      </p>
      <p style="text-align: center">
        In a few minutes, your NFT will show up in Opensea<br />
        <span style="font-weight: bold">
          <a target="_blank" href="https://opensea.io/collection/rare-panthers"
            >https://opensea.io/collection/rare-panthers</a
          >
        </span>
      </p>
      <br />
    </v-card> -->

    <v-dialog v-model="dialogError" class="ma-5 pa-5" max-width="600px">
      <v-card class="warning">
        <v-card-title>
          <span>{{ errorText }}</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="blue darken-1"
            text
            @click="
              dialogError = false
              errorText = ''
            "
          >
            EXIT
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ethers } from 'ethers'
import {
  CONTRACT_ADDR,
  RPC_PROVIDER,
  NETWORK_ID,
  WHITELISTED,
} from '../constants'
import { ERC721_ABI } from '../erc721_abi'
const EthersUtils = require('ethers').utils
import whitelistData from '../whitelist.json'
import boxes from './boxes'
import rare from './rare'
import season from './season'
import Club from './club'
import Seasontwo from './seasontwo.vue'
import Seasonthree from './seasonthree.vue'
import Faq from './faq.vue'
import Listing from './listing.vue'
import NewFooter from './newfooter.vue'
export default {
  auth: false,
  components: {
    boxes,
    rare,
    season,
    Club,
    Seasontwo,
    Seasonthree,
    Faq,
    Listing,
    NewFooter,
  },
  data() {
    return {
      id: null,
      totalMinted: null,
      whitelist: whitelistData,
      amount: 1,
      isLoading: false,
      dialogConfirmation: false,
      catID: null,
      adoptedCats: null,
      tokenID: null,
      contract: null,
      loadingText: 'loading...',
      account: null,
      contractAddress: null,
      itemPriceETH: null,
      itemPriceWei: null,
      txHash: null,
      isOwned: false,
      isSaleActive: false,
      isPresaleActive: false,
      isWaitYourTurn: false,
      ethers: null,
      signer: null,
      provider: null,
      errorText: '',
      dialogAdoptMany: false,
      dialogError: false,
      walletAddress: null,
      showRandNFTs: false,
      walletAddress: null,
      maxPresale: null,
      pricePerNFTWei: 50000000000000000,
      maxSupply: 9999,
      maxSupplyPresale: 2000,
      presaleStartTime: 9999999999,
      saleStartTime: 9999999999,
      maxFlashSale: null,
      value: 0,
    }
  },
  async mounted() {
    this.id = this.$route.query.id
    this.contractAddress = CONTRACT_ADDR

    this.initialize()

    this.timerOperations()
    const timer = setInterval(() => {
      this.timerOperations()
    }, 20000)

    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer)
      this.$recaptcha.destroy()
    })

    try {
      await this.$recaptcha.init()
    } catch (e) {
      console.error(e)
    }
    this.isLoading = true
    this.loadingText = 'client synchronization status... pending'

    if (this.totalMinted <= 2500) {
      return (this.value = 25)
    }
    if (this.totalMinted <= 5000) {
      return (this.value = 50)
    }
    if (this.totalMinted <= 7500) {
      return (this.value = 75)
    }
    if (this.totalMinted <= 10000) {
      return (this.value = 100)
    }
  },

  methods: {
    initialize() {
      this.provider = 'not_web3'
      this.ethers = new ethers.providers.JsonRpcProvider(
        RPC_PROVIDER,
        NETWORK_ID
      )
      this.contract = new ethers.Contract(
        CONTRACT_ADDR,
        ERC721_ABI,
        this.ethers
      )
    },
    async timerOperations() {
      this.totalMinted = Number(await this.contract.totalSupply())
      if (this.presaleStartTime == 9999999999) {
        //skip useless calls
        this.presaleStartTime = Number(await this.contract.presaleStartTime())
        this.saleStartTime = Number(await this.contract.saleStartTime())
      }

      console.log('minted = ', this.totalMinted, ' / ', this.maxSupply)
      console.log('time now = ', Math.round(new Date().getTime() / 1000))
      console.log('saleStartTime = ', this.saleStartTime)
      console.log('presaleStartTime = ', this.presaleStartTime)
      this.isLoading = false
      // console.log(this.totalMinted, 'show')
    },

    async mintBtnPressed() {
      let unixNow = Math.round(new Date().getTime() / 1000)
      //if sale timer < block timestamp and minted < max total supply, public sale
      if (this.saleStartTime < unixNow && this.totalMinted < this.maxSupply) {
        console.log('public sale stage active')
        await this.publicSaleBuy(this.amount)
        return
      }

      //if presale time is < block timestamp & minted < maxPresale limit then trigger
      //a whitelist presale buy
      if (
        this.presaleStartTime < unixNow &&
        this.totalMinted < this.maxSupplyPresale
      ) {
        console.log('whitelist stage active')
        await this.preSaleBuy(this.amount)
        return
      }

      this.$toast.error('Please wait until presale or sale are active')
    },

    async preSaleBuy(quantity) {
      this.txHash = null
      this.isLoading = true
      this.loadingText = 'sending transaction to the blockchain...'

      this.ethers = new ethers.providers.Web3Provider(window.ethereum, 'any')
      await this.ethers.send('eth_requestAccounts', [])

      this.signer = this.ethers.getSigner()
      this.contract = new ethers.Contract(
        CONTRACT_ADDR,
        ERC721_ABI,
        this.signer
      )
      this.account = await this.signer.getAddress()

      //WHITELIST EXPLANATION
      //parse the generate whitelist json
      let whitelistInfo = null
      for (let i = 0; i < this.whitelist.length; i++) {
        if (this.whitelist[i]['Address'] == this.account) {
          whitelistInfo = this.whitelist[i]
        }
      }
      if (!whitelistInfo) {
        this.$toast.error(
          'Your address ' +
            this.account +
            ' is not whitelisted. Please connect with the correct wallet'
        )
        this.isLoading = false
        return
      }

      try {
        //const gasLimit = quantity * 200000
        this.itemPriceWei = Number(this.pricePerNFTWei)

        const overrides = {
          value: String(Number(quantity) * Number(this.itemPriceWei)),
          //gasLimit: gasLimit,
        }

        const tx = await this.contract.whitelistBuy(
          quantity,
          whitelistInfo['TokenID'],
          whitelistInfo['Proof'],
          overrides
        )
        if (tx.hash) {
          await this.onTxHashLogic(tx.hash)
        }
      } catch (err) {
        this.isLoading = false
        if (err.message.includes('denied')) {
          this.$toast.info('you canceled the transaction')
        } else {
          this.$toast.error(err.message)
        }
      }
    },

    async onTxHashLogic(txHash) {
      this.$toast.info('transaction submitted successfully')
      this.loadingText = 'waiting for miners to mine it...'
      await this.ethers.waitForTransaction(txHash)

      try {
        let receipt = await this.ethers.getTransactionReceipt(txHash)
        if (receipt === null) {
          console.log(`Failed to get tx receipt....`)
          this.isLoading = false
        }
        console.log('receipt :>> ', receipt)
        console.log(`Receipt confirmations:`, receipt.confirmations)
        this.$toast.info('transaction was minted successfully')
        this.isLoading = false
        this.txHash = txHash
      } catch (er) {
        console.log(`Receipt error:`, er)
      }
    },

    async publicSaleBuy(quantity) {
      this.txHash = null
      this.isLoading = true
      this.loadingText = 'sending transaction to the blockchain...'

      this.ethers = new ethers.providers.Web3Provider(window.ethereum, 'any')
      await this.ethers.send('eth_requestAccounts', [])

      this.signer = this.ethers.getSigner()
      this.contract = new ethers.Contract(
        CONTRACT_ADDR,
        ERC721_ABI,
        this.signer
      )

      try {
        //const gasLimit = quantity * 100000
        this.itemPriceWei = Number(this.pricePerNFTWei)

        const overrides = {
          value: String(Number(quantity) * Number(this.itemPriceWei)),
          //gasLimit: gasLimit,
        }

        const tx = await this.contract.buy(quantity, overrides)
        if (tx.hash) {
          await this.onTxHashLogic(tx.hash)
        }
      } catch (err) {
        this.isLoading = false
        if (err.message.includes('denied')) {
          this.$toast.info('you canceled the transaction')
        } else {
          this.$toast.error(err.message)
        }
      }
    },

    async checkMetamaskConnected() {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum,
          'any'
        )
        // Prompt user for account connections
        await provider.send('eth_requestAccounts', [])

        this.signer = this.ethers.getSigner()
        this.account = await this.signer.getAddress()
        this.balance = await this.signer.getBalance()
        this.ethBalance = await ethers.utils.formatEther(this.balance)
        this.signer = this.ethers.getSigner()
        this.walletAddress = await this.signer.getAddress()
        this.walletBtnText =
          this.walletAddress.substr(0, 7) +
          '...' +
          this.walletAddress.substr(
            this.walletAddress.length - 5,
            this.walletAddress.length
          )

        const chainId = this.ethers._network.chainId
        this.$store.commit('setSelectedAddress', this.walletAddress)
        this.$store.commit('setNetworkID', Number(chainId))

        if (chainId !== 1) {
          this.showNonMainnetWarning = true
        }
        return true
      } else {
        this.$router.push('/other/install_metamask')
        return false
      }
    },
    viewOnOpenSea() {
      const url =
        'https://opensea.io/assets/' + this.contractAddress + '/' + this.id
      window.open(url, '_blank')
    },
    format(number) {
      if (number < 10) return '0' + number
      return number
    },
  },

  watch: {
    timerCount: {
      handler(value) {
        setTimeout(() => {
          let now = new Date().getTime()

          // Find the distance between now and the count down date
          let distance = this.countDownDate - now

          // Time calculations for days, hours, minutes and seconds
          let days = this.format(Math.floor(distance / (1000 * 60 * 60 * 24)))
          let hours = this.format(
            Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          )
          let minutes = this.format(
            Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          )
          let seconds = this.format(Math.floor((distance % (1000 * 60)) / 1000))
          this.timerCount = {
            days,
            hours,
            minutes,
            seconds,
          }
        }, 1000)
      },
      immediate: true, // This ensures the watcher is triggered upon creation
    },
  },
}
</script>

<style lang="scss" scoped>
$pink: #f78282;
$red: #c3161a;
$black: #000000;
$blue: #0081dd;
$white: #ffffff;
$general-font: 'Acme', sans-serif;
.main-block {
  max-width: 960px;
  margin: auto;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}
.main-block .m-right {
  position: absolute;
  top: 180px;
  right: -220px;
}
.main-block p {
  line-height: 1.6;
  text-align: center;
  font-size: 20px;
  margin: auto;
}
.main-block img {
  margin: 20px auto;
  max-width: 520px;
}

.container {
  max-width: 1500px;
}
.black-text {
  color: black i !important;
}

.theme--dark.v-input input,
.theme--dark.v-input textarea {
  color: #ea700c;
}

.glow {
  -webkit-text-stroke: 1px #c30f16;
  text-shadow: 0 0 15px rgb(137 246 143 / 77%), 0 0 10px transparent;
  -webkit-text-fill-color: transparent;
}
.centered-input input {
  text-align: center;
}

.container div {
  z-index: 1;
}

.banner {
  display: flex;
}

.banner h2 {
  font-size: 48px;
  font-family: Poppins-ExtraBold;
  padding: 18px 45px;
  background: #c30f16;
  color: #000000;
  text-align: center;
  margin-left: auto;
  width: 100%;
}

.timer {
  display: flex;
  padding: 35px 45px;
  margin-left: 37%;
  line-height: 1.15;
}

.timer div {
  font-family: Poppins-ExtraBold !important;
  font-size: 50px !important;
  text-align: right;
}

.timer span {
  font-size: 51px !important;
  color: #346dac !important;
  font-family: Poppins-ExtraBold !important;
  padding: 0 6px;
  line-height: 1;
}

.timer p {
  font-size: 10px !important;
  font-family: Poppins-ExtraBold !important;
  text-align: center;
  margin: auto;
}

.main-right-block {
  padding-left: 30px;
}

.main-right-block > div {
  display: flex;
  margin-bottom: 40px;
  line-height: 1.2;
}

.main-right-block h3 {
  font-size: 34px;
  font-family: Poppins-Bold;
  width: 185px;
  min-width: 185px;
  text-align: right;
  word-break: break-word;
}

.main-right-block ul {
  margin-left: 25px;
  padding-left: 25px;
  border-left: 4px solid #346dac;
}

.main-right-block ul li {
  margin-bottom: 25px;
}

.main-right-block form {
  margin-left: 25px;
  width: 100%;
}

.sel-btn {
  display: flex;
  justify-content: space-around;
  padding: 5px;
  align-items: center;
  max-width: 242px;
  width: 100%;
  margin-right: 20px;
  background-color: #fff;
  border-radius: 5px;
}

.sel-btn p {
  font-size: 17px !important;
  margin-bottom: 0;
  color: #000 !important;
}

::v-deep .v-icon {
  color: #000 !important;
}

::v-deep .quantity-input {
  max-width: 64px;
  border-left: 1px solid;
  border-radius: 0;
}

::v-deep .v-input__control {
  min-height: 24px !important;
  height: 24px;
}

::v-deep .quantity-input .v-input__slot {
  padding-right: 0px !important;
  margin: auto;
  background: transparent !important;
  box-shadow: none !important;
}

::v-deep .quantity-input .v-select__slot .v-select__selection,
::v-deep .quantity-input .qty-amount,
::v-deep .quantity-input select {
  color: #fff !important;
  text-align: center;
  font-size: 30px !important;
  right: 0 !important;
}

::v-deep .quantity-input .v-text-field__details {
  display: none !important;
}

::v-deep .quantity-input .v-select__slot input {
  display: none;
}

::v-deep .mint-btn {
  font-size: 20px;
  font-weight: bold;
  height: 64px !important;
  background-color: #fff;
  color: #000 !important;
  font-family: 'Acme', sans-serif;
  text-transform: capitalize !important;
  border-radius: 0 !important;
  max-width: 342px;
  width: 100%;
  margin-top: 30px;
}

::v-deep .mint-btn .v-btn__content {
  color: #fff !important;
}

::v-deep .mint-btn {
  will-change: transform;
  transition: transform 250ms;
}

::v-deep .mint-btn:hover {
  transform: translateY(-3px);
}

::v-deep .mint-btn:active {
  transform: translateY(0px);
}

@media (max-width: 1200px) {
  .timer {
    margin-left: 15%;
  }
}

@media (max-width: 767px) {
  .banner h2 {
    font-size: 35px;
    margin: auto;
  }

  .timer {
    text-align: center;
    margin-left: 10%;
  }

  .col {
    padding: 0 !important;
  }

  .main-right-block {
    display: flex;
    flex-direction: column-reverse;
  }

  .main-right-block > div {
    flex-direction: column;
    padding-left: 40px;
    padding-right: 40px;
  }

  .main-right-block h3 {
    width: 100%;
    text-align: left;
  }

  .main-right-block ul {
    margin-left: 0;
    padding-left: 0px;
    padding-top: 25px;
    margin-top: 25px;
    border-left: none;
    border-top: 4px solid #346dac;
  }

  .main-right-block form {
    margin-left: 0;
  }

  .presale-minting {
    margin-bottom: 300px !important;
  }
}

.container {
  max-width: 1500px;
}
.black-text {
  color: black i !important;
}
.theme--dark.v-input input,
.theme--dark.v-input textarea {
  color: #ea700c;
}
.glow {
  -webkit-text-stroke: 1px #9fd8a3;
  text-shadow: 0 0 15px rgb(137 246 143 / 77%), 0 0 10px transparent;
  -webkit-text-fill-color: transparent;
}
.centered-input input {
  text-align: center;
}
.main-block {
  max-width: 560px;
  margin: auto;
  position: relative;
}
.main-block .m-right {
  position: absolute;
  top: 180px;
  right: -220px;
}
.main-block p {
  line-height: 1.6;
  text-align: center;
  font-size: 20px;
  margin: auto;
}
.main-block img {
  margin: 20px auto;
  max-width: 520px;
}
::v-deep .quantity-input {
  width: 180px;
}
::v-deep .quantity-input .v-input__slot {
  height: 48px;
  margin: auto;
}
::v-deep .quantity-input .v-select__slot .v-select__selection,
::v-deep .quantity-input .qty-amount,
::v-deep .quantity-input select {
  color: #000 !important;
  text-align: center;
  font-size: 16px !important;
  right: 0 !important;
  font-family: $general-font;
}
::v-deep .quantity-input .v-text-field__details {
  display: none !important;
}
::v-deep .quantity-input .v-select__slot input {
  display: none;
}
::v-deep .mint-btn {
  border-radius: 4px !important;
  background-color: #fff !important;
  height: 48px !important;
}
::v-deep .mint-btn .v-btn__content {
  font-family: $general-font;
  color: #000 !important;
  font-size: 0.875rem;
}
::v-deep .mint-btn {
  will-change: transform;
  transition: transform 250ms;
}
::v-deep .mint-btn:hover {
  transform: translateY(-3px);
}
::v-deep .mint-btn:active {
  transform: translateY(0px);
}
.search-form__row p {
  line-height: 2;
  text-align: center;
  font-size: 20px;
  margin: auto;
}
@media (max-width: 767px) {
  .main-block img {
    width: 100%;
  }
  ::v-deep .quantity-input {
    width: 100%;
  }
  .main-block .m-right {
    position: relative !important;
    margin-top: 20px;
    top: 0;
    right: 0;
  }
}
.banner-main {
  width: 100%;
  height: 700px;
  background-image: url('~/assets/images/banner-bg.jpg');
  margin-top: -145px;
  background-size: cover;
  background-position: center;
  text-align: center;
  position: relative;
  @media (max-width: 767px) {
    margin-top: -232px;
  }
  @media (max-width: 553px) {
    height: auto;
  }
  &:before {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    content: '';
  }

  .container {
    padding-top: 150px !important;
    @media (max-width: 767px) {
      padding-top: 220px !important;
    }
  }

  img {
    border-radius: 50px;
    transition: all 1s cubic-bezier(0.08, 0.82, 0.24, 0.99) 0s;
    &:hover {
      transition: all 0.3s cubic-bezier(0.08, 0.82, 0.24, 0.99) 0s;
      transform: scale(1.05) rotate(2deg);
    }
    @media (max-width: 959px) {
      max-width: 350px;
      margin: auto;
    }
    @media (max-width: 767px) {
      max-width: 250px;
      margin: auto;
    }
  }
  P {
    color: $white;
    font-family: $general-font;
    margin: 10px 0px;
  }
  .relative {
    position: relative;
  }
}
.newform {
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
.hideMobile {
  @media (max-width: 600px) {
    display: none !important;
  }
}
.caption {
  font-family: $general-font;
}
</style>
<style>
::v-deep .primary--text {
  color: #000 !important;
  caret-color: #000 !important;
}
</style>
