package main

import (
  "log"
  "io/ioutil"
  "os"
  "net/http"
  "github.com/golang/protobuf/proto"
  "./staticwebsite"
)

type endpointHandler struct {
  endpoint staticwebsite.StaticEndpoint;
}

func NewEndpointHandler(endpoint staticwebsite.StaticEndpoint) http.Handler {
  return endpointHandler{endpoint}
}

func (handler endpointHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
  endpoint := handler.endpoint
  for k, v := range endpoint.GetHeaders() {
    w.Header().Set(k, v)
  }
  w.WriteHeader(http.StatusOK)
  w.Write(endpoint.GetBody())
}

func LogRequests(handler http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    log.Printf("%s %s %s", r.RemoteAddr, r.Method, r.URL)
    handler.ServeHTTP(w, r)
  })
}

func main() {
  bytes, err := ioutil.ReadFile("/website-data.in-memory-website")
  if err != nil && os.IsNotExist(err) {
    bytes, err = ioutil.ReadAll(os.Stdin)
  }
  if err != nil {
    log.Fatalln("Could not read bytes from /website-data.in-memory-website or stdin:", err)
  }
  if len(bytes) == 0 {
    log.Fatalln("Input is 0 bytes long. That isn't a website.")
  }

  website := &staticwebsite.StaticWebsite{}
  err = proto.Unmarshal(bytes, website)
  if err != nil {
    log.Fatalln("Could not parse bytes:", err)
  }

  for _, endpoint := range website.GetEndpoints() {
    log.Println("Serving", endpoint.GetPath())
    http.Handle(endpoint.GetPath(), NewEndpointHandler(*endpoint))
  }

  log.Println("Listening on port 80")
  err = http.ListenAndServe(":80", LogRequests(http.DefaultServeMux))
  if err != nil {
    log.Fatal("ListenAndServe: ", err)
  }
}
