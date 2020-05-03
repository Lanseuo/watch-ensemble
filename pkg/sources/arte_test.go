package sources

import (
	"bytes"
	"io/ioutil"
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
)

type MockClient struct {
	GetFunc func(url string) (resp *http.Response, err error)
}

var GetFunc func(url string) (resp *http.Response, err error)

func (c *MockClient) Get(url string) (resp *http.Response, err error) {
	return GetFunc(url)
}

func TestArteCanHandle(t *testing.T) {
	canHandle := arteCanHandle("https://www.arte.tv/fr/videos/096947-001-A/coronavirus-l-ordre-nouveau/")
	assert.True(t, canHandle)

	canHandle = arteCanHandle("https://www.arte.tv")
	assert.False(t, canHandle)
}

func TestArteGetUnavailableVideo(t *testing.T) {
	Client = &MockClient{}
	json := `{
		"videoJsonPlayer": {
			"customMsg": {
				"msg": "Désolé, cette vidéo n'est pas disponible.",
				"type": "error"
			}
		}
	}`
	GetFunc = func(url string) (resp *http.Response, err error) {
		return &http.Response{
			StatusCode: 200,
			Body:       ioutil.NopCloser(bytes.NewReader([]byte(json))),
		}, nil
	}
	_, err := arteGet("https://www.arte.tv/fr/videos/123456-789-A/unavailable-video/")
	assert.NotNil(t, err)
}

func TestArteGetVideo(t *testing.T) {
	Client = &MockClient{}
	json := `{
		"videoJsonPlayer": {
			"VTI": "Title",
			"VDE": "Description",
			"VSR": {
				"HTTPS_SQ_1": {
					"url": "url.mp4"
				}
			}
		}
	}`
	GetFunc = func(url string) (resp *http.Response, err error) {
		return &http.Response{
			StatusCode: 200,
			Body:       ioutil.NopCloser(bytes.NewReader([]byte(json))),
		}, nil
	}

	details, err := arteGet("https://www.arte.tv/fr/videos/123456-789-A/available-video/")
	assert.Nil(t, err)

	assert.Equal(t, "Title", details.Title["de"])
	assert.Equal(t, "Title", details.Title["fr"])
	assert.Equal(t, "arte", details.Source)
	assert.Equal(t, "Description", details.Description["de"])
	assert.Equal(t, "Description", details.Description["fr"])
	assert.Equal(t, "url.mp4", details.URL["de"])
	assert.Equal(t, "url.mp4", details.URL["fr"])
	assert.Equal(t, []string{"fr", "de"}, details.Languages)
}
