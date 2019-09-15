<template>
    <div class="hotel-detail">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/hotel">{{hotelObj.big_cate}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{hotelObj.real_city}}{{hotelObj.big_cate}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{hotelObj.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 酒店展示 -->
        <div>
            <!-- 标题 -->
            <div class="detail-title">
                <h3 v-if="hotelObj.hotellevel">{{hotelObj.name}} <span :title="hotelObj.hotellevel.level + '星级'" v-for="(item,index) in hotelObj.hotellevel.level" :key='index'><i class="iconfont icon-huangguan"></i></span></h3>
                <h3 v-else>{{hotelObj.name}}</h3>
                <p>{{hotelObj.alias}}</p>
                <p><i class="iconfont icon-lunkuodasan-1"></i><span>{{hotelObj.address}}</span></p>
            </div>
            <!-- 图片 -->
            <el-row type='flex' justify='space-between' class="detail-pics">
                <div class="detail-pics-big">
                    <img :src="detailPics[current]" alt="">
                </div>
                <el-row type='flex' justify='space-between'  class="detail-pics-small">
                    <img :src="item" alt="" v-for="(item, index) in detailPics" :key='index' @click="handleChangePic(index)">
                </el-row>
            </el-row>
            <!-- 表格 -->
            <el-table :data="hotelObj.products" style="width: 100%" class="detail-table">
                <el-table-column prop="name" label="价格来源"></el-table-column>
                <el-table-column prop="bestType" label="低价房型"></el-table-column>
                <el-table-column label="最低价格/每晚">
                    <template slot-scope="scope">
                        <div class="detail-table-price"><nuxt-link to="#"><span>￥{{scope.row.price}}</span> 起 <i class="el-icon-arrow-right"></i></nuxt-link></div>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 地图 -->
                <el-row type="flex" justify="space-between" class="detail-map">
                    <div class="detail-map-wrap">
                        <div id="container"></div>
                    </div>
                    <div class="detail-map-list">
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="风景" name="first">
                                <el-row type='flex' justify='space-between' v-for="(item,index) in locationView" :key='index' class="detail-map-item">
                                    <p>{{item.name}}</p>
                                </el-row>
                            </el-tab-pane>
                            <el-tab-pane label="交通" name="second">
                                <el-row type='flex' justify='space-between' v-for="(item,index) in locationTraffic" :key='index' class="detail-map-item">
                                    <p>{{item.name}}</p>
                                </el-row>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-row>
            <!-- 基本信息 -->
            <div class="detail-infos">
                <el-row type="flex" justify="space-between" class="detail-infos-item">
                    <div class="detail-infos-title">
                        <h4>基本信息</h4>
                    </div>
                    <el-row type='flex' class="detail-infos-content">
                        <p>入住时间：14：00 之后</p>
                        <p>离店时间：12：00 之前</p>
                        <p>{{hotelObj.creation_time}}/{{hotelObj.renovat_time}}</p>
                        <p>酒店规模：{{hotelObj.roomCount}}间客房</p>
                    </el-row>
                </el-row>
                <el-row type="flex" justify="space-between" class="detail-infos-item">
                    <div class="detail-infos-title">
                        <h4>主要设施</h4>
                    </div>
                    <el-row type='flex' class="detail-infos-content">
                        <span>外币兑换服务</span><span>电梯</span><span>洗衣服务</span><span>热水壶</span>
                    </el-row>
                </el-row>
                <el-row type="flex" justify="space-between" class="detail-infos-item">
                    <div class="detail-infos-title">
                        <h4>停车服务</h4>
                    </div>
                    <el-row type='flex' class="detail-infos-content">-
                    </el-row>
                </el-row>
                <el-row type="flex" justify="space-between" class="detail-infos-item">
                    <div class="detail-infos-title">
                        <h4>品牌信息</h4>
                    </div>
                    <el-row type='flex' class="detail-infos-content">-
                    </el-row>
                </el-row>
            </div>
            <!-- 真实用户评论 -->
            <div class="detail-realy-info">
                <h4>0 条真实用户评论</h4>
                <el-row type="flex" justify="" class="detail-realy-content">
                    <div class="detail-realy-info-text">
                        <p>总评数：{{hotelObj.all_remarks}}</p>
                        <p>好评数：{{hotelObj.good_remarks}}</p>
                        <p>差评数：{{hotelObj.bad_remarks}}</p>
                    </div>
                    <el-row type='flex' justify='center' align='middle' class="detail-realy-info-score">
                        <div class="detail-realy-info-stars">
                            <el-row type='flex' align='middle'>
                                <el-rate
                                    v-model="hotelObj.stars"
                                    disabled
                                    show-score
                                    :score-template='hotelObj.stars + "分"'
                                    text-color="#fa8110">
                                </el-rate>
                            </el-row>
                            <p>推 荐</p>
                        </div>
                        <div>环境</div>
                        <div>产品</div>
                        <div>服务</div>
                    </el-row>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 调用接口返回的数据
            hotelObj: {
                hotellevel: {}
            },
            // 图片
            detailPics:[
                'http://157.122.54.189:9093/images/hotel-pics/1.jpeg',
                'http://157.122.54.189:9093/images/hotel-pics/2.jpeg',
                'http://157.122.54.189:9093/images/hotel-pics/3.jpeg',
                'http://157.122.54.189:9093/images/hotel-pics/4.jpeg',
                'http://157.122.54.189:9093/images/hotel-pics/5.jpeg',
                'http://157.122.54.189:9093/images/hotel-pics/6.jpeg',
            ],
            // 当前图片索引
            current: 0,
            // 标签页
            activeName: 'first',
            // 地图风景
            locationView: [],
            // 地图交通
            locationTraffic: []
        }
    },
    methods: {
        // 标签页事件
        handleClick(tab, event) {
            console.log(tab, event);
        },
        // 切换图片
        handleChangePic(index){
            this.current = index
        },
        // 封装调用酒店详情接口
        hotelDetailInit(){
            this.$axios({
                url: '/hotels',
                params: {id: this.$route.query.id}
            })
            .then(res => {
                const {data} = res.data
                this.hotelObj = {...data[0]}
                console.log(this.hotelObj)
            })
        },
        // 封装调用web服务接口
        locationMap(types, cb){
            this.$axios({
                url: 'https://restapi.amap.com/v3/place/text',
                params: {
                    location: '118.871811,31.328468',
                    city: '南京',
                    output: 'json',
                    page: 1,
                    offset: 10,
                    types,
                    key: 'f2709fe743e91589ee9b770616cfb64c'
                }
            })
            .then(res => {
                const {pois} = res.data
                cb(pois)
            })
        }
    },
    mounted () {
        // 调用酒店详情接口
        this.hotelDetailInit()
        // 交通风景接口
        this.locationMap('交通设施服务', data => {
            this.locationTraffic = data
        })
        this.locationMap('风景名胜', data => {
            this.locationView = data
            // console.log(this.locationView)
        })

        // 地图
        window.onLoad = function(){ 
            var map = new AMap.Map('container')
        } 
        var url = 'https://webapi.amap.com/maps?v=1.4.15&key=d4bb88a7559b1e6a7397723b846aa2aa&callback=onLoad'
        var jsapi = document.createElement('script')
        jsapi.charset = 'utf-8'
        jsapi.src = url
        document.head.appendChild(jsapi)
    }
}
</script>

