<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="3"><h2>公网IP/TOP租户</h2></el-col>
            <el-col :span="3" :offset="15" style="padding-top:16px">
                <el-input placeholder="租户ID"
                          v-model.trim='tenantId' size="small">
                </el-input>
            </el-col>
            <el-col :span="2" style="padding-top:16px">
                <el-button type="primary" icon="el-icon-search" size="mini" plain
                           @click.native="refreshList">搜索
                </el-button>
            </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-container direction="vertical" style="height: 680px" >
            <el-table
                    :data="tableImageData"
                    stripe
                    style="width: 100%"
                    :height="tableHeight">
                <el-table-column
                        type="index"
                        label="No."
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="tenantId"
                        label="租户ID">
                </el-table-column>
                <el-table-column
                        prop="userName"
                        label="用户名">
                </el-table-column>
                <el-table-column
                        prop="eipNumbers"
                        label="EIP个数">
                </el-table-column>
                <el-table-column
                        prop="totalBandwidth"
                        label="带宽总值">
                </el-table-column>
            </el-table>
        </el-container>
        <el-row type="flex" justify="end" style="padding-bottom: 20px">
            <el-col :span="15" style=padding-top:24px >
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 50, 100, 200, 500]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentPage: 1,
                pageSize: 10,
                total: 100,
                tableImageData: [
                    /*{
                        "tenantId": "ec8eb315-6121-422f-88dd-4da3e0c87bef",
                        "userName": "15ad040b-c413-4a53-818e-09c5f10bbf09",
                        "eipNumbers": "raoxiaopeng-168",
                        "totalBandwidth": "10.124.0.7",
                    },
                    {
                        "tenantId": "ec8eb315-6121-422f-88dd-4da3e0c87bef",
                        "userName": "15ad040b-c413-4a53-818e-09c5f10bbf09",
                        "eipNumbers": "raoxiaopeng-168",
                        "totalBandwidth": "10.124.0.7",
                    },*/
                ],
                tenantId: null,
                tableHeight:window.innerHeight  - 200,
            }
        },
        mounted() {
            this.publicTopList();
        },
        methods: {
            publicTopList(tenantId){
                this.$axios.get(this.$api.publicTopList,{
                    params: {page: this.currentPage, pageSize: this.pageSize,tenantId:tenantId}
                }).then((response) => {
                    this.tableImageData = response.data.data;
                    this.total = response.data['totalCount']
                })
            },
            handleSizeChange(val){
                this.pageSize = val;
                this.publicTopList(this.tenantId)
            },
            handleCurrentChange(val){
                this.currentPage = val;
                this.publicTopList(this.tenantId)
            },
            refreshList(){
                this.currentPage = 1;
                if(this.tenantId == "" || this.tenantId == null || this.tenantId== undefined){
                    this.tenantId =null
                }
                this.publicTopList(this.tenantId)
            },
        }
    }
</script>
