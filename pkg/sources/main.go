package sources

import "errors"

type VideoDetails struct {
	Title       map[string]string `json:"title"`
	Source      string            `json:"source"`
	Description map[string]string `json:"description"`
	URL         map[string]string `json:"url"`
	Languages   []string          `json:"languages"`
}

func GetVideoDetails(url string) (VideoDetails, error) {
	// TODO: Regex for URL

	if arteCanHandle(url) {
		return arteGet(url)
	}

	if youtubeCanHandle(url) {
		return youtubeGet(url)
	}

	if mp4CanHandle(url) {
		return mp4Get(url)
	}

	return VideoDetails{}, errors.New("No source found to handle '" + url + "'")
}
