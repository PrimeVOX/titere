"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testHtml = void 0;
exports.testHtml = `
<html>
  <body>
    <table width="100%">
        <tr>
          <td>
            <b>Invoice #PVX111111</b>
            <br>
            For '.$customer_name.'<br>
            '.$address_line1.'<br>
            '.$address_line2.'
          </td>
          <td></td>
          <td align="right"><img src="Logo_Primary.jpg"></td>
        </tr>
        <tr>
          <td style="width:375px;"><br><br>
            <b>Invoice Label:</b> some label<br>
            <b>Invoice Date:</b> '.date("M j, Y").'<br>
            <b>Due Date:</b> '.date("M j, Y"'<br><br>
            <b>Service Term:</b> JAN - FEB
          </td>
          <td style="width:50px;"></td>
          <td><br><br>
          <b>PrimeVOX Communications, LLC</b><br>
          1321 Upland Dr #8245<br>
          Houston, TX 77043<br>
          Phone: 972.600.1150<br>
          Fax: 972.600.1151
          </td>
        </tr>
      </table>
      
      <br><br><br><br>

      <table width="100%" cellpadding="4">
        <tr>
          <td style="border-bottom:1px solid black; width:6%;"><b>Line</b></td>
          <td style="border-bottom:1px solid black;width:60%;"><b>Item/Description</b></td>
          <td style="border-bottom:1px solid black;width:6%; text-align:center;"><b>Qty</b></td>
          <td style="border-bottom:1px solid black;width:14%; text-align:right;"><b>Unit Price</b></td>
          <td style="border-bottom:1px solid black; width:14%; text-align:right;"><b>Line Price</b></td>
        </tr>

        <tr>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:center;">'.intval($a1['priority']).'</td>
          <td style="border-bottom:1px dotted #d9d9d9;"><b>'.urldecode(billable_item_'</b><br>'.$this_description.'</td>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:center;">'.intval($a1['quantity']).'</td>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:right;">'.$price_subtext.'</td>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:right;">'.$line_subtext.'</td>
        </tr>

        <tr>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:center;">'.intval($a1['priority']).'</td>
          <td style="border-bottom:1px dotted #d9d9d9;"><b>'.urldecode(billable_item_'</b><br>'.$this_description.'</td>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:center;">'.intval($a1['quantity']).'</td>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:right;">'.$price_subtext.'</td>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:right;">'.$line_subtext.'</td>
        </tr>

        <tr>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:center;">'.intval($a1['priority']).'</td>
          <td style="border-bottom:1px dotted #d9d9d9;"><b>'.urldecode(billable_item_'</b><br>'.$this_description.'</td>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:center;">'.intval($a1['quantity']).'</td>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:right;">'.$price_subtext.'</td>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:right;">'.$line_subtext.'</td>
        </tr>

        <tr>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:center;">'.intval($a1['priority']).'</td>
          <td style="border-bottom:1px dotted #d9d9d9;"><b>'.urldecode(billable_item_'</b><br>'.$this_description.'</td>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:center;">'.intval($a1['quantity']).'</td>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:right;">'.$price_subtext.'</td>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:right;">'.$line_subtext.'</td>
        </tr>

        <tr>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:center;">'.intval($a1['priority']).'</td>
          <td style="border-bottom:1px dotted #d9d9d9;"><b>'.urldecode(billable_item_'</b><br>'.$this_description.'</td>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:center;">'.intval($a1['quantity']).'</td>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:right;">'.$price_subtext.'</td>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:right;">'.$line_subtext.'</td>
        </tr>

        <tr>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:center;">'.intval($a1['priority']).'</td>
          <td style="border-bottom:1px dotted #d9d9d9;"><b>'.urldecode(billable_item_'</b><br>'.$this_description.'</td>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:center;">'.intval($a1['quantity']).'</td>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:right;">'.$price_subtext.'</td>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:right;">'.$line_subtext.'</td>
        </tr>

        <tr>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:center;">'.($last_priority+1).'</td>
          <td style="border-bottom:1px dotted #d9d9d9;"><b>'.urldecode(billable_item_static_get_field(1,'item_name')).'</b><br>'.urldecode(billable_item_static_get_field(1,'item_description')).'</td>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:center;">1</td>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:right;">$'.number_format($invoice_usf,2).'</td>
          <td style="border-bottom:1px dotted #d9d9d9; text-align:right;">$'.number_format($invoice_usf,2).'</td>
        </tr>

      </table>

      <table width=100% cellpadding="4">
        <tr>
          <td style="width:6%;"><br></td>
          <td style="width:50%;"></td>
          <td style="width:8%;"></td>
          <td style="width:21%;"></td>
          <td style="width:13%;"></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td><b>Subtotal</b></td>
          <td style="text-align:right;">$'.numbe'</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td><b>Sales Tax</b></td>
          <td style="text-align:right;">$'.number'</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td style="border-top: 1px solid black;"><b>Total</b></td>
          <td style="border-top: 1px solid black; text-align:right;">$'.nu)),2).'</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td><b>Less Bill Credits</b></td>
          <td style="text-align:right;"><font color="red">($'.number</font></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td><b>Less Payments</b></td>
          <td style="text-align:right;">$0.00</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td style="border-top: 1px solid black;"><b>Invoice Due</b></td>
          <td style="border-top: 1px solid black; text-align:right;">$'.number'</td>
        </tr>
      </table>
      
      <br><b>WE NO LONGER ACCEPT CHECKS.</b> You can pay this statement online using a Credit/Debit Card,<br>or Bank Account by going to www.primevox.net and clicking "My Account."';
      
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
      <table width="100%" cellpadding="4">
        <tr>
          <td>
            <b>Payment Advice</b>
            <br><br>
            To: PrimeVOX Communications<br>
            14580 E Beltwood Pkwy #104<br>
            Farmers Branch, TX 75244<br>
          </td>
          <td align="right">
            <b>Customer</b><br>
            <b>Invoice #</b><br>
            <b>Invoice Due</b><br>
            <b>Account Due</b><br>
            <b>Due Date</b>
          </td>
          <td>
            '.$customer_name.'<br>
            PVX111111<br>
            $'.num'<br>
            $'.number'<br>
            '.date("M j, Y",'<br>
          </td>
        </tr>
      </table>
    
    <br><br>
  </body>
</html>
`;
//# sourceMappingURL=test.js.map