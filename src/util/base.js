exports.install = function (Vue) {
    Vue.prototype.sureView = function (func, arg, msg) {
        this.$confirm('此操作将永久删除' + '<strong style="color: red;">' + msg + '</strong>' + ',是否继续?', '提示', {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            func(arg);
        }).catch(() => {
        });
    };
    Vue.prototype.messageShow = function (_this, response) {
        if (response.data['code'] < 210) {
            if (response.data['msg'] != '') {
                _this.$notify({
                    title: '成功',
                    message: response.data['msg'],
                    type: 'success',
                });
            }
        } else {
            _this.$notify({
                title: '警告',
                message: response.data['msg'],
                type: 'warning',
            });
        }
        return true
    };
    Vue.prototype.errorMessageShow = function (_this, response) {
        _this.$notify.error({
            title: '错误',
            message: response.data['msg']
        })
    };
    Vue.prototype.showTips = function (_this, text) {
        _this.$notify.info({
            title: '提示',
            message: text
        })
    };
    Vue.prototype.postOperation = function (_this,  resource_type, resource_id, operation_type) {
        console.log(localStorage.tenant_id)
        this.$axios.post(this.$api.saveManualOperation,
            {
                tenant_id: localStorage.tenant_id, resource_type: resource_type, resource_id: resource_id,
                operation_type: operation_type
            }).then((response) => {
            if (response.status == 200) {
                if (response.data == true) {
                    this.showTips(this, " 保存操作成功！");
                } else {
                    this.showTips(this, "保存操作失败！");
                }
            } else {
                this.showTips(this, "保存操作失败！");
            }
        }).catch((error) => {
            this.errorMessageShow(this, error.response);
        })
    };
}
