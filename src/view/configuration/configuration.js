var uidInput = document.getElementById('uid');
var pwInput = document.getElementById('pw');
var gidInput = document.getElementById('gid');
var eVarArray = new Array();
var propArray = new Array();

window.extensionBridge.register({
  init: function (info) {
    if (info.settings) {
      uidInput.value = info.settings.uid;
      pwInput.value = info.settings.pw;
      gidInput.value = info.settings.gid;
      $('.fire_per_visit').prop('checked', info.settings.fire_per_visit);

      // eVarの設定内容を画面に描画
      eVarArray = info.settings.evar_data;
      evarIndex = INITIAL_ROW_NUM;
      if(eVarArray != undefined && eVarArray.length > 0){    
        $.each(eVarArray, function(index, value){
          var objItemList = SEL_EVAR_ITEM_LIST + evarIndex;
          var objVariableList = SEL_EVAR_VALRIABLE_LIST + evarIndex;
          if(evarIndex != INITIAL_ROW_NUM){
            AddVariables(VAR_TYPE_EVAR, SEL_EVAR_DATA, SEL_EVAR_ITEM_LIST, SEL_EVAR_VALRIABLE_LIST)
          }
          $("#" + objItemList).val(eVarArray[index]["attr"]);
          $("#" + objVariableList).val(eVarArray[index]["variable"]);
          evarIndex = evarIndex+1;
        })
      }

      // propの設定内容を画面に描画
      propArray = info.settings.prop_data;
      propIndex = INITIAL_ROW_NUM;
      if(propArray != undefined && propArray.length > 0){
        $.each(propArray, function(index, value){
          var objItemList = SEL_PROP_ITEM_LIST + propIndex;
          var objVariableList = SEL_PROP_VALRIABLE_LIST + propIndex;
          if(propIndex != INITIAL_ROW_NUM){
            AddVariables(VAR_TYPE_PROP, SEL_PROP_DATA, SEL_PROP_ITEM_LIST, SEL_PROP_VALRIABLE_LIST)
          }
          $("#" + objItemList).val(propArray[index]["attr"]);
          $("#" + objVariableList).val(propArray[index]["variable"]);
          propIndex = propIndex+1;
        })
      }

    }
  },
  getSettings: function () {
    var firePerVisit = $('.fire_per_visit:checked').val() ? true : false;
    var eVarItemNum = document.getElementsByName(SEL_EVAR_ITEM_LIST).length;
    var propItemNum = document.getElementsByName(SEL_PROP_ITEM_LIST).length;
    eVarArray = [];
    propArray = [];

    // eVarの設定内容保存
    for(var i=0; i<eVarItemNum; i++ ){
      var listIndex = i+1;
      var itemListName = SEL_EVAR_ITEM_LIST + listIndex;
      var noListName = SEL_EVAR_VALRIABLE_LIST + listIndex;
      var itemListText = $('#'+itemListName+' option:selected').text();
      var noListText = $('#'+noListName+' option:selected').text();
      eVarArray.push({"attr":itemListText, "variable" : noListText});

    }

    // propの設定内容保存
    for(var i=0; i<propItemNum; i++ ){
      var listIndex = i+1;
      var itemListName = SEL_PROP_ITEM_LIST + listIndex;
      var noListName = SEL_PROP_VALRIABLE_LIST + listIndex;
      var itemListText = $('#'+itemListName+' option:selected').text();
      var noListText = $('#'+noListName+' option:selected').text();
      propArray.push({"attr":itemListText, "variable" : noListText});
    }    

    return {
      uid: uidInput.value,
      pw: pwInput.value,
      gid: gidInput.value,
      fire_per_visit: firePerVisit,
      evar_data : eVarArray,
      prop_data : propArray
    }
  },
  validate: function () {
    var flg = true;
    if(!uidInput.checkValidity()){
      flg = false;
    }
    if(!pwInput.checkValidity()){
      flg = false;
    }  
    if(!gidInput.checkValidity()){
      flg = false;
    }
    return flg;
  }
});