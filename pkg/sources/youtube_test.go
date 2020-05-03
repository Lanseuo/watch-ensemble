package sources

import (
	"bytes"
	"io/ioutil"
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestYouTubeCanHandle(t *testing.T) {
	canHandle := youtubeCanHandle("https://www.youtube.com/watch?v=abcdefghijk")
	assert.True(t, canHandle)

	canHandle = youtubeCanHandle("https://youtu.be/abcdefghijk")
	assert.True(t, canHandle)

	canHandle = arteCanHandle("https://www.video.com/watch?v=abcdefghijk")
	assert.False(t, canHandle)
}

func TestYouTubeGetUnavailableVideo(t *testing.T) {
	Client = &MockClient{}
	GetFunc = func(url string) (resp *http.Response, err error) {
		return &http.Response{
			StatusCode: 404,
			Body:       ioutil.NopCloser(bytes.NewReader([]byte("Not Found"))),
		}, nil
	}
	_, err := youtubeGet("https://www.youtube.com/watch?v=unavailable")
	assert.NotNil(t, err)
}

func TestYouTubeGetVideo(t *testing.T) {
	Client = &MockClient{}
	json := `{
		"title": "Title",
		"author_name": "Author",
		"width": 1920,
		"height": 1080
	}`
	GetFunc = func(url string) (resp *http.Response, err error) {
		return &http.Response{
			StatusCode: 200,
			Body:       ioutil.NopCloser(bytes.NewReader([]byte(json))),
		}, nil
	}

	details, err := youtubeGet("https://www.youtube.com/watch?v=abcdefghijk")
	assert.Nil(t, err)

	assert.Equal(t, "Title", details.Title["undefined"])
	assert.Equal(t, "youtube", details.Source)
	assert.Equal(t, "Video by Author", details.Description["undefined"])
	assert.Equal(t, "abcdefghijk", details.URL["undefined"])
	assert.Equal(t, []string{"undefined"}, details.Languages)
}
