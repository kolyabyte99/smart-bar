// ============================================
// Smart Bar — Google Apps Script Web App
// ============================================

var STATUS_VALUES = ["new", "shipped", "delivered", "cancelled"];

function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();

  // 1) Headers (only if row 1 is empty)
  if (sheet.getLastRow() < 1) {
    sheet.getRange(1, 1, 1, 12).setValues([[
      "order_id", "created_at", "name", "phone", "email",
      "city", "np_branch", "comment", "payment", "items",
      "total", "status"
    ]]);
    sheet.getRange(1, 1, 1, 12)
      .setFontWeight("bold")
      .setBackground("#FACC15")
      .setFontColor("#000000");
    sheet.setFrozenRows(1);
  }

  // 2) Dropdown for status column (L)
  var lastRow = Math.max(sheet.getLastRow(), 100);
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(STATUS_VALUES, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(2, 12, lastRow, 1).setDataValidation(rule);

  SpreadsheetApp.getUi().alert("Done! " + lastRow + " rows ready for orders.");
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    var lastRow = sheet.getLastRow();
    var nextRow = lastRow + 1;

    sheet.getRange(nextRow, 1, 1, 12).setValues([[
      data.order_id   || "",
      data.created_at || new Date().toISOString(),
      data.name       || "",
      data.phone      || "",
      data.email      || "",
      data.city       || "",
      data.np_branch  || "",
      data.comment    || "",
      data.payment    || "",
      data.items      || "",
      data.total      || 0,
      data.status     || "new"
    ]]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true, row: nextRow, order_id: data.order_id })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("Smart Bar webhook is alive");
}
