using Xamarin.Essentials;
using Xamarin.Forms;

namespace WorkingWithWebview
{
    public class WebAppPage : ContentPage
    {
        public WebAppPage()
        {
            var l = new Label
            {
                Text = "Current Page"
            };

            var openUrl = new Button
            {
                Text = "Open"
            };
            openUrl.Clicked += async (sender, e) =>
            {
                await Launcher.OpenAsync("https://www.mxpress.ca");
            };

            var makeCall = new Button
            {
                //Text = "Make call using built-in Phone app"
            };
            makeCall.Clicked += async (sender, e) =>
            {
                //await Launcher.OpenAsync("tel:1855XAMARIN");
            };

            Content = new StackLayout
            {
                Padding = new Thickness(5, 20, 5, 0),
                HorizontalOptions = LayoutOptions.Fill,
                Children = {
                    l,
                    openUrl,
                    makeCall
                }
            };
        }
    }
}
