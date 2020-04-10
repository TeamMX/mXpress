using Xamarin.Forms;

namespace WorkingWithWebview
{
    public class LocalHtml : ContentPage
    {
        public LocalHtml()
        {
            var browser = new WebView();
            var htmlSource = new HtmlWebViewSource();
            htmlSource.Html = @"<html><body>
                                <img style='width: 60%; padding-left: 20%;' src='mxpress.png'/>
                                <p style='color:MediumSeaGreen; margin-left: 0.2;'>Welcome to the best app ever made.</p>
                                </body>
                                </html>";
            browser.Source = htmlSource;
            Content = browser;
        }
    }
}