<style lang="less" scoped>
.hotel-detail{
    width: 1000px;
    min-width: 1000px;
    margin: 20px auto;
    .detail-title{
        margin-top: 20px;
        h3{
            font-size: 22px;
            font-weight: 500;
            span{
                color: #f60;
            }
        }
        p{
            color: #666;
            &:nth-child(3){
                margin-top: 5px;
                color: #333;
                font-size: 14px;
                i{
                    margin-right: 5px;
                }
            }
        }
    }
    .detail-pics{
        margin: 22px 0 30px;
        height: 364px;
        box-sizing: border-box;
        img{
            width: 100%;
            height: 100%;
            display: block;
            margin-bottom: 17px;
        }
        .detail-pics-big{
            width: 640px;
        }
        .detail-pics-small{
            width: 336px;
            flex-wrap: wrap;
            img{
                width: 47.5%;
                height: 110px;
                vertical-align: top;
                cursor: pointer;
            }
        }
    }
    .detail-table{
        // color:#f60;
        .detail-table-price{
            a{
                display: block;
            }
            span{
                margin-right: 3px;
                font-size: 18px;
                color: #f60;
            }
            i{
                color: #f60;
            }
        }
    }
    .detail-map{
        margin: 30px 0;
        .detail-map-wrap{
            #container {
                width:650px; 
                height: 350px; 
            }
        }
        .detail-map-list{
            width: 330px;
            .detail-map-item{
                margin: 0 12px 8px;
                cursor: pointer;
                p{

                }
            }
        }
    }
    .detail-infos{
        .detail-infos-item{
            border-bottom: solid 1px #ccc;
            padding: 20px 0;
            .detail-infos-title{
                width:150px;
                h4{
                    text-indent: 8px;
                    font-weight: 500;
                }
            }
            .detail-infos-content{
                width:830px;
                font-size: 14px;
                color: #666;
                p{
                    width:25%;
                }
                >span{
                    display: block;
                    padding: 3px 8px;
                    margin-right: 5px;
                    background: #f1f1f1;
                    border-radius: 3px;
                }
            }
        }
    }
    .detail-realy-info{
        margin: 40px 0;
        >h4{
            margin-bottom: 20px;
        }
        .detail-realy-content{
            .detail-realy-info-text{
                width:150px;
                color:#666;
                p{
                    padding: 5px 0;
                }
            }
            .detail-realy-info-score{
                width: 830px;
                color:#fa8110;
                div{
                    width:20%;
                }
                .detail-realy-info-stars{
                    width: 40%;
                    position: relative;
                    div{
                        width: 90%;
                        height:100%;
                        /deep/ .el-rate{
                            position: relative;
                            i{
                                font-size: 32px;
                            }
                            .el-rate__text{
                                position: relative;
                                // &::after{
                                //     position: absolute;
                                //     content: '分';
                                //     top: 2px;
                                // }
                            }
                        }
                    }
                    p{
                        &:nth-child(2){
                            position: absolute;
                            left: 17%;
                            top:50%;
                            width:90px;
                            height:90px;
                            line-height:90px;
                            text-align: center;
                            transform: translateY(-50%) rotate(-25deg);
                            font-size: 26px;
                            color: #f7d897;
                            border: solid 2px #f7d897;
                            border-radius: 50%;
                            z-index: -1;
                        }
                    }
                }
            }
        }
    }
}   
</style>