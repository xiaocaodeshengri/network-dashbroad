<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="3"><h2>内网IP/数据对比</h2></el-col>
            <el-col :span="3" :offset="10" style="padding-top:16px">
                <el-input placeholder="租户ID"
                          v-model='tenantId' size="small">
                </el-input>
            </el-col>
            <el-col :span="3">
                <el-input v-model="neutronIpAddress"  placeholder="neutronIP地址" size="small"
                          style="padding-top:16px" >
                </el-input>
            </el-col>
            <el-col :span="3">
                <el-input v-model="vcfcIpAddress"  placeholder="vcfcIP地址" size="small"
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
                        prop="id"
                        label="ID">
                </el-table-column>
                <el-table-column
                        prop="macAddress"
                        label="Mac地址">
                </el-table-column>
                <el-table-column
                        prop="networkId"
                        label="网络ID">
                </el-table-column>
                <el-table-column
                        prop="tenantId"
                        label="租户ID">
                </el-table-column>
                <el-table-column
                        prop="tenantId"
                        label="租户ID">
                </el-table-column>
                <el-table-column
                        prop="tenantName"
                        label="租户名称">
                </el-table-column>
                <el-table-column
                        prop="neutronIpAddress"
                        label="NeutronIp地址">
                </el-table-column>
                <el-table-column
                        prop="vcfcIpAddress"
                        label="VcfcIp地址">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="状态">
                </el-table-column>
                <el-table-column label="操作" width="250px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" plain
                                   @click.native="editTask(scope.row.id)">数据补齐
                        </el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" plain
                                   @click.native="sureView(deleteTask,tableData[scope.$index]['id'],tableData[scope.$index]['neutronIpAddress'])">
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
                    {
                        "id": "ec8eb315-6121-422f-88dd-4da3e0c87bef",
                        "tenantId": "15ad040b-c413-4a53-818e-09c5f10bbf09",
                        "tenantName": "raoxiaopeng-168",
                        "neutronIpAddress": "10.124.0.7",
                        "vcfcIpAddress": null,
                        "status": "DOWN",
                        "subnetId": "f248896d-6b3b-42fe-87ed-9bc105969aa5",
                        "networkId": "50a27fc9-4456-4cfc-a15a-d4c1e36699ec",
                        "macAddress": "fa:16:3e:6c:cc:9c",
                        "standard_attr_id": 28464,
                        "timestamp": null
                    },
                    {
                        "id": "c3b034fa-2905-450a-bece-b785dd14679d",
                        "tenantId": "15ad040b-c413-4a53-818e-09c5f10bbf09",
                        "tenantName": "raoxiaopeng-168",
                        "neutronIpAddress": "10.124.0.6",
                        "vcfcIpAddress": null,
                        "status": "DOWN",
                        "subnetId": "f248896d-6b3b-42fe-87ed-9bc105969aa5",
                        "networkId": "50a27fc9-4456-4cfc-a15a-d4c1e36699ec",
                        "macAddress": "fa:16:3e:14:a0:84",
                        "standard_attr_id": 28971,
                        "timestamp": null
                    },
                ],
                vcfcIpAddress: null,
                neutronIpAddress: null,
                tenantId: null,
                tableHeight:window.innerHeight  - 200,
            }
        },
        mounted() {
            this.portsList();
        },
        methods: {
            portsList(tenantId, neutronIpAddress, vcfcIpAddress){
                this.$axios.get(this.$api.portsList,
                    {
                        params: {page: this.currentPage, pageSize: this.pageSize,
                            tenantId: tenantId, neutronIpAddress: neutronIpAddress, vcfcIpAddress: vcfcIpAddress}
                    }).then((response) => {
                    this.tableImageData = response.data['data']
                    this.total = response.data['totalCount']
                })
            },
            handleSizeChange(val){
                this.pageSize = val;
                this.portsList(this.tenantId, this.neutronIpAddress, this.vcfcIpAddress)
            },
            handleCurrentChange(val){
                this.currentPage = val;
                this.portsList(this.external_gateway, this.router_id, this.tenant_id)
            },

            searchByName(){
                this.portsList(this.external_gateway, this.router_id, this.tenant_id)
            },
            refreshList(){
                this.currentPage = 1;
                this.external_gateway = null;
                this.router_id = null;
                this.tenant_id = null;
                this.portsList(this.external_gateway, this.router_id, this.tenant_id)
            },
            editTask(id){
                alert(id)
                this.$axios.post(this.$api.interIPOperation,
                    {
                            id: id
                    }).then((response) => {
                        console.log(response)
                       console.log(response.data == true)
                        if (response.status == 200){
                             if(response.data == true) {
                                 this.imageList(this.environmentId, this.category, this.imageName);
                             }else {
                               alert("补齐数据失败！");
                             }
                            }else{
                            this.errorMessageShow(this, "补齐数据失败！");
                        }}).catch((error) => {
                    this.errorMessageShow(this, error.response);
                })
            }



        }
    }
</script>
