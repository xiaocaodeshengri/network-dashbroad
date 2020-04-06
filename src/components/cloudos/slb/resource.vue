<template>
    <div>
        <el-row :gutter="2">
            <el-col :span="5"><h2>负载均衡器-资源汇总</h2></el-col>
        </el-row>
        <el-divider></el-divider>
        <el-container direction="vertical" style="height: 680px" >
            <div id="chartColumn" style="width: 100%; height: 400px;">
            </div>
        </el-container>
    </div>
</template>

<script>
    import echarts from 'echarts'
   export default {
       data() {
           return {
               chartColumn: null
           }
       },
       mounted() {
           this.drawPie();
       },
       methods: {
           drawPie() {
               this.chartColumn = echarts.init(document.getElementById('chartColumn'));
               this.chartColumn.setOption({
                   title: {text: 'SLB资源汇总'},
                   tooltip: {},
                   xAxis: {
                       type: 'category',
                       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                   },
                   yAxis: {
                       type: 'value'
                   },
                   series: [{
                       data: [820, 932, 901, 934, 1290, 1330, 1320],
                       type: 'line'
                   }]
               });
           }
       }
   }
</script>
