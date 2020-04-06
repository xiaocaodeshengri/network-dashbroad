<template>
    <div>
        <el-row :gutter="2">
            <el-col :span="5"><h2>公网IP-资源汇总</h2></el-col>
        </el-row>
        <el-divider></el-divider>
        <el-container direction="vertical" style="height: 680px" >
            <div id="chartColumn" style="width: 100%; height: 400px;">
            </div>
            <div id="show" style="width: 200px; height: 150px; margin-left:900px;font-size: 16px;color: #0d47a1">
                <li>Eip总数:   {{data.totalEipNumbers}}</li>
                <li>已出售的EIP数量:   {{data.eipSacledNumbers}}</li>
                <li>已绑定资源:  {{data.boundEipNumbers}}</li>
                <li>可用资源数:  {{data.residueNumbers}}</li>
                <li>已卖出的带宽总数:  {{data.totalBandwidthSaled}}</li>
            </div>

        </el-container>

    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        data() {
            return {
                chartColumn: null,
                data :{
                   /* "totalEipNumbers":10000,
                    "eipSacledNumbers": 33,
                    "boundEipNumbers": 44,
                    "residueNumbers":55,
                    "totalBandwidthSaled":66,*/
                },
            }
        },
        mounted() {
            this.draw();
        },
        methods: {
            drawPie() {
                //发送ajax请求获取结果并渲染结果
                this.$axios.get(this.$api.publicIPResource,
                    ).then((response) => {
                        console.log(response.data);
                    this.data = response.data
                    this.draw();
                })},
           draw(){
                console.log(this.data);
                this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                this.chartColumn.setOption({
                    title: {text: '公网IP资源汇总',
                            top: 'top',
                            left: 'center',
                            textStyle:{
                                fontSize: 24,
                                fontWeight: '',
                                color: '#333'
                        }, },
                    tooltip: {},
                    series : [
                        {
                            name: '使用情况',
                            type: 'pie',    // 设置图表类型为饼图
                            radius: '60%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
                            data:[          // 数据数组，name 为数据项名称，value 为数据项值
                                {value:this.data['eipSacledNumbers'], name:'已出售的EIP数量'},
                                {value:this.data['boundEipNumbers'], name:'已绑定资源'},
                                {value:this.data['residueNumbers'], name:'可用资源数'},
                                {value:this.data['totalBandwidthSaled'], name:'已卖出的带宽总数'},
                            ]
                        }
                    ],
                });
            }
        }
    }
</script>
