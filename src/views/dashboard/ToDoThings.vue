<template>
  <div class="wallet-div">

    <div class="row">
      <div class="col wallet-detail-tit">{{ $t("dashboard.toDoThings.toDoName") }}</div>
    </div>

    <div class="row text-center" v-show="!toDoThingsViewDisabled">
      <div class="col like-to-do-div" @click="viewDeposit">
        <div>
          <img class="like-to-do-logo" :src="'/static/like-to-do/staking.png'" :alt="$t('token.name')"/>
        </div>
        <div class="like-to-do-tit">{{ $t("action.deposit") }}</div>
      </div>
      <div class="col like-to-do-div" @click="viewWithdraw">
        <div>
          <img class="like-to-do-logo" :src="'/static/like-to-do/withdraw.png'" :alt="$t('token.name')"/>
        </div>
        <div class="like-to-do-tit">{{ $t("action.withdraw") }}</div>
      </div>
    </div>

    <div class="row balance-list-div" v-show="!toDoThingsViewDisabled">
      <div class="col">
        <div class="row">
          <div class="col text-center token-price">{{ $t("dashboard.stats.name") }}</div>
        </div>
        <div class="row balance-item-1">
          <div class="col">
            {{ $t("dashboard.stats.totalRewards") }}
          </div>
          <div class="col text-right"><b>{{0}}{{ $t("dashboard.stats.token") }}</b></div>
        </div>
        <div class="row balance-item-2">
          <div class="col">
            {{ $t("dashboard.stats.totalDeposits") }}
          </div>
          <div class="col text-right"><b>{{0}}{{ $t("dashboard.stats.usd") }}</b></div>
        </div>
        <div class="row balance-item-1">
          <div class="col">
            {{ $t("dashboard.stats.lockedRewards") }}
          </div>
          <div class="col text-right"><b>{{0}}{{ $t("dashboard.stats.token") }}</b></div>
        </div>
        <div class="row balance-item-1">
          <div class="col">
            {{ $t("dashboard.stats.unlockedRewards") }}
          </div>
          <div class="col text-right"><b>{{0}}{{ $t("dashboard.stats.token") }}</b></div>
        </div>
        <div class="row balance-item-2">
          <div class="col">
            {{ $t("dashboard.stats.programDuration") }}
          </div>
          <div class="col text-right"><b>{{0}}{{ $t("dashboard.stats.duration") }}</b></div>
        </div>
        <div class="row balance-item-1">
          <div class="col">
            {{ $t("dashboard.stats.rewardUnlockRate") }}
          </div>
          <div class="col text-right"><b>{{0}}{{ $t("dashboard.stats.month") }}</b></div>
        </div>
      </div>
    </div>

    <div class="row" v-show="toDoThingsViewDisabled">
      <div class="col">
        <input type="submit" class="btn btn-info btn-cancel" value="Cancel"
               @click="cancel"
        >
      </div>
    </div>

    <deposit v-show="!depositDisabled" :hide-deposit="cancel"></deposit>

    <withdraw v-show="!withdrawDisabled" :hide-withdraw="cancel"></withdraw>

    <a-modal
        title=""
        :visible="visible"
        :closable="false"
        :centered="true"
        :cancel-button-props="{ props: { disabled: true } }"
        @ok="handleCancel"
    >
      <p>{{ comingSoonModalText }}</p>
    </a-modal>

  </div>
</template>

<script>
  import Deposit from "./Deposit"
  import Withdraw from "./Withdraw"
  import 'ant-design-vue/dist/antd.css';

  export default {
    name: "ToDoThings",
    data() {
      return {
        toDoThingsViewDisabled: false,
        depositDisabled: true,
        withdrawDisabled: true,
        comingSoonModalText: 'Coming Soon!',
        visible: false,
      }
    },
    methods: {
      handleCancel(e) {
        this.visible = false;
      },
      viewDeposit() {
        this.toDoThingsViewDisabled = true
        this.depositDisabled = false
      },
      viewWithdraw() {
        this.toDoThingsViewDisabled = true
        this.withdrawDisabled = false
      },
      cancel() {
        this.toDoThingsViewDisabled = false
        this.depositDisabled = true
        this.withdrawDisabled = true
      },
      comingSoon() {
        this.visible = true;
      }
    },
    components: { Deposit, Withdraw }
  }
</script>

<style scoped>
.wallet-div {
  border-width: 1px;
  border-style: solid;
  border-color: #4ac7c9;
  border-image: initial;
  border-radius: 5px;
  padding: 32px 24px;
}
.wallet-detail-tit {
  color: #4ac7c9;
  letter-spacing: 1px;
  font-family: apercu-medium, PingFang SC, 'Avenir', Helvetica, Arial, sans-serif;
  font-weight: 500;
  display: flex;
  align-items: center;
  height: 40px;
}
.like-to-do-div {
  cursor: pointer;
  max-width: 336px;
  /*background-color: rgb(28, 26, 40);*/
  box-shadow: rgba(100, 210, 240, 0.3) 0 5px 10px 5px;
  flex: 1 1 0;
  border-width: 1px;
  border-style: solid;
  border-color: #4ac7c9;
  border-image: initial;
  border-radius: 5px;
  transition: transform 0.2s ease-in 0s;
  margin: 8px !important;
  padding: 24px;
}
.like-to-do-logo {
  margin-top: 20px;
  width: 100px;
  height: 100px;
}
.like-to-do-tit {
  font-size: 24px;
  color: #4ac7c9;
  letter-spacing: 2px;
  font-family: apercu-medium, PingFang SC, 'Avenir', Helvetica, Arial, sans-serif;
  margin: 30px 0 20px !important;
}
.like-to-do-txt {
  font-size: 14px;
  color: #4ac7c9;
  letter-spacing: 2px;
  margin: 30px 0 20px !important;
}

.btn-cancel {
  background-color: transparent;
  height: 40px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  font-size: 14px;
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
  border-color: #4ac7c9;
  border-image: initial;
  padding: 2px 20px 0;
  border-radius: 20px;
  transition: all 0.1s ease-in 0s;
  text-decoration: none;
  color: #4ac7c9;
  float: right;
}

.balance-list-div {
  border-width: 1px;
  border-style: solid;
  border-color: #4ac7c9;
  border-image: initial;
  border-radius: 5px;
  padding: 32px 24px;
  margin: 8px !important;
}
.token-price {
  margin-left: 8px !important;
  font-size: 16px;
  font-family: apercu-medium, sans-serif;
  font-weight: bold;
  -webkit-box-align: center;
  align-items: center;
  color: #4ac7c9;
}
.balance-item-1,
.balance-item-2 {
  margin-top: 8px !important;
  font-family: "apercu-regular", PingFang SC, 'Avenir', Helvetica, Arial, sans-serif;
  color: #4ac7c9;
  font-size: 14px;
  padding-top: 4px;
  padding-bottom: 4px;
}
.balance-item-1 {
//background-color: #1c1a27;
}
.balance-logo {
  height: 14px;
  margin-right: 4px;
}
</style>
