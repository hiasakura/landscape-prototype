var ITEM_LABEL_COMPANY_NAME = "company_name"
var ITEM_LABEL_COMPANY_ADDR = "company_addr"
var ITEM_LABEL_COMPANY_TEL = "company_tel"
var ITEM_LABEL_INDUSTRY_NAME = "industry_name_m"
var ITEM_LABEL_SALES_RANGE = "sales_range"
var ITEM_LABEL_CORPORATE_NUMBER = "corporate_number"
var ITEM_LABEL_EMP_RANGE = "emp_range"
var ITEM_LABEL_OFFICE_ID = "office_id"
var uid = turbine.getExtensionSettings().uid;
var pw = turbine.getExtensionSettings().pw;
var gid = turbine.getExtensionSettings().gid;
var firePerVisit = turbine.getExtensionSettings().fire_per_visit;
var eVarArray = turbine.getExtensionSettings().evar_data;
var propArray = turbine.getExtensionSettings().prop_data;

function _LBCUA(argv){

  this.uid = argv.uid || "";
  this.pw  = argv.pw || "";
  this.gid = argv.gid || "";
  this.timeout = argv.timeout || 5000;

  this.createLbcdata = argv.createLbcdata || function(){};
  this.__createLbcdata = function(){try{
    this.createLbcdata();
    this.status_createLbcdata = true;
  } catch (err){console.error(err)}};
  this.status_createLbcdata = false;

  this.setLbcdata = argv.setLbcdata || function(){};
  this.__setLbcdata = function(){try{
    if(!this.status_createLbcdata){ return false; }
    this.setLbcdata();
    this.status_setLbcdata = true;
  }catch(err){console.error(err)}};
  this.status_setLbcdata = false;

  this.sendLbcdata = argv.sendLbcdata || function(){};
  this.__sendLbcdata = function(){try{
    if(!this.status_createLbcdata){ return false; }
    this.sendLbcdata();
    this.status_sendLbcdata = true;
  }catch(err){console.error(err)}};
  this.status_sendLbcdata = false;

  this.flag = false;
  this.rs_code = -1;
  this.values = null;
  this.src = 'https://ip2c.landscape.co.jp/lbcapi/ip2c_ua2.php?callback=callback';
  
  this.callback_ok = function(jsonp){try{
    if(!this.flag){
      if(this.timeoutid){ clearTimeout(this.timeoutid); }
      this.flag = true;
      this.setValues(jsonp);
      if(this.rs_code == 0){ this.__setLbcdata(); }
      this.__sendLbcdata();
    }
  }catch(err){console.error(err)}};

  this.callback_timeout = function(){try{
    if(!this.flag){ this.flag = true; this.__sendLbcdata(); }
  }catch(err){console.error(err)}};

  this.startTrack = function(callback_func){try{
    var sc=document.createElement("script");sc.type="text/javascript";sc.charset="UTF-8";
    sc.src=this.src+"&uid="+this.uid+"&pw="+this.pw+"&gid="+this.gid+"&callback_lsua="+callback_func;
    document.getElementsByTagName("head")[0].appendChild(sc);
    this.__createLbcdata();
  }catch(err){console.error(err)}};

  this.setValues = function(jsonp){try{
    this.rs_code = jsonp.rs_code;
    this.values = jsonp;
  }catch(err){console.error(err)}};

  this.startTrack(argv.name+".callback_ok");
  this.timeoutid = setTimeout(argv.name+".callback_timeout()",this.timeout);
}


// Module Call
module.exports = function(settings) {

  window.__LBCUA = new _LBCUA({
    'name': "__LBCUA",
    'uid': uid,
    'pw':  pw,
    'gid': gid,

    'createLbcdata': function(){
        window.lbcdata = {};
    },

    'setLbcdata': function(){
        lbcdata.company_name = this.values.company_name;
        lbcdata.company_addr = this.values.company_addr;
        lbcdata.industry_name_m = this.values.industry_name_m;
        lbcdata.sales_range = this.values.sales_range;
        lbcdata.emp_range = this.values.emp_range;
        lbcdata.office_id = this.values.office_id;
        lbcdata.corporate_number = this.values.corporate_number;

        // Analytics設定処理
        var getTrackerFn = turbine.getSharedModule("adobe-analytics", "get-tracker");
        getTrackerFn().then(function(tracker) {

            // 企業属性毎に変数設定
            for (var i=0; i<eVarArray.length; i++) {
              var tgtKey = eVarArray[i]["attr"];
              var tgtVar = eVarArray[i]["variable"];

              if(tgtKey == ITEM_LABEL_COMPANY_NAME){
                tracker[tgtVar] = lbcdata.company_name; //企業名
              } else if(tgtKey == ITEM_LABEL_COMPANY_ADDR){
                tracker[tgtVar] = lbcdata.company_addr; // 企業住所
              } else if(tgtKey == ITEM_LABEL_INDUSTRY_NAME){
                tracker[tgtVar] = lbcdata.industry_name_m;  // 業種名
              } else if(tgtKey == ITEM_LABEL_SALES_RANGE){
                tracker[tgtVar] = lbcdata.sales_range; // 売上規模
              } else if(tgtKey == ITEM_LABEL_CORPORATE_NUMBER){
                tracker[tgtVar] = lbcdata.corporate_number; // 企業番号
              } else if(tgtKey == ITEM_LABEL_EMP_RANGE){
                tracker[tgtVar] = lbcdata.emp_range; // 従業員規模
              } else if(tgtKey == ITEM_LABEL_OFFICE_ID){
                tracker[tgtVar] = lbcdata.office_id; // オフィスID
              }
            }
            for (var i=0; i<propArray.length; i++) {
              var tgtKey = propArray[i]["attr"];
              var tgtVar = propArray[i]["variable"];

              if(tgtKey == ITEM_LABEL_COMPANY_NAME){
                tracker[tgtVar] = lbcdata.company_name; //企業名
              } else if(tgtKey == ITEM_LABEL_COMPANY_ADDR){
                tracker[tgtVar] = lbcdata.company_addr; // 企業住所
              } else if(tgtKey == ITEM_LABEL_INDUSTRY_NAME){
                tracker[tgtVar] = lbcdata.industry_name_m;  // 業種名
              } else if(tgtKey == ITEM_LABEL_SALES_RANGE){
                tracker[tgtVar] = lbcdata.sales_range; // 売上規模
              } else if(tgtKey == ITEM_LABEL_CORPORATE_NUMBER){
                tracker[tgtVar] = lbcdata.corporate_number; // 企業番号
              } else if(tgtKey == ITEM_LABEL_EMP_RANGE){
                tracker[tgtVar] = lbcdata.emp_range; // 従業員規模
              } else if(tgtKey == ITEM_LABEL_OFFICE_ID){
                tracker[tgtVar] = lbcdata.office_id; // オフィスID
              }
            }
        }, function(err) {
             turbine.logger.error("Strange things are afoot at the Circle-K", err);
        });
    },

    'sendLbcdata': function(){
        lbcdata.loaded = "succeeded";
    }
  });



}