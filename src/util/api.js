const portsList = '/api/v2.1/netAudit/ports';
const routerList = '/api/pco/v2.1/routerInformationList';
const networkList = '/api/pco/v2.1/networkInformationList';
const  portDelete ='/api/v2.1/netAudit/ports';
const  loginApi ='/auth/tokens';
const  interIPOperation ='/api/v2.1/netAudit/reservedIP';
const publicIPResource ='/api/v2.1/netAudit/getEipResourceInfo';
const publicTopList  = '/api/v2.1/netAudit/getTenantEipInfo';
const publicDataList ='/api/v2.1/netAudit/getTenantDataCompare';
const publicIPOperation ='/api/v2.1/netAudit/autoPolishingNeutronData';
const publicIpDelete ='/api/v2.1/netAudit/autoDeleteNeutronData';
const startGateWay = '/api/pco/v2.1/createExternalGateway';
const  test = '/api/v2.1/netAudit/test';
const startFireWall = '/api/pco/v2.1/createFirewallInformation';
const saveManualOperation ='/api/pco/v2.1/saveManualOperation';
const manualOperationList ='/api/pco/v2.1/manualOperationList';



export default {
    manualOperationList,
    saveManualOperation,
    startFireWall,
    test,
    startGateWay,
    publicIpDelete,
    publicIPOperation,
    publicDataList,
    publicTopList,
    portDelete,
    networkList,
    loginApi,
    portsList,
    routerList,
    interIPOperation,
    publicIPResource,
}
