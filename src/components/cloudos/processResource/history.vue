<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="3"><h2>已处理资源</h2></el-col>
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
                        prop="tenant_id"
                        label="租户ID">
                </el-table-column>
                <el-table-column
                        prop="resource_type"
                        label="资源类型">
                </el-table-column>
                <el-table-column
                        prop="resource_id"
                        label="资源ID">
                </el-table-column>
                <el-table-column
                        prop="operation_type"
                        label="操作类型">
                </el-table-column>
                <el-table-column
                        prop="operation_time"
                        label="操作时间">
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
                tableImageData: [],
                tableHeight: window.innerHeight - 200,
            }
        },
        mounted() {
            this.dataList();
        },
        methods: {
            dataList() {
                this.$axios.get(this.$api.manualOperationList, {}).then((response) => {
                    console.log(response)
                    this.tableImageData = response.data.manualOperationList
                    this.total = response.data['totalCount']
                })
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.dataList()
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.dataList()
            },
            refreshList() {
                this.currentPage = 1;
                this.dataList()
            },

        }
    }
</script>
