function export() {
  showSidebar();
  var ss = SpreadsheetApp.getActive(),
      ws = ss.getActiveSheet(),
      settings_ws = ss.getSheetByName('00'),
      ss_id = ss.getId(),
      ws_id = ws.getSheetId(),
      ss_name = ss.getName(),
      ws_name = ws.getName(),
      col_service_id = 0,
      col_service_name = 1,
      col_accrual = 2,
      col_payment = 3,
      col_contractor = 4,
      col_comment = 6,
      col_accrual_scan = 7,
      col_payment_scan = 8,
      accrual_prefix = 'Нач_',
      payment_prefix = 'Опл_',
      receiver_ss = SpreadsheetApp.openById('16mmV9HssMP9j9x4lt0EoLMOJsNcgL2ywcyUKx_lfas8'),
      accruals_ws = receiver_ss.getSheetByName('Начисления'),
      payments_ws = receiver_ss.getSheetByName('Оплаты'),
      year = settings_ws.getRange(5, 2).getValue(),
      house = settings_ws.getRange(6, 2).getValue();
  
  Logger.log('Начало экспорта ' + new Date());
  
  // Получаем диапазон листа с данными
  var range = ws.getDataRange(); 
  var data = range.getValues();
  
  var output = '';
  var accrual = [];
  var payment = [];
  
//  var date_parts = ws_name.split('.');
  var date_string = '';
  if (!parseInt(ws_name, 10)) {
    Logger.log('Неверный формат имени листа');
    var ui = SpreadsheetApp.getUi();
    ui.alert('Неверный формат имени листа. Лист дожен быть номером месяца.')
    return;
  }
  
  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    if(row[0].length > 4) {
      Logger.log('Строка ' + (i + 1) + ' подходит для экспорта');
      payment = [];
      
      if (row[col_accrual]) {
        // Есть начисление
        var date = new Date(year, parseInt(ws_name, 10)-1, 0);
        date_string = (date.getMonth() + 1) + '.' + date.getFullYear();
        Logger.log('В строке ' + (i + 1) + ' есть начисление');
        exportRow(row, accruals_ws, i, accrual_prefix, col_accrual, date_string, col_accrual_scan);
      }
      if (row[col_payment]) {
        // Есть оплата
        var date = new Date(year, parseInt(ws_name, 10)-0, 0);
        date_string = (date.getMonth() + 1) + '.' + date.getFullYear();
        Logger.log('В строке ' + (i + 1) + ' есть оплата');
        exportRow(row, payments_ws, i, payment_prefix, col_payment, date_string, col_payment_scan);
      }
    }
  }
  Logger.log('Окончание экспорта ' + new Date());
  closeSidebar();
  var ui = SpreadsheetApp.getUi();
  ui.alert('Выгрузка выполнена');
  
  function exportRow(row, ws, index, prefix, col_sum, date_string, col_scan) {
    var id = prefix + house + '_' + ws_name + '.' + year +  '_' + index;
    var service = '' + row[col_service_id] + ' ' + row[col_service_name];
    var textFinder = ws.createTextFinder(id);
    var data_detected = textFinder.findNext();
    var data = [
      id,
      date_string,
      house,
      service,
      row[col_contractor],
      row[col_comment],
      row[col_sum],
      row[col_scan]
    ];
    if(data_detected) {
      Logger.log('Найдена строка ' + id + ', обновление');
      var range_row = data_detected.getRow();
      var range_start_col = 1;
      var range_rows = 1;
      var range_cols = data.length;
      var range = ws.getRange(range_row, range_start_col, range_rows, range_cols);
      range.setValues([data]);
    }
    else {
      Logger.log('Строка ' + id + ' не найдена, добавление');
      ws.appendRow(data);
    }
  }
  
  function showSidebar() {
    var preloader = UrlFetchApp.fetch('https://raw.githubusercontent.com/ryabkov79/ryabkov79.github.io/master/preloader.html');
    var template = HtmlService.createTemplate(preloader.getBlob());
    var html = template.evaluate();
    html.setTitle('Выгрузка в общую таблицу')
    var ui = SpreadsheetApp.getUi();
    ui.showSidebar(html);
  }
  
  function closeSidebar() {
    var html = HtmlService.createHtmlOutput("<script>google.script.host.close();</script>");
    SpreadsheetApp.getUi().showSidebar(html);
  }
}
