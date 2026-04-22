
document.addEventListener('DOMContentLoaded',function(){

function getWidgetDataAPI(arg, callbackfnc) {
    $.ajax({
		url: '/api/getWidgetDataAPI/'+arg,
		dataType: 'text',
		method: 'get',
        success: function(data) {
        	callbackfnc(JSON.parse(data));
        }
    });
}
getWidgetDataAPI("EventSummaryList", callbackAPIInit);

function callbackAPIInit(data){
	var list = data.list;
	var arrayLength = list.length;
	var table_content = '<div class="box-header">\n'
					+ '<h3 class="box-title"'+ [[#{evnt}]]+'></h3>\n'
					+ '</div>\n'
					+ '<div class="box-body">\n'
					+ '<table class="table">\n'
					+ '<tr>\n'
					+ '<th th:text="#{event}" style="width: 80px"></th> \n'
					+ '<th th:text="#{severity}" style="width: 50px; text-align:center"></th>\n'
					+ '<th th:text="#{count}" style="width: 50px; text-align:center"></th>\n'
					+ '</tr>\n'
					
	for (var i=0; i<arrayLength; i++){
		table_content += '<tr>\n'
			+'<td>' + list[i].eventtype + '</td>'
		+'<td>' + list[i].severity + '</td>'
		+'<td>' + list[i].cnt + '</td>'
		+ '</tr>';
	}				
					
		table_content += '</table>		  </div>	';		

		$("#table_content").html(table_content);
/*	
    <div class="box-header">
    
    <h3 class="box-title" th:text="#{evnt}"></h3>
  </div>
  <!-- /.box-header -->
  
  <div class="box-body">
    <table class="table">
      <tr>
        
        <th th:text="#{event}" style="width: 80px"></th>                  
        <th th:text="#{severity}" style="width: 50px; text-align:center"></th>
        <th th:text="#{count}" style="width: 50px; text-align:center"></th>

      </tr>
   <tr th:each="event : ${eventlist}">
      <td th:text="${event.eventtype}"></td>
      <td class="text-center" th:switch="${event.severity}">
          <span th:case="1" class="badge bg-red" th:text="${event.severity}"></span>
          <span th:case="2" class="badge bg-orange" th:text="${event.severity}"></span>
          <span th:case="3" class="badge bg-yellow" th:text="${event.severity}"></span>
          <span th:case="4" class="badge bg-blue" th:text="${event.severity}"></span>
       </td>
      <td class="text-center" th:text="${event.cnt}"></td> 
  </tr>               

    </table>
  </div>
  
  */
	

};


});