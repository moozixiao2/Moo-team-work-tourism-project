<template>
  <div>
    <!-- 面包屑 -->
    <el-form class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>酒店</el-breadcrumb-item>
        <el-breadcrumb-item>南京市酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    </el-form>

    <el-row class="hotel-form">
      <el-form class="elForm">
        <!-- 选择城市 -->
        <el-form-item class="hotel-autocomplete" v-model="form">
          <el-autocomplete
            placeholder="请输入内容"
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>

        <!-- 入住时间 -->
        <el-form-item class="hotel-data">
          <el-date-picker
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <!-- 入住人数 -->
        <el-form-item class="hotel-number">
          <el-input placeholder="人数未定" suffix-icon="el-icon-user"></el-input>
        </el-form-item>

        <!-- 人数选择弹框 -->
        <el-row class="hotel_adult" v-if="isShow">
          <el-col :span="8">
            <span>每间</span>
          </el-col>
          <el-col :span="16">
            <el-select size="mini" placeholder class="hotel_select hotel_select_adult">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select size="mini" placeholder class="hotel_select hotel_select_children">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
      // 选择人数的菜单是否显示
      isShow: false,
      form: {
        id: "0",
        hotelCity: "南京市",

      }
    };
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