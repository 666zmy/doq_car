<template>
  <div class="box_car">
    <!-- <van-button type="primary">主要按钮</van-button> -->
    <div class="title" v-if="false"></div>
    <div class="content">
      <div class="fill_info">
        <div class="fill_info_item_top">
          <img src="./assets/carImage/BrowserPreview_tmp_03.jpg" />
          <div class="next_icon">
            <i class="iconfont icon-dian"></i>
            <i class="iconfont icon-dian"></i>
            <i class="iconfont icon-dian"></i>
            <i class="iconfont icon-youjiantou"></i>
          </div>
          <img src="./assets/carImage/BrowserPreview_tmp_05.jpg" />
          <div class="next_icon">
            <i class="iconfont icon-dian"></i>
            <i class="iconfont icon-dian"></i>
            <i class="iconfont icon-dian"></i>
            <i class="iconfont icon-youjiantou"></i>
          </div>
          <img src="./assets/carImage/BrowserPreview_tmp_05.jpg" />
        </div>
        <div class="fill_info_item_bottom">
          <span>填写信息</span>
          <span>提交申请</span>
          <span>专属顾问回电</span>
        </div>
      </div>
      <div class="money_action">
        <div class="money_action_top">
          <p>
            <img src="./assets/carImage/BrowserPreview_tmp_16.jpg" />
            <span>本地正规机构放款</span>
          </p>
          <p>
            <img src="./assets/carImage/BrowserPreview_tmp_19.jpg" />
            <span>最高可融资评估价8成</span>
          </p>
        </div>
        <div class="money_action_bottom">
          <p>
            <img src="./assets/carImage/BrowserPreview_tmp_23.jpg" />
            <span>各类乘用车型均可融资</span>
          </p>
          <p>
            <img src="./assets/carImage/BrowserPreview_tmp_24.jpg" />
            <span>线上自助提前结清</span>
          </p>
        </div>
      </div>
      <div class="userInfo_form">
        <div class="userInfo_item">
          <img src="./assets/carImage/BrowserPreview_tmp_28.jpg" />
          <input type="text" placeholder="请输入您的姓名" v-model="form.name" />
        </div>
        <div class="userInfo_item">
          <img src="./assets/carImage/BrowserPreview_tmp_31.jpg" />
          <input
            type="text"
            placeholder="请选择您的所在地区"
            @click="areaPopupVisible = true"
            readonly="readonly"
            v-model="selectAreaValue"
          />
        </div>
        <div class="userInfo_item">
          <img src="./assets/carImage/BrowserPreview_tmp_33.jpg" />
          <input
            type="number"
            placeholder="请输入您的手机号码"
            v-model="form.phone"
            @blur="handlePhoneBlur"
            max="11"
          />
        </div>
        <div class="userInfo_item noteCode">
          <img src="./assets/carImage/BrowserPreview_tmp_35.jpg" />
          <input
            type="text"
            placeholder="请输入短信验证码"
            v-model="form.note"
          />
          <div class="message_code" @click="onCodeInfo">{{btnTitle ? btnTitle : '获取验证码'}}</div>
        </div>
        <div class="check_box">
          <div class="check_left">
            <p>
              <input type="checkbox" v-model="form.house" />
              <van-icon name="success" />
              <span>我有房</span>
            </p>
            <p>
              <input type="checkbox" v-model="form.accumulationFund" />
              <span>我有公积金</span>
            </p>
            <p>
              <input type="checkbox" v-model="form.businessOwners" />
              <span>我是企业主</span>
            </p>
          </div>
          <div class="check_right">
            <p>
              <input type="checkbox" v-model="form.insurancePolicy" />
              <span>我有寿险保单</span>
            </p>
            <p>
              <input type="checkbox" v-model="form.personalTax" />
              <span>我有个税</span>
            </p>
            <p>
              <input type="checkbox" v-model="form.officeWorker" />
              <span>我是上班族</span>
            </p>
          </div>
        </div>
        <div class="submit_action">
          <input
            class="submit_btn"
            type="button"
            @click="onSubmit"
            :disabled="!form.agreement"
            value="立即申请"
            :class="{ disabledSubmit: !form.agreement }"
          />
          <div class="user_agree">
            <input type="checkbox" v-model="form.agreement" />
            <span>我已经阅读并接受</span>
            <span>
              <i class="iconfont icon-jiantou_zuo"></i>
              <b>用户服务协议</b>
              <i class="iconfont icon-jiantou_you"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer_info">
      <div class="footer_top">
        <p>温馨提示: 融资有风险,申请需谨慎;请根据个人能力合理申</p>
        <p>请,避免逾期;融资额度、放款时间以实际审批结果为准。</p>
      </div>
      <div class="footer_bottom">
        <p>放款资金由正规金融持牌放款机构提供</p>
        <p>浙江鸿曜融资租赁有限公司版权所有</p>
        <p>浙ICP备2020030141号- 1</p>
      </div>
    </div>
    <!-- 省市区选择-- -->
    <van-popup
      v-model="areaPopupVisible"
      position="bottom"
      round
      :style="{ height: '30%' }"
    >
      <van-picker
        show-toolbar
        title="请选择地区"
        value-key="name"
        :columns="areaList"
        @change="onAreaChange"
        @cancel="onAreaCancel"
        @confirm="onAreaConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
