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
        <div class="userInfo_item noteCode" v-if="JSON.parse($route.query.isNeedSms)">
          <img src="./assets/carImage/BrowserPreview_tmp_35.jpg" />
          <input
            type="text"
            placeholder="请输入短信验证码"
            v-model="form.code"
          />
          <div class="message_code" @click="onCodeInfo">
            {{ btnTitle ? btnTitle : '获取验证码' }}
          </div>
        </div>
        <div class="check_box">
          <div class="check_left">
            <p>
              <i
                class="iconfont"
                :class="
                  form.checkBoxObj.house ? 'icon-checkbox1' : 'icon-checkbox'
                "
                @click="form.checkBoxObj.house = !form.checkBoxObj.house"
              />
              <span>我有房</span>
            </p>
            <p>
              <i
                class="iconfont"
                :class="
                  form.checkBoxObj.accumulationFund
                    ? 'icon-checkbox1'
                    : 'icon-checkbox'
                "
                @click="
                  form.checkBoxObj.accumulationFund = !form.checkBoxObj
                    .accumulationFund
                "
              />
              <span>我有公积金</span>
            </p>
            <p>
              <i
                class="iconfont"
                :class="
                  form.checkBoxObj.businessOwners
                    ? 'icon-checkbox1'
                    : 'icon-checkbox'
                "
                @click="
                  form.checkBoxObj.businessOwners = !form.checkBoxObj
                    .businessOwners
                "
              />
              <span>我是企业主</span>
            </p>
          </div>
          <div class="check_right">
            <p>
              <i
                class="iconfont"
                :class="
                  form.checkBoxObj.insurancePolicy
                    ? 'icon-checkbox1'
                    : 'icon-checkbox'
                "
                @click="
                  form.checkBoxObj.insurancePolicy = !form.checkBoxObj
                    .insurancePolicy
                "
              />
              <span>我有寿险保单</span>
            </p>
            <p>
              <i
                class="iconfont"
                :class="
                  form.checkBoxObj.personalTax
                    ? 'icon-checkbox1'
                    : 'icon-checkbox'
                "
                @click="
                  form.checkBoxObj.personalTax = !form.checkBoxObj.personalTax
                "
              />
              <span>我有个税</span>
            </p>
            <p>
              <i
                class="iconfont"
                :class="
                  form.checkBoxObj.officeWorker
                    ? 'icon-checkbox1'
                    : 'icon-checkbox'
                "
                @click="
                  form.checkBoxObj.officeWorker = !form.checkBoxObj.officeWorker
                "
              />
              <span>我是上班族</span>
            </p>
          </div>
        </div>
        <div class="submit_action">
          <input
            class="submit_btn"
            type="button"
            @click="onSubmit"
            :disabled="!form.checkBoxObj.agreement"
            value="立即申请"
            :class="{ disabledSubmit: !form.checkBoxObj.agreement }"
          />
          <div class="user_agree">
            <i
              class="iconfont"
              :class="
                form.checkBoxObj.agreement ? 'icon-checkbox1' : 'icon-checkbox'
              "
              @click="form.checkBoxObj.agreement = !form.checkBoxObj.agreement"
            />
            <span>我已经阅读并接受</span>
            <span @click="showDialogInfo">
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
      <van-area
        title="标题"
        :area-list="areaList"
        @change="onAreaChange"
        @cancel="onAreaCancel"
        @confirm="onAreaConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
