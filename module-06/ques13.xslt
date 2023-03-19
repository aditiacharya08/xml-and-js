<?xml version="1.0" encoding="UTF-8"?>
<!-- Author: Aditi Acharya -->
<!-- Humber Number :- N01546405 -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/"> 
  <html>
    <body>
        <h1>Books Catalog</h1>
        <ul>
            <xsl:for-each select="catalog/book"> 
                <li>
                    <h2>
                        <xsl:value-of select="title"/>
                    </h2>
                    <p>
                    Book was written in <xsl:value-of select="year"/>
                    </p>
                    <p>
                    Retail Price is $<xsl:value-of select="price"/>
                    </p>
                </li>
            </xsl:for-each>
        </ul>
    </body>
  </html>
  </xsl:template>
</xsl:stylesheet>