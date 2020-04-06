<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="3"><h2>公网IP-数据对比</h2></el-col>
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
                        prop="subnetId"
                        label="子网ID">
                </el-table-column>
                <el-table-column
                        prop="vcfcIpaddress"
                        label="VCFC已分配IP地址">
                </el-table-column>
                <el-table-column
                        prop="ucaIpaddress"
                        label="UCA已分配IP地址">
                </el-table-column>
                <el-table-column label="操作" width="250px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" plain
                            :disabled="disabledFN(scope.row)"  @click.native="editTask(scope.row.subnetId)">数据补齐
                        </el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" plain
                                   @click.native="sureView(deleteTask,scope.row,scope.row.subnetId)">
                            数据清理
                        </el-button>
                    </template>
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
                total: 0,
                tableImageData: [
                ],
                tableHeight:window.innerHeight  - 200,
            }
        },
        mounted() {
            this.dataList();
        },
        methods: {
            dataList(){
                this.$axios.get(this.$api.publicDataList,{
                    params: {page: this.currentPage, pageSize: this.pageSize}
                }).then((response) => {
                    this.tableImageData = response.data.data
                    this.total = response.data['totalCount']
                })
            },
            handleSizeChange(val){
                this.pageSize = val;
                this.dataList()
            },
            handleCurrentChange(val){
                this.currentPage = val;
                this.dataList()
            },
            refreshList(){
                this.currentPage = 1;
                this.dataList()
            },
            editTask(id){
                this.$axios.put(this.$api.publicIPOperation,
                    {
                        params: {subnetid :id}
                    }).then((response) => {
                    if (response.status == 200){
                        if(response.data == true) {
                            this.showTips(this, "补齐数据成功！");
                            this.refreshList();
                        }else {
                            this.showTips(this, "补齐数据失败！");
                        }
                    }else{
                        this.showTips(this, "补齐数据失败请求失败！");
                    }}).catch((error) => {
                    this.errorMessageShow(this, error.response);
                })
            },
            deleteTask(row){
                this.$axios.put(this.$api.publicIpDelete,
                    {
                        params: {tenantId :row.tenantId,userName:row.userName,vcfcIpaddress:row.vcfcIpaddress,
                            ucaIpaddress:row.ucaIpaddress}
                    }).then((response) => {
                    if (response.status == 200){
                        if(response.data == true) {
                            this.showTips(this, "清理数据成功！");
                            this.refreshList();
                        }else {
                            this.showTips(this, "清理数据失败！");
                        }
                    }else{
                        this.showTips(this, "清理数据失败！");
                    }}).catch((error) => {
                    this.errorMessageShow(this, error.response);
                })
            },
            disabledFN(row){
                if(row.subnetId == null){
                   return true;
                }else{
                    return false;
                }
            },
        }
    }
</script>
