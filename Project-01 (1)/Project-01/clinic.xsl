<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/"> 
        <html>
            <body>
                <h1> Comapnies List and their Data</h1>

                <table border="10">
                    <tr bgcolor="#9acd32" align="center">
                        <td> <h3> Company Id </h3> </td>
                        <td> <h3> Address </h3> </td>
                        <td> <h3> Employees </h3> </td>
                        <td> <h3> Drugs </h3> </td>
                    </tr>


                        <xsl:for-each select="companies/company">  
                    <tr>
                        <td> <xsl:value-of select="id"/> </td>
                        <td>
                        
                            <table border="4">
                                <tr align="center"> 
                                    <td> <h3> street </h3> </td>
                                    <td> <xsl:value-of select="address/street"/></td>
                                 </tr>
                                <tr align="center">  
                                    <td> <h3> city </h3>  </td>
                                    <td> <xsl:value-of select="address/city"/></td>
                                </tr>
                                 <tr align="center">  
                                    <td> <h3> region </h3>  </td>
                                    <td> <xsl:value-of select="address/region"/></td>
                                 </tr>
                                <tr align="center">   
                                    <td> <h3> country </h3>  </td>
                                    <td> <xsl:value-of select="address/country"/></td>
                                </tr>
                            </table>
                         
                         </td>


                         <td>
                            <xsl:for-each select="employees">
                             <table border="4">
                                <tr align="center"> 
                                    <td> <h3> id </h3> </td>
                                    <td> <xsl:value-of select="id"/></td>
                                 </tr>
                                <tr align="center">  
                                    <td> <h3> firstName  </h3>  </td>
                                    <td> <xsl:value-of select="firstName"/></td>
                                </tr>
                                 <tr align="center">  
                                    <td> <h3> lastName </h3>  </td>
                                    <td> <xsl:value-of select="lastName"/></td>
                                 </tr>
                                <tr align="center">   
                                    <td> <h3> empType </h3>  </td>
                                    <td> <xsl:value-of select="empType"/></td>
                                </tr>
                            </table>
                            </xsl:for-each>
                         </td>

                          <td>
                            <xsl:for-each select="drugs">
                             <table border="4">
                                <tr align="center"> 
                                    <td> <h3> manufacturer </h3> </td>
                                    <td> <xsl:value-of select="manufacturer"/></td>
                                 </tr>
                                <tr align="center">  
                                    <td> <h3> brand  </h3>  </td>
                                    <td> <xsl:value-of select="brand"/></td>
                                </tr>
                                 <tr align="center">  
                                    <td> <h3> name </h3>  </td>
                                    <td> <xsl:value-of select="name"/></td>
                                 </tr>
                                <tr align="center">   
                                    <td> <h3> code </h3>  </td>
                                    <td> <xsl:value-of select="code"/></td>
                                </tr>
                                <tr align="center">   
                                    <td> <h3> diagnosisCode </h3>  </td>
                                    <td> <xsl:value-of select="diagnosisCode"/></td>
                                </tr>
                                <tr align="center">   
                                    <td> <h3> diagnosisDescription </h3>  </td>
                                    <td> <xsl:value-of select="diagnosisDescription"/></td>
                                </tr>
                                <tr align="center">   
                                    <td> <h3> qty </h3>  </td>
                                    <td> <xsl:value-of select="qty"/></td>
                                </tr>
                            </table>
                            </xsl:for-each>
                         </td>

                    </tr>
                        </xsl:for-each>

                </table>
            </body>
        </html>
    </xsl:template>  
</xsl:stylesheet>