using Xamarin.Forms;

namespace WorkingWithWebview
{
    public interface IBaseUrl { string Get(); }

    public class LocalHtmlBaseUrl : ContentPage
    {
        public LocalHtmlBaseUrl()
        {
            /*    var browser = new WebView();
                var htmlSource = new HtmlWebViewSource();

                htmlSource.BaseUrl = DependencyService.Get<IBaseUrl>().Get();
                browser.Source = htmlSource;
                Content = browser;


        */


            var browser = new WebView();
            browser.Source = "http://mxpress.ca/m/home.html";
            Content = browser;
        }
    }
}
