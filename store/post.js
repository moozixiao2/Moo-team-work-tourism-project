// 存储数据
export const state = () => ({
    // 收藏
    starPost: {}
})

// 定义及操作state函数
export const mutations = {
    setStarPost(state, data){
        state.starPost = data
    }
}