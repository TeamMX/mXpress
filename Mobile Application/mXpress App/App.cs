using Xamarin.Forms;

namespace WorkingWithWebview
{
	public class App : Application
	{
		public App ()
		{
		//	var tabs = new TabbedPage ();

		//	tabs.Children.Add (new LocalHtml {Title = "Home" });
			//tabs.Children.Add (new LocalHtmlBaseUrl {Title = "OIL Lmao" });

		//	tabs.Children.Add (new WebPage { Title = "mXpress"});


			//tabs.Children.Add (new WebAppPage {Title ="External"});

		//	MainPage = tabs;
		//untabbed window page, pane w/ mxpress
		MainPage = new WebPage { Title = "mXpress"};
		}
	}
}

