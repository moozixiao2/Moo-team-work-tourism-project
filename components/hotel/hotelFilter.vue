<template>
    <div class="hotelFilter">
        <div class="hotelFilter-item">
            <div class="hotelFilter-title">
                <span>价格</span>
                <span>0-{{newPrice}}</span>
            </div>
            <div class="hotelFilter-select">
                <el-slider v-model="price" :format-tooltip="formatTooltip"></el-slider>
            </div>
        </div>
        <div class="hotelFilter-item">
            <div class="hotelFilter-title">
                <span>住宿等级</span>
            </div>
            <div class="hotelFilter-select">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        不限<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" style="padding:0 40px;">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="hotelFilter-item">
            <div class="hotelFilter-title">
                <span>住宿类型</span>
            </div>
            <div class="hotelFilter-select">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        不限<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" style="padding:0 40px;">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="hotelFilter-item">
            <div class="hotelFilter-title">
                <span>酒店设施</span>
            </div>
            <div class="hotelFilter-select">
                <el-dropdown style="width: 100%;">
                    <span class="el-dropdown-link">
                        不限<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" style="padding:0 40px;">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="hotelFilter-item">
            <div class="hotelFilter-title">
                <span>酒店品牌</span>
            </div>
            <div class="hotelFilter-select">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        不限<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" style="padding:0 40px;">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            price: 4000,
            newPrice: 4000
        }
    },
    methods: {
        // 滑块
        formatTooltip(val){
            this.newPrice = val * 40
            return val * 40;
        }
    },
}
</script>

<style lang="less" scoped>
.hotelFilter{
    display: flex;
    margin: 30px 0 0px;
    border: solid 1px #ccc;
    .hotelFilter-item{
        flex:1;
        margin:10px 0;
        padding: 0 15px;
        border-right: solid 1px #ccc;
        .hotelFilter-title{
            display: flex;
            justify-content: space-between;
            color: #666;
        }
        .hotelFilter-select{
            width: 100%;
            margin-top: 10px;
            /deep/ .el-dropdown-item{
                padding:40px;
            }
            /deep/ .el-dropdown{
                width: 100%;
                >span{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
            }
        }
        &:nth-child(1){
            flex: 1.4;
        }
        &:nth-child(5){
            border-right: none;
        }
    }
} 
</style>