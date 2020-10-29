FROM golang
ADD . /go/src/github.com/sarthakpranesh/HummingNote
WORKDIR /go/src/github.com/sarthakpranesh/HummingNote
RUN go mod tidy
RUN go install
ENTRYPOINT /go/bin/HummingNote
EXPOSE 8080