import areaList from './assets/area.js'
import Vue from 'vue'
import { Toast, Popup, Picker, Icon,Area,Dialog } from 'vant'
import { getAreaselect, sendCode,loginFormSubmit } from './api/login'
Vue.use(Toast)
Vue.use(Picker)
Vue.use(Popup)
Vue.use(Icon)
Vue.use(Area)
Vue.use(Dialog)
export default {
  name: 'LoginCar',
  data() {
    return {
      areaList,
      getCodeFlag: false, // 获取 false ==>验证码文案和  true开始读'秒后重试'文案判断
      btnTitle: '', // 验证码提示信息
      areaPopupVisible: false,
      selectAreaValue: '', // 省市区回显
      form: {
        name: '',
        areaName: [], // 选择的城市区的名字
        province: '', //省名字
        city: '', //城市名字
        area: '', //区名字
        phone: '',
        code: '',
        others: '', // 枚举所有复选框的值
        // --复选框
        checkBoxObj: {
          house: false, // 房子
          accumulationFund: false, // 公积金
          businessOwners: false,
          insurancePolicy: false,
          personalTax: false, // 个税
          officeWorker: false, // 上班族
          agreement: true // 是否勾选用户协议-，默认勾选
        }
      }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    showDialogInfo() {
        Dialog.alert({
  confirmButtonColor: "#1e70f8",
  title: '',
  message: `<div>   尊敬的用户：感谢您选择注册成为吉享云服平台/应用（运营方：浙江鸿曜融资租赁有限公司，以下简称“鸿曜公司”或“我们”）用户。为了维护您的权益，请在点击签署本协议前，审慎阅读、充分理解本协议各部分规则，特别是协议中与免除或者限制责任的条款、法律适用和争议解决相关的加黑加粗文字条款。如对本协议有任何疑问，请向鸿曜公司客服咨询或咨询您的律师或有关专业人士。本协议一经您在鸿曜公司运营的“吉享云服应用”点击确认（或其他类似意思表示，以所在页面显示名称为准）即视为您已完全理解且同意本协议的全部条款，具有法律效力，如您不同意本协议的内容，请您立即停止注册本应用。鸿曜公司有权根据需要不时地修订、修改本协议或各类规则，如本协议有任何变更，鸿曜公司将在“本应用”公告修订内容。如您不同意相关变更，应停止使用“本应用”。各类规则会在发布后生效，亦成为本协议的一部分。登录或继续使用“本应用”将表示您接受经修订的协议。</div>
  <div>  请您理解本应用提供的服务仅供年满18周岁的成年人使用，请您在使用相关产品 或服务前确保您是 18 周岁 ( 含 ) 以上人士。 如您未达到上述年龄的，请您立即终止使用吉享云服产品服务。如果您为未成年人的法定监护人，请您保证您的被监护人不要使用本服务。</div>
  <p> <h3 style='text-align:left'>第一条 定义</h3>
        1.1吉享云服平台/应用：是由鸿曜公司开发、管理和运营，为用户与第三方金融机构提供资金对接、信息撮合的服务平台，同时也是为与鸿曜公司建立合作关系的金融机构提供金融产品展示的技术服务平台，包括但不限于吉享云服-官微、“吉享云服”官网微信公众号(ID：jixiangyunfu)、吉享云服H5页面等网络媒介平台。(简称“本应用”或“本服务”)
        1.2用户：指接受并同意《吉享云服用户协议》全部条款及鸿曜公司发布的其他服务条款和操作规则，访问和使用本应用的使用者。
        1.3第三方金融机构：指与鸿曜公司建立合作关系的银行业金融机构或消费金融公司、信托公司等金融机构及其关联公司，并在本应用开通授信额度申请渠道、小额资金借款渠道的具有相关金融资质、且其金融产品符合法律法规、金融监管要求的机构。
        1.4授信额度：指用户拟通过本应用向第三方金融机构提出授信额度申请，由第三方金融机构独立进行征信审查、评估后为用户核定的短期授信业务的存量指标，用户可在授信余额内申请融资，但该授信额度不是第三方金融机构的融资承诺。</p>
  <p>   <h3 style='text-align:left'>第二条 用户使用方法</h3>
        2.1您可以通过手机等移动终端设备，以客户端形式使用本协议项下服务，具体以本平台提供的为准。
        2.2鸿曜公司给予您一项个人的、不可转让及非排他性的许可，以使用本平台。您可以在终端设备上使用、登录。
        2.3为使用本平台，您需要通过客户端填写手机号码、验证码，用于验证真实性。</p>
  <p>  <h3 style='text-align:left'>第三条 用户使用规则</h3>
        3.1 用户承诺及保证
        3.1.1您应当具有完全民事行为能力。否则，您不应该接受本服务，鸿曜公司亦有权拒绝向其提供服务，对于已经发生的交易，鸿曜公司有权取消。除非有相反证据证明，您接受本服务将被视为您具有相应的民事行为能力。
        3.1.2 您在注册及使用本应用时提交的信息真实、准确、完整。若前述信息发生变更，您应及时修改。若因您提交的信息不真实、不准确、不完整，导致鸿曜公司无法提供本服务或给您带来任何损失，则该损失将由您自行承担。
        3.1.3 您在使用本平台时，应遵守相关法律法规、本协议及其他相关使用规则，遵循自愿、平等、公平及诚实信用原则，不利用鸿曜公司侵犯他人合法权益或谋取任何不正当利益。
        3.1.4 您不得以任何技术手段或其他方式干扰鸿曜公司的正常运行或干扰其他用户对本应用的正常使用；不得以虚构事实、侮辱、诽谤等方式恶意诋毁鸿曜公司的商誉。
        3.2用户了解并同意
        3.2.1 鸿曜公司有权在本协议履行期间及本协议终止后保留您的注册信息及您应用本服务期间的全部交易信息，但鸿曜公司承诺不会违法使用该等信息。
        3.2.2 为了您更加便捷、安全的使用鸿曜公司的服务，鸿曜公司将使用Cookies及相关技术手段收集您与鸿曜公司有关的特征信息，用于保障您的金融信息安全以及提供更好的服务。
        3.2.3为了使您及时知晓最新资讯、优惠动态以及本应用管理、运营等相关信息，您同意接收鸿曜公司通过各种形式，包括但不限于电子邮件、短信、网页等方式向您发送通知信息、广告信息或其他相关商业信息。您可以通过隐私管理设置关闭APP通知权限或随时通过在线客服通知鸿曜公司取消相关通知。
        3.2.4您通过本应用向第三方金融机构申请，是您基于对第三方金融机构声誉和第三方金融机构的金融产品而做出的谨慎决定，您在服务过程中的服务感受取决于您对第三方金融机构的金融产品的偿还期限、年化利率、费用等具体服务内容的感知，鸿曜公司对此不作任何明示或暗示的承诺和保证。
        3.2.5 鸿曜公司并非向您直接提供授信额度、借款等服务的提供方。第三方金融机构为融资服务的服务主体及责任主体。鸿曜公司负责本应用的开发与维护。您同意并承诺其针对授信额度、借款或第三方服务提供方提供的产品/服务的任何矛盾和纠纷均不应针对鸿曜公司提出，但鸿曜公司在服务范围内会尽力协助您保护您的合法权益。
        3.2.6您在使用本应用某一特定服务时，本应用可能需要使用您终端设备的相关权限、接口及相关设备信息等以才能实现相应的功能，某些特定服务可能还需同意单独的协议、规则等，您在使用该项服务前请仔细阅读前述相关协议、规则。
        3.2.7您在本应用上按本应用服务流程所确认的交易状态将成为本应用为您进行相关交易或操作（包括但不限于订立合同、还款等）的明确指令。您同意本应用有权按相关指令依据本协议和/或有关文件和规则对相关事项进行处理。</p>
  <p>  <h3 style='text-align:left'> 第四条 平台服务</h3>
        4.1 本应用提供的服务包括但不限于根据将您的借款需求向与鸿曜公司具有合作关系的第三方金融机构传达，并撮合借款人与金融机构达成融资交易，具体服务内容以本应用“服务协议”及使用规则的约定为准。
        4.2本应用的更新与运行
        4.2.1 为了增进您体验、完善服务内容，鸿曜公司将不断努力开发新的第三方合作伙伴，并不定期更新本应用（前述更新可能会采取应用软件替换、修改、功能强化、版本升级等形式）。
        4.2.2  为了改善您体验，并保证服务的安全性和功能的一致性，鸿曜公司有权不经向您特别通知而对本应用进行更新，或者对本应用的部分功能效果进行改变或限制。
        4.2.3本应用新版本发布后，旧版本的平台可能无法使用。鸿曜公司不保证旧版本应用继续可用及相应的客户服务，请您随时核对并下载最新版本。
        4.2.4使用本应用时，本应用的内容可能会因应用版本的不同而有差别，具体以鸿曜公司实际提供的最新版本为准。</p>
  <p><h3 style='text-align:left'>第五条 电子合同</h3>
        5.1通过本应用进行交易需订立的协议采用电子合同方式。您同意：根据本应用规则在本应用确认签署的电子合同真实有效并具有法律效力。您应妥善保管账户和密码等信息，不得以该等信息被盗用等理由否定已确认签署的电子合同的法律效力或不按照该等合同履行相关义务。
        5.2您根据本应用规则确认签署电子合同后，不得擅自修改该等电子合同。本应用提供电子合同的保管、查询、核对等服务，如您对电子合同真伪或电子合同的内容有任何疑问，可通过本应用的相关服务板块查阅该等电子合同并进行核对。</p>
  <p> <h3 style='text-align:left'> 第六条 资金管理</h3>
        6.1本应用委托第三方支付机构或银行金融机构为您提供资金管理服务，主要包括但不限于：提现、转账、支付手续费用或管理费用、还款及查询余额等。
        6.2上述资金充值、提现、转账、支付手续费用或管理费用、还款及查询余额等服务涉及本应用与第三方支付机构或银行金融机构的合作。您同意：(a)受第三方支付机构或银行金融机构可能仅在工作日进行资金代扣及划转的现状等各种原因所限，本应用不对前述服务的资金到账时间做任何承诺，也不承担与此相关的责任，包括但不限于由此产生的利息、货币贬值等损失；(b)一经您使用前述服务，即表示您不可撤销地授权本应用进行相关操作，且该等操作是不可逆转的，您不能以任何理由拒绝付款或要求取消交易。就前述服务，您应按照第三方支付机构或银行金融机构的规定向其支付费用，您与第三方支付机构或银行金融机构之间因费用支付事项产生的争议或纠纷，与本应用无关。
        6.3您保证并承诺：通过本应用进行交易的资金来源合法。本应用有权按照包括但不限于公安机关、检察机关、法院等司法机关、行政机关、军事机关的要求协助对您的账户及资金等进行查询、冻结或扣划等操作。
        6.4本应用有权基于交易安全等方面的考虑不时设定涉及交易的相关事项，包括但不限于交易限额、交易次数等。您确认并知悉本应用的前述设定可能会对您的交易造成一定不便，您对此没有异议。</p>
  <p> <h3 style='text-align:left'>第七条 用户信息及隐私权保护</h3>
        7.1吉享云服应用重视保护用户的个人信息。本应用将按照本协议及《吉享云服隐私权政策》的规定收集、使用、储存和分享您的个人信息。本协议对个人信息保护相关内容未做明确说明的，均以《吉享云服隐私权政策》的内容为准。
        7.2 您在注册账号或使用本产品的过程中，为了向您提供服务，可能需要您填写或提供一些必要的信息，本应用也有可能通过其他合法方式同步用户的个人信息。
        7.3 您可以根据相关产品规则浏览、修改自己提交的信息，但出于安全性和身份识别的考虑，您可能无法修改注册时提供的部分初始实名验证信息。
        7.4 本应用将尽可能采取各种安全措施保护用户的个人信息，并建立完善的管理制度。
        7.5 未经您授权同意，本应用不会将您的个人信息转移或披露给任何第三方，除非以下情形：
        （1）与我们履行法律法规规定的义务相关的；
        （2）与国家安全、国防安全直接相关的；
        （3）与公共安全、公共卫生、重大公共利益直接相关的；
        （4）与犯罪侦查、起诉、审判和判决执行等直接相关的；
        （5）出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；
        （6）您自行向社会公众公开的个人信息；
        （7）从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道</p>
  <p>  <h3 style='text-align:left'>第八条 知识产权声明</h3>
        8.1 鸿曜公司是本应用所有知识产权的最终权利人。本应用的著作权、商标权、专利权、商业秘密等知识产权，以及与本应用相关的所有信息内容（包括但不限于文字、图片、音频、视频、图表、界面设计、版面框架、有关数据或电子文档等）均受中华人民共和国法律法规和相应的国际条约保护，鸿曜公司依法享有上述所有知识产权及其附属权利，但相关权利人依照法律规定应享有的权利除外。
        8.2 未经鸿曜公司或相关权利人书面同意，您不得为任何商业或非商业目的自行或许可任何第三方实施、利用、转让上述知识产权。</p>
  <p> <h3 style='text-align:left'>第九条 协议终止及账户的暂停、注销或终止</h3>
        9.1除非本应用终止本协议或者您申请终止本协议且经本应用同意，否则本协议始终有效。在您违反本应用规则或在相关法律法规、政府部门的要求下，本应用有权通过站内信、电子邮件等方式通知终止本协议、关闭您的账户或者限制您使用本应用。但本应用的终止行为不能免除您根据本应用规则或已确认签署的电子合同项下的尚未履行完毕的义务。
        9.2您决定不再使用本应用的借款人用户的账户时，应首先清偿所有应付借款本金及息费，再将用户账户中的可用款项（如有）全部提现或者向本应用发出其它合法的支付指令，并向本应用申请注销该用户账户，经本应用审核同意后可正式注销用户账户。用户死亡或被宣告死亡的，其在本协议项下的各项权利义务由其继承人承担。若用户丧失全部或部分民事权利能力或民事行为能力，本应用有权根据有效法律文书（包括但不限于生效的法院判决等）或其法定监护人的指示处置与用户账户相关的款项。
        9.3本应用有权基于单方独立判断，在认为可能发生危害交易安全等情形时，不经通知而先行暂停、中断或终止向您提供本协议项下的全部或部分服务，且无需对您或任何第三方承担任何责任。前述情形包括但不限于：
        （1）本应用认为您提供的个人资料不具有真实性、有效性或完整性；
        （2）本应用发现交易异常时；
        （3）本应用认为您的账户涉嫌洗钱、套现、传销、被冒用或其他本应用认为有风险之情形；
        （4）本应用认为您已经违反本应用协议及规则；
        （5）本应用基于交易安全等原因，根据其单独判断需先行暂停、中断或终止向您提供本协议项下的全部或部分服务的其他情形。
        9.4您同意在必要时，本应用无需进行事先通知即有权终止提供用户账户服务，并可能立即暂停、关闭或删除您的用户账户及该用户账户中的所有相关资料及档案，并将您滞留在这些账户的全部合法资金退回到您的银行账户。
        9.5您同意，用户账户的暂停、中断或终止不代表您责任的终止，您仍应对您使用本应用服务期间的行为承担可能的违约或损害赔偿责任，同时本应用仍可保有相关信息。</p>
  <p> <h3 style='text-align:left'> 第十条 免责条款</h3>
        10.1 借款发放前，如因国家有关部门颁布的法律、法规、规范性文件等导致鸿曜公司合作的金融机构不能发放本协议项下的借款的，鸿曜公司有权提请合作的金融机构停止发放借款或解除本协议，不视为鸿曜公司违约，鸿曜公司不承担任何责任。
        10.2 鉴于互联网之特殊性质，若鸿曜公司软（硬）件系统出现下列任一状况而无法正常运作，致使鸿曜公司网络中断或无法继续向您提供本协议约定之服务的，鸿曜公司均不承担任何违约或赔偿责任，该状况包括但不限于：
        （1）在本应用维护或升级期间；
        （2）电信设备出现故障不能进行数据传输的；
        （3）因台风、地震、海啸、洪水、停电、战争、恐怖袭击等不可抗力之因素，造成本应用运行系统障碍不能执行业务的；
        （4）由于黑客攻击、电信部门和其他有信息技术依赖的相关部门、企事业单位技术调整或故障、网站升级、银行方面的问题等原因而造成的服务中断或者延迟；
        （5）其他非鸿曜公司原因导致的故障。</p>
  <p> <h3 style='text-align:left'>第十一条 通知与送达</h3>
        11.1  您确认其按照本协议所提供的手机号码及电子邮箱均为其本人使用，为您有效送达方式。鸿曜公司可根据您以上手机号码、电子邮箱等向您发出与授信额度申请、小额资金借款申请及还款计划相关的通知或其他信息，通过手机短信、电子邮箱等电子渠道通知您的，该等通知一经发出，即视为已送达您。您不可撤销地授权并同意鸿曜公司可向相关短信发送平台公司、通信运营商调取相关短信发送凭证。
        11.2 您亦可通过登录本应用自行查询与授信额度申请、小额资金借款申请及还款计划相关的通知或其他信息。
        11.3您确认鸿曜公司以及司法机关（含一审、二审、再审和执行程序的受理法院及其司法机关）根据您在本协议所提供手机号码、电子邮箱及通信地址向您所发出的通知、文件，司法机关的诉讼文书及其他法律文书等均为有效送达。如采用短信或电子邮件的方式，则以鸿曜公司或法院系统记录的发出短信或电子邮件的时间即为送达时间；如采用亲自或委托递交的方式，则以您或其收件代理人签收之日为送达日期；如采用快递或邮件等进行邮递的方式，则以邮件寄出之日后的第五个工作日为送达日期。
        11.4 您应确保其向本应用及本协议提供的通信地址、电子邮箱、手机号码等信息真实、准确及有效。鸿曜公司或司法机关向上述地址或渠道向您发送相关文件、通知或法律文件时，即使接收人拒绝签收、他人代签及因您提供及确认的上述送达地址或渠道不准确而发生退件，均视为已送达。</p>
  <p>  若您对上述通信地址、电子邮箱、手机号码等送达地址或送达渠道需要变更的，应当履行通知义务，通过本应用、电子邮件、书面方式向鸿曜公司或司法机关进行通知。您若有变更而未按前述要求作出通知的，其在本协议所提交及确认的送达地址或送达渠道仍视为有效的送达地址或渠道。鸿曜公司或司法机关以该地址或渠道向您发送相关文件、通知或法律文件时，即使接收人拒绝签收、他人代签及因该送达地址或渠道不准确而发生退件，导致鸿曜公司文件、通知，司法机关的法律文书未能被您实际接收的，均视为已送达。如采用短信或电子邮件的方式，则以鸿曜公司或司法机关系统记录的发出短信或电子邮件的时间即为送达时间；邮寄送达的，以文书退回之日视为送达之日；直接送达的，送达人当场在送达回证上记明情况之日视为送达之日。</p>
  <p> 您履行送达地址或送达渠道变更通知义务的，以变更后的送达地址或渠道为有效送达地址或渠道。因变更后的送达地址或送达渠道不准确、您或其指定的接收人拒绝签收等原因，导致鸿曜公司的文件、通知，司法机关的法律文书未能被您实际接收的，如采用短信或电子邮件的方式，则以鸿曜公司或司法机关系统记录的发出短信或电子邮件的时间即为送达时间；邮寄送达的，以文书退回之日视为送达之日；直接送达的，送达人当场在送达回证上记明情况之日视为送达之日。</p>
  <p>  <h3 style='text-align:left'>第十二条 争议解决</h3>
        12.1本协议适用中华人民共和国法律（仅为本协议之目的，为避免疑义，不包括香港特别行政区、澳门特别行政区及台湾地区法律）。
        12.2因本协议引起的或与本协议有关的争议，双方应共同协商解决。如就争议无法协商一致，均应提交本合同签署地（即杭州市江干区）有管辖权的人民法院经诉讼方式解决。</p>
  `,
}).then(() => {
  // on close
});
    },
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
      this.form.province = this.form.areaName[0]
      this.form.city = this.form.areaName[1]
      this.form.area = this.form.areaName[2]
      this.areaPopupVisible = false
    },
    // 当picker地区选择变化时
    onAreaChange(picker, values, index) {
      // 请求接口
      if (index < 2) {
        // this.getAreaMethod(values[index].id, index + 1)
      }
    },
    // getAreaMethod(ParentId, index) { //异步获取省市区的去掉
    //   ParentId = ParentId || 1
    //   // 0-父级id   index表示picker操作的是哪一列数据(type   0表示省份,1表示市,2表示区县)
    //   getAreaselect({ areaId: ParentId, type: index }).then(res => {
    //     // 1- areaId初始值 选择省或市的id,初始传1
    //     console.log(res, 'ressss')
    //     if (res.data.success) {
    //       this.areaList[index].values = [{ name: '请选择' }, ...res.data.voList]
    //       // 2-选择当前列的时候 清空下一列数据
    //       if (index < 2) {
    //         this.areaList[index + 1].values = []
    //       }
    //     }
    //   })
    // },
    // 验证码校验
    onCodeInfo() {
      let time = 60
      if (this.validePhoneMethod() && this.getCodeFlag == false) {
        this.getCodeFlag = true
        // 手机号校验通过发送验证码  实现发送倒计时
        sendCode({ phone: this.form.phone }).then(res => {
          if(res.data.success) {
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
          } else {
            this.getCodeFlag = false
            Toast(res.data.message)
          }
        }).catch(() => {
          this.getCodeFlag = false
        })
      }
    },
    // 手机号校验函数
    validePhoneMethod() {
      if (!this.form.phone) {
        Toast('请输入你的手机号')
      } else if (!/^1[345678]\d{9}$/.test(this.form.phone)) {
        Toast('抱歉手机号不合法')
      } else {
        return true
      }
    },
    onSubmit() {
      let others = ''
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
      if (!this.form.code && JSON.parse(this.$route.query.isNeedSms)) {
        Toast('请输入你的验证码')
        return
      }
      // 处理复选框的参数
      this.form.checkBoxObj.house ? (others = '我有房,') : ''
      this.form.checkBoxObj.accumulationFund ? (others += '我有公积金,') : ''
      this.form.checkBoxObj.businessOwners ? (others += '我是企业主,') : ''
      this.form.checkBoxObj.insurancePolicy ? (others += '我有寿险保单,') : ''
      this.form.checkBoxObj.personalTax ? (others += '我有个税,') : ''
      this.form.checkBoxObj.officeWorker ? (others += '我是上班族,') : ''
      others = others.substring(0,others.length-1);
      this.form.others = others;
      console.log(this.form.checkBoxObj, 'checkBoxObj表单提交')
      let form = JSON.parse(JSON.stringify(this.form));
      form.channelNo = this.$route.query.channelNo
      form.isNeedSms = this.$route.query.isNeedSms
      delete form.checkBoxObj
      delete form.areaName
      console.log(form,"form,最后表单提交");
      loginFormSubmit(form).then((res) => {
        console.log(res,"请求表单接口");
        if(res.data.success) {
            Toast(res.data.message)
        }
      })
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
        p {
          display: flex;
          align-items: center;
          .icon-checkbox1 {
            color: #597cf4;
            font-weight: 700;
          }
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
          .icon-checkbox {
            color: #a1a1a1;
          }
          .icon-checkbox1 {
            color: #597cf4;
            font-weight: 700;
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
