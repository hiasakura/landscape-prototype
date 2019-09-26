'use strict';
var landscapeObj = turbine.getExtensionSettings().landscapeObj;
console.log("data selement value Company Address "+ turbine.getDataElementValue("Company Address"));

function _LBCUA(argv){

  console.log("API Call2");

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

module.exports = function(settings) {

  console.log("this is landscape objects222");
  console.log("landscapeObjects.js settings landscapeObj " + settings.landscapeObj);

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
    },

    'sendLbcdata': function(){
        lbcdata.loaded = "succeeded";
    }
  });

  console.log("this is landscape objects333");

  return window.lbcdata[settings.attributeName];

};
