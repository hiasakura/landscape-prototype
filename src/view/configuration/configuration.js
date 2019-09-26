var uidInput = document.getElementById('uid');
var pwInput = document.getElementById('pw');
var gidInput = document.getElementById('gid');

window.extensionBridge.register({
  init: function (info) {
    if (info.settings) {
      uidInput.value = info.settings.uid;
      pwInput.value = info.settings.pw;
      gidInput.value = info.settings.gid;
      $('.fire_per_visit').prop('checked', info.settings.fire_per_visit);
    }
  },

  getSettings: function () {
    var firePerVisit = $('.fire_per_visit:checked').val() ? true : false;

    return {
      uid: uidInput.value,
      pw: pwInput.value,
      gid: gidInput.value,
      fire_per_visit: firePerVisit
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