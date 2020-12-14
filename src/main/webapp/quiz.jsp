<jsp:useBean class="bean.Quiz" id="qz" scope="session"></jsp:useBean>
<!DOCTYPE html>

<html>
    <head><title>quiz.jsp</title></head>
    <body>
        
    <!--Question <%=qz.getTracker()%>: -->    
        <% String[] myarr = qz.getQuizzes();
        %>
    
    <h1>Quiz</h2>
    
    <h3>Question <%=qz.getTracker()+1%></h3>
    <p><%=myarr[0]%></p>
    <form action="/labb3/QuizServlet" method="POST">

        <div> 
            <label><%=myarr[1]%></label><input type="checkbox" name="option" value="1">
        </div>
        
        <div>
            <label><%=myarr[2]%></label><input type="checkbox" name="option" value="2">
        </div>
        <div>
            <label><%=myarr[3]%></label><input type="checkbox" name="option" value="3">
        </div>
        <div>
            <label><%=myarr[4]%></label><input type="checkbox" name="option" value="4">
        </div>
        
        <input type="submit" value="next question">
    </form>
    
    </body>
    
</html>
