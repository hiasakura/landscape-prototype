
// 企業属性情報取得APIモジュール

var moduleData = {};
var isCallDataElemant = false;

module.exports = function(key) {
  isCallDataElemant = true;
  return moduleData[key] || null;
};

var p_fire_per_visit = turbine.getExtensionSettings().fire_per_visit;
var storageData = sessionStorage.getItem("lbcdata");
if (storageData) {
  try {
    moduleData = JSON.parse(storageData);
  } catch (e) {
    sessionStorage.removeItem("lbcdata");
  }
  if (p_fire_per_visit) {
    sessionStorage.setItem("lbcdata", JSON.stringify({}));
    return;
  }
}

var p_uid = turbine.getExtensionSettings().uid;
var p_pw = turbine.getExtensionSettings().pw;
var p_gid = turbine.getExtensionSettings().gid;

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

window.__LBCUA = new _LBCUA({

  'name': "__LBCUA",
  'uid': p_uid,
  'pw':  p_pw,
  'gid': p_gid,

  'createLbcdata': function(){
      window.lbcdata = {};
  },
  'setLbcdata': function(){
      moduleData = {};
      moduleData.company_name = this.values.company_name;
      moduleData.company_addr = this.values.company_addr;
      moduleData.industry_name_m = this.values.industry_name_m;
      moduleData.sales_range = this.values.sales_range;
      moduleData.emp_range = this.values.emp_range;
      moduleData.office_id = this.values.office_id;
      moduleData.corporate_number = this.values.corporate_number;
  },
  'sendLbcdata': function(){
      lbcdata.loaded = "succeeded";
      sessionStorage.setItem("lbcdata", JSON.stringify(isCallDataElemant ? moduleData : {}));
  }
});