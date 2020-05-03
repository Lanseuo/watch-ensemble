package sources

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestMp4CanHandle(t *testing.T) {
	canHandle := mp4CanHandle("https://example.com/video.mp4")
	assert.True(t, canHandle)

	canHandle = mp4CanHandle("https://example.com/video.mp4wrong")
	assert.False(t, canHandle)
}

func TestMp4Get(t *testing.T) {
	details, err := mp4Get("https://example.com/video.mp4")
	assert.Nil(t, err)

	assert.Equal(t, "Video from example.com", details.Title["undefined"])
	assert.Equal(t, "mp4", details.Source)
	assert.Equal(t, "", details.Description["undefined"])
	assert.Equal(t, "https://example.com/video.mp4", details.URL["undefined"])
	assert.Equal(t, []string{"undefined"}, details.Languages)
}
