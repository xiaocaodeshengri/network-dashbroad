<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="3"><h2>路由信息</h2></el-col>
            <el-col :span="3" :offset="10" style="padding-top:16px">
                <el-input placeholder="租户ID"
                          v-model='tenant_id' size="small">
                </el-input>
            </el-col>
            <el-col :span="3">
                <el-input v-model="router_id"  placeholder="路由器ID" size="small"
                           style="padding-top:16px" >
                </el-input>
            </el-col>
            <el-col :span="3">
                <el-input v-model="external_gateway"  placeholder="外部网关iP" size="small"
                           style="padding-top:16px" >
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
                    prop="tenant_id"
                    label="租户ID"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="router_id"
                    label="路由器id"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="router_name"
                    label="路由器名称"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="firewall_id"
                    label="防火墙ID"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="external_gateway"
                    label="外部网关ip"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="create_firewall_flag"
                    label="是否显示创建防火墙按钮"
                    width="300">
                <template slot-scope="scope"  >
                    <el-button type="primary" icon="el-icon-edit" size="mini" plain
                               :disabled=!scope.row.create_firewall_flag   @click.native="startFireWall(scope.row.router_id)">创建防火墙
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="create_gateway_flag"
                    label="是否显示分配外部网关按钮"
                    width="300" >
                <template slot-scope="scope"  >
                    <el-button type="primary" icon="el-icon-edit" size="mini" plain
                               :disabled=!scope.row.create_gateway_flag  @click.native="startGateWay(scope.row.router_id)">分配外部网关
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
                external_gateway: null,
                router_id: null,
                tenant_id: null,
                tableHeight:window.innerHeight  - 200,
            }
        },
        mounted() {
            this.routerList();
        },
        methods: {
            routerList(external_gateway, router_id, tenant_id){
                console.log(external_gateway)
                console.log(router_id)
                console.log(tenant_id)
                this.$axios.get(this.$api.routerList,
                    {

                    }).then((response) => {
                        console.log(response)
                    this.tableImageData = response.data['routers']
                    this.total = response.data['totalCount']
                })
            },
            handleSizeChange(val){
                this.pageSize = val;
                this.routerList(this.external_gateway, this.router_id, this.tenant_id)
            },
            handleCurrentChange(val){
                this.currentPage = val;
                this.routerList(this.external_gateway, this.router_id, this.tenant_id)
            },
            refreshList(){
                this.currentPage = 1;
                this.external_gateway = null;
                this.router_id = null;
                this.tenant_id = null;
                this.routerList(this.external_gateway, this.router_id, this.tenant_id);
            },
            startGateWay(router_id){
                this.$axios.post(this.$api.startGateWay,'router_id='+router_id
                    ).then((response) => {
                        if(response.status == 201){
                            this.showTips(this, "操作成功！");
                        }else{
                            this.showTips(this, "操作失败！");
                        }
                }).catch((error) => {
                    this.errorMessageShow(this, error.response);
                })
            },
            startFireWall(router_id){
                this.$axios.post(this.$api.startFireWall,'router_id='+router_id
                ).then((response) => {
                    console.log(response)
                    if(response.status == 201){
                        this.showTips(this, "操作成功！");
                        this.refreshList();
                    }else{
                        this.showTips(this, "操作失败！");
                        this.refreshList();
                    }
                }).catch((error) => {
                    this.errorMessageShow(this, error.response);
                })
            },
        }
    }
</script>
