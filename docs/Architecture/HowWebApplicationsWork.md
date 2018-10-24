# How do web applications work?

I use markdown for sequence diagrams and include the ascii version using this [ASCII Sequence Diagram Creator](https://textart.io/sequence) because gitbooks doesn't support it yet.

You can also parse the markdown using something like [js-sequence-diagrams](https://bramp.github.io/js-sequence-diagrams/) which is included in my current markdown editor, [Typora](https://typora.io/).

## DNS

This is a web application so lets start from the internet browser (think of Google Chrome or Safari). What happens when you go to [google.com](https://google.com)?

```sequence
Browser->DNS: What is the IP address for google.com?
DNS->Browser: The IP of google.com is 216.58.199.46
```

```
+---------+                                   +-----+
| Browser |                                   | DNS |
+---------+                                   +-----+
     |                                           |
     | What is the IP address for google.com?    |
     |------------------------------------------>|
     |                                           |
     |     The IP of google.com is 216.58.199.46 |
     |<------------------------------------------|
     |                                           |
```



How DNS (Domain Name System) works is out of the scope of this article but this article is pretty good; [DNS: Why It’s Important & How It Works](https://dyn.com/blog/dns-why-its-important-how-it-works/). tl;dr domains are resolved by your local computer and a chain of remote DNS servers.

You can find out the ip address of a domain from your terminal.

```
dig google.com
```

## Static Web Pages

Your browser will establish a connection to 216.58.199.46 and send a [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview) GET request to the "/" path of the server, GET being a type of [HTTP request method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Method). The server will then respond based on the request. This is important: HTTP is a request-response protocol; the request has data and the response has data based on the request.

```sequence
Browser->216.58.199.46: GET / HTTP/1.1
216.58.199.46->Browser: Here is the html page for /
```

```
+---------+                        +-------------+
| Browser |                        | IP_Address  |
+---------+                        +-------------+
     |                                    |
     | GET / HTTP/1.1                     |
     |----------------------------------->|
     |                                    |
     |        Here is the html page for / |
     |<-----------------------------------|
     |                                    |
```



Traditionally, the server will return a HTML page which can instruct the browser to make further requests for other assets such as images or code to style the page. This is the case with google.com and you can see that by: 

1. Go to [cadbox1.github.io/glue-stack](https://cadbox1.github.io/glue-stack/) in [Google Chrome](https://www.google.com/chrome/).
2. Right click the page
3. Select Inspect
4. Select the Network tab.
5. Refresh the page.
6. Scroll to the top of the pane.

The first asset is the root HTML page and you can see the code by clicking on the request then selcting the response tab. From there it issues requests for the other assets like the image.

If we think about the simplest example of a HTML page, all the assets are static - they don't change. They're just files that a simple server sends when the path matches the filename. We could use something like [AWS S3](https://aws.amazon.com/s3/) (Simple Storage Service) for this (we do).

Note: we'll exclude the DNS part for the rest of this article now that we've covered it.

Fun fact: I wanted to use my website for the previous section but learned about the [host header](https://serverfault.com/a/589380).

## Dynamic Web Pages

Dynamic web pages were the next step - web pages that are generated when the request is received. It might look like this.

```sequence
Browser->Server: GET / HTTP/1.1
Server->Database: get latest blog post
Database->Server: here's the latest blog post
Server->Browser: <html><h1>Blog Title!</h1></html> 
```

```
+---------+                               +---------+                        +-----------+
| Browser |                               | Server  |                        | Database  |
+---------+                               +---------+                        +-----------+
     |                                         |                                   |
     | GET / HTTP/1.1                          |                                   |
     |---------------------------------------->|                                   |
     |                                         |                                   |
     |                                         | get latest blog post              |
     |                                         |---------------------------------->|
     |                                         |                                   |
     |                                         |       here's the latest blog post |
     |                                         |<----------------------------------|
     |                                         |                                   |
     |      <html><h1>Blog Title!</h1></html>  |                                   |
     |<----------------------------------------|                                   |
     |                                         |                                   |
```



This is the pattern that [PHP](http://au2.php.net/manual/en/intro-whatis.php) made popular particular with the world's largest open source blog platform [Wordpress](https://wordpress.org/download/). It is incredibly powerful because we could fetch some really cool data like today's weather or the latest sports scores. The data might even come from an external service so we might not even need to handle the database ourselves.

This pattern takes more resources to produce a page than the static pattern because we're doing a lot more on each request. 

For pages that don't change that often like blogs or basic websites there are tools like [wordpress caches](https://en-au.wordpress.org/plugins/wp-super-cache/) and [static site generators](https://www.google.com.au/search?q=static+site+generator&rlz=1C5CHFA_enAU693AU693&oq=static+site+g&aqs=chrome.0.69i59j69i57j0l4.2332j0j4&sourceid=chrome&ie=UTF-8) that try to create static pages before the request comes in so they have the same performance as static websites but that's a bit out of the scope of this article.

Fun fact: you can even do this pattern with React now with [server side rendering](https://www.google.com.au/search?rlz=1C5CHFA_enAU693AU693&ei=tQBjW_X6KZ7u8wWwzacY&q=server+side+rendering+react&oq=server+side+rendering+react&gs_l=psy-ab.3...6207.10013.0.10102.27.15.0.0.0.0.427.1654.3-1j3.4.0....0...1.1.64.psy-ab..23.4.1653...0j35i39k1j0i67k1j0i131k1j0i20i263k1.0.8J9sCPIJkpw).

## Single Page Applications

Glue stack is a [single page application](https://en.wikipedia.org/wiki/Single-page_application) (SPA) which follows on from the previous examples. It aims to provide a better user experience by loading data into the current page instead of completely reloading it. Go ahead and click the signup button on [glue-stack](https://cadbox1.github.io/glue-stack/) to see for yourself.

An SPA could load a dynamic web page into the current page but that would mean the server would have to know what the ui is going to look like in order for it to return the correct html. We have more flexibility if the server returns structured data and the ui handles the presentation of that data. This is what we call separation of concerns.

```sequence
Browser->File Server: GET / HTTP/1.1
File Server->Browser: static assets for single page application
Browser->API: GET /some-data HTTP/1.1
API->Browser: {"todaysWeather": "Sunny"}
```

```
+---------+                                      +-------------+ +-----+
| Browser |                                      | File_Server | | API |
+---------+                                      +-------------+ +-----+
     |                                                  |           |
     | GET / HTTP/1.1                                   |           |
     |------------------------------------------------->|           |
     |                                                  |           |
     |        static assets for single page application |           |
     |<-------------------------------------------------|           |
     |                                                  |           |
     | GET /some-data HTTP/1.1                          |           |
     |------------------------------------------------------------->|
     |                                                  |           |
     |                                   {"todaysWeather": "Sunny"} |
     |<-------------------------------------------------------------|
     |                                                  |           |
```



This pattern starts exactly like the static pattern, what's different is what happens next. The root html page will make requests for more static assets (not included in the diagram for simplicity) just like before, but the important asset for an SPA is a [javascript](https://www.javascript.com/) asset. Javascript is the programming language for browsers and is particularly important for making single page applications work. Just to be explicit the javascript asset is static just like the original html page.

Javascript is very powerful and among thousands of other things, can retrieve data from servers using what's called an [API](https://en.wikipedia.org/wiki/Application_programming_interface). API is a vague term since a programming interface can mean a lot of different things. When we're talking about APIs in a web developer context we're usually talking about HTTP JSON APIs. (Some people call them [REST](https://stackoverflow.com/questions/4663927/what-is-rest-slightly-confused) APIs but that term seems to be pretty controversial so we'll just avoid it.) [JSON](https://en.wikipedia.org/wiki/JSON) stands for javascript object notation so its really just a way of structuring data that's really easy for javascript applications to use. An example of JSON is in the diagram.

Single page applications can choose when to retrieve data. Is it on page load like the glue stack list page or is it on some user action like clicking the done button. It could even at a set interval like some 'realtime' sports scores websites. 

Just like the dynamic web page this data might come from a database or an external source but in glue stack it is most certainly a database.

## 3-Tier Architecture

This is how Glue Stack works.

```sequence
Browser->API: GET me some data
API->DB: data please
DB->API: here is the table of data
API->Browser: here is the data in JSON
```

```
+---------+                     +-----+                        +-----+
| Browser |                     | API |                        | DB  |
+---------+                     +-----+                        +-----+
     |                             |                              |
     | GET me some data            |                              |
     |---------------------------->|                              |
     |                             |                              |
     |                             | data please                  |
     |                             |----------------------------->|
     |                             |                              |
     |                             |    here is the table of data |
     |                             |<-----------------------------|
     |                             |                              |
     |    here is the data in JSON |                              |
     |<----------------------------|                              |
     |                             |                              |
```



The browser can also make changes to data using the same flow but with different HTTP methods like POST and PATCH.

Further reading about this architecture is available at [Architecture](./Architecture.md).