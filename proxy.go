package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
)

func main() {
	location, err := url.Parse("https://stldevs.com")
	if err != nil {
		log.Fatal(err)
	}
	proxy := httputil.NewSingleHostReverseProxy(location)
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		r.Host = "stldevs.com"
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		proxy.ServeHTTP(w, r)
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	})
	if err = http.ListenAndServe(":8283", nil); err != nil {
		log.Fatal(err)
	}
}