import Vue from 'vue'
import { Toast, Popup, Picker, Icon } from 'vant'
import { getAreaselect } from './api/login'
Vue.use(Toast)
Vue.use(Picker)
Vue.use(Popup)
Vue.use(Icon)
export default {
  name: 'LoginCar',
  data () {
    return {
      getCodeFlag: false, // 获取 false ==>验证码文案和  true开始读'秒后重试'文案判断
      btnTitle: '', // 验证码提示信息
      areaList: [
        {
          values: [] // 第一层数据 省份
        },
        {
          values: [] // 第二层数据 市区
        },
        {
          values: [] // 第三层数据 县
        }
      ], // 省市区数据
      areaPopupVisible: false,
      selectAreaValue: '', // 省市区回显
      form: {
        name: '',
        areaName: [], // 选择的城市区的名字
        phone: '',
        note: '',
        // --复选框
        house: false, // 房子
        accumulationFund: false, // 公积金
        businessOwners: false,
        insurancePolicy: false,
        personalTax: false, // 个税
        officeWorker: false, // 上班族
        agreement: false // 是否勾选用户协议
      },
      validPhone: false // 手机号校验是否通过  提交时候默认关闭手机号校验失败提示
    }
  },
  mounted() {
    this.getAreaMethod('', 0) // 初始化 获取所有省份
  },
  methods: {
    // 手机号校验
    handlePhoneBlur() {
      this.validePhoneMethod()
    },
    // 省市区联动取消
    onAreaCancel() {
      this.areaPopupVisible = false
    },
    // 省市区联动确认
    onAreaConfirm(values, index) {
      // 0-清空上一次确定的信息
      this.form.areaName = []
      // eslint-disable-next-line no-unused-vars
      console.log(values, index, 'confirem')
      // 1- 处理所选择
      values &&
        values.length &&
        values.forEach(item => {
          if (item) {
            this.form.areaName.push(item.name)
          }
        })
      this.selectAreaValue = this.form.areaName.join(' ')
      this.areaPopupVisible = false
    },
    // 当picker地区选择变化时
    onAreaChange(picker, values, index) {
      // 多列情况下 picker实例  values当前选中的值  index当前操作的列索引
      // console.log(
      //   picker,
      //   values,
      //   index,
      //   'Picker使用 setColumnValues 方法实现多列联动'
      // )
      // 请求接口
      if (index < 2) {
        this.getAreaMethod(values[index].id, index + 1)
      }
    },
    getAreaMethod(ParentId, index) {
      ParentId = ParentId || 1
      // 0-父级id   index表示picker操作的是哪一列数据(type   0表示省份,1表示市,2表示区县)
      getAreaselect({ areaId: ParentId, type: index }).then(res => {
        // 1- areaId初始值 选择省或市的id,初始传1
        console.log(res, 'ressss')
        if (res.data.success) {
          this.areaList[index].values = [{ name: '请选择' }, ...res.data.voList]
          // 2-选择当前列的时候 清空下一列数据
          if (index < 2) {
            this.areaList[index + 1].values = []
          }
        }
      })
    },
    // 验证码校验
    onCodeInfo () {
      let time = 60
      if (this.validePhoneMethod()) {
        // 手机号校验通过发送验证码  实现发送倒计时
        const timer = setInterval(() => {
          if (time === 0) {
            clearInterval(timer)
            this.getCodeFlag = false
            this.btnTitle = '获取验证码'
          } else {
            this.btnTitle = time + '秒后重试'
            this.getCodeFlag = true
            time--
          }
        }, 1000)
      }
    },
    // 手机号校验函数
    validePhoneMethod () {
      if (!this.form.phone) {
        Toast('请输入你的手机号')
      } else if (!/^1[345678]\d{9}$/.test(this.form.phone)) {
        Toast('抱歉手机号不合法')
      } else {
        return true
      }
    },
    onSubmit () {
      if (!this.form.name) {
        Toast('请输入你的名字')
        return
      }
      if (this.form.areaName.length === 0) {
        Toast('请选择您的所在地区')
        return
      }
      // 手机号校验失败===为空或者格式不对
      if (!this.validePhoneMethod()) {
        return
      }
      if (!this.form.note) {
        Toast('请输入你的验证码')
        return
      }
      if (this.validPhone) {
        Toast('抱歉手机号不合法')
        return
      }
    }
  }
}
</script>
<style lang="less" scoped>
// body {
//   max-width: 640px !important; //最大适配到640px 结合js来实现
//   margin: 0 auto !important; //当前页面剧中显示 当设备超过640
// }
.box_car {
  background: url('./assets/carImage/bg.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 40rem;
  position: relative;
  -webkit-font-smoothing: antialiased;
  padding-top: 13rem;
  padding-bottom: 1rem;
  box-sizing: content-box;
  .title {
  }
  .content {
    background: #fff;
    width: 94%;
    margin: auto;
    padding: 1rem;
    border-radius: 0.3rem;
    .fill_info {
      .fill_info_item_top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .next_icon {
          i {
            font-size: 0.8rem;
          }
          & :nth-child(1) {
            color: #d3d9fa;
          }
          & :nth-child(2) {
            color: #9ab2fa;
          }
          & :nth-child(3) {
            color: #6182f9;
          }
          & :nth-child(4) {
            color: #5e80fa;
            font-weight: 700;
          }
        }
      }
      .fill_info_item_bottom {
        display: flex;
        color: #7f7f7f;
        font-size: 0.7rem;
        justify-content: space-between;
        padding-top: 0.4rem;
        span:nth-child(2) {
          margin-left: 1rem;
        }
        span:nth-child(3) {
          margin-right: -0.5rem;
        }
      }
      img {
        width: 3rem;
        height: 3rem;
      }
    }
    .money_action {
      font-size: 0.7rem;
      .money_action_top {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
        p {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          img {
            width: 2rem;
            height: 2rem;
          }
        }
      }
      .money_action_bottom {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
        p {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          img {
            width: 2rem;
            height: 2rem;
          }
          input {
          }
        }
      }
    }
    .userInfo_form {
      margin-top: 0.5rem;
      .userInfo_item {
        display: flex;
        align-items: center;
        border-bottom: 0.1rem solid #f7f6fb;
        height: 2.5rem;
        img {
          width: 1rem;
          height: auto;
          margin-right: 0.2rem;
        }
        input {
          font-size: 0.8rem;
          width: 100%;
        }
        ::-webkit-input-placeholder {
          /* Chrome/Opera/Safari */
          color: #c7c7c7;
        }
        ::-moz-placeholder {
          /* Firefox 19+ */
          color: #c7c7c7;
        }
        :-ms-input-placeholder {
          /* IE 10+ */
          color: #c7c7c7;
        }
        :-moz-placeholder {
          /* Firefox 18- */
          color: #c7c7c7;
        }
        .message_code {
          color: #8099ee;
          font-size: 0.9rem;
        }
      }
      .noteCode {
        input {
          width: auto;
        }
      }
      .check_box {
        margin-top: 0.3rem;
        display: flex;
        justify-content: space-between;
        color: #989898;
        font-size: 0.8rem;
        input {
          width: 0.8rem;
          height: 0.8rem;
        }
        input[type='checkbox']:checked {
          color: #fff;
          background: #005cc8;
        }

        span {
          margin-left: 0.5rem;
        }
      }
      .submit_action {
        margin-top: 0.5rem;
        .submit_btn {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 2.6rem;
          border-radius: 1.3rem;
          color: #fff;
          background: #597cf4;
          width: 100%;
        }
        .disabledSubmit {
          background: #ccc;
        }
        .user_agree {
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.5rem;
          input {
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
          }
          span:nth-of-type(1) {
            color: #aeaeae;
            padding: 0 0.2rem;
          }
          span:nth-of-type(2) {
            color: #5d89d5;
            i {
              font-size: 0.5rem;
            }
          }
        }
      }
    }
  }
  .footer_info {
    color: #fff;
    .footer_top {
      padding-top: 0.6rem;
      font-size: 0.7rem;
      line-height: 1.2rem;
      text-align: center;
    }
    .footer_bottom {
      padding-top: 1rem;
      font-size: 0.5rem;
      transform: scale(0.9);
      text-align: center;
    }
  }
}
</style>
