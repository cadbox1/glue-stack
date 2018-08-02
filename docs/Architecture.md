# Architecture

Multitenant, monolithic, 3-tier application with a MySQL database, Spring Boot HTTP API and React Single Page Application.

| Tier/Component                            | Type                            | Language   | Implementation                   |
| ----------------------------------------- | ------------------------------- | ---------- | -------------------------------- |
| DB \(Database\)                           | Relational                      | SQL        | MySQL \(pronounced "my sequel"\) |
| API \(Application Programming Interface\) | JSON over HTTP                  | Java       | Spring Boot                      |
| UI \(User Interface\)                     | SPA \(Single Page Application\) | Javascript | React                            |

## How does it work

### DNS

This is a web application so lets start from the internet browser (think of Google Chrome or Safari). What happens when you go to [google.com](https://google.com)?

```sequence
Browser->DNS: What is the IP address for google.com?
DNS->Browser: The IP of google.com is 216.58.199.46
```

How DNS (Domain Name System) works is out of the scope of this article but this article is pretty good; [DNS: Why It’s Important & How It Works](https://dyn.com/blog/dns-why-its-important-how-it-works/). tl;dr domains are resolved by your local computer and a chain of remote DNS servers.

### Static Web Pages

Your browser will establish a connection to 216.58.199.46 and send a [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview) GET request to the "/" path of the server, GET being a type of [HTTP request method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Method). The server will then respond based on the request. This is important: HTTP is a request-response protocal; the request has data and the response has data based on the request.

```sequence
Browser->216.58.199.46: GET / HTTP/1.1
216.58.199.46->Browser: Here is the html page for /
```

Traditionally, the server will return a HTML page which can instruct the browser to make further requests for other assets such as images or code to style the page. This is the case with google.com and you can see that by: 

1. Go to [google.com](https://www.google.com/) in [Google Chrome](https://www.google.com/chrome/).
2. Right click the page
3. Select Inspect
4. Select the Network tab.
5. Refresh the page.
6. Scroll to the top of the pane.

The first asset is the root HTML page and you can see the code by clicking on the request then selcting the response tab. From there it issues requests for the other assets like the images.

If we think about the simplest example of a HTML page, all the assets are static - they don't change. They're just files that a simple server sends when the path matches the filename. We could use something like [Dropbox](https://www.dropbox.com/) or [AWS's S3](https://aws.amazon.com/s3/) (Simple Storage Service) for this.

Note: we'll exclude the DNS part for the rest of this article.

### Dynamic Web Pages

Dynamic web pages were the next step - web pages that are generated when the request is received. It might look like this.

```sequence
Browser->Server: GET / HTTP/1.1
Server->Database: I need some data for the page
Database->Server: Here's the latest blog post's content
Server->Browser: <html><body><h1>Blog Title!</h1></body></html> 
```

This is the pattern that [PHP](http://au2.php.net/manual/en/intro-whatis.php) made popular particular with the world's largest open source blog platform [Wordpress](https://wordpress.org/download/). The database could have any data in it; today's weather or the latest sports scores. The data might even come from an external service so we might not even need to handle this part.

This pattern can have performance issues because it takes resources to produce every page. Fun fact: you can even do this pattern with React now with [server side rendering](https://www.google.com.au/search?rlz=1C5CHFA_enAU693AU693&ei=tQBjW_X6KZ7u8wWwzacY&q=server+side+rendering+react&oq=server+side+rendering+react&gs_l=psy-ab.3...6207.10013.0.10102.27.15.0.0.0.0.427.1654.3-1j3.4.0....0...1.1.64.psy-ab..23.4.1653...0j35i39k1j0i67k1j0i131k1j0i20i263k1.0.8J9sCPIJkpw).

This is where tools like [wordpress caches](https://en-au.wordpress.org/plugins/wp-super-cache/) and [static site generators](https://www.google.com.au/search?q=static+site+generator&rlz=1C5CHFA_enAU693AU693&oq=static+site+g&aqs=chrome.0.69i59j69i57j0l4.2332j0j4&sourceid=chrome&ie=UTF-8) come in which try and bring the pattern closer to the static pattern by processing the dynamic pages before the request comes in but that's a bit out of the scope of this article.

### Single Page Applications

Glue stack is a [single page application](https://en.wikipedia.org/wiki/Single-page_application) (SPA) which follows on from the previous examples. It aims to provide a better user experience by doing stuff without loading the page. An example of this is google's autocomplete which provides helpful suggestions as you type. This concept is then extended so that page loads aren't traditional page loads they load content dynamically into the current page.

You can do that with the dynamic pattern where you would load dynamic content into the current page but we would have more flexibility if the server only received the data instead of data inside html. Then the browser could use any html it likes for the data. In other words there is a better separation of concerns; the ui is in charge of presenting data and the server is in charge of providing data.

```sequence
Browser->File Server: GET / HTTP/1.1
File Server->Browser: static assets for single page application
Browser->API: GET /some-data HTTP/1.1
API->Browser: {"todaysWeather": "Sunny"}
```

This pattern starts exactly like the static pattern, what's different is what happens next. The root html page will make requests for more static assets (not included in the diagram for simplicity) just like before, but the important asset for an SPA is a [javascript](https://www.javascript.com/) asset. Javascript is the programming language for browsers and is particularly important for single page applications because that's how they work. Just to be explicit the javascript asset is static just like the original html page, the dynamic part comes next.

Javascript is very powerful and, among thousands of other things, can retrieve data from servers using what's called an [API](https://en.wikipedia.org/wiki/Application_programming_interface). API is a vague term since its only an interface for programming where an interface can be anything. When we're talking about APIs in a web developer context we're usually talking about HTTP JSON APIs. (Some people call them [REST](https://stackoverflow.com/questions/4663927/what-is-rest-slightly-confused) APIs but that term seems to be pretty controversial so we'll just avoid it.) [JSON](https://en.wikipedia.org/wiki/JSON) stands for javascript object notation so its really just a way of structuring data that's really convenient for javascript applications. An example of JSON is in the diagram.

Single page applications can choose when to retrieve data. Is it on page load (glue stack list page) or is it on some user action (google.com autocomplete as you type) or is it at a set interval (realtime sports scores). 

Just like the dynamic web page this data might come from a database or an external source but in glue stack it is most certainly a database.

## Glue Stack Architecture

This is the diagram to remember.

```sequence
Browser->API: GET me some data
API->DB: data please
DB->API: here is the table of data
API->Browser: here is the data in JSON
```

The browser can also send data using the same flow but with different HTTP methods like POST and PATCH.

## Tier Responsibilities

| Tier/Component | Location                                         | Storage & Retrieval | Security | Navigation |
| -------------- | ------------------------------------------------ | ------------------- | -------- | ---------- |
| DB             | Private server \(cloud\)                         | yes                 |          |            |
| API            | Public server \(internet facing\) \(cloud\)      | yes                 | yes      |            |
| UI             | Internet browsers \(desktop and mobile devices\) | yes                 | yes      | yes        |

It is important to "never trust the client". In our application the client refers to the ui and the reason for that is because we can't control client side code - they are free to interact with our internet facing server however they wish. That's why we have an API so that users can't directly access our database and potentially other organisations' data. I see it as a middleman between the user and the database. It is primarily in charge of enforcing the security measures we mentioned under [Managing Resources](#managing-resources) as well as preparing the data from the database. The UI may be aware of this security as well but can never be the one enforcing it.

The other thing to notice is that all components are involved in the storage and retrieval of data so all components need to support how we want our users to interact with our data.