package sources

import "errors"

type VideoDetails struct {
	Title       map[string]string `json:"title"`
	Description map[string]string `json:"description"`
	URL         map[string]string `json:"url"`
	Languages   []string          `json:"languages"`
}

func GetVideoDetails(url string) (VideoDetails, error) {
	if arteCanHandle(url) {
		return arteGet(url)
	}

	return VideoDetails{}, errors.New("No source found to handle + '" + url + "'")
}
