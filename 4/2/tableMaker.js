TableMaker = (function () {
  var options, target, data;

  function createCell(content) {
    return("<td>" + content + "</td>");
  };
  function createRow(content) {
    return("<tr>" + content + "</tr>");
  };
  function createHeader() {
    var header = "<table";
    if(options.border) header +=" border=" + options.border;
    if(options.spacing) header += " cellSpacing=" + options.spacing;
    if(options.padding) header += " cellPadding=" + options.padding;
    header += ">";
    return header;
  };
  function createFooter() {
    return("</table>");
  };
  function setVars(d,t,o) {
    data = d || [];
    target = t || "";
    options = {};
    o = o || {};
    options = {
      padding: o.padding || options.padding,
      spacing: o.spacing || options.spacing,
      border: o.border || options.border
    }
  };

  return function() {
    setVars.apply(this, arguments);

    return {
      init: setVars,
      generate: function() {
        var row, html, elem, trow;
        elem = document.getElementById(target) || document.body;
        html = createHeader();
        for (var row in data) {
          trow = "";
          for (var e in data[row]) {
            trow += createCell(data[row][e]);
          }
          html += createRow(trow);
        }
        html += createFooter();
        elem.innerHTML = html;
      }
    }
  };
}());
