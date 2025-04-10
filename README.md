# The “*obligation*” to self-design

Thinking about one's self-representation online.

1) What do I want to achieve or want out of this? Exposure? Reputation? Work? Income? Legitimacy? Collaboration?
2) Who and where is my audience, and how can I 'reach out' to them (in terms of location, social skills, tone).
3) How shall I 'present my self', language-wise, working out the narrative (the '[obligation to self-design](https://www.e-flux.com/journal/00/68457/the-obligation-to-self-design/)')?
4) What formats can be used to present my self and practice, on which mediums, and on which platforms? (See 1 for hints).

## Options:

- A *website*
- - ... made with a website builder ([webflow](https://webflow.com), [cargo](https://cargo.site), [hotglue](https://hotglue.me), etc) (€–€€).
  - ... made *by hand* using HTML, CSS, and (a bit) of Javascript (?) (€).
  - ... made by someone you commissionned (€€€).

- A *document*
- - ... in the form of an ebook with interactions and hyperlinks.
  - ... or a conventionally (but timelessly) designed .pdf
  - ... hosted online via Dropbox, Google Docs, WeTransfer, etc.
  - ... or a Google Spreadsheet ([like here](https://nickytes.la)).
  - ... or a Github repository ([like here](https://github.com/quentin-f451/quentincreuzet.fr)).
  - to be sent online by email, to be self-hsoted, to be shared on social medias?
 
- An *online platform presence*
- - ... a social media account (instagram, or what's the flavour of the day?)
  - ... a newsletter (don't forget about user's consent to subscribe to your newsletter)
    
- Being *physical*
  - ... attending cultural events where *peers* are present (be mindful of others – and put your ego aside)
  - ... attending fairs?
  - ... *organizing* events?
  - ... distributing promotional prints (business cards, etc)?

- Or a bit of all that...
 
## Online, a portfolio website

For this workshop, we will think about your online presence in the form of a (traditional) hand-coded website.

We will work from a simple HTML template that covers the essentials. This lightweight, pure HTML & CSS portfolio template is free to be used and adopted, modified, and expanded by anyone. The original template has been graciously thanks to Martijn de Heer (see [original template here](https://github.com/aptoptout/aptoptout.github.io)).

> Small note: A `script.js` has been addded at the end of the HTML document to illustrate how to potentially add JavaScript, if you have no need for JavaScript, you can remove the `script.js` as well as remove the `<script>` tags in the HTML documents.

### Core focus

- **Semantic markup** (`nav`, `section`, `figure`, etc.), improving structural readability
- **CSS variables**, making it easy to configure things once and reuse across stylesheet
- **CSS Grid**, flexible multi-column layouts
- **Media queries**, responsive design for any device

### Table of contents

- [Portfolio website](#portfolio-website)
    - [Core focus](#core-focus)
    - [Table of contents](#table-of-contents)
    - [Map structure](#map-structure)
  - [Web typography](#web-typography)
  - [Preparing media for online use](#preparing-media-for-online-use)
    - [Images](#images)
    - [Videos](#videos)
  - [How to take it further](#how-to-take-it-further)
  - [Getting your website online](#getting-your-website-online)
    - [Domain](#domain)
    - [Hosting](#hosting)
    - [Hosting companies \& domain providers](#hosting-companies--domain-providers)
  - [Portfolio inspiration](#portfolio-inspiration)
  - [Website tutorials](#website-tutorials)

### Map structure

```
assets/
├── fonts/             (contains all web-friendly font files, i.e. woff or woff2)
|   └── authentic-sans-90.woff
├── scripts/           (contains all JavaScript scripts)
|   └── script.js
└── stylesheets/       (contains all CSS stylesheets)
|   └── style.css
└── favicon.png        (the icon shown in the browser's tab)
work/                  (contains all projects)
├── project-title-a/   (folder renamed to the project's title in lowercase and with all spaces replaced as dashes)
|   ├── media/         (the project's media, i.e. images, videos, and audio)
|   └── index.html     (the project's HTML page)
index.html             (the homepage's HTML page)
```

## Web typography

Web fonts are specific files (.woff or .woff2) which you can use in CSS to use on your website. There are many free-to-use fonts for on the web and also a tool to convert other font files (.ttf, otf) to web font files with [Font Squirrel](https://www.fontsquirrel.com) or [Transfonter](https://transfonter.org) but keep in mind that font licenses are specific to the usage. So if you buy a print or desktop license for a font you're not allowed to use it online unless you buy the web license as well.

**Web font resources**

- Open Foundry **→** [open-foundry.com](https://open-foundry.com/)
- Badass Libre fonts by womxn **→** [design-research.be](https://www.design-research.be/by-womxn/)
- Bye Bye Binary typotheque **→** [typotheque.genderfluid.space](https://typotheque.genderfluid.space)
- Use & Modify **→** [usemodify.com](https://usemodify.com)
- Velvetyne type **→** [velvetyne.fr](https://velvetyne.fr)
- Adobe Typekit **→** [fonts.adobe.com](https://fonts.adobe.com/)
- Google Fonts **→** [fonts.google.com](https://fonts.google.com/)
- Font Squirrel **→** [fontsquirrel.com](https://www.fontsquirrel.com/)

## Preparing media for online use

You will be using lots of media and files on your website from images to videos and fonts. It's important to be **optimal** in terms of **sizes** and **resolutions** to get your website to respond **quickly** and work **properly**.

As a rule of thumbs your website should load under 3000ms (3 seconds).

> "Statistics indicate that **40% of visitors will leave a website** if it takes longer than **three seconds** to load." – [[Source, browserstack](https://www.browserstack.com/guide/how-fast-should-a-website-load)]

Below are some general rules and best practices regarding using media.

### Images

Keep them light, fast and proper.

1. Size: keep your image sizes below **200 kb** (yes that is kilo bytes!)
2. Resolution: don't use images that exceed **1920px width or height**
3. Format: for photos use JPG but for vector images with transparency use either SVG or PNG.
4. GIF: don't use GIF files (use videos on loop instead, .mp4 format).
5. Use browser lazy loading for images: [read more here](https://web.dev/articles/browser-level-image-lazy-loading).* 

\* ... but the **first** visible image on your page should **not** be lazy loaded.

#### How to?

**Compress your .jpg with Photoshop** using the **'Save for Web (Legacy)'** option (under `File->Export`), `[Shift]+[Alt]+[Cmd]+[S]`, with the appropriate image width resizing and the quality setting between **50** and **60** (target under 200kb, the less the better).

If 'Save for Web (Legacy)' is not available, use **'Export As'** (under `File->Export`).

Or, optionally, you can use this mac software called [ImageOptim](https://imageoptim.com/).

### Videos

It's highly recommended to upload your videos to a service such as YouTube or Vimeo because their servers are much faster and they provide good embedding options.

1. Codec: use **H.264** this will reduce file size and keep quality.
2. File format: use **.mp4**
3. Limit the bitrate to preferably **2mb/minute**, but you could go to max 8mb/min if the video is really short.
4. MOV: don't use MOV files.

Tools to convert your video here: [cloudconvert.com/mp4-converter](https://cloudconvert.com/mp4-converter)

**YouTube embedding**

To embed a YouTube video take these steps:

1. Upload video on YouTube
2. Go to video page when it's uploaded
3. Click on the **share** button below video
4. Click on the **embed** button in popup window
5. Copy code
6. Paste in your html document where you want the embedded video (you can change the `width` and `height` parameters to `width="100%"` and `height="auto"`.)

**Vimeo embedding**

To embed a Vimeo video take these steps:

1. Upload video on Vimeo
2. Go to video settings page when it's uploaded
3. Click on **embed** tab on the left navigation panel
4. Click on dark blue **embed code** button (this copies code for you to clipboard)
5. Paste in your html document where you want the embedded video
6. Paste in your html document where you want the embedded video (you can change the `width` and `height` parameters to `width="100%"` and `height="auto"`.)
7. 
**Autoplay**

As of 2019 browsers block autoplaying videos, the rule is now that if a user visits a website they need to interact first in order for videos to play (unless you add the attribute `muted` attribute to your `<video>`.

## Ingredients to play with (in the stylesheet)

- Change the color scheme.
- Add [borders](https://www.w3schools.com/css/css_border.asp), funky [underlines](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-style), decorative elements like [outlines](https://www.w3schools.com/css/css_outline.asp) or [shadows](https://www.w3schools.com/css/css3_shadows.asp)?
- Change the typeface, use two typefaces (one for headings and one for paragraphs?), review its sizing (more contrast between heading and paragraph, or less contrast?).
- Change the layout (column sizes) while keeping the HTML markup.
- Add CSS 'hover' transition effects.
- Use CSS [filters](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) or [mix-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode) on images?
- Add [CSS transitions](https://www.w3schools.com/css/css3_transitions.asp), [CSS animations](https://www.w3schools.com/css/css3_animations.asp), [CSS transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/transform), or a bit of all of that?
- Add rounded corders with [border-radius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius).
- Change margin and padding values.
- Add a background image, video or [CSS gradient](https://cssgradient.io)?

## How to take it further

- [How to - Portfolio Gallery with Filtering](https://www.w3schools.com/howto/howto_js_portfolio_filter.asp)
- [How to - Mobile Navigation Menu](https://www.w3schools.com/howto/howto_js_mobile_navbar.asp)
- [How to - Image Gallery](https://www.w3schools.com/howto/howto_js_tab_img_gallery.asp)
- [How to - Fullscreen Video](https://www.w3schools.com/howto/howto_css_fullscreen_video.asp)
- [How to - Popup/Modal](https://www.w3schools.com/howto/howto_css_modals.asp)
- [How to - Scroll Progress Indicator](https://www.w3schools.com/howto/howto_js_scroll_indicator.asp)
- [How to - Smooth Scroll](https://www.w3schools.com/howto/howto_css_smooth_scroll.asp)
- [How to - Custom Scrollbar](https://www.w3schools.com/howto/howto_css_custom_scrollbar.asp)
- [How to - Draggable HTML Elements](https://www.w3schools.com/howto/howto_js_draggable.asp)

## Getting your website online

### Domain

A domain name is a unique name specific for your website, it's what you type in your address bar. Its price varies depending on the name and the extension. Some extensions are more expensive than others.

You can register domains separately but easiest is to get it together with hosting so that your domain and web server are automatically linked and setup.

Domains differ in price based on how popular/general a name is (i.e. 'bestdeals' vs. 'louisbraddock') and the extension (i.e. '.com' is cheaper than '.io').

**Do you need a domain?**

Not necessarily.

If you don't mind a URL which isn't something like "yourname.lol" or "myname.xyz" or "studioname.com" then you can use things like GitHub Pages or Netlify to host your website and those come with their own default url, i.e. https://username.github.io or https://something.netlify.app.

Personally, I think having a unique domain name is nice but its not for free so you decide obviously.

### Hosting

Hosting is a service you buy to get server space allocated. For instance you can get 10GB space and pay a yearly fee. With this you usually get some extra services such as: email and FTP.

Before people can see your website that you put on your server you need a domain, as mentioned before it's easiest to get a domain and hosting together.

**How much space do you need?**

**5** **gigabytes** is more than enough. As explained in the using media section below you need to really take care of file size and this will reduce the costs needed for hosting.

**Do you need hosting?**

No, actually not.

If you have your own domain name – or if you haven't – hosting is optional, using GitHub Pages or Netlify you can easily host your Github repository for free!

Having your own server is great, its yours and it will always be yours as long as you keep paying but having it is maybe overkill for your portfolio website.


### Hosting companies & domain providers

Make sure to compare prices between hosting & domain providers, it differs quite a bit! These companies offer both hosting and registering domains.

- [Vimexx](https://www.vimexx.com)
- [Namecheap](https://www.namecheap.com)
- [Webreus](https://www.webreus.nl)
- [one.com](https://www.one.com)
- [Hostgator](https://www.hostgator.com)
- [Antagonist](https://www.antagonist.nl)
- [Neostrada](https://www.neostrada.com)
- [OVH](https://www.ovhcloud.com/nl/web-hosting/personal-offer/)

## Portfolio inspiration

- [Conversation Taking Place](https://conversation-taking-place.com)
- [Jordy van den Nieuwendijk](https://jordy.studio)
- [Margi Pippi](https://margipippi.com)
- [Nazlı Ercan](https://nazli-ercan.com)
- [Dea Kaker Štrucl](https://deakakerstrucl.com)
- [Anna Cairns](https://annacairns.com)
- [Clara Berger](https://claraberger.net)
- [Studio Bas Koopmans](https://studiobaskoopmans.com/)
- [Studio Pointer*](https://pointer.click/)
- [Sebastian Ly Serena](http://sebastianlyserena.dk)
- [Studio Yannic Poepperling](https://yannicpoepperling.de)
- [Katrin Krumm](https://katrinkrumm.de/)
- [Node](https://node.international/)
- [Michel Egger](https://www.michelegger.ch)
- [Formafantasma](https://formafantasma.com)
- [Parabol Studio](https://parabolstudio.no)
- [Elina Birkehag](https://elinabirkehag.com)
- [Rietlanden Women's Office](https://rietlanden.womensoffice.nl/works.html)
- [Studio Darius Ou](https://dariusou.work)
- [Zeno Beikircher](https://zenobei.com)
- [Büro Vivien Hoffmann](http://www.vivienhoffmann.com)
- [Medusa](https://medusaoffspace.com)
- [Sara Kaaman](https://www.sarakaaman.com)
- [Julijonas Urbonas](https://julijonasurbonas.lt)
- [Studio Remco van Bladel](https://remcovanbladel.nl)
- [Lynne Carty](http://lynnecarty.info)
- [Bram Vanderbeke](https://bramvanderbeke.com)
- [Tom Bubul](https://tombubul.info)
- [Alan Trotter](https://alantrotter.com)
- [Vytautas Kumža](http://vytautaskumza.com)
- [Farah al Qasimi](https://farahalqasimi.com)
- [Ana María Gómez López](https://anamariagomezlopez.info)
- [Lukas Engelhardt](https://lukasengelhardt.net/)
- [Studio Zuzana Kostelanská](https://studiozuzana.xyz)
- [Carmen Dusmet Carrasco](https://www.carmendusmet.net/)

## Website tutorials

- [Create a Free Website](https://www.w3schools.com/spaces/index.html)
- [Build a Website with HTML, CSS, and GitHub Pages](https://www.codecademy.com/learn/paths/learn-how-to-build-websites)
- [How to Make a Website with NameCheap](https://www.codecademy.com/learn/make-a-website)
- [How to Deploy a Website](https://www.codecademy.com/learn/deploy-a-website)
