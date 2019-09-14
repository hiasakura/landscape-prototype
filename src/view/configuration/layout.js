
// 変数情報の初期化
window.onload = function () {
	initVars(VAR_TYPE_EVAR, INITIAL_ROW_NUM);
	initVars(VAR_TYPE_PROP, INITIAL_ROW_NUM);
};
function initVars(type,row){

	var objItemList = ""
	var objVariableList = ""
	var maxVariable = 0
	if(type == VAR_TYPE_EVAR){
		objItemList = document.getElementById(SEL_EVAR_ITEM_LIST + row)
		objVariableList = document.getElementById(SEL_EVAR_VALRIABLE_LIST + row)
		maxVariable = MAX_EVAR_CNT
	} else if(type == VAR_TYPE_PROP){
		objItemList = document.getElementById(SEL_PROP_ITEM_LIST + row)
		objVariableList = document.getElementById(SEL_PROP_VALRIABLE_LIST + row)
		maxVariable = MAX_PROP_CNT
	}

	// 初期：企業属性プルダウン生成
	$(objItemList).append($("<option selected>").val(ITEM_LABEL_DEFAULT).text(ITEM_LABEL_DEFAULT));
	$(objItemList).append($("<option>").val(ITEM_LABEL_COMPANY_NAME).text(ITEM_LABEL_COMPANY_NAME));
	$(objItemList).append($("<option>").val(ITEM_LABEL_COMPANY_ADDR).text(ITEM_LABEL_COMPANY_ADDR));
	$(objItemList).append($("<option>").val(ITEM_LABEL_COMPANY_TEL).text(ITEM_LABEL_COMPANY_TEL));
	$(objItemList).append($("<option>").val(ITEM_LABEL_INDUSTRY_NAME).text(ITEM_LABEL_INDUSTRY_NAME));
	$(objItemList).append($("<option>").val(ITEM_LABEL_SALES_RANGE).text(ITEM_LABEL_SALES_RANGE));
	$(objItemList).append($("<option>").val(ITEM_LABEL_CORPORATE_NUMBER).text(ITEM_LABEL_CORPORATE_NUMBER));
	$(objItemList).append($("<option>").val(ITEM_LABEL_EMP_RANGE).text(ITEM_LABEL_EMP_RANGE));
	$(objItemList).append($("<option>").val(ITEM_LABEL_OFFICE_ID).text(ITEM_LABEL_OFFICE_ID));

	// 初期：変数プルダウン作成
	$(objVariableList).append($("<option selected>").val(VARIABLE_VALUE_DEFAULT).text(VARIABLE_LABEL_DEFAULT));
	for(var i=1; i<=maxVariable; i++){
		$(objVariableList).append($("<option>").val(type +i).text(type +i));
	}
}

// 属性・変数追加処理
function AddVariables(type, name, itemlist, varlist){
	var nodeNum = document.getElementsByName(name).length;
	var lastIndex = nodeNum - 1;
	var nextIndex = nodeNum + 1;
	var devObj = document.getElementsByName(name)[lastIndex];
    var copied = $(devObj).clone();
    $(devObj).after(copied);

	var itemlistObj = document.getElementsByName(itemlist)[nodeNum];
	var varlistObj = document.getElementsByName(varlist)[nodeNum];
	itemlistObj.id = itemlist + nextIndex;
	varlistObj.id = varlist + nextIndex;
}
