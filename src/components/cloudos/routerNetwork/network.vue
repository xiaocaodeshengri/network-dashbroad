<template>
    <div>
        <el-row :gutter="2">
            <el-col :span="3"><h2>网络与子网</h2></el-col>
            <el-col :span="3" :offset="10" style="padding-top:16px">
                <el-input placeholder="租户ID"
                          v-model='tenant_id' size="small">
                </el-input>
            </el-col>
            <el-col :span="3">
                <el-input v-model="tenant_name"  placeholder="租户名称" size="small"
                          style="padding-top:16px">
                </el-input>
            </el-col>
            <el-col :span="3">
                <el-input v-model="network_name"  placeholder="网络名称" size="small"
                          style="padding-top:16px">
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
                style="width: 100%">
            <el-table-column
                    type="index"
                    label="No.">
            </el-table-column>
            <el-table-column
                    prop="tenant_id"
                    label="租户ID">
            </el-table-column>
            <el-table-column
                    prop="network_id"
                    label="网络ID">
            </el-table-column>
            <el-table-column
                    prop="network_name"
                    label="网络名称">
            </el-table-column>
            <el-table-column
                    prop="subnet_name"
                    label="子网名称">
            </el-table-column>
            <el-table-column
                    prop="create_gateway_flag"
                    label="操作"
                    width="300" >
                <template slot-scope="scope"  >
                    <el-button type="primary" icon="el-icon-edit" size="mini" plain
                                 @click.native="operate(scope.row)">已人工处理
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        </el-container>
        <el-row type="flex" justify="end"  >
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
                    {
                        "tenant_id": "sdsfdsfdsfdsf",
                        "tenant_name": "hello",
                         "network_name":"hello",
                        "subnet_name":"subnet_name",
                    },
                    {
                        "tenant_id": "sdsfdsfdsfdsf",
                        "tenant_name": "hello",
                        "network_name":"hello",
                        "subnet_name":"subnet_name",
                    },  {
                        "tenant_id": "sdsfdsfdsfdsf",
                        "tenant_name": "hello",
                        "network_name":"hello",
                        "subnet_name":"subnet_name",
                    },
                ],
                tenant_name: null,
                network_name: null,
                tenant_id: null
            }
        },
        mounted() {
            this.networkList();
        },
        methods: {
            networkList(tenant_id, network_name, tenant_name){
                console.log(tenant_id)
                console.log(network_name)
                console.log(tenant_name)
                this.$axios.get(this.$api.networkList,
                    {
                       // params: {page: this.currentPage, size: this.pageSize, network_name: network_name, tenant_name: tenant_name, tenant_id: tenant_id}
                    }).then((response) => {
                    this.tableImageData = response.data['networks']
                    this.total = response.data['total']
                })
            },
            handleSizeChange(val){
                this.pageSize = val;
                this.networkList(this.tenant_id, this.network_name, this.tenant_name)
            },
            handleCurrentChange(val){
                this.currentPage = val;
                this.networkList(this.tenant_id, this.network_name, this.tenant_name)
            },
            refreshList(){
                this.currentPage = 1;
                this.tenant_name = null;
                this.network_name = null;
                this.tenant_id = null;
                this.networkList(this.tenant_id, this.network_name, this.tenant_name);
            },
            operate(row){
              console.log(row)
                this.$axios.post(this.$api.saveManualOperation,
                    {
                        tenant_id: row.tenant_id, resource_type: "network", resource_id: row.network_id,
                        operation_type: '人工处理'
                    }).then((response) => {
                    if (response.status == 201) {
                            this.showTips(this, " 操作成功！");
                             this.refreshList()
                    } else {
                        this.showTips(this, "操作失败！");
                        this.refreshList()
                    }
                }).catch((error) => {
                    this.errorMessageShow(this, error.response);
                })
            },

        }
    }
</script>
