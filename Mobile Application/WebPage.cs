using Xamarin.Forms;

namespace WorkingWithWebview
{
    public class WebPage : ContentPage
    {
        public WebPage()
        {
            var browser = new WebView();
            //browser.Source = "http://mxpress.ca/m/mxpress.html";
            browser.Source = "https://mxpress.ca/m/mxpress.html";
            Content = browser;
        }
    }
}

