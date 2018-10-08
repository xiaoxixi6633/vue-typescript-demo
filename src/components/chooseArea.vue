<template>
  <div class="picker_warp" ref="pickers" v-show="show"  @touchmove.prevent >
      <div class="defalte" @click="closeArea"></div>
      <div class="picker-main">
      <div class="picker_title">
        <span class="quxiao" @click="closeArea">取消</span>
        <span class="jigou">选择机构</span>
        <span class="queren" @click="querenjigou">确认</span>
      </div>
      <div class="pricker">
        <mt-picker class="pic1" :slots="myAddressSlots1" valueKey="name" :visibleItemCount	="5" @change="addressChange1" :itemHeight="40"></mt-picker>
        <mt-picker v-show="pricker_show_tow" class="pic2" :slots="myAddressSlots2" valueKey="name" :visibleItemCount	="5" @change="addressChange2" :itemHeight="40"></mt-picker>
        <mt-picker v-show="pricker_show_three" class="pic3" :slots="myAddressSlots3" valueKey="name" :visibleItemCount	="5" @change="addressChange3" :itemHeight="40" ></mt-picker>
      </div>
    </div>
  </div>
</template>
<script>
  import Bus from './bus.js'
  import {mapActions, mapGetters} from 'vuex'
  export default {
    name:'chooseArea',
    data(){
      return {
        isChooseUser:false,
        threeLevelAddress:[],//组织机构数组
        show:false,//弹出框是否可见

        myAddressProvince:this.firstOrgCodeName, //第一列选择的值，初始化为已有值
        myAddressCity:'全部', //第二列选择的值
        myAddresscounty:'全部',//第三列选择的值
        provinceCode:'', //第一列选择的id
        cityCode:'',//第二列选择的id
        countyCode:'',//第三列选择的id

        myAddressSlots1:[], //第一列列表
        myAddressSlots2:[],//第二列列表
        myAddressSlots3:[],//第三列列表

        orgCodes:[],//组织id数组
        titleName:'',//机构展示的值

        nomTitleName:'',//省份值得第一个值，不变的
        nomPrinceCode:'',//省份code值得第一个值，不变的

        pricker_show_tow:false,
        pricker_show_three:false,

        isloading:false
      }
    },
    computed:{
      ...mapGetters(['userid','orgCodeList','orgCodeName','provinceCodeNum','cityCodeNum','firstOrgCodeName','secondOrgCodeName','thirdOrgCodeName','isIOS','isAndroid'])
    },
    watch:{
      orgCodes(){
        this.saveOrgCodeList(this.orgCodes)
        this.saveOrgCodeName(this.titleName)
      },
      isloading(){
        if(this.isloading){
          setTimeout(()=>{
            if(this.isloading){
              this.$router.push('/brokennetwork')
            }
          },10*1000)
        }
      }
    },
    created(){
      this.getAreaList();
    },
    mounted() {
      Bus.$on('msg', (e) => {
        if(this.isChooseUser) return;
        this.show = true;
      })
    },
    activated(){
      // this.getAreaList();
      this.resetPicker()
    },
    methods:{
      ...mapActions(['saveOrgCodeList','savePrinceCode','saveCityCode','saveOrgCodeName','saveFirstOrgCodeName','saveSecondOrgCodeName','saveThirdOrgCodeName']),
      setPicker(){ //初始化弹框
        let initFirstName=(this.firstOrgCodeName==''?this.myAddressProvince:this.firstOrgCodeName)
        let initSecondName=(this.secondOrgCodeName==''?this.myAddressCity:this.secondOrgCodeName)
        let initThirdName=(this.thirdOrgCodeName==''?'':this.thirdOrgCodeName)
        let provinceArr = this.getProvinceArr();
        let cityArr = this.getCityArr(initFirstName);
        let countyArr = this.getCountyArr(initFirstName,initSecondName);
        let index0 =0,index1 =0,index2 =0;

        provinceArr.forEach((item,index)=>{
          if(item.name==initFirstName){
            index0 = index
          }
        })
        cityArr.forEach((item,index)=>{
          if(item.name==initSecondName){
            index1 = index
          }
        })
        countyArr.forEach((item,index)=>{
          if(item.name==initThirdName){
            index2 = index
          }
        })
        this.myAddressSlots1 = []
        this.myAddressSlots2 = []
        this.myAddressSlots3 = []
        this.$nextTick(()=>{
          this.myAddressSlots1 = [
            {
              flex: 1,
              values: provinceArr,
              className: 'slot1',
              textAlign: 'center',
              defaultIndex: index0
            }
          ]
          this.myAddressSlots2 = [{
            flex: 1,
            values: cityArr,
            className: 'slot2',
            textAlign: 'center',
            defaultIndex: index1
          }]
          this.myAddressSlots3 = [{
            flex: 1,
            values: countyArr,
            className: 'slot3',
            textAlign: 'center',
            defaultIndex: index2
          }]
        })
      },
      resetPicker(){
        this.show = false;
        //第一次上来就取消弹框时this.firstOrgCodeName==''，取默认第一列的第一个值
        let initFirstName=(this.firstOrgCodeName==''?this.nomTitleName:this.firstOrgCodeName)
        let initSecondName=(this.secondOrgCodeName==''?this.myAddressCity:this.secondOrgCodeName)
        let initThirdName=(this.thirdOrgCodeName==''?'':this.thirdOrgCodeName)
        let provinceArr = this.getProvinceArr();
        let cityArr = this.getCityArr(initFirstName);
        let countyArr = this.getCountyArr(initFirstName,initSecondName);
        let index0 =0,index1 =0,index2 =0;

        provinceArr.forEach((item,index)=>{
          if(item.name==initFirstName){
            index0 = index
          }
        })
        cityArr.forEach((item,index)=>{
          if(item.name==initSecondName){
            index1 = index
          }
        })
        countyArr.forEach((item,index)=>{
          if(item.name==initThirdName){
            index2 = index
          }
        })
        this.myAddressProvince=initFirstName;
        this.myAddressCity=initSecondName;
        this.myAddresscounty=initThirdName;
        this.provinceCode=provinceArr[index0].code
        this.cityCode=cityArr[index1].code
        this.countyCode=countyArr[index2].code
        // console.log(this.firstOrgCodeName,this.myAddressProvince)
        // console.log(this.myAddressProvince+' '+this.myAddressCity+' '+this.myAddresscounty)
        // console.log(this.provinceCode+' '+this.cityCode+' '+this.countyCode)
        this.myAddressSlots1 = []
        this.myAddressSlots2 = []
        this.myAddressSlots3 = []
        this.$nextTick(()=>{
          this.myAddressSlots1 = [
            {
              flex: 1,
              values: provinceArr,
              className: 'slot1',
              textAlign: 'center',
              defaultIndex: index0
            }
          ]
          this.myAddressSlots2 = [{
            flex: 1,
            values: cityArr,
            className: 'slot2',
            textAlign: 'center',
            defaultIndex: index1
          }]
          this.myAddressSlots3 = [{
            flex: 1,
            values: countyArr,
            className: 'slot3',
            textAlign: 'center',
            defaultIndex: index2
          }]
        })
      },
      getAreaList(){
        this.isloading = true
        this.myAddressProvince=this.firstOrgCodeName
        this.myAddressCity=this.secondOrgCodeName==''?'全部':this.secondOrgCodeName
        this.myAddresscounty=this.thirdOrgCodeName==''?'全部':this.thirdOrgCodeName
        this.cityCode = this.cityCodeNum!=''?this.cityCodeNum:''
        this.$ajax({method: 'post',url: '/mc-user/organise/token',dataType: 'json', headers: {'Content-Type': 'application/json;charset=UTF-8'},
          data:JSON.stringify({
            token: this.userid,
          }),
        }).then(res=>{
          if(res.data.code != 500){this.isloading = false}
          if(res.data.code == 200){
            this.nomTitleName = res.data.data.name
            this.nomPrinceCode = res.data.data.id

            if(res.data.data.child==null || res.data.data.child.length==0){ //无机构选择
              this.isChooseUser = true
              this.titleName = res.data.data.name
              this.myAddressProvince = res.data.data.name
              this.orgCodes= [res.data.data.id]
              return;
            }
            this.myAddressProvince = this.firstOrgCodeName==''?res.data.data.name:this.firstOrgCodeName
            this.provinceCode= this.provinceCodeNum!='' ?this.provinceCodeNum:res.data.data.id

            if(this.orgCodeName==''){ //判断是否有其他页面带过来的默认值
              this.titleName = res.data.data.name
              this.orgCodes= [res.data.data.id]
            }


            this.threeLevelAddress = res.data.data.child;
            // this.myAddressProvince = this.myAddressProvince
              //判断列数显示
            if(res.data.data.name=='全国'){//三列
              this.pricker_show_tow = true;
              this.pricker_show_three = true;
            }

            if(res.data.data.child && res.data.data.child[1].child && res.data.data.child[1].child.length>0){//两列
              this.pricker_show_tow = true;
            }

            this.setPicker();
          }
          else if(res.data.code == 301){//7天自动退出登录
            this.$logOut({
              rememberpwd:'1'
            }); //退出记住密码
          }
          else if(res.data.code == 407){ //被踢出登录，返回登录页
            this.$logOut()
          }else{
            console.log(res.data.msg)
          }
        }).catch(function(err){
          console.log("请求失败")
        })
      },
      closeArea(){//关闭选择机构
        // this.show = false;
        this.resetPicker()
      },
      querenjigou(){//确认选择机构
        this.show = false;
        this.savePrinceCode(this.provinceCode)
        this.saveCityCode(this.cityCode)
        if(this.myAddressProvince==this.nomTitleName){//如果是全国直接上传全国的code
          this.orgCodes.splice(0,this.orgCodes.length)
          this.orgCodes.push(this.provinceCode)
          this.titleName = this.myAddressProvince//设置标题
        }else{//如果不是全国
          if(this.myAddressCity=='全部'){//如果第二列是全部
            this.orgCodes.splice(0,this.orgCodes.length)
            this.orgCodes.push(this.provinceCode)
            this.titleName = this.myAddressProvince//设置标题
          }else{
            if(this.myAddresscounty=='全部'){//如果第三列是全部
              this.orgCodes.splice(0,this.orgCodes.length)
              this.orgCodes.push(this.cityCode)
              this.titleName = this.myAddressCity//设置标题
            }else{
              this.orgCodes.splice(0,this.orgCodes.length)
              this.orgCodes.push(this.countyCode)
              this.titleName = this.myAddresscounty//设置标题

            }
          }
        }
        this.saveFirstOrgCodeName(this.myAddressProvince)
        this.saveSecondOrgCodeName(this.myAddressCity)
        this.saveThirdOrgCodeName(this.myAddresscounty)
      },
        //picker组件的change事件，进行取值赋值
      addressChange1(picker, values){
        if (values[0]) {
          if(values[0].name=='全国'||values[0].name=='全部'){
            this.myAddressProvince = this.nomTitleName
          }else{
            this.myAddressProvince = values[0].name
          }

          this.provinceCode = values[0].code
          this.myAddressSlots2 = [{
            flex: 1,
            values: this.getCityArr(this.myAddressProvince),
            className: 'slot2',
            textAlign: 'center'
          }]
        }
      },
      addressChange2(picker, values){
        if(values[0]){
          this.myAddressCity = values[0].name
          this.cityCode = values[0].code
          this.myAddressSlots3 = [{
            flex: 1,
            values: this.getCountyArr(this.myAddressProvince,this.myAddressCity),
            className: 'slot3',
            textAlign: 'center',
          }]
          this.myAddresscounty='全部'
        }
      },
      addressChange3(picker, values){
        if(values[0]){
          this.myAddresscounty = values[0].name
          this.countyCode = values[0].code
        }
      },
      //遍历json，返回省级对象数组
      getProvinceArr() {
        let provinceArr = [];
        let obj = {};
        obj.name=this.nomTitleName
        if(this.nomTitleName=='全国'){
          obj.name='全国'
        }else{
          obj.name = '全部'
        }
        obj.code = this.nomPrinceCode;
        provinceArr.push(obj);
        this.threeLevelAddress.forEach(function (item) {
          let obj = {};
          obj.name = item.name;
          obj.code = item.id;
          provinceArr.push(obj);
        });
        return provinceArr;
      },
      //遍历json，返回市级对象数组
      getCityArr(province) {
        let cityArr = [];
        let obj = {};
        obj.name = '全部';
        obj.code = '0';
        cityArr.push(obj);
        this.threeLevelAddress.forEach(function (item) {
          if (item.name === province) {
            if(item.child){
              item.child.forEach(function (args) {
                let obj = {};
                obj.name = args.name;
                obj.code = args.id;
                cityArr.push(obj);
              });
            }
          }
        });
        return cityArr;
      },
      //遍历json，返回县级对象数组
      getCountyArr(province,city){
        let countyArr = [];
        let obj = {};
        obj.name = '全部';
        obj.code = '0';
        countyArr.push(obj);
        this.threeLevelAddress.forEach(function(item){
          if (item.name === province) {
            if (item.child) {
              item.child.forEach(function (args) {
                if (args.name === city) {
                  if (args.child) {
                    args.child.forEach(function (param) {
                      let obj = {};
                      obj.name = param.name;
                      obj.code = param.id;
                      countyArr.push(obj);
                    })
                  }
                }
              });
            }
          }
        });
        return countyArr;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.picker-items
  .picker-slot
    .picker-slot-wrapper
      .picker-item
        font-size 14px !important
        color #909090
      .picker-item.picker-selected
        font-size 16px !important
        color #29354D
.picker_warp
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 1000000000000000
    .defalte
      height 100%
      opacity: 0.3;
      background black
    .pricker
      background white
      height 190px
      opacity: 1;
      display flex
      font-size 14px
      color #909090
    .pic1
      flex 1
    .pic2
      flex 1
    .pic3
      flex 1
    .picker-main
      width 100%
      height 226px
      position fixed
      bottom 0
      z-index 1000000000000000
    .picker_title
      width 100%
      height 40px
      border-bottom 1px solid #F1F3F8
      border-top 1px solid #F1F3F8
      background white
      text-align center
      line-height 40px
      .quxiao
        float left
        width 80px
        height 100%
        line-height 40px
        text-align center
        font-size 14px
        color #29354D
      .queren
        float right
        width 80px
        height 100%
        line-height 40px
        text-align center
        font-size 14px
        color #4E97FF
      .jigou
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #29354D;
        letter-spacing: 0;
</style>

