<template>
  <div>
    <!-- 面包屑 -->
    <el-form class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>酒店</el-breadcrumb-item>
        <el-breadcrumb-item>{{cityName}}酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    </el-form>

    <el-row class="hotel-form">
      <el-form class="elForm">
        <!-- 选择城市 -->
        <el-form-item class="hotel-autocomplete">
          <el-autocomplete
            v-model="form.hotelCity"
            placeholder="请输入内容"
            :fetch-suggestions="querySearchCity"
            @select="handleSelectCity"
          ></el-autocomplete>
        </el-form-item>

        <!-- 入住时间 -->
        <el-form-item class="hotel-data">
          <el-date-picker
            type="daterange"
            v-model="form.hoteldate"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <!-- 入住人数 -->
        <el-form-item class="hotel-number">
          <!-- focu获取焦点时触发 -->
          <el-input
            placeholder="人数未定"
            suffix-icon="el-icon-user"
            v-model="form.number"
            @focus="isShow = true"
          ></el-input>
        </el-form-item>

        <!-- 人数选择弹框 -->
        <el-row class="hotel_adult" v-if="isShow">
          <el-col :span="8">
            <span>每间</span>
          </el-col>
          <el-col :span="16">
            <el-select
              size="mini"
              placeholder
              v-model="form.adult"
              class="hotel_select hotel_select_adult"
            >
              <el-option
                v-for="item in houseData"
                :key="item.adult"
                :label="item.adult"
                :value="item.adult"
              ></el-option>
            </el-select>
            <el-select
              size="mini"
              placeholder
              v-model="form.children"
              class="hotel_select hotel_select_children"
            >
              <el-option
                v-for="item in houseData"
                :key="item.children"
                :label="item.children"
                :value="item.children"
              ></el-option>
            </el-select>
          </el-col>
          <el-row class="hotel_number_sure">
            <el-button type="primary" class="sure_number" @click="chooseHousing">确定</el-button>
          </el-row>
        </el-row>

        <!-- 查看按钮 -->
        <el-form-item class="hotel-button">
          <el-button type="primary">查看价格</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 住房选择数据
      houseData: [
        { adult: 1, children: 1 },
        { adult: 2, children: 2 },
        { adult: 3, children: 3 },
        { adult: 4, children: 4 },
        { adult: 5, children: 5 },
        { adult: 6, children: 6 }
      ],

      isShow: false, // 选择人数的菜单是否显示
      cityName: "南京市", //面包屑城市名缓存
      form: {
        id: "", //城市id
        hotelCity: "南京市", //查询的城市名
        hoteldate: "", //住房时间
        number: "", //人数
        adult: "", //成人
        children: "" //儿童
      }
    };
  },
  methods: {
    // 选中选择城市输入框的时候触发
    querySearchCity(value, cb) {
      if (!value) {
        // 传递空数组不会出现下拉框
        cb([]);
        return;
      }
      this.$axios({
        url: "/cities",
        // get请求
        params: {
          name: value
        }
      }).then(res => {
        // console.log(res);
        const { data } = res.data;
        // 给数组中每个对象添加value属性
        const newData = [];
        data.forEach(v => {
          // 添加value属性
          v.value = v.name;
          // 把带有value属性的对象添加到新数组中
          newData.push(v);
        });
        // console.log(newData);
        cb(newData);
      });
    },
    // 点击下拉菜单中的项是触发
    handleSelectCity(item) {
      // console.log(item);
      this.form.hotelCity = item.name;
      this.form.id = item.id;
      //面包屑城市名缓存
      this.cityName = item.name;
    },
    chooseHousing() {
      // 判断人数
      if (this.form.adult > 0 && this.form.children > 0) {
        this.form.number = `${this.form.adult}位成人${this.form.children}位儿童`;
      } else if (this.form.adult > 0 && this.form.children == 0) {
        this.form.number = `${this.form.adult} 位成人`;
      } else if (this.form.adult == 0 && this.form.children > 0) {
        this.form.number = `${this.form.children} 位儿童`;
      } else if (this.form.adult == 0 && this.form.children == 0) {
        this.form.number = "";
      }
      this.isShow = false;
    }
  }
};
</script>

<style scoped lang="less">
.breadcrumb {
  // overflow:hidden;//溢出隐藏
  padding: 20px 0;
}
.hotel-form {
  display: inline-block;
  position: relative;
  .hotel-autocomplete {
    display: inline-block;
    margin-right: 10px;
  }
  .hotel-data {
    display: inline-block;
  }
  .hotel-number {
    display: inline-block;
  }
  .hotel-button {
    display: inline-block;
  }
  .hotel_adult {
    width: 300px;
    position: absolute;
    top: 50px;
    left: 577px;
    z-index: 2001;
    box-shadow: 0px 0px 5px #ccc;
    padding: 10px;
    background: #fff;
  }
  .hotel_select {
    width: 90px;
    height: 20px;
    position: relative;
  }
  .hotel_select_adult {
    &::after {
      position: absolute;
      top: 5px;
      left: 30px;
      font-size: 12px;
      content: "成人";
    }
  }
  .hotel_select_children {
    &::after {
      position: absolute;
      top: 5px;
      left: 30px;
      font-size: 12px;
      content: "儿童";
    }
  }
  .hotel_number_sure {
    width: 100%;
    margin-top: 50px;
    border-top: 1px solid #ccc;
    .sure_number {
      width: 56px;
      height: 28px;
      font-size: 12px;
      padding: 1px;
      margin: 10px 0 0 230px;
      text-align: center;
    }
  }
}
</style>